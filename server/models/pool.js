const { Pool } = require('pg');

const PG_URI = 'postgres://twvhufvo:ytiDt5fQsA_BDcK9Je2aFRuI3VxVzV2E@heffalump.db.elephantsql.com/twvhufvo';

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('Executed following query:', text);
    return pool.query(text, params, callback);
  }
}