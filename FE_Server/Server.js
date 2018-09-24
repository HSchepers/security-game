const express = require('express');
const bodyParser = require('body-parser');
const content = require('./custom_modules/content_types');
//const fs = require('fs');
const array = require('./custom_modules/array_modules');

//all routes that correspond to a .ejs-file with the same name
//and do not require additional data to be displayed
const routeMatchesView = ['game', 'about', 'help', 'developers', 'impressum'];

var app = express();
var URLencodedParser = bodyParser.urlencoded({ extended: false });


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

//favicon.ico
app.get('/favicon.ico', function(req, res){
    res.end();
});

//home
app.get('/home', function(req, res){
    res.render('index', { denied: '' });
});

//login
app.get('/login', function(req, res){
    res.render('index', { denied: '' });
});

//denied
app.get('/denied', function(req, res){
    res.render('index', { denied: 'The given credentials were invalid!' });
});

//Dynamic Routing for everything that doesn't use one of the above
app.get('/:file', function (req, res) {
    if (array.xInArray(routeMatchesView, req.params.file)){
        res.render(req.params.file);
    } else {
        res.render('404', { file: req.params.file });
    }
});

//--POST-REQUESTS--------------------------------------------------------------

//Start server in Port 3000
app.listen(3000);