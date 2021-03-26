var mysql = require("mysql2");
// var mysqlConfig = require("./config.js");

var connection = mysql.createPool({
  host: "databaseSQL",
  user: "root",
  database: "mydb",
  // database: "question_answers",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // password: "password",
});
//createPool:

// connection.connect((err) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
// });

module.exports.connection = connection;
