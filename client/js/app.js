'use strict';

angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
])
.config(['$provide', '$routeProvider', function($provide, $routeProvider) {
	var routes = {
		twelveSixSix : "partials/layouts/twelveSixSix.tpl.html",
		twelveZeroZero : "partials/layouts/twelveZeroZero.tpl.html",
		zeroSixSix : "partials/layouts/zeroSixSix.tpl.html"
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
.run(function($http, $templateCache) {
    $http.get("partials/widgets/panel.tpl.html", { cache: $templateCache });
    $http.get("partials/widgets/widget1.tpl.html", { cache: $templateCache });
    $http.get("partials/widgets/graph.tpl.html", { cache: $templateCache });
    $http.get("partials/widgets/dashboard.tpl.html", { cache: $templateCache });
});

