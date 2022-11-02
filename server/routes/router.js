const express = require('express');
const controller = require('../controllers/controller.js');
const router = express.Router();

// Access database on initial load and anytime we need to get the full list of memories
router.get('/past_memories', controller.pastMemoGET, (req, res) => {
  console.log('Database Accessed')
  return res.status(200).json(res.locals.past_memories);
})

// Updating memory to show how many times an event has been seen
router.put('/', controller.memoryPUT, (req, res) => {
  return res.status(200).json('Succesful PUT')
})

// Trash. Doesn't exist anymore. Absolute trash.
router.post('/', controller.testPOST, (req, res) => {
  console.log('Succesful DB Post');
  return res.status(200).json('Succesfully posteddddd!')
})

module.exports = router;