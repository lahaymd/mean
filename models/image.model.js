var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Image = new Schema({
    result: String,
    x: Number,
    y: Number,
    width: Number,
    height: Number,
    preserveAspectRatio: String,
    href: String
});



module.exports = mongoose.model('images', Image);