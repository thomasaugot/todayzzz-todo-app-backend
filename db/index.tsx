const mysql = require("mysql2");

const MYSQL_URI = process.env.MYSQL_URI || {
  host: "localhost",
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

const connection = mysql.createConnection(MYSQL_URI);

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: ", err);
  } else {
    console.log("Connected to MySQL!");
  }
});

module.exports = connection;
