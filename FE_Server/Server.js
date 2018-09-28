const express = require('express');
const bodyParser = require('body-parser');
const content = require('./custom_modules/content_types');
//const fs = require('fs');
//const http = require('http');
//const querystring = require('querystring');
//const session = require('express-session');
const array = require('./custom_modules/array_modules');
const request = require('request');
const constructors = require('./custom_modules/custom_constructors');
const cookieParser = require('cookie-parser');

//all routes that correspond to a .ejs-file with the same name
//and do not require additional data to be displayed
const routeMatchesView = ['about', 'help', 'developers', 'impressum'];

const app = express();
const URLencodedParser = bodyParser.urlencoded({ extended: false });
const backend = 'http://localhost:3001/';


//setting EJS as rendering-engine
app.set('view engine', 'ejs');

//--MIDDLEWARE-----------------------------------------------------------------
//This piece of middleware will log the requests
app.use('/', function (req, res, next) {
    console.log(req.method + ': ' + req.url);
    next(); //next piece of middleware
});
//Parses the text as JSON and exposes the resulting object on req.body.
//app.use(bodyParser.json());
//Parses the Cookie and exposes the resulting object on req.cookies
app.use(cookieParser());

//Requesting static files:
//Whenever the req.url starts with '/assets' or '/scripts' this piece of 
//middleware will serve the requested file
app.use('/assets', express.static('assets'));
app.use('/scripts', express.static('scripts'));

//--GET-REQUESTS---------------------------------------------------------------
//verify that Server is online
app.get('/', function (req, res) {
    res.writeHead(200, content.plain);
    res.end('This is the Front-End-Server.\n"Fired up and ready to serve."\n\t-Blitzcrank');
});

//favicon.ico
app.get('/favicon.ico', function (req, res) {
    res.end();
});

//home
app.get('/home', function (req, res) {
    /*If a cookie containig a username exists the user will be 
      redirected to '/game' otherwise to '/register' */
    if (usernameIsSet(req.cookies.user)) {
        res.redirect('/game');
    } else {
        res.redirect('/register');
    };
});

//game
app.get('/game', function (req, res) {
    /*If a cookie containig a username exists the game-page will
      be rendered otherwise he will be redirected to '/register'
      and receive a message */
    var data = constructors.json.else;
    data.header_text = getHeader(req.cookies.user);

    if (usernameIsSet(req.cookies.user)) {
        res.render('game', data);
    } else {
        var cookieData = constructors.cookie.msg;
        cookieData.content = 'You must enter a username before playing the game';
        cookieData.type = 'error';
        res.cookie('msg', cookieData, { maxAge: 5000 })
        res.redirect('/register');
    };
});

//register
app.get('/register', function (req, res) {
    /*The register-page is rendered displaying any message
      given in the msg-cookie */
    var data = constructors.json.index;
    data.header_text = getHeader(req.cookies.user);
    data.msg = getMsg(req.cookies.msg);

    res.clearCookie('msg');
    res.render('index', data);
});

//change_username
app.get('/change_username', function (req, res) {
    res.clearCookie('user');
    res.redirect('/register');
});

//Dynamic Routing for everything that doesn't use one of the above
app.get('/:file', function (req, res) {
    if (array.xInArray(routeMatchesView, req.params.file)) {
        var data = constructors.json.else;
        data.header_text = getHeader(req.cookies.user);
        res.render(req.params.file, data);
    } else {
        var data = constructors.json.notFound;
        data.header_text = getHeader(req.cookies.user);
        data.file = req.params.file
        res.render('404', data);
    }
});

//--POST-REQUESTS--------------------------------------------------------------
//register
app.post('/register', URLencodedParser, function (req, res) {
    var cookieData = constructors.cookie.user;
    cookieData.username = req.body.username;
    res.cookie('user', cookieData);
    res.redirect('/game');
});

//Start server on Port 3000
app.listen(3000);


//--FUNCTIONS------------------------------------------------------------------
function getHeader(cookie) {
    if (cookie) {
        const user = cookie.username;
        if (user == '') {
            return 'No username';
        } else {
            return 'Username: ' + user;
        };
    } else {
        return 'No username';
    }
};

function getMsg(cookie) {
    var msg = constructors.json.index.msg;
    if (cookie) {
        msg.content = cookie.content;
        msg.type = cookie.type;
    } else {
        msg.content = '';
        msg.type = '';
    };
    return msg;
};

function usernameIsSet(cookie) {
    if (cookie) {
        if (cookie.username == '') {
            return false;
        } else {
            return true;
        };
    } else {
        return false;
    };
};

//--PROMISES-------------------------------------------------------------------
let BackEndService = function (service, obj_json) {
    return new Promise(function (resolve, reject) {
        request.post(backend + service, { json: obj_json }, function (error, body) {
            if (error) throw error, reject('Service can not be requested');
            resolve(body);
        });
    });
};
/*
let getHeader = function(){
    return new Promise(function(resolve, reject){
        resolve();
    });
};*/