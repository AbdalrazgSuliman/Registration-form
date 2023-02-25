var mysql = require('mysql')
var connection = mysql.createpool({
    host : 'localhost',
    user : 'root',
    password :'',
    database :'event',
    port :'8080'
});
connection.getconnection(function(err){
    if(!err){
        console.log("connected..");
    }else{
        console.log('Error connecting.. ${err}');
    }
});
module.exports = connection;
