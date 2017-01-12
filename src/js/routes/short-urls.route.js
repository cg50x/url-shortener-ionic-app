(function () {
'use strict';

const depNames = [
	'$stateProvider'
];

function shortURLsRouteConfig (...dependencies) {
	// Attaching dependencies
	let deps = {};
	depNames.forEach((depName, index) => deps[depName] = dependencies[index]);

	deps.$stateProvider.state('tabsController.shortURLs', {
		url: '/short_urls',
		views: {
			'tab1': {
				templateUrl: 'templates/shortURLs.html',
				controller: 'ShortURLsController',
				controllerAs: '$ctrl'
			}
		}
	});
}
shortURLsRouteConfig.$inject = depNames;

angular.module('app.routes')
	.config(shortURLsRouteConfig);

})();