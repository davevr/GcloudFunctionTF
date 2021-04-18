const Sequelize = require('sequelize');

// test
const {
    MYSQL_HOST: HOST,
    MYSQL_HOST_FILE: HOST_FILE,
    MYSQL_USER: USER,
    MYSQL_USER_FILE: USER_FILE,
    MYSQL_PASSWORD: PASSWORD,
    MYSQL_PASSWORD_FILE: PASSWORD_FILE,
    MYSQL_DB: DB,
    MYSQL_DB_FILE: DB_FILE,
    IS_IN_GCLOUD: IS_IN_GCLOUD,
    IS_IN_AWS: IS_IN_AWS,
    IS_IN_AZURE: IS_IN_AZURE,
} = process.env;

module.exports.createSql = () => {
    let options = [];

    let host = HOST_FILE ? fs.readFileSync(HOST_FILE) : HOST;
    let user = USER_FILE ? fs.readFileSync(USER_FILE) : USER;
    let password = PASSWORD_FILE ? fs.readFileSync(PASSWORD_FILE) : PASSWORD;
    let database = DB_FILE ? fs.readFileSync(DB_FILE) : DB;
    let dialect = 'mysql';
    const dbSocketPath = process.env.DB_SOCKET_PATH || '/cloudsql';


    console.log('process env: ' + JSON.stringify(process.env));
    const localhost = true; // false;  // true;

    if (IS_IN_GCLOUD) {
        // here is a comment or two.
        host ='localhost';
        const connectionName = process.env.CLOUD_SQL_CONNECTION_NAME || 'clouduploadtest-299219:us-central1:gamedatabase';
        options = {
            socketPath: `${dbSocketPath}/${connectionName}`,
        }
    } else if (IS_IN_AWS) {
        // things needed for aws
        host = HOST;

        options = {
            ssl: 'Amazon RDS'
        };
    } else if (IS_IN_AZURE) {
        // things needed for azure
        host = HOST;
        dialect = 'mssql';
        /*
        host = 'cloudsqltestserver.database.windows.net';
        user = 'testadmin@cloudsqltestserver';
        password = 'AzurePassword!';
        database = 'wtfserver';
        */
        options = {
            encrypt: true
        }
    } else  {
        host = '127.0.0.1'; // local machine mySQL
        password = 'password';
        user = 'root';
        database = 'wtfdata';

    }
   



    const db = new Sequelize(database, user, password, {
        host: host,
        dialect: dialect,
        dialectOptions: options,
        operatorsAliases: Sequelize.Op,
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
    });


    const SheepObj = db.define('sheepobj', {
        xLoc: Sequelize.FLOAT,
        zLoc: Sequelize.FLOAT,
        levelId: Sequelize.INTEGER,
    });

    const ExitObj = db.define('exitobj', {
        xLoc: Sequelize.FLOAT,
        zLoc: Sequelize.FLOAT,
        angle: Sequelize.FLOAT,
        levelId: Sequelize.INTEGER,
    });

    const EFenceObj = db.define('efenceobj', {
        xLoc: Sequelize.FLOAT,
        zLoc: Sequelize.FLOAT,
        angle: Sequelize.FLOAT,
        levelId: Sequelize.INTEGER,
    });

    const BushObj = db.define('bushobj', {
        xLoc: Sequelize.FLOAT,
        zLoc: Sequelize.FLOAT,
        angle: Sequelize.FLOAT,
        levelId: Sequelize.INTEGER,
    });

    const FenceObj = db.define('fenceobj', {
        startX: Sequelize.FLOAT,
        startZ: Sequelize.FLOAT,
        endX: Sequelize.FLOAT,
        endZ: Sequelize.FLOAT,
        levelId: Sequelize.INTEGER,
    });

    const PuddleObj = db.define('puddleobj', {
        xLoc: Sequelize.FLOAT,
        zLoc: Sequelize.FLOAT,
        width: Sequelize.FLOAT,
        height: Sequelize.FLOAT,
        angle: Sequelize.FLOAT,
        levelId: Sequelize.INTEGER,
    });

    const MudPuddleObj = db.define('mudpuddleobj', {
        xLoc: Sequelize.FLOAT,
        zLoc: Sequelize.FLOAT,
        width: Sequelize.FLOAT,
        height: Sequelize.FLOAT,
        angle: Sequelize.FLOAT,
        levelId: Sequelize.INTEGER,
    });


    const DogRun = db.define('dogrun', {
        startX: Sequelize.FLOAT,
        startZ: Sequelize.FLOAT,
        endX: Sequelize.FLOAT,
        endZ: Sequelize.FLOAT,
        speed: Sequelize.FLOAT,
        levelId: Sequelize.INTEGER,
    });

    const Star = db.define('star', {
        xLoc: Sequelize.FLOAT,
        zLoc: Sequelize.FLOAT,
        bonus: Sequelize.FLOAT,
        levelId: Sequelize.INTEGER,
    });

    const RabbitHole = db.define('rabbithole', {
        xLocEntry: Sequelize.FLOAT,
        zLocEntry: Sequelize.FLOAT,
        xLocExit: Sequelize.FLOAT,
        zLocExit: Sequelize.FLOAT,
        levelId: Sequelize.INTEGER,
    });

    const Level = db.define('level', {
        width: Sequelize.FLOAT,
        height: Sequelize.FLOAT,
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        allowedTime: Sequelize.INTEGER,
    });





    return {
        db,
        SheepObj,
        ExitObj,
        FenceObj,
        BushObj,
        EFenceObj,
        PuddleObj,
        MudPuddleObj,
        DogRun,
        Star,
        RabbitHole,
        Level,
    };
}
