const { urlencoded } = require('express');
const express = require('express');
const app = express();
const APP_PORT = 3000;

const dbRouter = require('./routes/router.js');

// Parse everything coming in as json (Important for POST/PUT where data is coming in)
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Access database via
app.use('/db', dbRouter);

// Test fetch route
app.get('/api', (req, res) => {
  return res.status(200).json(['shit', 'fuck', 'dippp']);
})

// Catch-all
app.use((req, res) => res.status(404).send('This route doesn\'t extist... Try again...'));

// Gloabl Error Handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(APP_PORT, () => {
  console.log('Listening on port 3000...')
});