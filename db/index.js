const mysql = require("mysql2");
console.log("database", process.env.DATABASE);

const db = mysql.createConnection(
    {
        host: process.env.DB_HOST || "localhost",
        password: process.env.DB_PASSWord || "password",
        user: process.env.DB_USER || "root",
        database: process.env.DATABASE || "employee_db",
    },
    console.log("DB connected successfully")
    );

    module.exports = db;