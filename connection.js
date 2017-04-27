var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'z040577',
  database : 'node_mysql'
});
 
connection.connect();
 
connection.query('SELECT * FROM states', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});
 
// connection.end();

module.exports = connection;