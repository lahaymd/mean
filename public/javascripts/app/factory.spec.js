describe('services factory', function(){
  var Users;
  var toast;
  var x = 'AB'
  var y = 'aB'
  var two = 2
  var n = null
  // Before each test load our api.users module
  beforeEach(angular.mock.module('ngMaterial'));
  beforeEach(angular.mock.module('api.users'));

  // Before each test set our injected Users factory (_Users_) to our local Users variable
  beforeEach(inject(function(_AuthService_, _$mdToast_) {
  	// _$mdToast__ = $injector.get('ngMaterial');
  	toast = _$mdToast_;
    Users = _AuthService_;
  }));

  // A simple test to verify the Users factory exists
  it('should exist', function() {
    expect(Users).toBeDefined();
  });
  it('should find number of uppercase letters', function(){
  	expect(Users.findUppercase(x)).toEqual(2);
  })

  it('should fail number of uppercase letters', function(){
  	expect(Users.findUppercase(y)).toEqual(1);
  })

});