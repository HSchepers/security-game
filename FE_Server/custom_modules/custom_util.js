const constructors = require('../custom_modules/custom_constructors');
const request = require('request');

const backend = 'http://localhost:3001/';

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
    };
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
let BackEndService_Get = function (service) {
    return new Promise(function (resolve, reject) {
        request.get(backend + service, function (err, body) {
            if (err) {
                console.log(err);
                reject('Service can not be requested');
            } else {
                resolve(body);
            };
        });
    });
};

let BackEndService_Post = function (service, obj_json) {
    return new Promise(function (resolve, reject) {
        request.post(backend + service, { json: obj_json }, function (err, body) {
            if (err) {
                console.log(err);
                reject('Service can not be requested');
            } else {
                resolve(body);
            };
        });
    });
};

module.exports = {
    fun: {
        getHeader: getHeader,
        getMsg: getMsg,
        usernameIsSet: usernameIsSet,
    },
    promise: {
        get: BackEndService_Get,
        post: BackEndService_Post,
    },
};