'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])

  .directive('widget', function() {
    return {
    restrict: 'E',
    transclude: true,
    scope: { title:'@',
    		 minimizable: '=',
    		 removable: '=' 
    		},
    template:
    	'<div class="panel panel-primary">' +
			'<div class="panel-heading">' +
				'<h3 class="panel-title">{{title}}</h3>' +
				'<span class="pull-right clickable">'+
				'<i class="glyphicon {{state}}" ng-click="toggle()" ng-show="{{minimizable}}"></i>'+
				'<i class="glyphicon glyphicon-remove" ng-click="remove()" ng-show="{{removable}}"></i></span>' +
			'</div>' +
			'<div class="panel-body" ng-transclude>'+
			'</div>' +
		'</div>',
     link: function(scope, element, attrs) {
      scope.state = "glyphicon-minus";
      scope.toggle = function() {
      	if (scope.state=='glyphicon-minus') {
      		element.find('.panel-body').slideUp(function() {});
      		scope.state = 'glyphicon-plus';
      	} else {	
      		element.find('.panel-body').slideDown();
      		scope.state = 'glyphicon-minus';

      	}
      };
      scope.remove = function() {
      	element.hide();
      }
    }
    }
  })
  .directive('graph', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
          scope.getData(function(data){
            console.log(data);
            element.highcharts('StockChart', {
              credits: {
                enabled: false
              },
              series : [{
                name : 'Stock',
                data : data
              }]
            });
          });
      }
    }
  })


