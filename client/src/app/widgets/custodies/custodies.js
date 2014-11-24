angular.module('widgets.custodies', ['storage'])

.controller('CustodiesCtrl', function($scope, $http, storage, ngTableParams){
  $scope.custody = {};
  $scope.custodies = storage.getCustodies();  
  $scope.tableParams = new ngTableParams({
        page: 1,            
        count: 5           
    }, {
        getData: function($defer, params) {
          var custodies = storage.getCustodies();  
          $http.get('/auth/instruments').success(function(instruments) {
          console.log(instruments);
          custodies2 = custodies.map(function(custody) {
                custody.total = 0;
                for( var i =0; i<custody.holdings.length; i++) {
                  var instr = instruments[custody.holdings[i].symbol];
                  custody.total+=(instr.lastTradePrice*custody.holdings[i].amount);
                }
                return custody;
              });
          console.log(custodies2);
          $defer.resolve(custodies2);
          });            
        }
    });


  $scope.addCustody = function() {
  	if (!$scope.custody.name) {
  		$scope.error = "Name should not be empty";
  		return;
  	}
    $http.post('/auth/custody', $scope.custody)
        .success(function(custody) {
                console.log(custody);
                $scope.custodies.push(custody)
                storage.addCustody(custody);
                $scope.custody = {};
            })
            .error(function(err) {
                    $scope.error = err.error;
            });
  }

  $scope.isAddCustodyAllowed = function() {
  	return $scope.custodies.length<5;
  }
});