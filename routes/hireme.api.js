var express = require('express');
var router = express.Router();
var HireMe = require('../models/hireme.model.js');
var mongoose = require('mongoose');

router.post('/', function(req, res) {
	HireMe.create({
		firstname:req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email,
		phone: req.body.phone,
		message: req.body.message
	}, function(err, user) {
		res.json(user);
	})
})

router.get('/', function(req, res) {
	HireMe.find({}, function(err, docs) {
		 // if (err) return console.error(err);
		res.json(docs);
	})
})

module.exports = router;