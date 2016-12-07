var express = require('express');
var router = express.Router();
var Books = require('../models/Books.js');

router.get('/', function(req, res, next) {
  Books.find(function(err, result) {
    if(err) {
      return next(err);
    }
    res.json(result);
  });
});

router.get('/:id', function(req, res, next) {
  Books.findOne({"isbn13": req.param.id}, function(err, result) {
    if(err) {
      return next(err);
    }
    res.json(result);
  });
});

router.post('/', function(req, res, next) {
  Books.create(req.body, function (err, result) {
    if(err) {
      return next(err);
    }
    res.json(result);
  });
});

router.put('/', function(req, res, next) {
  var isbn = req.body.isbn13;
  delete req.body._id;
  Books.update({"isbn13": isbn}, req.body, function (err, result) {
    if(err) {
      return next(err);
    }
    res.json(result);
  });
});

router.delete('/', function(req, res, next) {
  Books.remove({"isbn13": req.body.isbn13}, function (err, result) {
    if(err) {
      return next(err);
    }
    res.json(result);
  });
});

module.exports = router;
