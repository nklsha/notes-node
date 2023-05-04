const { Pool } = require('pg')
 
const pool = new Pool({
    user: 'postgres',
    host: '34.152.18.170',
    database: 'postgres',
    password: 'nikhil11!',
    port: 5432,
  })
 
module.exports = {
  query: (text, params) => pool.query(text, params).catch(e => e.stack)
}