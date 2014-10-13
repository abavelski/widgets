angular.module('app', [ 'templates.app', 'templates.common', 'layouts', 'widget', 'widgets'])

.controller('AppCtrl', ['$scope', function($scope) {}])

.controller('HeaderCtrl', function ($scope, $location, AppConfig) {
  		$scope.isActive = function(str){ return $location.path().search(str)>-1; };
});