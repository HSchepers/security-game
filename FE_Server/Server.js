const express = require('express');
const bodyParser = require('body-parser');
const content = require('./custom_modules/content_types');
//const fs = require('fs');
//const http = require('http');
//const querystring = require('querystring');
const array = require('./custom_modules/array_modules');
const session = require('express-session');
const request = require('request');

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
    console.log(req.method + ': ' + req.url);
    next(); //next piece of middleware
});
/**bodyParser.json(options)
   Parses the text as JSON and exposes the resulting object on req.body. */
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
app.get('/favicon.ico', function (req, res) {
    res.end();
});

//home
app.get('/home', function (req, res) {
    res.render('index', { error: '' });
});

//login
app.get('/login', function (req, res) {
    res.render('index', { error: '' });
});

//denied
app.get('/denied', function (req, res) {
    res.render('index', { error: 'The given credentials were invalid!' });
});

//Dynamic Routing for everything that doesn't use one of the above
app.get('/:file', function (req, res) {
    if (array.xInArray(routeMatchesView, req.params.file)) {
        res.render(req.params.file);
    } else {
        res.render('404', { file: req.params.file });
    }
});

//--POST-REQUESTS--------------------------------------------------------------
//login
app.post('/login', URLencodedParser, function (req, res) {
    console.log(req.body);

    const post_json = {
        username: req.body.username,
        password: req.body.password
    };

    request.post('http://localhost:3001/login', { json: post_json }, function (error, response, body) {
        if(error) throw error;
        if(!(response.statusCode == 200)) throw response.statusCode;
        res.send(body);
        res.end();
    });
});

//Start server on Port 3000
app.listen(3000);