var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
var bodyParser = require('body-parser');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',function(req,res){
  var datReq = {params: '', requestType: ''};
  datReq.requestType = "Make a GET or POST Request.";
  var getParams = [];
  for (var p in req.query){
    getParams.push({'name':p,'value':req.query[p]})
  }
  
  datReq.params = getParams;
  
  if(getParams.length > 0){
	  datReq.requestType = "GET Requested Initiated.";
  }
  res.render('result', datReq);
});

app.post('/post-loop', function(req,res){
  var datReq = {params: '', requestType: ''};
  datReq.requestType = "Make a GET or POST Request.";
  
  var postParams = [];
  if(req.query){
	  
	for (var p in req.query){
		postParams.push({'name':p,'value':req.query[p]});
    }  
	
	datReq.postParams = postParams;
	
	if(Object.keys(req.query).length === 0 && req.query.constructor === Object){
		
		for(var p in req.body){
			postParams.push({'name':p,'value':req.body[p]});
		}
		
		datReq.postParams = postParams;
	}
	datReq.requestType = "POST Request Initiated.";
  }
  res.render('post-loop', datReq);
});

app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});