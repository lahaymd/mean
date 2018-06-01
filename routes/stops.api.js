
var express = require('express');
var router = express.Router();
var Stop = require('../models/stops.model.js');
var mongoose = require('mongoose');

router.post('/', function (req, res) {

    Stop.create(
        {
            name: req.body.name,
            attributes: [{
                offset: req.body.offset,
                stopColor: req.body.stopColor,
                stopOpacity: req.body.stopOpacity
            }]
        },

        function (err, user) {
            if (err) return console.error(err);
            console.log(user, '******');
            res.json(user);
        });
});

router.get('/', function (req, res) {
    Stop.find({}, function (err, docs) {
        res.json(docs)
    })
})

router.delete('/', function (req, res) {
    Stop.remove({ name: req.body.name }, function (err, docs) {
        res.json(docs)
    });
})


router.put('/', function (req, res) {
    Stop.findOneAndUpdate({ name: req.body.name }, user, { new: true }, function (err, docs) {
        console.log(err);
        console.log(docs)
        console.log('updated user')
        res.json(docs)
    })
})

module.exports = router;