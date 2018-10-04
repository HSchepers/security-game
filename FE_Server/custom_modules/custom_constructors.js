// Render-Data for Websites
const indexJSON = {
    header_text: '',
    msg: {
        content: '',
        type: '',
    },
    scores: [
        { user: '', score: 0,},
    ],
};

const elseJSON = {
    header_text: '',
};

const notFoundJSON = {
    header_text: '',
    file: '',
};

// Cookie-Data
const cookieUserData = {
    username: '',
};

const cookieMsgData = {
    content: '',
    type: '',
};

// BackEndService
const scoresJSON = {
    max: 0,
};

module.exports = {
    json: {
        index: indexJSON,
        else: elseJSON,
        notFound: notFoundJSON,
    },
    cookie: {
        user: cookieUserData,
        msg: cookieMsgData,
    },
    service: {
        scores: scoresJSON,
    },
};