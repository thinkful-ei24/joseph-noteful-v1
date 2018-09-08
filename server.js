'use strict';

// Load array of notes
const data = require('./db/notes');

console.log('Hello Noteful!');

const express = require('express');
const app = express();
const {PORT} = require('./config');
const {logger} = require('./middleware/logger.js');

app.use(logger);

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

app.get('/api/notes', (req, res) => { 
  const searchTerm = req.query.searchTerm;
  if (searchTerm) {
    console.log(searchTerm);
    return res.json(data.filter(item => item.title.includes(searchTerm)));

  }
  res.json(data);
});

app.get('/api/notes/:id',(req,res) =>{
  const note = data.find(note => note.id === Number(req.params.id));
  res.json(note);
});

app.listen(PORT, function(){
  console.info(`Server listening on & ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});