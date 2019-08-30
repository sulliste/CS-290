var express = require('express');
var mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('files'));

function errors(err){
	console.log(JSON.stringify(err));
	res.write(JSON.stringify(err));
	res.end();
}

//Render home page
app.get('/', function(req, res){
	var context = {};
	res.render('index', context);
});

//Getting data for table
app.get('/workouts', function(req, res, next){
	var context = {};
	mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
		if(err){
			errors(err);
		}
		else{
			context = JSON.stringify(rows);
			console.log(context);
			res.render('index', context);
		}
	});
});

//Adding data to DB
app.post('/', function(req, res, next){
	console.log(req.body);
	var context = {};
	mysql.pool.query('INSERT INTO workouts(name, reps, weight, unit, date) VALUES (?, ?, ?, ?, ?)', 
	[req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date], function(err, result){
		if(err){
			errors(err);
		}
		else{
			res.status(200);
			res.end();
		}
	});
});

//Resets table to empty
app.get('/reset-table',function(req,res, next){
	var context = {};
	mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){
		var newStr = "CREATE TABLE workouts("+ 
		"id INT PRIMARY KEY AUTO_INCREMENT,"+
		"name VARCHAR(255) NOT NULL,"+ 
		"reps INT,"+ 
		"weight INT,"+ 
		"unit VARCHAR(5),"+ 
		"date DATE)";
		mysql.pool.query(newString, function(err){
			context.results = "Table reset";
			res.render('index', context);
		});
	});
});

//Displays update page
app.get('/:id', function(req, res){
	var context = {};
	mysql.pool.query('SELECT * FROM workouts WHERE id = ?', [req.params.id], function(err, results){
		if(err){
			errors(err);
		}
		else{
			context = results[0];
			res.render('update', context);
		}
	});
});

app.put('/:id', function(req, res){
	mysql.pool.query('SELECT name, reps, weight, date, lbs FROM workouts WHERE id = ?', [req.params.id], function(err, results){
		if(err){
			errors(err);
		}
		else{
			var current = results[0];
			mysql.pool.query('UPDATE workouts SET name = ?, reps = ?, weight = ?, date = ?, lbs = ? WHERE id = ?', 
			[req.body.uName || current.name, req.body.uReps || current.reps, req.body.uWeight || current.weight, req.body.uDate || current.date, req.body.uUnit || current.lbs, req.params.id],
			function(err, results){
				if(err){
					errors(err);
				}
				else{
					res.status(200);
					res.end();
				}
			});
		}
	});
});

//Handles deletion
app.delete('/:id', function(req, res){
	mysql.pool.query('DELETE FROM workouts WHERE id = ?', [req.params.id], function(err, result){
		if(err){
			errors(err)
		}
		else{
			res.status(202).end();
		}
	});
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://flip1.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});
