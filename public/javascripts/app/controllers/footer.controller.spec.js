describe('footer controller jasmine test', function(){

		beforeEach(module('myApp'));



	describe('$ctrl.date', function() {
	  var myCtrl;
	   // beforeEach(angular.mock.module('angular-inview'));
	  beforeEach(inject(function($controller, $rootScope){
	  	  scope = $rootScope.$new();
	    // The injector unwraps the underscores (_) from around the parameter names when matching
	    myCtrl = $controller('FooterController');
	  spyOn(myCtrl, 'func')
	  myCtrl.func()
	  }));


	   it("tracks that the spy was called", function() {
    expect(myCtrl.func).toHaveBeenCalled();
  });

	  it('Mode should be fun', function(){  //write tests
            expect(myCtrl.test).toBe('I am a test'); //pass
        });

	  it('should exist', function() {
    expect(myCtrl).toBeDefined();
  });
	    it('sets the date to the current year', function() {
	      // var $ctrl = {};
	      // var controller = $controller('FooterController', {});
	      // $scope.password = 'longerthaneightchars';
	      // $scope.grade();
	      expect(myCtrl.date).toEqual(2017);
	    });
  });





		it('true should be true', function(){
			expect(1+1).toEqual(2)
		})
})