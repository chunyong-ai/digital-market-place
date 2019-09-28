//jshint esversion:6

const path = require('path');

const {
    promisify,
} = require('util');

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var inputFromBrowser = "";
var inputDB = "";
var resultDB =[];
var item1Array =[];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('views', path.join(__dirname, 'views'));


app.set("view engine", "ejs");

//----
// app.get("/", (req,res) => {   //get request from route(localhost) and render browser then response to browser
//     var today = new Date();
//     var currentDay = today.getDay();

//     res.render("list", {newListItem : inputFromBrowser});
// });


// ---------------database creation
const mysql = require("mysql");     //from w3 school
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "TIC2601",
    database: 'new_schema_digital_market'

});

connection.connect(function (err) {

    
    // if (err) throw err;
    // console.log("Connected!");
    // var sql = "INSERT INTO book VALUES ('Photos','paperback','999','English','Author','Press','2010','9999999999','999-9999999999')";

    // connection.query(sql, function (err, result) {
    // //     if (err) throw err;
    //     console.log("1 record inserted");
    //   });

    // if (err) throw err;
    // connection.query("SELECT * FROM book WHERE title= 'Photos'", function (err, result) {
    //   if (err) throw err;
    // //   if(result.length > 0){
    // //     console.log(rr.push[result]);
    // //   }
    //     resultDB = result;
    //   console.log(result[0]);
    // });

    if (err) throw err;
    connection.query("SELECT title, authors, ISBN10 FROM book", function (err, result) {
      if (err) throw err;
    //   if(result.length > 0){
    //     console.log(rr.push[result]);
    //   }
        resultDB = result;
    });

});

// ejs render------

const queryAsync = promisify(connection.query).bind(connection);

// app.get('/', async (req, res) => {
//     const sql = 'SELECT DISTINCT language FROM book';
//     // var sqlInsertBook = "INSERT INTO book VALUES ('Photos','paperback','999','English','Author','Press','2010','9999999970','999-9999999970')";
//     var sqlInsertBook = "INSERT INTO book VALUES (,'paperback','999','English','Author','Press','2010','9999999969','999-9999999969')";

//     const sqlCart = 'SELECT * FROM Book';

//     let languages = {};
//     let sqlInsert = {};
//     let sqlC = {};
//     let r = [];

//     let newListDB = {};


//     try {
//         languages = await queryAsync(sql);
//         // sqlInsert = await queryAsync(sqlInsertBook);
//         sqlC = await queryAsync(sqlCart);

//         //ejs render
//         res.render('list', {
//             sql: sql,
//             // sqlInsert : sqlInsert,
//             sqlC : sqlC,
//             r: resultDB,
//             languages: languages,
//             newListItem: inputFromBrowser,

//             newListDB : inputDB
//         });
//         // console.log(sqlC);
//     } catch (err) {
//         console.log('SQL error', err);
//         res.status(500).send('Something went wrong');
//     }
// });

app.get('/', (req, res) => {

    let newListDB = {};

    res.render('list', { newListDB: item1Array, r: resultDB} );
} );


app.post("/", (req, res) => {              
    inputFromBrowser = req.body.item;

    inputDB = req.body.item1;
    item1Array.push(inputDB);

    console.log(item1Array);

    // res.render("list", {newListItem : inputFromBrowser});
    res.redirect("/");
});

app.listen(3001, function () {
    console.log("Server started on port 3001");
});