const mysql = require('mysql');
const express = require('express');
const path = require('path');

const app = express();
const PORT = '8080';

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'node_js'
});



app.listen(PORT, (err) => {
    if (err) {console.error(err);}
})