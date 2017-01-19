
var express = require('express');
var router = express.Router();
var Auth = require('../models/auth.js');
var mongoose = require('mongoose');

router.post('/', function(req, res) { 
 
   Auth.create({username: req.body.username, password: req.body.password}, function(err, user) {
  if (err) return console.error(err);
  console.log(user, '******');
  res.json(user);
});
});

router.get('/', function(req, res) {
  Auth.find({}, function(err,docs) {
    res.json(docs)
  })
})

router.get('/:id', function(req, res) {

  Auth.findOne({_id: req.params.id}, function(err,docs) {
    res.json(docs)
    console.log(docs +'!$')
  })
})

router.delete('/:id', function(req, res) {
  var id = req.params.id;
  console.log(id);
  Auth.remove({_id: id}, function(err, docs) {
    res.json(docs)
  });
})


router.put('/:id', function(req, res) {
  var id = req.params.id;
  var user = req.body;
  console.log('id: ' + id);
  console.log(user);
  Auth.findOneAndUpdate({_id: id}, user, {new: true}, function(err, docs) {
    console.log(err);
    console.log(docs)
    console.log('updated user')
    res.json(docs)
  } )
})

module.exports = router;