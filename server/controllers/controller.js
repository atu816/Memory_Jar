// Use this file to declare methods to interact with db
// Require in my database pool connection
const db = require('../models/pool.js');

// Object body for methods to add to interact w/db via middleware
const sqlController = {};

// Add methods to act as my middleware for my router
sqlController.pastMemoGET = (req, res, next) => {
  console.log('Running testGET from controller');
  const past_query = `
    SELECT * FROM past_memories;
  `;
  // Access our database
  db.query(past_query, undefined, (err, list) => {
    if (err) return next({ log: 'The following error occured in testGet' + err });
    console.log('Past memories stored in locals!')
    // Array of past_memories
    res.locals.past_memories = list.rows;
    return next();
  })
}

sqlController.futureMemoGet = (req, res, next) => {
  console.log('Running future memory GET')
  const future_query = `
    SELECT * FROM future_memories;
  `;
  db.query(future_query, undefined, (err, list) => {
    if (err) return next({log: 'The following error occured in testGet' + err});
    console.log('Future memories stored in locals!')
    // Array of past_memories
    res.locals.future = list.rows;
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
    if (err) return next({ err: 'Error in PUT:', err })
    console.log('Succesful PUT inside controller', data);
    return next();
  })


}

// Modify for better use
sqlController.futurePOST = (req, res, next) => {
  const query = `
    INSERT INTO future_memories (date_idea, date_entered) 
    VALUES ('${req.body.date_idea}', '${req.body.curr_date}');
  `;
  db.query(query, undefined, (err, data) => {
    if (err) return next({
      log: 'The following error occured in future post' + err
    });
    return next();
  })
}


sqlController.pastPOST = (req, res, next) => {
  const query = `
    INSERT INTO past_memories (name, time) 
    VALUES ('${req.body.old_memory}', '${req.body.old_date}');
  `;
  console.log(req.body)
  db.query(query, undefined, (err, data) => {
    if (err) return next({
      log: 'The following error occured in past post' + err
    });
    return next();
  })
}
// Export back so router can use
module.exports = sqlController;