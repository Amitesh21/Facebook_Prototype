
/**
 * Module dependencies.
 */

  var express = require('express');
  var session = require('client-sessions');

  var routes = require('./routes')
  , SignInCheck = require('./routes/SignInCheck')
  , friendlist = require('./routes/friendList')
   , group = require('./routes/group')
  , http = require('http')
  , path = require('path');
  var about = require('./routes/about');
  	var mysql =  require('mysql');
  	var app = express();
  
  	app.use(session({    cookieName: 'session',    
  		secret: 'fb-session',    
  		duration: 30 * 60 * 1000,    
  		activeDuration: 5 * 60 * 1000,  }));
  	
// all environments
app.set('port', process.env.PORT ||8840);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

var mysql = require('mysql');

var connection = mysql.createConnection({
	host : 'localhost' ,
	user : 'root' ,
	password : '' ,
	database : 'asd' , 
	socketPath : '/tmp/mysql.sock'
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/about', about.about);
app.get('/aboutEdit', about.aboutEdit);
app.get('/aboutFriend/:id', about.aboutFriend);
app.post('/updateAbout', about.updateAbout);
app.post('/signup',SignInCheck.signup);
app.get('/aboutbasic',about.aboutbasic);
app.post('/SignInCheck',SignInCheck.signInCheck);
app.get('/SignInCheck',SignInCheck.signInCheck);
app.get('/success',SignInCheck.signInCheck);
app.post('/success',SignInCheck.signInCheck);
app.get('/friendList',friendlist.friends);
app.get('/searchFriend',friendlist.searchFriends);
app.get('/logout' , SignInCheck.destroySession);
app.post('/addSearchedFriend',friendlist.sendFriendRequest);
app.get('/pendingReq',friendlist.pendingReq);
app.post('/approveFriendRequest',friendlist.approveFriendRequest);
app.get('/addGroup',group.addGroup);
app.post('/createGroup',group.createGroup);
app.get('/showGroup',group.showGroup);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});