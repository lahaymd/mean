

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
      findMongoLab: findMongoLab,
      hire: hire,
      getHired: getHired,
      getSession: getSession
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
        // console.log(user)
      if(user) {
        // console.log(user + 'user123')
        return true;
      } else {
        // console.log(user + 'user123')
        return false;
      }
    }

    function getUserStatus() {
      return $http.get('/api/mongolab/status')
        .then(function(response) {
          alert(response.data.status + 'resonseee')
          if(response.data.status !== false) {

           user = true;
           return response.data
        } else {
          user = false;
          return response.data
        }
           // return response.data;
        }, function(response) {
          user = false;
          alert(response)
        })

    }

    function login(username, password) {

      // create a new instance of deferred
      // var deferred = $q.defer();

      // send a post request to the server
      return $http.post('/user/login',
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
      // var deferred = $q.defer();

      // send a get request to the server
      return $http.get('/api/mongolab/logout')
        .then(function(data) {
          user = false;
          alert(data)
        }, function(data) {
          user = false;
          alert(data)
        })
        // handle success
      //   .success(function (data) {
      //     user = false;
      //     deferred.resolve();
      //   })
      //   // handle error
      //   .error(function (data) {
      //     user = false;
      //     deferred.reject();
      //   });

      // // return promise object
      // return deferred.promise;

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






    function postToMongoLab(fuck,shit) {
      return $http.post('/api/mongolab', {fuck: fuck, shit: shit})
        // handle success
         .then(function(response) {
          // console.log('response', response)
          // console.log('responSE.data', response.data)
          // alert(response.data)
            if(response.data == "") {
              alert('already in db')
            } else {

           user = true;
            }
           return response.data;
        }, function(response) {
          console.log(response)
          alert(response)
        })

    }



    function findMongoLab(fuck, shit) {
      return $http.post('/api/mongolab/login',
        {fuck: fuck, shit: shit})
        // handle success
        .then(function (response) {
           if(response.data.shit === shit){
            user = true;
           } else {
            user = false;
           }
           return response.data
        }, function(response) {
           alert(response)
        })
       
    }


    function getSession() {
      return $http.get('/api/mongolab/sess')
        .then(function(response) {
           return response.data;
        }, function(response) {
          alert(response)
        })
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