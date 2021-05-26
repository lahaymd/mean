var express = require('express');
// var methodOverride = require('method-override');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
// var mongo = require('mongodb');
// var mongoose = require('mongoose');
// var util = require('util');
// var multer = require('multer');
var api = require('./routes/api');
var routes = require('./routes/index');
var hireme = require('./routes/hireme.api');
// var mongolab = require('./routes/mongolab.api');
var images = require('./routes/images.api');
var stops = require('./routes/stops.api');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();

// if(env === 'development'){
// mongoose.connect('localhost:27017/mongoose');
// } else {
// mongoose.connect('mongodb://lahaymd:zz040577@ds127998.mlab.com:27998/mikelahay');
// }


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static',express.static( path.join(__dirname,'node_modules')))
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// app.use(express.json())
// app.use(express.urlencoded())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(methodOverride(function(req, res){
//   if (req.body && typeof req.body === 'object' && '_method' in req.body) {
//     // look in urlencoded POST bodies and delete it
//     var method = req.body._method
//     delete req.body._method
//     return method
//   }
// }));





app.use(cookieParser('anystringoftext'));
app.use(session({ secret: 'anystringoftext',
                  name: 'server-session-cookie-id',
                  saveUninitialized: true,
                  maxAge: 30000,
                  resave: true}));

app.use('/api/hireme', hireme);
app.use('/api/users', api);
// app.use('/api/mongolab', mongolab);
app.use('/api/images', images);
app.use('/api/stops', stops);
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);
app.get('/partials/:name/:id', routes.nested);
app.get('*', routes.index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;