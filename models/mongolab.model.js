var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Mongolab = new Schema({
	fuck:  {type:String, unique :true},
	shit: String,
	files: String
});



module.exports = mongoose.model('testings', Mongolab);