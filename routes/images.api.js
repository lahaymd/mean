
var express = require('express');
var router = express.Router();
var Image = require('../models/image.model.js');
var mongoose = require('mongoose');

router.post('/', function (req, res) {

    Image.create(
                { 
            result: req.body.result,
            x: req.body.x,
            y: req.body.y,
            width: req.body.width,
            height: req.body.height,
            preserveAspectRatio: req.body.preserveAspectRatio,
            href: req.body.href
                }, 
        
        function (err, user) {
        if (err) return console.error(err);
        console.log(user, '******');
        res.json(user);
    });
});

router.get('/', function (req, res) {
    Image.find({}, function (err, docs) {
        res.json(docs)
    })
})

router.delete('/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    Image.remove({ _id: id }, function (err, docs) {
        res.json(docs)
    });
})


router.put('/:id', function (req, res) {
    var id = req.params.id;
    var user = req.body;
    console.log('id: ' + id);
    console.log(user);
    Image.findOneAndUpdate({ _id: id }, user, { new: true }, function (err, docs) {
        console.log(err);
        console.log(docs)
        console.log('updated user')
        res.json(docs)
    })
})

module.exports = router;