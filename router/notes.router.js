const express = require('express');
const router = express.Router();

const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);

router.get('/notes', (req, res, next) => {
  const {searchTerm} = req.query;
  notes.filter(searchTerm)
    .then(results => {
      if(results) {
        res.json(results);
      } else {
        next();
      }
    })
    .catch( err => {
      next(err);
    });
});
    
router.get('/notes/:id',(req, res, next) => {
  notes.find(req.params.id)
    .then( item => {
      if(item){
        res.json(item);
      } else {
        next();
      }
    })
    .catch( err => {
      next(err);
    });
});

router.put('/notes/:id', (req, res, next) => {
  const id = req.params.id;

  const updateObj = {};
  const updateFields = ['title', 'content'];

  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  notes.update(id, updateObj)
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

router.post('/notes', (req, res, next) => {
  const {title, content} = req.body;

  const newItem = {title, content};

  if(!newItem.title){
    const err = new Error('Missing title in request body');
    err.status = 400;
    return next(err);
  }

  notes.create(newItem)
    .then(item => {
      if(item){
        res.sendStatus(204);
      } else {
        next();
      }
    })
    .catch(err => {
      res.sendStatus(500);
      next(err);
    });
});

router.delete('/notes/:id',(req, res, next) => {
  notes.delete(req.params.id)
    .then( len  => {
      if(len) {
        res.sendStatus(204);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});




module.exports = router;