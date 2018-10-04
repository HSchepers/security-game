const bodyParser = require('body-parser');
const content = require('../custom_modules/content_types');
const constructors = require('../custom_modules/custom_constructors');
const util = require('../custom_modules/custom_util');

const URLencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {

    //--GET-REQUESTS-----------------------------------------------------------
    //game
    app.get('/game', function (req, res) {
        /*If a cookie containig a username exists the game-page will
          be rendered otherwise he will be redirected to '/register'
          and receive a message */
        var data = constructors.json.else;
        data.header_text = util.fun.getHeader(req.cookies.user);

        if (util.fun.usernameIsSet(req.cookies.user)) {
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
        var post_json = constructors.service.scores;

        data.header_text = util.fun.getHeader(req.cookies.user);
        data.msg = util.fun.getMsg(req.cookies.msg);

        util.promise.post('scores', post_json).then(function (post_res) {
            data.scores = post_res.body.scores;
            end();
        }).catch(function (err) {
            console.log(err);
            end();
        });

        function end() {
            res.clearCookie('msg');
            res.render('index', data);
        };
    });

    //--POST-REQUESTS----------------------------------------------------------
    //register
    app.post('/register', URLencodedParser, function (req, res) {
        const username = new String(req.body.username);

        if (username.length > 30) {
            var cookieData = constructors.cookie.msg;
            cookieData.content = 'The username mustn&apos;t be longer than 30 characters';
            cookieData.type = 'error';
            res.cookie('msg', cookieData, { maxAge: 5000 });
            res.redirect('/register');
        } else {
            var cookieData = constructors.cookie.user;
            cookieData.username = username;
            res.cookie('user', cookieData);
            res.redirect('/game');
        };
    });

};

//--FUNCTIONS------------------------------------------------------------------