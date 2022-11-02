// Use this file to declare methods to interact with db
// Require in my database pool connection
const db = require('../models/pool.js');

// Object body for methods to add to interact w/db via middleware
const sqlController = {};

// Add methods to act as my middleware for my router
sqlController.pastMemoGET = (req, res, next) => {
  console.log('Running testGET from controller');
  const query = `
    SELECT * FROM past_memories;
  `;
  // Access our database
  db.query(query, undefined, (err, list) => {
    if (err) return next({log: 'The following error occured in testGet' + err});
    // Array of past_memories
    res.locals.past_memories = list.rows;
    return next();
  })
}

// Modify for better use
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

sqlController.memoryPUT = (req, res, next) => {
  // Increments counter on our times_called
  console.log('Running memoryPUT');
  const updatedTimes = Number(req.body.times_called) + 1;
  query = `
  UPDATE past_memories
  SET times_called = ${updatedTimes}
  WHERE id = ${req.body.id};
  `;
  db.query(query, undefined, (err, data) => {
    if (err) return next({err: 'Error in PUT:', err})
    console.log('Succesful PUT inside controller', data);
    return next();
  })
}

// Export back so router can use
module.exports = sqlController;