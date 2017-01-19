exports.index = function(req, res){
  res.render('index');
};
 
exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};

exports.nested = function (req, res) {
	var name = req.params.name;
	var id = req.params.id;
  res.render('partials/' + name + '/' + id);
}