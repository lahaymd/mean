var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Diff = new Schema({
	textarea:  String
});



module.exports = mongoose.model('diff', Diff);