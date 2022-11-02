const express = require('express');
const controller = require('../controllers/controller.js');
const router = express.Router();

// Access database on initial load and anytime we need to get the full list of memories
router.get('/past_memories', controller.pastMemoGET, (req, res) => {
  console.log('Database Accessed')
  return res.status(200).json(res.locals.past_memories);
})

// Updating memory to show how many times an event has been seen
router.put('/updateFreq', controller.memoryPUT, (req, res) => {
  return res.status(200).json('Succesful PUT')
})

// Trash. Doesn't exist anymore. Absolute trash.
router.post('/future', controller.futurePOST, (req, res) => {

  return res.status(200).json('Succesful future POST')
})

module.exports = router;