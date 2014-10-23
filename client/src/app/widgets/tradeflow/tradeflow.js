angular.module('widgets.tradeflow', ['mgo-angular-wizard'])

.controller('TradeFlowCtrl', function($scope, WizardHandler){
	$scope.action = 'Buy';
	$scope.instrument = {
		name : 'Carlsberg B'
	};

	$scope.next = function() {
  		WizardHandler.wizard().next();
  	}
  
});