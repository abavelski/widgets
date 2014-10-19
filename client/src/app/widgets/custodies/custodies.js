angular.module('widgets.custodies', ['storage'])

.controller('CustodiesCtrl', function($scope, $http, storage, ngTableParams){
  $scope.custodies = storage.getCustodies();
  $scope.custody = {};
  $scope.tableParams = new ngTableParams({
    count: $scope.custodies.length 
    },{
    counts: [] 
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