const express = require('express');
const bodyParser = require('body-parser');
const content = require('./custom_modules/content_types');
const fs = require('fs');

var app = express();
var URLencodedParser = bodyParser.urlencoded({ extended: false })
//setting EJS as rendering-engine
app.set('view engine', 'ejs');

//--MIDDLEWARE-----------------------------------------------------------------
//This piece of middleware will log the requests
app.use('/', function (req, res, next) {
  console.log('Request: ' + req.url);
  next(); //next piece of middleware
});

app.use(bodyParser.json());

//Requesting static files:
//Whenever the req.url starts with '/assets' this piece of middleware will
//serve the requested file
app.use('/assets', express.static('assets'));
app.use('/scripts', express.static('scripts'));

//--GET-REQUESTS---------------------------------------------------------------
//verify that Server is online
app.get('/', function (req, res) {
  res.writeHead(200, content.plain);
  res.end('This is the Front-End-Server');
});

//home
app.get('/home', function(req, res){
    res.render('index');
});

//game
app.get('/game', function(req, res){
    res.render('game');
});

//Handler for included Files
app.get('/includes/:file', function(req, res){
    res.writeHead(200, content.html);
    fs.createReadStream(__dirname + '/includes/navigation.html', 'utf8').pipe(res);
});

//--POST-REQUESTS--------------------------------------------------------------


//--404-Page-------------------------------------------------------------------
//Dynamic Routing for everything that doesn't use one of the above
app.all('/:file', function (req, res) {

});

//Start server in Port 3000
app.listen(3000);
