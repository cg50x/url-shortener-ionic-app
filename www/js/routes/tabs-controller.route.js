(function () {
'use strict';

angular.module('app.routes')
	.config(function($stateProvider) {
	$stateProvider.state('tabsController', {
		url: '/page1',
		templateUrl: 'templates/tabsController.html',
		abstract:true
	});
});

})();