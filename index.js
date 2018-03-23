var express = require('express');
var controller = require('./controller.js');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.get('/getGoals',controller. getGoals);
app.get('/getUser', controller.getUser);
app.get('/home', controller.homeGoals);
app.listen(app.get('port'), function(){
		console.log('Listening on Port: ' + app.get('port'))
	});
