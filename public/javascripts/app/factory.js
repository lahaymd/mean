

angular.module('myApp').factory('AuthService',
  ['$q', '$timeout', '$http', '$mdToast',
  function ($q, $timeout, $http, $mdToast) {

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
      updateMongoLab: updateMongoLab,
      getMongoLab: getMongoLab,
      postToMongoLab: postToMongoLab,
      findMongoLab: findMongoLab,
      hire: hire,
      getHired: getHired,
      getSession: getSession,
      showToast: showToast,
      getUser: getUser
    };

    return service;

    function showToast() {
      console.log('from show toast service')
      $mdToast.show(
                     $mdToast.simple()
                        .textContent('not logged in ')  
                        .position('top')                     
                        .hideDelay(3000)
                        .theme("success-toast")
                  );
    }

    function update(id, payload) {
      // var deferred = $q.defer();
      return $http.put('/api/users/' + id, payload)
        .then(function(response){
          return response.data 
        }, function(response){
          // alert(response)
        })
    }

    function updateMongoLab(fuck, shit, files) {

      var fd = new FormData();
      // var defaultfile = files[0] || 
      if(fuck !== undefined) {

        fd.append('fuck', fuck);
      }
      if(shit !== undefined) {
        fd.append('shit', shit);
      }
        
      // if(files === undefined) {
      //   // alert(1)
      //   fd.append('files', '/images/cooper1.png')
      // } else {
        if(files !== undefined) {
          
        fd.append('files', files[0]);
        }
      // }
      console.log('fuck',fuck)
      console.log('shit',shit)
      console.log('ffiless',files)
          return $http.put('/api/mongolab/', fd,
             {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
          })
        .then(function(response){
          return response.data 
        }, function(response){
          // alert(response)
        })
    }

     function postToMongoLab(fuck,shit, files ) {
      
      // if(files === undefined) {files === 'public/images/cooper1.png'}
      // var formDatum = formData(fuck,shit,image)
      var fd = new FormData();
      // var defaultfile = files[0] || 

        fd.append('fuck', fuck);
        fd.append('shit', shit);
        
      if(files === undefined) {
        // alert(1)
        fd.append('files', '/images/cooper1.png')
      } else {
        fd.append('files', files[0]);
      }
      console.log(fuck)
      console.log(shit)
      console.log('ffiless',files)
      
      return $http.post('/api/mongolab', fd , 
          {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
          }

        )
        // handle success
         .then(function(response) {
          // console.log('response', response)
          // console.log('responSE.data', response.data)
          // alert('factory posttomongolab response' + JSON.stringify(response))
          // alert('factory posttomongolab response.data' +response.data)
            if(response.data == "" || response.data == 'this names taken') {
              alert('already in db')
            } else {

           user = true;
            }
           return response.data;
        }, function(response) {
          // console.log(response)
          // alert('error from factory posttomongolab ' + response.data)
        })

    }









    function remove(id) {

      // var deferred = $q.defer();
      return $http.delete('api/users/' + id)
        .then(function(response){
          return response.data 
        }, function(response){
          // alert(response)
        })
    }

    function find(id) {
      // var deferred = $q.defer();
      return $http.get('/api/users/' + id)
        .then(function(response){
          return response.data 
        }, function(response){
          // alert(response)
        })
    }

    function getUsers() {
      // var deferred = $q.defer();
      return $http.get('/api/users')
        .then(function(response){
          // console.log(response.data)
          return response.data 
        }, function(response){
          // alert(response)
        })
    }

        function getHired() {
      // var deferred = $q.defer();
          return $http.get('/api/hireme')
              .then(function(response){
                return response.data 
              }, function(response){
                // alert(response)
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
          // alert(response.data.status + ' RESPONSE')
          if(response.data.status !== false) {

           user = true;
           return response.data;
        } else {
          user = false;
          return response.data;
        }
           // return response.data;
        }, function(response) {
          user = false;
          // alert('error from factory getUserStatus' + response)
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
          // alert('logout data ' + data.data.status)
        }, function(data) {
          user = false;
          // alert(data)
        })
      
    }

    function register(username, password) {

      return $http.post('/api/users', {username: username, password: password})
        .then(function(response) {
           return response.data;
        }, function(response) {
          // alert(response)
        })
  

    }

    function getMongoLab() {
      // var deferred = $q.defer();
     return $http.get('/api/mongolab')
        .then(function(response) {
          // alert(JSON.stringify(response))
           return response.data;
        }, function(response) {
          // alert(response)
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
           // alert('response'+ JSON.stringify(response));
           return response.data;
        }, function(response) {
           alert(response)
        })
       
    }


    function getSession() {
      return $http.get('/api/mongolab/sess')
        .then(function(response) {
           // alert('error from factory getsession' +JSON.stringify(response))
           return response.data;
        }, function(response) {
          // alert('error from factory getsession' +response)
        })
    }

    function getUser() {
      return $http.get('/api/mongolab/id')
        .then(function(response){
          // alert('from getUser' + JSON.stringify(response))
          return response.data 
        }, function(response){
          // alert(response)
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
        // alert(response)
      })
  
    }



}]);