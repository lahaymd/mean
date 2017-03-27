var express = require('express');
var router = express.Router();
var Mongolab = require('../models/mongolab.model.js');
var mongoose = require('mongoose');


router.post('/', function(req, res) {
	Mongolab.findOne({fuck:req.body.fuck}, function(err, docs){
		if(docs){
			res.json('this names taken')
		} else{
				Mongolab.create({fuck:req.body.fuck, shit: req.body.shit}, function(err, user) {
		if(err) {
			res.json(err)
		}
		req.session.authenticated = user.fuck;
		res.json(user);
	})
		}
	})

})

router.get('/', function(req, res) {
	Mongolab.find({}, function(err, docs) {
		 if (err) return console.error(err);
		res.json(docs);
	})
})



router.post('/login', function(req,res) {
	// res.json('from api / login')
	Mongolab.findOne({fuck: req.body.fuck}, function(err,docs) {
		// res.json(docs)
		if(docs){
			if(docs.shit === req.body.shit){
				req.session.authenticated = docs.fuck;
				res.json(docs)
			} else {
				res.json('password does not match')
			}
		} else {
			res.json('no user with dat name nigger')
		}
	})
});

router.get('/logout', function(req, res) {
	// res.redirect('/')
  // req.logout();
  delete req.session.authenticated;
  res.status(200).json({
    status: 'Bye!'
  });
});


router.get('/status', function(req, res) {
	 console.log('req.session', req.session);
	 console.log(req.session.authenticated)
  if (!req.session.authenticated) {
    return res.status(200).json({
      status: false
    });
  }
  res.status(200).json({
    status: true
  });
});

router.get('/sess' , function(req, res) {
	res.json(req.session)
})



module.exports = router;


