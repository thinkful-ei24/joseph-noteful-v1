'use strict';

// Load array of notes
const data = require('./db/notes');

console.log('Hello Noteful!');

const express = require('express');
const app = express();

app.listen(8080, function(){
  console.info(`Server listening on & ${this.address().port}`);
}).on('error', err => {
  console.error(err);
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

