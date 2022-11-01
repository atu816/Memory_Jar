// Use this file to declare methods to interact with db
// Require in my database pool connection
const db = require('../models/pool.js');

// Object body for methods to add to interact w/db via middleware
const sqlController = {};

// Add methods to act as my middleware for my router
sqlController.testGET = () => {
  console.log('did we make it into test')
  const query = `
    SELECT * FROM personal_journal;
  `;
  db.query(query, undefined, (err, res) => {
    if (err) return next(err);
    res.locals.names = res;
    return next();
  })
}


// Export back so router can use
module.exports = sqlController;