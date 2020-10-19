const cassandra = require('cassandra-driver');
const client = new cassandra.Client({contactPoints: ['http://162.203.169.116/']});

const testQuery = (id) => {
  client.execute(`SELECT * FROM questions WHERE id = ?`, [id])
    .then(res => console.log(res))
}

module.exports = {
  testQuery,

}