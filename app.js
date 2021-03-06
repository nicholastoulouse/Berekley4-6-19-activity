var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var mysql = require ('mysql');
var app = express();

//integrate body-parser with express + parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json())

// db connection code
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'sideHustle$1975',
  database : 'animals_db'
});
 
connection.connect();

app.use(express.static("public")); // a route for each file in the public folder there

// curl -X GET http://localhost:3001/animals
app.get('/animals', function(req, res){
	connection.query('SELECT * FROM animals', function (error, results, fields) {
	  if (error) res.send(error)
	  else {
		  res.json(results);
	  }
	});
});

app.post('/animals', function(req, res){
	console.log("Animal name: ", [req.body.animal_name]);
	connection.query('INSERT INTO animals (animal_name) VALUES (?)', [req.body.animal_name],function (error, results, fields) {
	  if (error) res.send(error)
	//   else res.json({
	//   	message: 'success'
	//   });
		else res.redirect('/');
	});
});

app.get('/*', function(req, res){
	res.redirect('/');
});

app.listen(3001, function(){
	console.log('listening on 3001');
});






