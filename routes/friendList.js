
//------fetch my existing friends--------
exports.friends = function(req, res){
	
	if(req.session.email){		//checking session value
		console.log("reach friends page");
		//console.log(req.session.uid);
		
	var uid1 = req.session.uid;
	console.log("uid:"+ uid1);
	var mysql=require("mysql");

	var conn=mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		socketPath : '/tmp/mysql.sock',
		database: 'asd',
		
	});
	conn.connect();
    var query=conn.query("select uid , name , email from users where uid in (select uid from friends where fid="+uid1+" and status=1 union select fid from friends where uid="+uid1+" and status=1 ) and uid<>"+uid1,function(err,result){
	console.log(query.sql);
	//console.log(q1);
	
	if(err){
			console.error(err);
	}
	 else{
		 if((result.length)>0){
			 console.log("stage: 1");
		   var resultSetId = [];
		   var resultSetName = [];
		   var resultSetEmail = [];
		   for(var i in result)
			   {
			   console.log("name:");
			   resultSetId.push(result[i].uid);
			   resultSetName.push(result[i].name);
			   resultSetEmail.push(result[i].email);
			   console.log("name: "+result[i].name+"  id: "+result[i].uid);
			   }
		   
		   res.render('friend',{resultSetId:resultSetId , resultSetName:resultSetName , resultSetEmail:resultSetEmail}); 
		   conn.end();
		 }
		 else{
			 console.log("no records");
			 res.render('final', {title:"No existing friends"});
		 }}});
	
	}
	};	

	//-------Will fetch other user to add--------
	exports.searchFriends = function(req, res){
		
		if(req.session.email){		//checking session value
			console.log("reach search friends page");
			//console.log(req.session.uid);
			var name = req.param("search");
			console.log(name);
		var uid1 = req.session.uid;
		console.log("uid: "+ uid1);
		var mysql=require("mysql");

		var conn=mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: '',
			socketPath : '/tmp/mysql.sock',
			database: 'asd',
			
		});
		conn.connect();
		
	    var query=conn.query("select uid , name, email from users where uid not in (select uid from friends where fid="+uid1+" and status=1 union select fid from friends where uid="+uid1+" and status=1 ) and uid<>"+uid1+" and name like '%"+name+"%'",function(err,result){
	    console.log(query.sql);
		//console.log(q1);
		
		if(err){
				console.error(err);
		}
		 else{
			 if((result.length)>0){
				 console.log("stage: 1");
			   var resultSetId = [];
			   var resultSetName = [];
			   var resultSetEmail = [];
			   for(var i in result)
				   {
				   console.log("id :"+result[i].uid);
				   resultSetId.push(result[i].uid);
				   resultSetName.push(result[i].name);
				   resultSetEmail.push(result[i].email);
				   console.log("name: "+result[i].name+"  id: "+result[i].uid+"Email: "+result[i].email);
				   }
			   
			   res.render('searchFriend',{resultSetId:resultSetId , resultSetName:resultSetName , resultSetEmail:resultSetEmail}); 
			   conn.end();
			 }
			 else{
				 console.log("no records");
				 res.render('final', {title:"No user with this name"});
			 }}});
		
		}
		};	
		
		//sending friend request to other user
		exports.sendFriendRequest = function(req, res){
			
			if(req.session.email){			//checking session value
				console.log("reach add new friend page");
				//console.log(req.session.uid);
				var toUid = req.param("abc");
				console.log("To user"+toUid);
			var fromUid = req.session.uid;
			console.log("uid: "+ fromUid);
			var mysql=require("mysql");

			var conn=mysql.createConnection({
				host: 'localhost',
				user: 'root',
				password: '',
				socketPath : '/tmp/mysql.sock',
				database: 'asd',
				
			});
			conn.connect();
		    var query=conn.query("insert into friends values("+fromUid+","+toUid+","+2+")" ,function(err,result){
			console.log(query.sql);
			//console.log(q1);
			
			if(err){
					console.error(err);
			}
			 else{
				 
				   res.render('final',{title:"Request sent successfully"}); 
				   conn.end();
				 
				}});
			
			}
			
			};	
			
	//----fetch the pending friend request of a particular user
	exports.pendingReq = function(req,res){
		if(req.session.email){		//checking session value
			console.log("reach pending req friend page");
			
		var uid1 = req.session.uid;
		console.log("uid: "+ uid1);
		var mysql=require("mysql");

		var conn=mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: '',
			socketPath : '/tmp/mysql.sock',
			database: 'asd',
			
		});
		conn.connect();
	    var query=conn.query("select name , uid from users where uid in(select uid from friends where fid="+uid1+" and status=2)" ,function(err,result){
		console.log(query.sql);
		//console.log(q1);
		
		if(err){
				console.error(err);
		}
		if((result.length)>0){
			 console.log("stage: 1");
		   var resultSetId = [];
		   var resultSetName = [];
		   for(var i in result)
			   {
			   console.log("id :"+result[i].uid);
			   resultSetId.push(result[i].uid);
			   resultSetName.push(result[i].name);
			   console.log("name: "+result[i].name+"  id: "+result[i].uid);
			   }
		   
		   res.render('pendingFriendRequest',{resultSetId:resultSetId , resultSetName:resultSetName}); 
		   conn.end();
		 }
		 else{
			 console.log("no records");
			 res.render('final', {title:"No pending requests"});
		 }});
		
		}
		
	};
	
	//---approve the pending request of a user----
	exports.approveFriendRequest = function(req, res){
		
		if(req.session.email){		//checking session value
			console.log("reach approve friend req page");
			//console.log(req.session.uid);
			var toUid = req.param("abc");
			console.log("To user"+toUid);
		var fromUid = req.session.uid;
		console.log("uid: "+ fromUid);
		var mysql=require("mysql");

		var conn=mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: '',
			socketPath : '/tmp/mysql.sock',
			database: 'asd',
			
		});
		conn.connect();
	    var query=conn.query("update friends set status=1 where fid="+fromUid+" and uid="+toUid ,function(err,result){
		console.log(query.sql);
		//console.log(q1);
		
		if(err){
				console.error(err);
		}
		 else{
			  res.render('final',{title:"Request Approved successfully"});
			  conn.end();
			}});
		
		}	
	};	