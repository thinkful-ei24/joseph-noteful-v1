'use strict';

const {PORT} = require('./config');
const morgan = require('morgan');
const express = require('express');
const router = require('./router/notes.router');
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(morgan('dev'));
app.use('/api', router);

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

app.listen(PORT, function(){
  console.info(`Server listening on & ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});