(function () {
'use strict';

const depNames = [
	'$stateProvider'
];

function shortURLRouteConfig (...dependencies) {
	// Attaching dependencies
	let deps = {};
	depNames.forEach((depName, index) => deps[depName] = dependencies[index]);

	deps.$stateProvider.state('tabsController.shortURL', {
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
}
shortURLRouteConfig.$inject = depNames;

angular.module('app.routes')
	.config(shortURLRouteConfig);

})();