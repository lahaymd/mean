var express = require('express');
var router = express.Router();
var Mongolab = require('../models/mongolab.model.js');
var mongoose = require('mongoose');

router.post('/', function(req, res) {
	Mongolab.create({fuck:req.body.fuck}, function(err, user) {
		res.json(user);
	})
})

router.get('/', function(req, res) {
	Mongolab.find({}, function(err, docs) {
		 if (err) return console.error(err);
		res.json(docs);
	})
})

module.exports = router;


