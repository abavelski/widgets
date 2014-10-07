'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ui.bootstrap.collapse'])

.controller('HeaderCtrl', ['$scope', '$location', 'AppConfig', function ($scope, $location, config) {
  $scope.isActive = function(str){ return $location.path().search(str)>-1; };
  $location.path(config.views[0].path);
}])

.controller('ViewCtrl', ['$scope','WidgetFactory', '$location', '$route','AppConfig', 
  function($scope, widgetsFactory, $location, $route, config) {

    var setupView = function(widgets) {
      if (widgets.north) {
        $scope.northItems = [];
        for (var i = 0; i < widgets.north.length; i++) {
          $scope.northItems.push(widgetsFactory[widgets.north[i]]);
        };
      }

      if (widgets.east) {
        $scope.eastItems=[];
        for (var i = 0; i < widgets.east.length; i++) {
          $scope.eastItems.push(widgetsFactory[widgets.east[i]]);
        };
      }

      if (widgets.west) {
        $scope.westItems=[];
        for (var i = 0; i < widgets.west.length; i++) {
          $scope.westItems.push(widgetsFactory[widgets.west[i]]);
        };
      }
    };

    for (var i=0; i<config.views.length; i++) {
      if (config.views[i].path === $route.current.$$route.originalPath) {
        setupView(config.views[i].widgets)
      }
    }
  }])

.controller('PanelCtrl', ['$scope', function($scope){
  $scope.bla="From controller";
}])




