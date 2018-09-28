// Render-Data for Websites
const indexJSON = {
    header_text: '',
    msg: {
        content: '',
        type: '',
    },
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
};