var express = require('express');
var router = express.Router();
var HireMe = require('../models/hireme.model.js');
var mongoose = require('mongoose');
const nodemailer = require('nodemailer');


	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
	    service: 'gmail',
	    auth: {
	        user: 'lahaymd@gmail.com',
	        pass: 'zz040577'
	    }
	});

	// setup email data with unicode symbols
	

// send mail with defined transport object

router.post('/', function(req, res) {


let mailOptions = {
	    from: '"Mike La Hay" <lahaymd@gmail.com>', // sender address
	    to: req.body.email, // list of receivers
	    subject: 'Hello ' + req.body.firstname, // Subject line
	    text: 'Thanks for signing up!', // plain text body
	    html: 'Thanks for signing up on <a href="http://mikelahay.com">mikelahay.com</a>'
	    	   
	};
	transporter.sendMail(mailOptions, (error, info) => {
	    if (error) {
	        return console.log(error);
	    }
	    console.log('Message %s sent: %s', info.messageId, info.response);
	});



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