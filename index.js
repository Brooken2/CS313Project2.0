var express = require('express');
var controller = require('./controller.js');
var session = require('client-sessions');
const duration = 30 * 60 *100;
const active = 5 * 60 * 1000;
const saltRounds = 10;
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
const {Pool} = require('pg');
var app = express();

var pool = new Pool({
  user: 'tuser',
  host: 'localhost',
  database: 'goaltracker',
  password: 'tpass',
  port: process.env.PORT || 5432
});

var logRequest = function (req, res, next){
	console.log("Received a request from " + req.url);
	next();
	}

var verifyLogin = function (req, res, next) {
	if (typeof req.session.user != "undefined"){
		next();
	}
	else {
		res.status(401).send("You broke me. That hurt.");
	}
} 

app.set('port', (process.env.PORT || 5000));

// views is directory for all template files
app.use(session({cookieName: 'session', secret: 'user-session', duration: duration, activeDuration: active,}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logRequest);
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');

app.post('/login', (req, res) => {
		pool.query("SELECT username, password FROM users", (err, response) => {
			if (req.body.username == response.rows[0].username && req.body.password == response.rows[0].password){
			var result = {
					success: true
			};
				req.session.user = req.body.username;
				res.send(result);
				pool.end();
				res.render('/homeGoals.html');
			}
			else{
				var result = {
					success: false
				};
				res.send(result);
			}
		})
});

app.post('/logout', (req, res) => {
	if (typeof req.session.user != "undefined"){
		req.session.destroy();
		var result = {
			success: true
			};
	}
	else {
		var result = {
			success: false
			};
	}
	res.send(result);
});

app.get('/getGoals',controller. getGoals);
app.get('/addGoals', controller.addGoals);
app.get('/getUser', controller.getUser);
app.get('/home', controller.homeGoals);

app.listen(app.get('port'), function(){
		console.log('Listening on Port: ' + app.get('port'))
	});