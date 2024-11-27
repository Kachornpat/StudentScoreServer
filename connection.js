require("dotenv").config();
const mysql = require("mysql");

let connection = mysql.createConnection(
    {
        port: process.env.DATABASE_PORT,
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    }
)

connection.connect((error) => {
    if (!error){
        console.log("Database connected!!");
    }
    else{
        console.log(error);
    }
})

module.exports = connection;