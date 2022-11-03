const express = require('express');
const controller = require('../controllers/controller.js');
const router = express.Router();

// Access database on initial load and anytime we need to get the full list of memories
router.get('/past_memories', controller.pastMemoGET, controller.futureMemoGet, (req, res) => {
  console.log('Past Memory Database Accessed')
  return res.status(200).json(res.locals);
})

router.get('/future_memories', (req, res) => {
  console.log('Future Memory Database Accessed')
  return res.status(200).json(res.locals.future);
})

// Updating memory to show how many times an event has been seen
router.put('/updateFreq', controller.memoryPUT, (req, res) => {
  return res.status(200).json('Succesful PUT')
})

// Posting future dates
router.post('/future', controller.futurePOST, (req, res) => {
  return res.status(200).json('Succesful future POST')
})

// Posting old memories
router.post('/past', controller.pastPOST, (req, res) => {
  return res.status(200).json('Succesful past POST')
})

module.exports = router;