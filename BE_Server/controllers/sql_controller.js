const bodyParser = require('body-parser');
const content = require('../custom_modules/content_types');
const mysql = require('mysql');
const constructors = require('../custom_modules/custom_constructors');

const URLencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function (app) {

    //--GET-REQUESTS-----------------------------------------------------------
    //verify that the server is online
    app.get('/', function (req, res) {
        res.writeHead(200, content.plain);
        res.end('This is the Back-End-Server');
    });

    //--POST-REQUESTS----------------------------------------------------------
    app.post('/scores', URLencodedParser, function (req, res) {
        const sql = 'SELECT user, score FROM securitygame.scores ORDER BY score DESC';

        accessDatabase(sql).then(function (rows) {
            //Access successful
            var data = [];

            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                var entry = constructors.json.score;
                entry.user = row.user;
                entry.score = row.score;
                data.push(entry);
            };
            console.log('\n', data);

            res.setHeader("200", content.json);
            res.end(JSON.stringify({ scores: data }));

        }).catch(function (err) {
            //Access failed
            console.log(err);
            var data = [];
            var entry = constructors.json.score;

            entry.user = 'Scores can not be loaded';
            data.push(entry);

            res.setHeader("200", content.json);
            res.end(JSON.stringify({ scores: data }));
        });
    });

};

//--FUNCTIONS------------------------------------------------------------------

function getScores(max){

};

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
            if (err) {
                console.log(err);
                reject('Connection failed');
            };
            console.log("Connected to Database");

            connection.query(sql, function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    reject('Query failed');
                };

                resolve(rows);
            });
            connection.end();
        });
    });
};

  //--Dead Code------------------------------------------------------------------
/*//login
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
});*/