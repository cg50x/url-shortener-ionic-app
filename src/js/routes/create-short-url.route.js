(function () {
'use strict';

angular.module('app.routes')
	.config(function($stateProvider) {
	$stateProvider.state('tabsController.createShortURL', {
		url: '/create_url',
		views: {
			'tab2': {
				templateUrl: 'templates/createShortURL.html',
				controller: 'CreateShortURLController',
				controllerAs: '$ctrl'
			}
		}
	});
});

})();