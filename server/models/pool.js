const { Pool } = require('pg');

// Link to our ElephantSQL db
const PG_URI = 'postgres://twvhufvo:ytiDt5fQsA_BDcK9Je2aFRuI3VxVzV2E@heffalump.db.elephantsql.com/twvhufvo';

// Connect our db to a Pool object w/methods like Query for our DB
const pool = new Pool({
  connectionString: PG_URI
});

// Export an object with the query method which just executes our query and logs what we're about to do
module.exports = {
  query: (text, params, callback) => {
    console.log('Executed following query:', text);
    return pool.query(text, params, callback);
  }
}