(function () {
'use strict';

angular.module('app.routes')
	.config(function($stateProvider) {
  	$stateProvider.state('tabsController.shortURLs', {
		url: '/short_urls',
		views: {
			'tab1': {
				templateUrl: 'templates/shortURLs.html',
				controller: 'ShortURLsController',
				controllerAs: '$ctrl'
			}
		}
	});
});

})();