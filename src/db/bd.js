const { createPool } = require('mysql2/promise');

const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bd_posts',
  port: 3306,
});

module.exports = pool;