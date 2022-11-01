const express = require('express');
const app = express();
const path = require('path');
const APP_PORT = 3000;

app.get('/api', (req, res) => {
  return res.status(200).json('yoooo are we good???? good luck :\']');
})

app.listen(APP_PORT, () => {
  console.log('Listening on port 3000...')
});