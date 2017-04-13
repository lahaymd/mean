(function() {
	angular.module('myApp').
		directive('fileInput', ['$parse', function($parse){
			return {
				restict: 'A',
				link: function(scope,elm,attrs){
					elm.bind('change', function(){
						$parse(attrs.fileInput)
						.assign(scope,elm[0].files)
						scope.$apply()
						console.log(attrs.fileInput,'file input')
					})
				}
			}
		}])
})()