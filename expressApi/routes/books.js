var express = require('express');
var router = express.Router();
var Books = require('../models/Books.js');
var Users = require('../models/Users.js');

router.get('/', function(req, res, next) {
  Books.find(function(err, result) {
    if(err) {
      return next(err);
    }
    res.json(result);
  });
});

router.get('/:id', function(req, res, next) {
  Users.findOne({"_id": req.params.id})
    .populate('books.read')
    .populate('books.reading')
    .populate('books.notRead')
    .exec(function (err, result) {
      if(err) {
        return next(err);
      }
    res.json(result.books);
});
});

router.post('/:user', function(req, res, next) {
  Users.find(req.body, function (err, result) {
    if(err) {
      return next(err);
    }
    res.json(result);
  });
  Books.create(req.body, function (err, result) {
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
