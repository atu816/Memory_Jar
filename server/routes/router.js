const express = require('express');
const controller = require('../controllers/controller.js');
const router = express.Router();

router.get('/', controller.testGET, (req, res) => {
  console.log('are we in router.js')
  return res.status(200).send('database accessed');
})

module.exports = router;