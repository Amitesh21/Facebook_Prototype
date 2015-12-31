
//------Showing about details for particular user------
exports.about = function(req, res){
	console.log("reach sign in about page");
	if(req.session.email){				//checking session value
	var name , sex, dob, college, current_job, previous_job , phone_no , hobbey;
	
	var uid = req.session.uid;
	
    var mysql = require('mysql');
    console.log("UId is: "+uid);
    var pool = mysql.createPool({
    	host : 'localhost' ,
    	user : 'root' ,
    	password : '' ,
    	database : 'asd' , 
    	socketPath : '/tmp/mysql.sock'
    });
    pool.getConnection(function(err,conn){
    	
    	//-------fetching records from about user table------
    	var query = conn.query("select name, sex, dob, college, current_job, previous_job , phone_no , hobbey from about_user a, users b where a.uid=b.uid and a.uid ="+uid, function(err , result)
    		    {
    		    	console.log(query.sql);
    		    	if (err) {
    		    		console.error(err);
    		    		return;
    		    	}
    		    	
    		    	else{
    				    if(result.length>0)  //checking the result set length
    				    	{ 
    				    	name = result[0].name; 
    				    	dob = result[0].dob; 
    				    	sex = result[0].sex;
    				    	college = result[0].college;
    				    	current_job = result[0].current_job;
    				    	previous_job = result[0].previous_job;
    				    	phone_no = result[0].phone_no;
    				    	hobbey = result[0].hobbey;
    				    	console.log("about result found");
    				    	console.log("about result found"); 	
    				    	res.render('about',{name: name, dob:dob, sex:sex, college:college, current_job:current_job , previous_job:previous_job , phone_no:phone_no , hobbey:hobbey});	    			    			    	
    				    	}
    				    else
    				    	{
    				    	//------if no detail exist, transfer control to update detail page
    				    	res.render('aboutEdit', {title:"No existing Details, Please fill the details"});
    				    	}	    
    					res.end();
    		    	}
    		    	conn.release();	// releasing connection
    		});

    	
    });
    
    	}
};

//-----transfer control to Edit profile page----
exports.aboutEdit = function(req,res){
	if(req.session.email) {			//checking session value
		console.log("user name" + req.session.email);
		res.render('aboutEdit',{title:"Please update details"});
	}
};


//-----Updating the user detail into table----
exports.updateAbout = function(req,res){
	if(req.session.email) {			//checking session value
		var college, current_job, previous_job , phone_no , hobbey;
		college=req.param("college");
		current_job=req.param("c_job");
		console.log(college);
		previous_job=req.param("p_job");
		phone_no=req.param("p_no");
		hobbey=req.param("hobbey");
		var uid = req.session.uid;
		
	    var mysql = require('mysql');

	    var pool = mysql.createPool({
	    	host : 'localhost' ,
	    	user : 'root' ,
	    	password : '' ,
	    	database : 'asd' , 
	    	socketPath : '/tmp/mysql.sock'
	    });
	    pool.getConnection(function(err,conn){
	    
	    
	    var query1 = pool.query("insert into about_user values("+uid+",'"+college+"','"+current_job+"','"+previous_job+"',"+phone_no+",'"+hobbey+"');", function(err , result)
	    	    {
	    	    	if (err) {
	    	    		console.log(query1.sql);
	    	    		console.error(err);
	    	    		return;
	    	    	}
	    	    	
	    	    	console.log(query1.sql);
	    	    	console.error(result);

	    	    });
	    
	  	res.render('final',{title:"Profile updated successfully"});	    			    			    	
	  	});    		
	    pool.release();

	}};


