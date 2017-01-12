(function () {
'use strict';

const depNames = [
	'$urlRouterProvider'
];

function routesConfig (...dependencies) {
	// Attaching dependencies
	let deps = {};
	depNames.forEach((depName, index) => deps[depName] = dependencies[index]);

	deps.$urlRouterProvider.otherwise('/short_urls');
}
routesConfig.$inject = depNames;

angular.module('app.routes')
	.config(routesConfig);

})();