'use strict';
angular.module('widgets.dashboard', [])
    .controller('DashboardCtrl', function($scope, $http){
        console.log('http get');
        $scope.summary = {};
        $http.get('/auth/user/summary').success(function(data){
           $scope.summary = data;
        });

    });