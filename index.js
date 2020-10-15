//declare server and import express
const express = require('express');
const app = express();
const port = 2020;

/**=========routes==========**/

//CREATE

//READ
app.get('/', (req, res) => {
  res.send('reviewsAPI')
})
//UPDATE

//DELTE

//start listening on port
app.listen(port, () => {
  console.log(`the server's running on ${port} i guess`)
})