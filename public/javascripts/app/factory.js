

angular.module('myApp').factory('AuthService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

    // create user variable
    var user = null;
    // return available functions for use in the controllers
    var service = {
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      register: register,
      getUsers: getUsers,
      find: find,
      remove: remove,
      update: update,
      getMongoLab: getMongoLab,
      postToMongoLab: postToMongoLab,
      hire: hire,
      getHired: getHired
    };

    return service;

    function update(id) {
      // var deferred = $q.defer();
      return $http.put('/api/users/' + id._id, id)
        .then(function(response){
          return response.data 
        }, function(response){
          alert(response)
        })
    }

    function remove(id) {

      // var deferred = $q.defer();
      return $http.delete('api/users/' + id)
        .then(function(response){
          return response.data 
        }, function(response){
          alert(response)
        })
    }

    function find(id) {
      // var deferred = $q.defer();
      return $http.get('/api/users/' + id)
        .then(function(response){
          return response.data 
        }, function(response){
          alert(response)
        })
    }

    function getUsers() {
      // var deferred = $q.defer();
      return $http.get('/api/users')
        .then(function(response){
          console.log(response.data)
          return response.data 
        }, function(response){
          alert(response)
        })
    }

        function getHired() {
      // var deferred = $q.defer();
          return $http.get('/api/hireme')
              .then(function(response){
                return response.data 
              }, function(response){
                alert(response)
              })
    }

    function isLoggedIn() {
      if(user) {
        return true;
      } else {
        return false;
      }
    }

    function getUserStatus() {
      return $http.get('/user/status')
      // handle success
      .success(function (data) {
        if(data.status){
          user = true;
        } else {
          user = false;
        }
      })
      // handle error
      .error(function (data) {
        user = false;
      });
    }

    function login(username, password) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/user/login',
        {username: username, password: password})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            user = true;
            deferred.resolve();
          } else {
            user = false;
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    function logout() {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a get request to the server
      $http.get('/user/logout')
        // handle success
        .success(function (data) {
          user = false;
          deferred.resolve();
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    function register(username, password) {

      return $http.post('/api/users', {username: username, password: password})
        .then(function(response) {
           return response.data;
        }, function(response) {
          alert(response)
        })
  

    }

    function getMongoLab() {
      // var deferred = $q.defer();
     return $http.get('/api/mongolab')
        .then(function(response) {
           return response.data;
        }, function(response) {
          alert(response)
        })

    }






    function postToMongoLab(fuck) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/api/mongolab', {fuck: fuck})
        // handle success
        .success(function (response) {
            deferred.resolve(response);
         
        }).error (function(response) {
          defer.reject(response)
        });
        

      // return promise object
      return deferred.promise;

    }


    
     function hire(firstname, lastname, email, phone, message) {

      return $http.post('/api/hireme', {
        firstname: firstname,
         lastname: lastname, 
         email: email, 
         phone: phone, 
         message: message
      })
      .then(function(response) {
        return response.data 
      }, function(response){
        alert(response)
      })
  
    }



}]);