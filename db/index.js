const cassandra = require('cassandra-driver');
const client = new cassandra.Client({contactPoints: ['162.203.169.116'], localDataCenter: 'datacenter1'});

const testQuery = (id) => {
  client.execute(`ALLOW FILTERING SELECT * FROM testqnas.questions WHERE id = ?;`, [id])
    .then(res => return res)
}

module.exports = {
  testQuery,

}