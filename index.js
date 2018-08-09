const express = require('express');
const http = require('http');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const multer = require('multer');

// SQL Connection Config
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1.618apples',
  database: 'roulette-ffa',
  multipleStatements: true
});

// Connect to SQL Server
connection.connect(err => {
  if (err) {
    return err;
  }
});

// DEFINE QUERIES
const ALL_PLAYERS = 
  `SELECT * 
  FROM players`;
const ALL_POKEMON =
  `SELECT pokemon1, pokemon2, pokemon3
  FROM players`;
const WIPE_PLAYERS = 
  `UPDATE players
  SET pokemon1 = 1, pokemon2 = 1, pokemon3 = 1`

// App Setup
app.use(cors());
app.use(multer({dest:'./uploads/'}).single('image'))


app.use(express.static('uploads'));


// Server Setup
const port = process.env.PORT || 4000;
const server = http.createServer(app);
server.listen(port);
console.log('server listening on port ', + port);


// Routes
app.get('/', function (req, res) {
  res.send('wesdfkjasdlkfahsdlkfjhasldkf')
})

app.get('/dex', (req, res, next) => {

  connection.query(ALL_PLAYERS, (err, results) => {
    if (err) {
      return res.send(err)
    } else {
      return res.json({
        data: results
      })
    }
  })
})

app.get('/players/data', (req, res, next) => {

  connection.query(ALL_PLAYERS, (err, results) => {
    if(err){
      res.send(err)
    } else {
      res.send(results)
    }
  })
})

app.get('/players/data/pokemon', (req, res, next) => {
  // console.log('Starting Fetch Server');
  connection.query(ALL_POKEMON, (err, results) => {
    if(err){
      res.send(err)
    } else {
      res.send(results);
    }
  })
  // console.log('Fetch Complete Server');

})


// POST REQUESTS
app.post('/roll', (req, res, next) => {
  const playerID = req.body.playerID;
  const slotID = req.body.slotID;

  const GET_RANDOM_POKEMON = 
    `UPDATE players
    SET pokemon${slotID} = (SELECT id FROM kanto_dex ORDER BY RAND() LIMIT 1)
    WHERE id = ${playerID};
    ${ALL_POKEMON}`
  
  connection.query(GET_RANDOM_POKEMON, (err, results) => {
    if(err){res.send(err)} else {res.send(results[1])}
  })
})
