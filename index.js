//declare server and import express
const express = require('express');
const app = express();
const http = require('http');
const port = 2020;

http.createServer(app).listen(port, '0.0.0.0', () => {
  console.log(`the server's running on ${port} i guess`)
})

const db = require('./db');

/**=========routes==========**/

//CREATE

//READ
app.get('/', (req, res) => {
  res.send('reviewsAPI')
})
//UPDATE

//DELTE

//start listening on port