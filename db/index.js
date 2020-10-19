const cassandra = require('cassandra-driver');
const client = new cassandra.Client({contactPoints: ['162.203.169.116'], localDataCenter: 'database1'});

const testQuery = (id) => {
  client.execute(`ALLOW FILTERING SELECT * FROM testqnas.questions WHERE id = ?;`, [id])
    .then(res => console.log(res))
}

module.exports = {
  testQuery,

}