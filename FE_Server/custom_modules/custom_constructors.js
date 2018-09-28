// Render-Data for Websites
const indexJSON = {
    header_text: '',
    message: '',
    msg_type: '',
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
    message: '',
    msg_type: '',
};

module.exports = {
    json: {
        index: indexJSON,
        else: elseJSON,
        notFound: notFoundJSON,
    },
    cookie: {
        user: cookieUserData,
        message: cookieMsgData,
    },
};