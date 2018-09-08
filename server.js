'use strict';

const data = require('./db/notes');
const simDB = require('./db/simDB');
const notes =simDB.initialize(data);

const {PORT} = require('./config');
const morgan = require('morgan');
const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(morgan('dev'));

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

app.get('/api/notes', (req, res, next) => {
  const {searchTerm} = req.query;
  notes.filter(searchTerm, (err, list) => {
    
    if (err) {
      return next(err);
    }
    res.json(list);
  });
});
    
app.get('/api/notes/:id',(req, res, next) =>{
  notes.find(req.params.id, (err, item) => {
    if (err){
      return next(err);
    }
    res.json(item);
  });  
});

app.put('/api/notes/:id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateFields = ['title', 'content'];

  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  notes.update(id, updateObj, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      next();
    }
  });
});

app.listen(PORT, function(){
  console.info(`Server listening on & ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});