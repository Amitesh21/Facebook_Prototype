var mysql = require('mysql');

var pool  = mysql.createPool({
	host : 'localhost' ,
	user : 'root' ,
	password : '' ,
	database : 'asd' , 
	socketPath : '/tmp/mysql.sock'
});

exports.pool = pool;