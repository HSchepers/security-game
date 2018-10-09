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

    //init
    app.get('/init', function (req, res) {
        const sql = 'SELECT max(id) as maxId FROM securitygame.games;';

        res.writeHead(200, content.plain);
        accessDatabase(sql).then(function (rows) {
            res.end(JSON.stringify(rows[0].maxId));
        }).catch(function (err) {
            console.log(err);
            res.end(JSON.stringify('-1'));
        });
    });

    //--POST-REQUESTS----------------------------------------------------------
    //scores
    app.post('/scores', URLencodedParser, function (req, res) {
        const sql = 'SELECT id, user, score, time FROM securitygame.games WHERE score > 0 ORDER BY score DESC;';
        const max_lines = req.body.max - 1;

        res.setHeader("200", content.json);
        accessDatabase(sql).then(function (rows) {
            //Access successful
            var data = [];

            for (let i = 0; i < rows.length; i++) {
                var entry = rows[i];

                entry.id = i + 1;
                data.push(entry);

                if (max_lines == i) { break; };
            };

            res.end(JSON.stringify({ scores: data }));

        }).catch(function (err) {
            //Access failed
            console.log(err);
            var data = [];
            var entry = constructors.json.score;

            entry.user = 'Scores can not be loaded';
            data.push(entry);

            res.end(JSON.stringify({ scores: data }));
        });
    });

    //start-game
    app.post('/start-game', URLencodedParser, function (req, res) {
        const gameId = req.body.gameId;
        const username = req.body.username;
        const score = 0;
        const time = '00:00:00'
        const sql = 'INSERT INTO securitygame.games VALUE (' + gameId + ', "' + username + '", ' + score + ', "' + time + '");';

        var data = constructors.json.insert;
        res.setHeader("200", content.json);
        accessDatabase(sql).then(function (rows) {
            console.log(rows);
            data.success = true;
            res.end(JSON.stringify(data));
        }).catch(function (err) {
            console.log(err);
            data.success = false;
            res.end(JSON.stringify(data));
        });
    });

    //answer
    app.post('/answer', URLencodedParser, function (req, res) {
        const gameId = req.body.gameId;
        const questionId = req.body.questionId;
        const answer = req.body.answer;
        const sql = 'INSERT INTO securitygame.answers VALUE (' + gameId + ', ' + questionId + ', ' + answer + ');';


        var data = constructors.json.insert;
        res.setHeader("200", content.json);
        accessDatabase(sql).then(function (rows) {
            console.log(rows);
            data.success = true;
            res.end(JSON.stringify(data));
        }).catch(function (err) {
            console.log(err);
            data.success = false;
            res.end(JSON.stringify(data));
        });
    });

    //end-game
    app.post('/end-game', URLencodedParser, function (req, res) {
        const gameId = req.body.gameId;
        const score = req.body.score;
        const time = req.body.time;
        const sql = 'UPDATE securitygame.games SET score = ' + score + ', time = "' + time + '" WHERE id = ' + gameId+';';

        var data = constructors.json.update;
        res.setHeader("200", content.json);
        accessDatabase(sql).then(function (rows) {
            console.log(rows);
            data.success = true;
            res.end(JSON.stringify(data));
        }).catch(function (err) {
            console.log(err);
            data.success = false;
            res.end(JSON.stringify(data));
        });
    });

};

//--FUNCTIONS------------------------------------------------------------------


//--PROMISES-------------------------------------------------------------------
let accessDatabase = function (sql) {
    console.log('SQL: ' + sql);

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
                reject('SQL: Connection failed');
            } else {
                console.log("SQL: Connected to Database");
            };

            connection.query(sql, function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    reject('SQL: Query failed');
                } else {
                    console.log('SQL: Query success');
                    resolve(rows);
                };
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