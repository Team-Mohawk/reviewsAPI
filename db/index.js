const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['162.203.169.116'], localDataCenter: 'datacenter1', keyspace: 'testqnas' });

// const testQuery = (cb) => {
//   client.execute('SELECT * FROM testqnas.answers WHERE question_id = 5 AND id > 0')
//     .then(res => {
//       cb(null, res);
//     })
//     .catch(err => cb(err));
// }

const getReviews = async (id, photos, cb) => {
  // console.log(id);

  client.execute('SELECT * FROM reviews.reviews WHERE product_id=?', [id], { prepare: true })
    .then(res => {
      // console.log(res.rows)
      return {
        product: id,
        page: 1,
        count: res.rows.length,
        results: res.rows.map(row => {
          return {
            "review_id": row.id,
            "rating": row.rating,
            "summary": row.summary || null,
            "recommend": row.recommend ? 1 : 0,
            "response": row.response,
            "body": row.body,
            "date": row.date.date,
            "reviewer_name": row.reviewer_name,
            "helpfulness": row.helpfulness,
            "photos": photos
          }
        })
      }
    })
    .then(res => {
      console.log(res)
      cb(null, res)
    })
    .catch(err => console.log(err))
}


const getPhotosForReview = (id, cb) => {
  return client.execute('SELECT id, url FROM reviews.review_photos WHERE review_id = ? AND id > 0', [id], { prepare: true })
    .then(res => {
      // console.log(res.rows)
      return res.rows.map(row => {
        return { "id": row.id, "url": row.url }
      })
    })
    .then(res => { return res })
    .catch(err => {
      console.log(err);
    })
}

const newReview = (prod_id, rate, sum, body, rec, nam, ema, pho = [], cha) => {
  client.execute('')
}

const getReviewMeta = (id, cb) => {
  client.execute('SELECT * FROM reviews.reviews WHERE product_id=? AND id > 0', [id], { prepare: true })
    .then(res => {
      return res.rows.map(row => {
        return {
          "product_id": row.product_id,
          "ratings": {},
          "recommended": {},
          "characteristics": {}
        }
      })
    });
  // {
  //   "product_id": "2",
  //   "ratings": {
  //     2: 1,
  //     3: 1,
  //     4: 2,
  //     // ...
  //   },
  //   "recommended": {
  //     0: 5
  //     // ...
  //   },
  //   "characteristics": {
  //     "Size": {
  //       "id": 14,
  //       "value": "4.0000"
  //     },
  //     "Width": {
  //       "id": 15,
  //       "value": "3.5000"
  //     },
  //     "Comfort": {
  //       "id": 16,
  //       "value": "4.0000"
  //     },
  //     // ...
  // }
}

const addReviewHelpful = (id, cb) => {
  client.execute('SELECT helpfulness, product_id FROM reviews.reviews WHERE id=? ALLOW FILTERING', [id], { prepare: true })
    .then(res => {
      console.log(res.rows)
      var help = res.rows[0].helpfulness + 1;
      var prod_id = res.rows[0].product_id;
      console.log(help);
      return { "help": help, "prod_id": prod_id }
    })
    .then(res => {
      // console.log(res)
      client.execute('UPDATE reviews.reviews SET helpfulness=? WHERE id=? AND product_id=?', [res.help, id, res.prod_id], { prepare: true })
        .then(res => {
          console.log(res);
          cb(null, res)
        })
        .catch(err => cb(err))
    })
}

const reportReview = (id, cb) => {
  client.execute('SELECT reported, product_id FROM reviews.reviews WHERE id=? ALLOW FILTERING', [id], { prepare: true })
    .then(res => {
      if (!res.rows[0].reported) {
        client.execute('UPDATE reviews.reviews SET reported=true WHERE id=? AND product_id=?', [id, res.rows[0].product_id], { prepare: true })
          .then(res => {
            console.log(res)
            cb(null, res)
          })
          .catch(err => cb(err));
      }
    })
}

module.exports = {
  // testQuery,
  getReviews,
  getPhotosForReview,
  newReview,
  getReviewMeta,
  addReviewHelpful,
  reportReview,

}