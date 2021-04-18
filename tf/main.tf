terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
      version = "3.5.0"
    }
  }
}

provider "google" {

  credentials = file("whattheflockserver-de8a8db8d2f0.json")

  project = "whattheflockserver"
  region  = "us-central1"
  zone    = "us-central1-c"
}

resource "google_storage_bucket" "bucket" {
  name = "cloud-function-tutorial-bucket" # This bucket name must be unique
}


resource "google_storage_bucket_object" "archive" {
  name   = "${data.archive_file.src.output_md5}.zip"
  bucket = google_storage_bucket.bucket.name
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
}

resource "google_cloudfunctions_function_iam_member" "invoker" {
  project        = google_cloudfunctions_function.wtffunctiontest.project
  region         = google_cloudfunctions_function.wtffunctiontest.region
  cloud_function = google_cloudfunctions_function.wtffunctiontest.name

  role   = "roles/cloudfunctions.invoker"
  member = "allUsers"
}