(function(){
	angular.module('myApp').
		directive('myHighlighter', function(){
			return {
				restrict: 'A',
				link: function link(scope, element, attrs, controller, transcludeFn) {
						element.css({
							color: 'yellow'
							}) 
						console.log(element)
				 }

			}
		})

})()