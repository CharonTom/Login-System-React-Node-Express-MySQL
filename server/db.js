const mysql = require("mysql2");
require("dotenv").config();

const HOST = process.env.HOST_DB;
const USER = process.env.USER_DB;
const PASSWORD = process.env.PASSWORD_DB;
const NAME = process.env.NAME_DB;

const db = mysql.createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: NAME,
});

db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Connected to database");
  }
});

module.exports = db;
