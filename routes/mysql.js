
var express = require('express');
var router = express.Router();
var connection = require('../connection.js');


router.post('/', function (req, res) {
    connection.query('INSERT INTO states SET ?', req.body, 
        function (err, result, fields) {
            if (err) throw err;
            connection.query('SELECT * FROM states', function(err, results) {
            	res.json(results)
            })
        }
    );
});



module.exports = router;