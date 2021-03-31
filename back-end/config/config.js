const mysql = require('mysql2');

const db = mysql.createPool({
    host : 'localhost',
    port : '3306',
    user : 'root',
    password : 'zxc258zxc258',
    database : 'FITFEED'
});

module.exports = db;