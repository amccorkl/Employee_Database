const mysql = require("mysql2");
require("dotenv").config();

//creating a connection to the database
const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        port: process.env.PORT,
        password: process.env.DB_PASSWORD,
        user: process.env.DB_USER,
        database: process.env.DATABASE,
        //needed to allow multiple query statements in arrays
        multipleStatements: true
    }
);

    module.exports = db;