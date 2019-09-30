const express = require('express');
const mysql = require('mysql');
const bodyparser = require('body-parser');

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user : 'root',
    password: 'Firewall@421',
    database: 'EmployeeDB'
})
mysqlConnection.connect((err)=>{
    if(!err)
        console.log('DB connection succeded.');
    
    else
        console.log('DB connection failed \n Error:' + JSON.stringify(err, undefined, 2));
    
})

var app = express();
app.use(bodyparser.json());

app.get('/Employees',(req,res)=>{
    mysqlConnection.query(`SELECT * FROM Employee`,(err, rows, fields)=>{
        if(!err)
            console.log(rows);
            else
            console.log(err)
    })
})

app.listen(3000,()=> console.log('Express server is running in 3000'));