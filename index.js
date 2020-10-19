//declare server and import express
const express = require('express');
const app = express();
const http = require('http');
const port = 2020;

http.createServer(app).listen(port, "0.0.0.0", () => {
  console.log(`the server's running on ${port} i guess`)
})

const db = require('./db');

/**=========routes==========**/

//CREATE

app.post('reviews/:id', (req, res) => {

})

//READ
app.get('/', (req, res) => {
  res.send('Connected to Mohawk')
})

app.get('/qa/:id', (req, res) => {
  res.send(db.testQuery(req.params.id));
})

app.get('/reviews/:id/meta', (req, res) => {

})

//UPDATE

app.put('/reviews/helpful/:rev_id', (req, res) => {

})

app.put('/reviews/report/:rev_id', (req, res) => {

})

//DELTE

