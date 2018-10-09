//Response JSON
const loginJSON = { 
    success: '',
    message: '',
    msg_type: '',
 };
 const scoreJSON ={
    user: '',
    score: 0,
    time: "00:00:00",
 };
 const initJSON ={
    gameId: 0,
 };
 const insertJSON ={
    success: false,
 };
 const updateJSON ={
    success: false,
 };
 const deleteJSON ={
    success: false,
 };

 module.exports = {
     json:{
        login: loginJSON,
        score: scoreJSON,
        init: initJSON,
        insert: insertJSON,
        update: updateJSON,
        delete: deleteJSON,
     },
  };