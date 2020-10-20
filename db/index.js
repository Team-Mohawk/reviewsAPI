const cassandra = require('cassandra-driver');
const client = new cassandra.Client({contactPoints: ['162.203.169.116'], localDataCenter: 'datacenter1', keyspace: 'testqnas'});

const testQuery = () => {
  client.execute('SELECT * FROM testqnas.answers WHERE question_id = 5 AND id > 0')
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(err => console.log(err));
}

module.exports = {
  testQuery,

}