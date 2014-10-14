angular.module('app', [ 'templates.app', 'templates.common', 'layouts', 'widget', 'widgets'])

.controller('AppCtrl', ['$scope', function($scope) {}])

.controller('HeaderCtrl', function ($scope, $location) {
		$scope.test = "Bla bla bla";
  		$scope.isActive = function(str){ return $location.path().search(str)>-1; };
  		$location.path('/instruments');
});