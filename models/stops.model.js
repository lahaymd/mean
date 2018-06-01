var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Stop = new Schema({
    name: { type: String, unique: true },
    attributes: [{ 
                    offset: Number,
                    stopColor: String,
                    stopOpacity: Number
                }]
});



module.exports = mongoose.model('stops', Stop);