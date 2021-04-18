terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
      version = "3.5.0"
    }
  }
  terraform {
  backend "gcs" {
    bucket = "wtfserver-cloud-function-test-bucket"
  }
}
}

provider "google" {

  # credentials = file("whattheflockserver-de8a8db8d2f0.json")

  project = "whattheflockserver"
  region  = "us-central1"
  zone    = "us-central1-c"
}

resource "google_storage_bucket" "bucket" {
  name = "wtfserver-cloud-function-test-bucket" # This bucket name must be unique
}

data "archive_file" "src" {
  type        = "zip"
  source_dir  = "${path.root}/../src" # Directory where your Python source code is
  output_path = "${path.root}/../generated/src.zip"
}

resource "google_storage_bucket_object" "archive" {
  name   = "${data.archive_file.src.output_md5}.zip"
  bucket = google_storage_bucket.bucket.name
  source = "${path.root}/../generated/src.zip"
}

resource "google_cloudfunctions_function" "wtffunctiontest" {
  name        = "tffunctiontest"
  description = "My function"
  runtime     = "nodejs12"
  source_archive_bucket = google_storage_bucket.bucket.name
  source_archive_object = google_storage_bucket_object.archive.name

  available_memory_mb   = 128
  trigger_http          = true
  entry_point           = "handler"
   environment_variables = {
    IS_IN_GCLOUD = "TRUE"
    MYSQL_DB = "wtfdata"
    MYSQL_PASSWORD = "secret"
    MYSQL_USER = "root"
    CLOUD_SQL_CONNECTION_NAME = "whattheflockserver:us-west1:wtf-server-database"
  }
}

resource "google_cloudfunctions_function_iam_member" "invoker" {
  project        = google_cloudfunctions_function.wtffunctiontest.project
  region         = google_cloudfunctions_function.wtffunctiontest.region
  cloud_function = google_cloudfunctions_function.wtffunctiontest.name

  role   = "roles/cloudfunctions.invoker"
  member = "allUsers"
}