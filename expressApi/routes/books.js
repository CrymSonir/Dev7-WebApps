var express = require('express');
var router = express.Router();
var Books = require('../models/Books.js');

router.get('/', function(req, res, next) {
  console.log('BOOKS GET');
  Books.find(function(err, result) {
    if(err) {
      return next(err);
    }
    res.json(result);
  });
});

router.get('/:id', function(req, res, next) {
  console.log('BOOKS GET SPECIFIC :', req);
  Books.find(function(err, result) {
    if(err) {
      return next(err);
    }
    res.json(result);
  });
});

router.post('/', function(req, res, next) {
  console.log('BOOKS POST');
  Books.create(req.body, function (err, result) {
    if(err) {
      return next(err);
    }
    res.json(result);
  });
});

router.put('/', function(req, res, next) {
  console.log('BOOKS PUT');
  var id = req.body._id;
  delete req.body._id;
  Books.update({"_id": id}, req.body, function (err, result) {
    if(err) {
      return next(err);
    }
    res.json(result);
  });
});

router.delete('/', function(req, res, next) {
  console.log('BOOKS DELETE : ', req.body);
  Books.remove({"_id": req.body._id}, function (err, result) {
    if(err) {
      return next(err);
    }
    res.json(result);
  });
});

module.exports = router;


// {}
