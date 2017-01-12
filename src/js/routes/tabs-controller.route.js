(function () {
'use strict';

const depNames = [
	'$stateProvider'
];

function tabsControllerRouteConfig (...dependencies) {
	// Attaching dependencies
	let deps = {};
	depNames.forEach((depName, index) => deps[depName] = dependencies[index]);

	deps.$stateProvider.state('tabsController', {
		url: '',
		templateUrl: 'templates/tabsController.html',
		abstract: true,
		controller: 'RootController'
	});
}
tabsControllerRouteConfig.$inject = depNames;

angular.module('app.routes')
	.config(tabsControllerRouteConfig);

})();