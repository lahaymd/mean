var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Auth = new Schema({
	username: {type: String, unique: true},
	password: String,
});



module.exports = mongoose.model('authorize', Auth);