// Use this file to declare methods to interact with db
// Require in my database pool connection
const db = require('../models/pool.js');

// Object body for methods to add to interact w/db via middleware
const sqlController = {};

// Add methods to act as my middleware for my router
sqlController.testGET = (req, res, next) => {
  console.log('Running testGET from controller');
  const query = `
    SELECT * FROM past_memories;
  `;
  db.query(query, undefined, (err, list) => {
    if (err) return next({
      log: 'The following error occured in testGet' + err});
    res.locals.names = list.rows;
    return next();
  })
}

sqlController.testPOST = (req, res, next) => {
  console.log('Running testPOST');
  const query = `
    INSERT INTO personal_journal (name) VALUES ('Will Sentence');
  `;
  db.query(query, undefined, (err, data) => {
    if (err) return next({
      log: 'The following error occured in testPost' + err});
    return next();
  })
}


// Export back so router can use
module.exports = sqlController;