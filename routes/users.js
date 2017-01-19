var express = require('express');
var router = express.Router();
var User = require('./user');
var notLoggedIn = require('./not_logged_in');
var session = require('./session');
var loadUser = require('./load_user');
var restrictUserToSelf = require('./restrict_user_to_self');
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    var index= file.mimetype.indexOf('/');
    var mime= file.mimetype.substring(index).slice(1);
    cb(null, Date.now() +'.'+ mime) //Appending .jpg
  }
})

var upload = multer({ storage: storage });
//var upload = multer({dest: './public/images'});




/* GET users listing. */
router.get('/', function(req, res) {
	var page = req.query.page && parseInt(req.query.page, 10) || 0;
	//console.log(page);
	var maxUsersPerPage = 3;

  User.count(function(err, count) {
  		if (err) {
			return next(err);
			}
      
  		var lastPage = (page + 1) * maxUsersPerPage >= count;
      var paginate= Math.ceil(count/3);
      var last = Math.floor(count/3);
    //   console.log("pageinate" + paginate)
  		// console.log(count+"====")
  		// console.log(lastPage+"*****")
	User.find({})
	  .sort({username: 1})
	  .skip(page * maxUsersPerPage)
	  .limit(maxUsersPerPage)
	  .exec(function (err, user) {
  		res.render('user', {
  			title: 'Users', 
  			users: user, 
  			page: page,
  			lastPage: lastPage,
        paginate: paginate,
        last: last
        
  		});
  	});
   });
});




router.get('/new', notLoggedIn, function(req, res) 
	{ res.render('new', {title: "New user"});
});


router.get('/ajaxtest', function(req, res) {
    res.render('test')
});




router.get('/:name', loadUser, function(req, res, next){ 
				res.render('profile', {title: 'User profile',
				user: req.user }); 

});



router.post('/user', notLoggedIn, upload.single('image'), function(req, res) { 
  console.log('body ' + JSON.stringify(req.body))
console.log('filepath!!!' + JSON.stringify(req.file));
    var array = req.body;
    array.image = req.file.path;
    console.log('array ' + JSON.stringify(array));
      User.create(array,   function(err, docs) {
        
        
        
        console.log('docs' + JSON.stringify(docs));
      // if (err) {
      //   if(err.code === 11000) {
      //     res.send("error code 10000"+err)
      //   } else {
      //     if (err.name === 'ValidationError') {
      //       return res.send(Object.keys(err.errors).map(function(errField) {
      //         return err.errors[errField].message; 
      //       }).join('. '), 406);
      //     } else {
      //     next(err);
      //     }
      //   }
      //   return; 
      // }
    
    req.session.user=req.body;
   //pic.upload= req.file.path
    

    console.log("SESSION!!!"+JSON.stringify(req.session.user));
    console.log('filepath!!!' + JSON.stringify(req.file));
    console.log('filepath!!!' + JSON.stringify(req.file.path));
    console.log('body ' + JSON.stringify(req.body))
     res.redirect('/users');
	     // };
   });
});




router.delete('/:name', loadUser, restrictUserToSelf,   function(req, res, next) {

  console.log("REQ "+JSON.stringify(req.session.user))
	  // if(err) {
   //    return next(err);
   //  }
			req.user.remove();
			req.session.destroy(); 
			res.redirect('/');
		
});

router.put('/:name',  function(req, res, next) {
  var name = req.params.name;
  var updatedname = req.body
  console.log(updatedname)
    User.findOneAndUpdate({name: name}, updatedname, {new : true}, function(err, model) {
      console.log('model::' + model)
      console.log('updt' +updatedname)
      if(err) {
        return next(err);
      }
      res.redirect('/users')
    })
})









module.exports = router;
