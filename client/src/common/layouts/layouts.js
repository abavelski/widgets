angular.module('layouts', ['ngRoute'])

.factory('WidgetFactory', function() {
    return {
      search : 'widgets/search/search.tpl.html',
      instrumentList : 'widgets/instrumentlist/instrumentList.tpl.html',
      graph : 'widgets/graph/graph.tpl.html',
      stockInfo : 'widgets/stockinfo/stockInfo.tpl.html'
    }
})

.factory('AppConfig', function() {
  return window.myAppConfig;
})

.config(['$provide', '$routeProvider', function($provide, $routeProvider) {
  var routes = {
    twelveSixSix : 'layouts/twelveSixSix.tpl.html',
    twelveZeroZero : 'layouts/twelveZeroZero.tpl.html',
    zeroSixSix : 'layouts/zeroSixSix.tpl.html'
  }
  $provide.decorator('AppConfig', function ($delegate) {
    var myConfig = $delegate;
      for (var i=0; i<myConfig.views.length; i++) {
      $routeProvider.when(myConfig.views[i].path, {
                            templateUrl: routes[myConfig.views[i].type], 
                            controller: 'ViewCtrl' });
                            }
      $routeProvider.otherwise({redirectTo: myConfig.views[0].path});
    return $delegate;
  });
}])

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
  });