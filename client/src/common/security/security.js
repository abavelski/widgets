angular.module('security.service', ['security.login','ui.bootstrap'])

.factory('security', function($http, $q, $location, $modal, $window) {

  function redirect(url) {
    url = url || '/';
    $location.path(url);
  }

  var modalInstance;

  function openLoginDialog() {
      modalInstance = $modal.open({
          templateUrl: 'security/login/form.tpl.html',
          controller: 'LoginFormController'
      });
  }

  var service = {
    showLogin: function() {
      openLoginDialog();
    },

    login: function(username, password, callback) {
      $http.post('/api/login', {username: username, password: password})
          .success(function(data){
              console.log(data);
              $window.sessionStorage.token = data.token;
              if ( service.isAuthenticated() ) {
                  modalInstance.close(true);
              }
          })
          .error(function(){
            delete $window.sessionStorage.token
            callback('Invalid credentials');
          });
    },

    logout: function(redirectTo) {
      console.log($window.sessionStorage.token);
      $http.get('/auth/bla').success(function(data){
        console.log(data);
        delete $window.sessionStorage.token
      });
      
      redirect(redirectTo);      
    },

    isAuthenticated: function(){
      return !!$window.sessionStorage.token;
    },

    token : $window.sessionStorage.token

  };

  return service;
})

.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      }
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        // handle the case where the user is not authenticated
      }
      return response || $q.when(response);
    }
  };
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});

