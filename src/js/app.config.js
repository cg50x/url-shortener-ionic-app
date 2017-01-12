(function () {
'use strict';

const depNames = [
	'SHORT_URL_API_BASE_URL',
	'ShortURLAPIProvider',
];

function AppConfig (...dependencies) {
	// Attaching dependencies
	let deps = {};
	depNames.forEach((depName, index) => deps[depName] = dependencies[index]);

	deps.ShortURLAPIProvider.setBaseURL(deps.SHORT_URL_API_BASE_URL);
	deps.ShortURLAPIProvider.useCamelCaseConversion(true);
}
AppConfig.$inject = depNames;

angular.module('app')
	.config(AppConfig);

})();