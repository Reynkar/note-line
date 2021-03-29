const app = require("express")();
const mysql = require("mysql");
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

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

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  
  io.on('connection', (socket) => {
    console.log('a user connected');
  });

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
        console.log(results); // results[0].ID example for a single row+column

    });
});
/*
app.get('/getposts/:id', (res,req) => {
    let sql = `SELECT * FROM test WHERE id = ${req.param.id}`;
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);

    });
});
*/

io.on('connection', (socket) => {
    socket.on('chat message', msg => {
      io.emit('chat message', msg);
    });
  });

  http.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
  });

