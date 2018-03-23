const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'tuser',
  host: 'localhost',
  database: 'goaltracker',
  password: 'tpass',
  port: 5432,
});

function homeGoals(req, res){
	console.log('home page has been called');
	res.render('homeGoals');
}

function getUser(req, res){
	console.log('Users have been called');
	var id = req.query.id;
	console.log('requested id: ' + id);
	getGoals(id, function(err, result){
		res.json(result);
	});
	
	
}

function getGoals(id, callback){
	console.log('projects are called');
	pool.query('SELECT * FROM goals WHERE userid = $1', [id], function(err, res){
		if(err){
			throw err;
		}else {
			console.log('back from DB with: ' +  JSON.stringify(res.rows));
		
			var result = res.rows
			callback(null, result);
		}
	})
		
}

module.exports = {
	getGoals: getGoals,
	getUser: getUser,
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