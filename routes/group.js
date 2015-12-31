
//---fetch the existing friends to add into new group--- 
exports.addGroup = function(req,res){
	if(req.session.email){
		console.log("reach add group js page");
		
	var uid1 = req.session.uid;
	console.log("uid:"+ uid1);
	var mysql=require("mysql");

	var conn=mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		socketPath : '/tmp/mysql.sock',
		database: 'asd',
		multipleStatements:true
		
	});
	conn.connect();
    var query=conn.query("select uid , name from users where uid in (select uid from friends where fid="+uid1+" and status=1 union select fid from friends where uid="+uid1+" and status=1 ) and uid<>"+uid1,function(err,result){
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
		   for(var i in result)
			   {
			   console.log("name:");
			   resultSetId.push(result[i].uid);
			   resultSetName.push(result[i].name);
			   console.log("name: "+result[i].name+"  id: "+result[i].uid);
			   }
		   
		   res.render('createGroup',{resultSetId:resultSetId , resultSetName:resultSetName}); 
		   conn.end();
		 }
		 else{
			 console.log("no records");
			 res.render('final',{title:"No Existing friends to create a group"});
		 }}});
	
	}

}; 


//------Create a new group----
exports.createGroup = function(req,res){
	if(req.session.email){
		console.log("reach create group js page");
		
	var uid1 = req.session.uid;
	console.log("uid:"+ uid1);
	var mysql=require("mysql");

	var conn=mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		socketPath : '/tmp/mysql.sock',
		database: 'asd',
		multipleStatements:true
		
		
	});
	conn.connect();
	var gname = req.param("groupName"); 
	var members = [];
    var query=conn.query("select max(uid) as max from users ",function(err,result){
	console.log(query.sql);
	
	if(err){
			console.error(err);
	}
	 else{
		 console.log("max users"+result[0].max);
			var maxUid=result[0].max;
			
			
			for (var i=0;i<maxUid;i++)
			{
			var member=req.param(i);
			if(member!=null){
				console.log(member);
				
				members.push(member);
				
			}
		
		 }
			
		 }});
    //-----inserting a new group entry into groups table---
    var query1=conn.query("insert into groups values(null,'"+gname+"',"+uid1+")",function(err1,result1){
    	
    	console.log(query1.sql);
    	if(err1){
    			console.error(err1);
    			return;
    	}
    	else
    	
    	{	
    		console.log("asd");
    	
    	
    		var query2 = conn.query("select max(gid) as max_gid from groups",function(err2,result2){
    			console.log(query2.sql);
    			console.log("break1");
    			if(err2)
    				{console.error(err2);
                   return;}
    			else{
    			var max_gid = result2[0].max_gid;
    			console.log(max_gid);
    			
    			for( var j=0;j<members.length;j++){
					var query3=conn.query("insert into group_members values ("+max_gid+","+members[j]+")",function(err3,result3)
							{
						console.log(query3.sql);
						if(err3){
    				console.log(err3);
    				return;
    			}
						else{
							console.log("inserting members into group");
							
						}
						
    		 });
    			
    }
    			 //-----inserting a new group entry into group members table with all member id---
    			var query4=conn.query("insert into group_members values ("+max_gid+","+uid1+")",function(err4,result4)
						{
					console.log(query4.sql);
					if(err4){
				console.log(err4);
				return;
			}
					else{
						console.log("groud admin also added into group");
						
					}
					
		 });
    			
    			res.render('final',{title:"Group added successfully"});
    			}});
	}
    });
	}
	else {
		res.render('index',{ title: 'Welcome to login page' }); //if session value is false
	}};
	
	
	//----fetch all the groups with its members---
	exports.showGroup = function(req,res){
		if(req.session.email){
			console.log("reach show group js page");
			
		var uid1 = req.session.uid;
		console.log("My uid: "+ uid1);
		var mysql=require("mysql");

		var conn=mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: '',
			socketPath : '/tmp/mysql.sock',
			database: 'asd',
			multipleStatements:true
		});
		conn.connect();
		var resultGName1 = [];
		var resultGid = [];
		//fetching distinct group id and group name from groups table---
		var query1=conn.query("select distinct g.gid, g.gname as gname from group_members gm , groups g , users u where gm.gid in(select gid from group_members where uid ="+uid1+") and gm.gid = g.gid and gm.uid=u.uid order by gname",function(err1,result1){
			console.log(query1.sql);
			//console.log(q1);
			
			if(err1){
					console.error(err1);
			}
			 else{
				 if((result1.length)>0){
					 console.log("In show group loop 1");
				   
				   
				   for(var i in result1)
					   {
//					   console.log("name:");
					   resultGName1.push(result1[i].gname);
					   resultGid.push(result1[i].gid);
					   
					   console.log("Group name: "+result1[i].gname+" Gid: "+result1[i].gid);
					   }
				   
				   console.log("stage 1");
				 }
				 else{
					 console.log("no records");
					 
				 }}});
		
		var query=conn.query("select distinct g.gname as gname, u.name as gmember , u.uid as gmemberId from group_members gm , groups g , users u where gm.gid in(select gid from group_members where uid ="+uid1+") and gm.gid = g.gid and gm.uid=u.uid order by gname",function(err,result){
		console.log(query.sql);
		//console.log(q1);
		
		if(err){
				console.error(err);
		}
		 else{
			 if((result.length)>0){
				 console.log("In show group loop");
			   var resultGName = [];
			   var resultGMember = [];
			   var resultGMemId = [];
			   
			   for(var i in result)
				   {
//				   console.log("name:");
				   resultGName.push(result[i].gname);
				   resultGMember.push(result[i].gmember);
				   resultGMemId.push(result[i].gmemberId);
				   
				   console.log("Group name: "+result[i].gname+"  member: "+result[i].gmember +"Member id: "+resultGMemId[i]);
				   }
			   
			   res.render('showAllGroup',{resultGName:resultGName , resultGMember:resultGMember , resultGName1:resultGName1 , resultGmemberId:resultGMemId,resultGid:resultGid }); 
			   conn.end();
			 }
			 else{
				 console.log("no records");
				 res.render('final',{title:"No existing Group for this user"});//if no groups exist in group table for that user.
			 }}});
		
		}

	}; 

