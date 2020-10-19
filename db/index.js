const cassandra = require('cassandra-driver');
const client = new cassandra.Client({contactPoints: ['localhost']});

