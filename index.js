const express = require('express');
const http = require('http');
const app = express();
const cors = require('cors');
const mysql = require('mysql');

// SQL Connection Config
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1.618apples',
  database: 'pokedex'
});

// Connect to SQL Server
connection.connect(err => {
  if (err) {
    return err;
  }
});


app.use(cors());


//server setup
const port = process.env.PORT || 4000;
const server = http.createServer(app);
server.listen(port);
console.log('server listening on port ', + port);


//Test
app.get('/', function (req, res) {
  res.send('wesdfkjasdlkfahsdlkfjhasldkf')
})

app.get('/dex', (req, res) => {

  connection.query('SELECT * FROM kanto_dex', (err, results) => {
    if (err) {
      return res.send(err)
    } else {
      return res.json({
        data: results
      })
    }
  })
})