//-----Profile detail about my friend-----------
	exports.aboutFriend = function(req, res){
		console.log("reach in about Friend page");
		if(req.session.email){
		var name , sex, dob, college, current_job, previous_job , phone_no , hobbey;
		
		var uid = req.session.uid;
		
	    var mysql = require('mysql');
	    console.log("UId is: "+uid);
	    var connection = mysql.createConnection({
	    	host : 'localhost' ,
	    	user : 'root' ,
	    	password : '' ,
	    	database : 'asd' , 
	    	socketPath : '/tmp/mysql.sock'
	    });
	    connection.connect();
	    var friendUid = req.params.id;
	    console.log("Friend id:"+friendUid);
	    var query = connection.query("select name, sex, dob, college, current_job, previous_job , phone_no , hobbey from about_user a, users b where a.uid=b.uid and a.uid ="+friendUid, function(err , result)
	    {
	    	console.log(query.sql);
	    	if (err) {
	    		console.error(err);
	    		return;
	    	}
	    	
	    	else{
			    if(result.length>0)
			    	{ 
			    	name = result[0].name; 
			    	dob = result[0].dob; 
			    	sex = result[0].sex;
			    	college = result[0].college;
			    	current_job = result[0].current_job;
			    	previous_job = result[0].previous_job;
			    	phone_no = result[0].phone_no;
			    	hobbey = result[0].hobbey;
			    	console.log("about result found");
			    		
			    	
			    	
			    	res.render('about',{name: name, dob:dob, sex:sex, college:college, current_job:current_job , previous_job:previous_job , phone_no:phone_no , hobbey:hobbey});	    			    			    	
			    	}
			    else
			    	{
			    	
			    	res.render('aboutEdit', {title:"No existing Details, Please fill the details"});
			    	}	    
				res.end();
	    	}
	});
		}
	};

	
	exports.aboutbasic = function(req,res){
		console.log("reach in about basic page");
		if(req.session.email){
			var name , sex, dob, email;
			
			var uid = req.session.uid;
			
		    var mysql = require('mysql');
		    console.log("UId is: "+uid);
		    var connection = mysql.createConnection({
		    	host : 'localhost' ,
		    	user : 'root' ,
		    	password : '' ,
		    	database : 'asd' , 
		    	socketPath : '/tmp/mysql.sock'
		    });
		    connection.connect();
		    var query = connection.query("select name, sex, dob from users where uid="+uid, function(err , result)
		    {
		    	console.log(query.sql);
		    	if (err) {
		    		console.error(err);
		    		return;
		    	}
		    	
		    	else{
				    if(result.length>0)
				    	{ 
				    	name = result[0].name; 
				    	dob = result[0].dob; 
				    	sex = result[0].sex;
				    	
				    	console.log("basic result found");
				    		
				    	
				    	
				    	res.render('aboutbasic',{name: name, dob:dob, sex:sex});	    			    			    	
				    	}
				    else
				    	{
				    	
				    	res.render('aboutEdit', {title:"No existing Details, Please fill the details"});
				    	}	    
					res.end();
		    	}
		});
			}
		};
	
		exports.aboutbasic = function(req,res){
			console.log("reach in about basic page");
			if(req.session.email){
				var name , college,email;
				
				var uid = req.session.uid;
				
			    var mysql = require('mysql');
			    console.log("UId is: "+uid);
			    var connection = mysql.createConnection({
			    	host : 'localhost' ,
			    	user : 'root' ,
			    	password : '' ,
			    	database : 'asd' , 
			    	socketPath : '/tmp/mysql.sock'
			    });
			    connection.connect();
			    var query = connection.query("select name, email, college from about_user a, users u where a.uid=u.uid and a.uid="+uid, function(err , result)
			    {
			    	console.log(query.sql);
			    	if (err) {
			    		console.error(err);
			    		return;
			    	}
			    	
			    	else{
					    if(result.length>0)
					    	{ 
					    	name = result[0].name; 
					    	college = result[0].college; 
					    	email = result[0].email;
					    	
					    	console.log("basic result found");
					    		
					    	
					    	
					    	res.render('aboutedu',{name: name,college:college,email:email });	    			    			    	
					    	}
					    else
					    	{
					    	
					    	res.render('aboutEdit', {title:"No existing Details, Please fill the details"});
					    	}	    
						res.end();
			    	}
			});
				}
			};