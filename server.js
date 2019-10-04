//import all node modules 
const express = require('express');
const mysql = require('mysql');
const bodyparser = require('body-parser');
const http = require('http')
var app = express();

//parse all form data
app.use(bodyparser.urlencoded({extended: true}));
//formating date
var dateFormat = require('dateformat');
var nowDate = new Date(); 
//view engine for showing view
app.set('view engine', 'ejs')
app.set('views', './view')

//importing file tha gonna use
// using bootstrap to design the website
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/tehter/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist/js'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

const siteTitle = "EventIF";
const baseURL = "http://localhost:3000/"


const mysqlConnection = mysql.createConnection({
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

app.get('/',(req,res)=>{
    
    mysqlConnection.query(`SELECT * FROM Employee`,(err, rows, fields)=>{
        console.log(fields)
        res.render("pages/index",{
            siteTitle: siteTitle,
            pageTitle: "EventIF",
            items : rows
        });    
        if(!err)
        
            console.log(rows);
            
            else
            console.log(err)
    });
})
app.get('/eventif/addemployee',(req,res)=>{
    res.render("pages/addemployee",{
        siteTitle: siteTitle,
        pageTitle: "EventIF" + " Edit Employee",
        items: ''
    })
})

//post method
app.post('/eventif/addemployee',(req,res)=>{
    var query = "INSERT INTO `Employee`(Name, EmpCode, Salary) VALUES (";
    
        query += " '"+req.body.Name+"',";
        query += " '"+req.body.EmpCode+"',";
        query += " '"+req.body.Salary+"')";
    mysqlConnection.query(query, (err,rows)=>{
        res.redirect(baseURL);
    });
});

app.get('/eventif/editemployee/:id',(req,res)=>{
    mysqlConnection.query("SELECT * FROM Employee WHERE EmpID= '"+req.params.id+"'", (err,rows)=>{
        res.render("pages/editemployee",{
            siteTitle: siteTitle,
            pageTitle: 'Editing employee:'+ rows[0].Name,
            item: rows
        });
    });
});

app.post('/eventif/editemployee/:id',(req,res)=>{
    var query = "UPDATE `Employee` SET";
        query += "`Name` = '"+req.body.Name+"',";
        query += "`EmpCode` = '"+req.body.EmpCode+"',";
        query += "`Salary` = '"+req.body.Salary+"'";
        query += "Where `Employee`.`EmpID` = "+req.body.EmpID+"";
    mysqlConnection.query(query,(err,rows)=>{
        if(rows.affectedRows)
        {
            res.redirect(baseURL);
        }
    });
});

app.get('/eventif/deleteemployee/:id',(req,res)=>{
    mysqlConnection.query("DELETE FROM Employee WHERE EmpID= '"+req.params.id+"'",(err,rows)=>{
        if(rows.affectedRows){
            res.redirect(baseURL)
        }
    })
})
//connect to the server 
app.listen(3000,()=> console.log('Express server is running in 3000'));
