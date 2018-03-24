var express = require('express');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var controller = require('./controller.js');
var session = require('client-sessions');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.use(session({
	cookieName: 'session',
	secret: 'randomness'
}));
app.get('/getGoals',controller. getGoals);
app.get('/addGoals', controller.addGoals);
app.get('/getUser', controller.getUser);
app.get('/home', controller.homeGoals);
app.listen(app.get('port'), function(){
		console.log('Listening on Port: ' + app.get('port'))
	});