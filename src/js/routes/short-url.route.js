(function () {
'use strict';

angular.module('app.routes')
	.config(function($stateProvider) {
	$stateProvider.state('tabsController.shortURL', {
		url: '/short_url',
		params: {
			shortURLID: null
		},
		views: {
			'tab1': {
				templateUrl: 'templates/shortURL.html',
				controller: 'ShortURLController',
				controllerAs: '$ctrl'
			}
		}
	});
});

})();