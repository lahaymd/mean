var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Mongolab = new Schema({
	fuck:  String
});



module.exports = mongoose.model('tests', Mongolab);