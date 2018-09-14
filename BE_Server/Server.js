const express = require('express');
const bodyParser = require('body-parser');
const content = require('./custom_modules/content_types');
const fs = require('fs');

var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//This piece of middleware will log the requests
app.use('/', function(req, res, next){
  console.log('Request: ' + req.url);
  next(); //next piece of middleware
});

//Requesting static files:
//Whenever the req.url starts with '/assets' this piece of middleware will
//serve the requested file
app.use('/assets', express.static('assets'));

app.get('/', function(req, res){
  res.writeHead(200, content.plain);
  res.end('This is the Back-End-Server');
});

app.get('/json', function(req, res){
  var myObject = {
    name: 'Henning',
    age: 21,
    location: 'Germany',
  };

  res.writeHead(200, content.json);
  res.end(JSON.stringify(myObject));
});

//Dynamic Routing for everything that doesn't use one of the above
app.get('/:file', function(req, res){
    res.writeHead(200, content.html);
    var myReadStream = fs.createReadStream(__dirname + '/404.html', 'utf8');
    myReadStream.pipe(res);
});

app.listen(3000);
