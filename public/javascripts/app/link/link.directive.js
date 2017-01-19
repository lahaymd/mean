(function() {
	angular.module('myApp')
		.directive('myDirective', function() {
      return {
        restrict: 'E',
        transclude : true,
        template: '<div>I am <span ng-transclude></span> directive {{test}}   {{userlist[0].username}}</div>',
        link: function(scope, element, attrs) {
                // console.log(scope.userlist , element , attrs)
                // scope.test= 'changed text from link function'
                element.addClass('foo');
                console.log(parseInt(attrs.bar) + 6);
                
                
        },

      }
})

})()