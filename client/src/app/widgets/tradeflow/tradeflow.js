angular.module('widgets.tradeflow', ['mgo-angular-wizard'])

.controller('TradeFlowCtrl', function($scope, WizardHandler, $routeParams){
	$scope.order = {
		action = $routeParams.action
	};
	$scope.instrument = {
		name : 'Carlsberg B'
	};

	$scope.next = function() {
  		WizardHandler.wizard().next();
  	}
  
});