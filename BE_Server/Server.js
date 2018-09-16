const express = require('express');
const bodyParser = require('body-parser');
const content = require('./custom_modules/content_types');
const fs = require('fs');
const mysql = require('mysql');

var app = express();
var URLencodedParser = bodyParser.urlencoded({ extended: false })

//--MIDDLEWARE--------------------------------------------------------------
//This piece of middleware will log the requests
app.use('/', function (req, res, next) {
  console.log('Request: ' + req.url);
  next(); //next piece of middleware
});

//Requesting static files:
//Whenever the req.url starts with '/assets' this piece of middleware will
//serve the requested file
app.use('/assets', express.static('assets'));

//--GET-REQUESTS------------------------------------------------------------
app.get('/', function (req, res) {
  res.writeHead(200, content.plain);
  res.end('This is the Back-End-Server');
});

app.get('/jsontest', function (req, res) {
  var myObject = {
    name: 'Henning',
    age: 21,
    location: 'Germany',
  };

  res.writeHead(200, content.json);
  res.end(JSON.stringify(myObject));
});

//Dynamic Routing for everything that doesn't use one of the above
app.get('/:file', function (req, res) {
  res.writeHead(200, content.html);
  var myReadStream = fs.createReadStream(__dirname + '/404.html', 'utf8');
  myReadStream.pipe(res);
});

//--POST-REQUESTS-----------------------------------------------------------
app.post('/login', URLencodedParser, function (req, res) {
  console.log(req.body);

  var connection = mysql.createConnection({
    host: "localhost",
    user: "guest",
    password: "login",
    database: "securitygame"
  });

  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to Database");

    //var sql = 'select count(user) from users where user = "HSchepers" and auth_string = password("Password123")';
    var sql = 'select F_users_user as user, score from securitygame.scores order by score desc';

    connection.query(sql, function (err, rows, fields) {
      if (err) throw err;
      console.log(rows);
      
      res.writeHead(200, content.json);
      res.end(JSON.stringify(rows));  
    });
    
    connection.end();
  });
});

app.listen(3000);
