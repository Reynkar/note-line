const express = require("express");
const mysql = require("mysql");

// Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'noteline'
});

// Connect
db.connect((err) => {
    if (err)
        throw err
    console.log("Connected to the database");
});

const app = express();

app.get("/addpost1", (res,req) => {
    let post = {id:'1', note:'this is the note', color:'rgb(200,200,200)'};
    let sql = "INSERT INTO test SET ?";
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
    });
});

app.get("/getposts", (res,req) => {
    let sql = "SELECT * FROM test";
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results[0].ID);

    });
});

app.get('/getposts/:id', (res,req) => {
    let sql = `SELECT * FROM test WHERE id = ${req.param.id}`;
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);

    });
});

app.listen("3000", () => {
    console.log("Server started on port 3000");
});

