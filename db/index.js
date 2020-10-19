const cassandra = require('cassandra-driver');
const client = new cassandra.Client({contactPoints: ['162.203.169.116']});

const testQuery = (id) => {
  client.execute(`ALLOW FILTERING git pSELECT * FROM testqnas.questions WHERE id = ?;`, [id])
    .then(res => console.log(res))
}

module.exports = {
  testQuery,

}