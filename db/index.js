const cassandra = require('cassandra-driver');
const client = new cassandra.Client({contactPoints: ['localhost']});

const testQuery = (id) => {
  client.execute(`SELECT * FROM testqnas.questions WHERE id = ?`, [id])
    .then(res => console.log(res))
}

module.exports = {
  testQuery,

}