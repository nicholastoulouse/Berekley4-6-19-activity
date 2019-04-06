var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var mysql = require ('mysql');

var app = express();

app.use(express.static("public"));

//integrate body-parser with express

	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: true }));
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

app.use(express.static("public"));

app.get('/animals.json', function(req, res){
	connection.query('SELECT * FROM animals', function (error, results, fields) {
	  if (error) res.send(error)
	  else res.json(results);
	});
});

app.post('/animal-insert', function(req, res){
	connection.query('INSERT INTO actors (animal_name) VALUES (?)', [req.body.animal_name],function (error, results, fields) {
	  if (error) res.send(error)
	  else res.json({
	  	message: 'success'
	  });
	});
});

app.get('/', function(req, res){
	res.redirect('/')
});

app.listen(3001, function(){
	console.log('listening on 3001');
});






