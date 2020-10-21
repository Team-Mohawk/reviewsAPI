//declare server and import express
const express = require('express');
const app = express();
const http = require('http');
const port = 2020;

app.use(express.static(__dirname));

http.createServer(app).listen(port, "0.0.0.0", () => {
  console.log(`the server's running on ${port} i guess`)
})

const db = require('./db');

/**=========routes==========**/

//CREATE

app.post('reviews/:prod_id', (req, res) => {
  db.newReview(req.params.prod_id,
    // rating,
    // summary,
    // body,
    // recommend,
    // name,
    // email,
    // photos,
    )
})

//READ
app.get('/loaderio-dca79065e177ddcb46435a95ab8e9b26', (req, res) => {
  res.send()
})

app.get('/reviews/:id', (req, res) => {
  db.getPhotosForReview(req.params.id)
    .then(photos => {
      db.getReviews(req.params.id, photos, (err, data) => {
        if (err) {
          res.status(500).send()
        } else {
          res.send(data)
        }
      })
    })
})

app.get('/reviews/:id/meta', (req, res) => {
  db.getReviewMeta(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send();
    } else {
      res.send(data);
    }
  })
})

//UPDATE

app.put('/reviews/helpful/:rev_id', (req, res) => {
  db.addReviewHelpful(req.params.rev_id, (err, data) => {
    if (err) {
      console.log(err)
      res.status(500).send();
    } else {
      res.status(204).send()
    }
  })
})

app.put('/reviews/report/:rev_id', (req, res) => {
  db.reportReview(req.params.rev_id, (err, data) => {
    if (err) {
      res.status(500).send();
    } else {
      res.status(204).send();
    }
  })
})

//DELTE

