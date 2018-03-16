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
	var id= 1;
		pool.connect(function (err, client, release) {
	  		if (err) {
    				return console.error('Error acquiring client', err.stack);
  			}
  			client.query('SELECT * FROM users WHERE id=id', function (err, result) {
    					client.release();
    					if (err) {
      					return console.error('Error executing query', err.stack);
    					}
				res.json(result.rows);
  			})
		})
}

function getGoals(req, res){
	console.log('projects are called');
	var id= 1;
		pool.connect(function (err, client, release) {
	  		if (err) {
    				return console.error('Error acquiring client', err.stack);
  			}
  			client.query('SELECT * FROM goals WHERE userid=id', function (err, result) {
    					client.release();
    					if (err) {
      					return console.error('Error executing query', err.stack);
    					}
				res.json(result.rows);
  			})
		})
}

module.exports = {
	getGoals: getGoals,
	getUser: getUser,
	homeGoals: homeGoals
};

/*pool.query('SELECT * FROM goals', function (err, res) {
  console.log(res);
	//res.send();
  pool.end()
})*/
/*const express = require('express')
const path = require('path')
	
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))*/
