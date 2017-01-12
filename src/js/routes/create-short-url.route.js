(function () {
'use strict';

const depNames = [
	'$stateProvider'
];

function createShortURLRouteConfig (...dependencies) {
	// Attaching dependencies
	let deps = {};
	depNames.forEach((depName, index) => deps[depName] = dependencies[index]);

	deps.$stateProvider.state('tabsController.createShortURL', {
		url: '/create_url',
		views: {
			'tab2': {
				templateUrl: 'templates/createShortURL.html',
				controller: 'CreateShortURLController',
				controllerAs: '$ctrl'
			}
		}
	});
}
createShortURLRouteConfig.$inject = depNames;

angular.module('app.routes')
	.config(createShortURLRouteConfig);

})();