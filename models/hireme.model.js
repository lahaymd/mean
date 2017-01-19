var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var HireMe = new Schema({
	firstname:  String,
	lastname: String,
	email: String,
	phone: String,
	message: String

});



module.exports = mongoose.model('hireme', HireMe);