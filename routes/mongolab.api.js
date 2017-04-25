var express = require('express');
var fs = require('fs');
var router = express.Router();
var Mongolab = require('../models/mongolab.model.js');
var mongoose = require('mongoose');
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    var index= file.mimetype.indexOf('/');
    var mime= file.mimetype.substring(index).slice(1);
    cb(null, Date.now() +'.'+ mime) //Appending .jpg
  }
})

var upload = multer({ storage: storage });
// var upload = multer({dest: 'uploads'})



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





router.post('/', upload.single('files'),  function(req, res) {
	console.log('fucker!!')
	var array= req.body;
    console.log( array);
    console.log('body ' + JSON.stringify(req.body));
    console.log('filess', req.file)
    	if(req.body.files === '/images/cooper1.png') {
    		console.log('bleoop')
       // array = req.body;
       // console.log('array from if block' + array)
    		// array.files = '/images/cooper1.png'
    	} else {
    		// array = req.body;
      var path = req.file.path.replace('public', '')
    array.files = path;
    	console.log(array)
    	}
    	console.log( array);


	let mailOptions = {
	    from: '"Mike La Hay" <lahaymd@gmail.com>', // sender address
	    to: 'lahaymd@yahoo.com', // list of receivers
	    subject: 'Hello ' + req.body.fuck, // Subject line
	    text: '' + req.body.fuck, // plain text body
	    html: 'Thanks for signing up on <a href="http://mikelahay.com">mikelahay.com</a>'
	    	   
	};
	transporter.sendMail(mailOptions, (error, info) => {
	    if (error) {
	        return console.log(error);
	    }
	    console.log('Message %s sent: %s', info.messageId, info.response);
	});
 
	// var array = req.body;
 //    array.image = req.file.path;
// console.log('filepath!!!' + JSON.stringify(req.file));
// console.log('array ' + JSON.stringify(array));
	Mongolab.findOne({fuck:req.body.fuck}, function(err, docs){

        console.log('docs' + JSON.stringify(docs));
		if(docs){
			res.json('this names taken')
		} else{
				Mongolab.create(array, function(err, user) {
					console.log(user)
		if(err) {
			console.log('error' + err)
			res.json(err)
		}
		req.session.authenticated = user.fuck;
		console.log("SESSION!!!"+JSON.stringify(req.session.user));
    // console.log('filepath!!!' + JSON.stringify(req.file));
    // console.log('filepath!!!' + JSON.stringify(req.file.path));
    console.log('body ' + JSON.stringify(req.body))
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


router.get('/id' , function(req, res) {
	Mongolab.findOne({fuck:req.session.authenticated}, function(err, docs) {
		 if (err) return console.error(err);
		res.json(docs);
	})
})



router.post('/login', function(req,res) {
	console.log('reqbody', req.body)
	// res.json('from api / login')
	Mongolab.findOne({fuck: req.body.fuck}, function(err,docs) {
		// res.json(docs)
		if(docs){
			if(docs.shit === req.body.shit){
				req.session.authenticated = docs.fuck;
				console.log('login docs', docs)
				res.json(docs)
			} else {
				res.json('password does not match')
			}
		} else {
			res.json('no user with dat name')
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


