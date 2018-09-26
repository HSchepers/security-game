const express = require('express');
const bodyParser = require('body-parser');
const content = require('./custom_modules/content_types');
const fs = require('fs');
const mysql = require('mysql');
//const session = require('express-session');
const constructors = require('./custom_modules/custom_constructors');

var app = express();
var URLencodedParser = bodyParser.urlencoded({ extended: false })

//--MIDDLEWARE-----------------------------------------------------------------
//This piece of middleware will log the requests
app.use('/', function (req, res, next) {
  console.log(req.method + ': ' + req.url);
  next(); //next piece of middleware
});

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  //res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

/**bodyParser.json(options)
   Parses the text as JSON and exposes the resulting object on req.body. */
app.use(bodyParser.json());

//Requesting static files:
//Whenever the req.url starts with '/assets' this piece of middleware will
//serve the requested file
app.use('/assets', express.static('assets'));

//--GET-REQUESTS---------------------------------------------------------------
//verify that the server is online
app.get('/', function (req, res) {
  res.writeHead(200, content.plain);
  res.end('This is the Back-End-Server');
});

//--POST-REQUESTS--------------------------------------------------------------
//login
app.post('/login', URLencodedParser, function (req, res) {
  console.log('User: ', req.body.username);

  var data = constructors.json.login;
  data.success = false;
  data.message = 'Could not connect to Database';
  data.msg_type = 'error';

  const username = req.body.username;
  const password = req.body.password;

  var sql = 'select count(user) as users from users where user = "' + username + '" and auth_string = password("' + password + '")';

  accessDatabase(sql).then(function (result) {
    //Access successful
    console.log(result);

    if (result[0].users == 1) {
      //User found
      data.success = true;
      data.message = 'Login successful!';
      data.msg_type = 'confirm'
    } else {
      //User not found
      data.success = false;
      data.message = 'The given credentials were invalid!';
      data.msg_type = 'error';
    };

    res.writeHead(200, content.json);
    res.end(JSON.stringify(data));

  }).catch(function (msg) {
    //Access failed
    data.success = false;
    data.message = msg;
    data.msg_type = 'error';
    res.writeHead(200, content.json);
    res.end(JSON.stringify(data));
  });
});

//--404-Page-------------------------------------------------------------------
//Dynamic Routing for everything that doesn't use one of the above
app.all('/:file', function (req, res) {
  res.writeHead(200, content.html);
  fs.createReadStream(__dirname + '/404.html', 'utf8').pipe(res);
});

//Start server on Port 3001
app.listen(3001);

//--FUNCTIONS------------------------------------------------------------------


//--PROMISES-------------------------------------------------------------------
let accessDatabase = function (sql) {
  return new Promise(function (resolve, reject) {
    var connection = mysql.createConnection({
      host: "localhost",
      user: "guest",
      password: "login",
      database: "securitygame"
    });

    connection.connect(function (err) {
      if (err) throw err, reject('Connection failed');
      console.log("Connected to Database");

      connection.query(sql, function (err, rows, fields) {
        if (err) throw err;

        resolve(rows);
      });
      connection.end();
    });
  });
};