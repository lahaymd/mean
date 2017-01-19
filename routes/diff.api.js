var express = require('express');
var router = express.Router();
var Diff = require('../models/diff.model.js');
var mongoose = require('mongoose');

router.post('/', function(req, res) {
	console.log(req.body)
	Diff.create({textarea: req.body.textarea}, function(err, docs) {
		console.log(docs)
		if (err) return console.error(err);
 		res.json(docs);
	})
})

router.get('/', function(req, res) {
	Diff.find({}, function(err, docs) {
		 if (err) return console.error(err);
		res.json(docs);
	})
})

module.exports = router;