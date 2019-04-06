
// https://www.npmjs.com/package/body-parser
var bodyParser = require('body-parser')
var express = require('express');
var app = express();


app.use(express.static("public"));

//integrate body-parser with express

	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: false }))
	 
	// parse application/json
	app.use(bodyParser.json())


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'sideHustle$1975',
  database : 'actors_db'
});
 
connection.connect();

//is there a route that will always get hit
// app.get('*', function(req, res, next){
// 	connection.query('INSERT INTO page_views',function (error, results, fields) {
// 	  next();
// 	});
// });

app.get('/actors.json', function(req, res){
	connection.query('SELECT * FROM actors', function (error, results, fields) {
	  if (error) res.send(error)
	  else res.json(results);
	});
});

//you can't access a post from the browser
	/*
		the only way to access a post route is by using one of the following

			ajax

			a form

			a curl call

				curl -d "actor_name=haven-thy" -X POST http://localhost:3001/actors-insert

			chrome extension named post man 
	*/
app.post('/actors-insert', function(req, res){
	connection.query('INSERT INTO actors (actor_name) VALUES (?)', [req.body.actor_name],function (error, results, fields) {
	  if (error) res.send(error)
	  else res.json({
	  	message: 'success'
	  });
	});
});

// http://localhost:3001/actors-delete?cat_id=3
// what will the delete route look like in this app.js file
app.post('/actors-delete', function(req, res){
	connection.query('DELETE FROM actors WHERE id = (?)', [req.body.actor_id],function (error, results, fields) {
	  
	  res.redirect('/');
	
	});
});

// one way
	// http://localhost:3001/actors-update/6?actor_name=tom%20cruz
	app.post('/actors-update/:id', function(req, res){
		connection.query('UPDATE actors SET actor_name = (?) WHERE id = (?)', [req.body.actor_name, req.params.id],function (error, results, fields) {
		  
		  res.redirect('/');
		
		});
	});

// another way
	// http://localhost:3001/cats-update?cat_name=dragon&cat_id=4
	// app.get('/cats-update', function(req, res){
	// 	connection.query('UPDATE cats SET cat_name = (?) WHERE id = (?)', [req.query.cat_name, req.query.cat_id],function (error, results, fields) {
		  
	// 	  res.redirect('/');
		
	// 	});
	// });

//so if the user hits a route that does not exist then redirec them to the home page
app.get('*', function(req, res){
	res.redirect('/')
});

app.listen(3001, function(){
	console.log('listening on 3001');
});






