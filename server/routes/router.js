const express = require('express');
const controller = require('../controllers/controller.js');
const router = express.Router();

router.get('/', controller.testGET, (req, res) => {
  console.log('Database Accessed')
  return res.status(200).json(res.locals.names);
})

router.post('/', controller.testPOST, (req, res) => {
  console.log('Succesful DB Post');
  return res.status(200).json('Succesfully posteddddd!')
})

module.exports = router;