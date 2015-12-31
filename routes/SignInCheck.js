	
var session = require('client-sessions');

//----validating signin check for a user---
exports.signInCheck = function(req, res){
	if(req.method == 'POST'){
	console.log("reach sign in check page");
	var email, password, uid , name;
	email=req.param("email");
    password=req.param("password");
    
    var mysql = require('mysql');

    var connection = mysql.createConnection({
    	host : 'localhost' ,
    	user : 'root' ,
    	password : '' ,
    	database : 'asd' , 
    	socketPath : '/tmp/mysql.sock'
    });
    connection.connect();
    
    var query = connection.query("select count(*) as count, uid , name from users where email = '"+email+"' and password = '"+password+"'", function(err , result)
    {
    	console.log(query.sql);
    	if (err) {
    		console.error(err);
    		return;
    	}
    	
    	else{
		    if((result.length)>0)
		    	{ 
		    	console.log("success");
		    	uid = result[0].uid;
		    	name = result[0].name;
		    	console.log("uid is: "+uid);
		    	console.log("name is: "+name);
		    	req.session.email = email;
		    	req.session.uid = uid;
		    	var uid1 = req.session.uid;
		    	var resultSetName = [];
				var resultSetStatus = [];
				
				//checking credentials from database table
		    	var query1=connection.query("select distinct u.uid , u.name as name, n.status as status from users u, newsfeed n where u.uid=n.uid and n.uid in (select uid from users where uid in (select uid from friends where fid="+uid1+" and status=1 union select fid from friends where uid="+uid1+" and status=1 ) or uid="+uid1+");",function(err1,result1){

		    		console.log(query1.sql);
	    			//console.log(q1);
	    			
	    			if(err1){
	    					console.error(err1);
	    			}
	    			 else{
	    				 if((result1.length)>0){
	    					 console.log("stage: 1");
	    				   
	    				   
	    				   for(var i in result1)
	    					   {
	    					   resultSetName.push(result1[i].name);
	    					   resultSetStatus.push(result1[i].status);
	    					   console.log("name: "+result1[i].name+"  status : "+result1[i].status);
	    					   }
	    				   res.render('success',{ resultSetName:resultSetName,resultSetStatus:resultSetStatus, name : name });
	    			 }}
		    	});
		    	
			    		console.log("email is: "+req.session.email + "Uid:" + req.session.uid);
			    		
			    		

		    	
			    	}
			    	else{
			    		
			    		res.render('index',{name:name, resultSetName:"",resultSetStatus:"", name:""});
			    	}
		    	}
		    
    	}
);

}else{
	if(req.session.email) {
		var resultSetName = [];
		var resultSetStatus = [];
		var uid1 = req.session.uid;
		var mysql1 = require('mysql');
		var connection1 = mysql1.createConnection({
	    	host : 'localhost' ,
	    	user : 'root' ,
	    	password : '' ,
	    	database : 'asd' , 
	    	socketPath : '/tmp/mysql.sock'
	    });
	    connection1.connect();
	    
		var query2=connection1.query("select distinct u.uid , u.name as name, n.status as status from users u, newsfeed n where u.uid=n.uid and n.uid in (select uid from users where uid in (select uid from friends where fid="+uid1+" and status=1 union select fid from friends where uid="+uid1+" and status=1 ) or uid="+uid1+");",function(err2,result2){

    		console.log(query2.sql);
			//console.log(q1);
			
			if(err2){
					console.error(err2);
			}
			 else{
				 if((result2.length)>0){
					 console.log("stage: 2");
				   
				   
				   for(var i in result2)
					   {
					   resultSetName.push(result2[i].name);
					   resultSetStatus.push(result2[i].status);
					   console.log("name: "+result2[i].name+"  status : "+result2[i].status);
					   }	
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');			
		res.render('success',{title:'Home page', resultSetName:"",resultSetStatus:"" , name:""});	    			    			    	
	}
	else{
		res.render('index');
	}
}});
	
	}
}
};

//-----for a new user-----
exports.signup = function(req, res){
	var firstname , lastname,email, pass, sex, dob;
	firstname=req.param("firstname");
	lastname=req.param("lastname");
	email=req.param("email");
    pass=req.param("password");
    sex=req.param("sex");
    dob=req.param("dob");
    
   // console.log('username');
    console.log('email');
    console.log('password');
    console.log('sex');
    console.log('dob');
    
    var mysql = require('mysql');

    var connection = mysql.createConnection({
    	host : 'localhost' ,
    	user : 'root' ,
    	password : '' ,
    	database : 'asd' , 
    	socketPath : '/tmp/mysql.sock'
    });
    connection.connect();
    
    //----inserting the new user record into users table
    var query1 = connection.query("insert into users values('"+email+"','"+pass+"',"+dob+",'"+firstname+""+lastname+"','"+sex+"',null)", function(err , result)
    	    {
    	    	if (err) {
    	    		console.log(query1.sql);
    	    		console.error(err);
    	    		return;
    	    	}
    	    	req.session.email = email;
    	    	//req.session.uid = uid;
    	    	
    	    	console.log(query1.sql);
    	    	console.error(result);

    	    });
    
	 // console.log(username+" respond with a resource"+pass);
	  req.session.email = email;
  	if(req.session.email) {
  		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  	res.render('success');	    			    			    	
  	}    			    			    		
};

//-----destroying session in case of logout
exports.destroySession = function(req, res){
	//req.session.reset();
	console.log(req.session.destroy());   //destroy session 
	console.log("session destroyed successfully");
	console.log(req.session.email);
	//res.render('index', { title: 'Welcome to Login' });
	res.redirect('/');
};
