const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'tuser',
  host: 'localhost',
  database: 'goaltracker',
  password: 'tpass',
  port: process.env.PORT || 5432
});

function homeGoals(req, res){
	console.log('home page has been called');
	res.render('homeGoals');
}


function addGoals(req, res){
	console.log('Add Goals');
		// Extract the validation errors from a request.
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/errors messages.
        console.log('We ave some errors that happened');
     }
    else {
		var userid = req.session.user;
		var name = req.query.gname;
		var endDate = req.query.endDate;
		var des = req.query.desciption;
		console.log(name + endDate + des);
		
		pool.connect(function (err, client, release) {
	  		if (err) {
    				return console.error('Error acquiring client', err.stack);
  			}
  			client.query("INSERT INTO goals(goalname, enddate, description, userid) VALUES ('"+ name + "', '" + endDate + "', '"  +des +"', '" +userid  + "')"  , function (err, result) {
    					client.release();
    					if (err) {
      					return console.error('Error executing query', err.stack);
    					}
				res.json(result.rows);
  			});
		});	
	}
}

function getUser(req, res){
	console.log('Users have been called');
	var id = "1";
	var username = req.query.username;
	var pass = req.query.pass;
	
	/*pool.connect(function (err, client, release) {
	  		if (err) {
    				return console.error('Error acquiring client', err.stack);
  			}
  			client.query("SELECT * FROM users WHERE username='" + username +"'", function (err, result) {
    					client.release();
    					if (err) {
      					return console.error('Error executing query', err.stack);
    					}
				//res.json(result.rows);
				console.log(JSON.parse(results.rows.id));
				id = results.rows.id;
			});
  	});*/
	var sessData = req.session;
  	sessData.id = id;
	
	console.log('requested id: ' + id);
	
	getGoals(id, function(err, result){
		res.json(result);
	});
}

function getGoals(id, callback){
	console.log('GET GOALS is CALLED  WITH id: ' + id);
	pool.query("SELECT * FROM goals WHERE userid='" + id + "'", function(err, res){
		if(err){
			throw err;
		}
		else {
			console.log('back from DB with: ' +  JSON.stringify(res.rows));
			var results = JSON.stringify(res.rows);
			callback(null, results);
		}
	});
	
}

module.exports = {
	getGoals: getGoals,
	getUser: getUser,
	addGoals: addGoals,
	homeGoals: homeGoals
};


	/*FROM GETUSER JUST IN CASE I NEED LATER
pool.connect(function (err, client, release) {
	  		if (err) {
    				return console.error('Error acquiring client', err.stack);
  			}
  			client.query('SELECT * FROM users', function (err, result) {
    					client.release();
    					if (err) {
      					return console.error('Error executing query', err.stack);
    					}
				res.json(result.rows);
				});
  			})
		})*/

/*FROM GET GOALS JUST IN CASE I NEED LATER
	pool.connect(function (err, client, release) {
	  		if (err) {
    				return console.error('Error acquiring client', err.stack);
  			}
  			client.query('SELECT * FROM goals WHERE userid=$1::text', [id] , function (err, result) {
    					client.release();
    					if (err) {
      					return console.error('Error executing query', err.stack);
    					}
				res.json(result.rows);
  			})
		})*/