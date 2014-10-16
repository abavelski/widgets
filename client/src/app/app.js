angular.module('app', [ 'templates.app', 'templates.common', 'security','layouts', 'widget', 'widgets'])

.controller('AppCtrl', ['$scope', function($scope) {}])

.controller('HeaderCtrl', function ($scope, $location) {
  		$scope.isActive = function(str){ return $location.path().search(str)>-1; };
  		$location.path('/instruments');
})
.run(function(security){
	security.updateCurrentUser();
})