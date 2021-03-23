var mysql = require('mysql');
var mysqlConfig = require('./config.js');

var connection = mysql.createConnection(mysqlConfig);

connection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
});

module.exports.connection = connection;