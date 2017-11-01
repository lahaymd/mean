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
  beforeEach(inject(function($injector,_AuthService_, _$mdToast_) {
  	// _$mdToast__ = $injector.get('ngMaterial');
  	toast = _$mdToast_;
    Users = _AuthService_;
     $httpBackend = $injector.get('$httpBackend');
  }));

     afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });

  // A simple test to verify the Users factory exists
  it('should exist', ()=> {
    expect(Users).toBeDefined();
  });
  it('should find number of uppercase letters', function(){
  	expect(Users.findUppercase(x)).toEqual(2);
  })

  it('should fail number of uppercase letters', function(){
  	expect(Users.findUppercase(y)).toEqual(1);
  })

  it('should return fuck and shit', function(){

            $httpBackend.when('POST', '/api/mongolab/login').respond(
              {_id: "58cbda3a1941c05fa8d029ef", fuck: "michael", shit: "lahay", __v: 0, files: "avatars/1500050266739.jpeg"})
             Users.findMongoLab().then(function(response) {
                expect(response).toEqual({_id: "58cbda3a1941c05fa8d029ef", fuck: "michael", shit: "lahay", __v: 0, files: "avatars/1500050266739.jpeg"}); //the response is null
            });
            $httpBackend.flush();

  })

});