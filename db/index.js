const cassandra = require('cassandra-driver');
const client = new cassandra.Client({contactPoints: ['162.203.169.116'], localDataCenter: 'datacenter1'});

const testQuery = () => {
  client.execute(`SELECT * FROM testqnas.answers WHERE answer_id = 5 AND id > 0;`)
    .then(res => { return res; })
}

module.exports = {
  testQuery,

}