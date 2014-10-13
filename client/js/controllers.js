'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ui.bootstrap', 'ngTable'])

.controller('HeaderCtrl', function ($scope, $location, AppConfig) {
  $scope.isActive = function(str){ return $location.path().search(str)>-1; };
})

.controller('ViewCtrl', function($scope, WidgetFactory, $location, $route, AppConfig) {
    var setupView = function(widgets) {
      if (widgets.north) {
        $scope.northItems = [];
        for (var i = 0; i < widgets.north.length; i++) {
          $scope.northItems.push(WidgetFactory[widgets.north[i]]);
        };
      }

      if (widgets.east) {
        $scope.eastItems=[];
        for (var i = 0; i < widgets.east.length; i++) {
          $scope.eastItems.push(WidgetFactory[widgets.east[i]]);
        };
      }

      if (widgets.west) {
        $scope.westItems=[];
        for (var i = 0; i < widgets.west.length; i++) {
          $scope.westItems.push(WidgetFactory[widgets.west[i]]);
        };
      }
    };

    for (var i=0; i<AppConfig.views.length; i++) {
      if (AppConfig.views[i].path === $route.current.$$route.originalPath) {
        setupView(AppConfig.views[i].widgets)
      }
    }
  })

.controller('PanelCtrl', function($scope, $http, ngTableParams){
  $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10           // count per page
    }, {
        getData: function($defer, params) {
            $http.get('/api/companies').success(function(data){
              $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            });            
        }
    });
})

.controller('StockInfoCtrl', function($scope, $http, ngTableParams, $routeParams){
  $scope.tableParams = new ngTableParams({
        count: 12           // count per page
    }, {
        total: 12, 
        counts: [],
        getData: function($defer, params) {
            $http.get('/api/companies/'+$routeParams.symbol).success(function(data){
              console.log(data);
              var result = [];
              for (var prop in data) {
                console.log(prop, data[prop]);
                if(data.hasOwnProperty(prop)){
                result.push({name : prop, value: data[prop]});
                }
              }
              console.log(result);
              $defer.resolve(result);
            });            
        }
    });
})

.controller('SearchCtrl', function ($scope, $http, $location) {
  $scope.getCompanies = function(val) {
    return $http.get('/api/companies/lookup/'+val).then(function(response){
      return response.data;
    });
  };

  $scope.onSelect = function (item) {
    console.log(item);
    $location.path('/instrument/'+item.symbol+'/details');
  };
})

.controller('GraphCtrl', function($scope, $http, $routeParams){
  $scope.getData = function(callback) {
    $http.get('/api/companies/history/'+$routeParams.symbol).success(callback);
  }

});
