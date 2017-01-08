(function () {
'use strict';

angular.module('app.routes')
	.config(function($stateProvider) {
	$stateProvider.state('tabsController', {
		url: '',
		templateUrl: 'templates/tabsController.html',
		abstract: true,
		controller: 'RootController'
	});
});

})();