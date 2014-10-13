'use strict';
angular.module('myApp.services', [])


.factory('WidgetFactory', function() {
    return {
    	dashboard : 'partials/widgets/dashboard.tpl.html',
    	panel : 'partials/widgets/panel.tpl.html',
    	widget1 : 'partials/widgets/widget1.tpl.html',
    	graph : 'partials/widgets/graph.tpl.html',
    	stockInfo : 'partials/widgets/stockInfo.tpl.html'
    }
})
.factory('AppConfig', function() {
	return window.myAppConfig;
})