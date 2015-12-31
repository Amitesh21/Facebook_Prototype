exports.index = function(req, res){
	
	//----checking session value
	if(req.session.email) {
		res.render('success', { title: 'Welcome to login page' });
		   res.end();
	}

	else{
  res.render('index', { title: 'Welcome to login page' });	//---if session value is false--
   res.end();
	}
};




