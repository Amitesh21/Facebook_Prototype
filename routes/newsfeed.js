exports.friends = function(req, res){
	
	if(req.session.email){		//checking session value
		console.log("reach friends page");
		//console.log(req.session.uid);
		
	var uid1 = req.session.uid;
	console.log("uid:"+ uid1);
	var mysql=require("mysql");
	var status = req.param("status");
	var conn=mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		socketPath : '/tmp/mysql.sock',
		database: 'asd',
		
	});
	conn.connect();
    var query=conn.query("insert into newsfeed values("+uid1+",'"+status+"');",function(err,result){
	console.log(query.sql);
	//console.log(q1);
	
	if(err){
			console.error(err);
	}
	 else{
		   
		   res.render('success'); 
		   conn.end();
		 }});
	
	}
	};	