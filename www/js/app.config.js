(function () {
'use strict';

angular.module('app')
	.config(AppConfig);

var depNames = [
	'SHORT_URL_API_BASE_URL',
	'ShortURLAPIProvider',
];

function AppConfig () {
	// Attaching dependencies
	var deps = {};
	[].forEach.call(arguments, function (dependency, index) {
		deps[depNames[index]] = dependency;
	});

	deps.ShortURLAPIProvider.setBaseURL(deps.SHORT_URL_API_BASE_URL);
}
AppConfig.$inject = depNames;

})();