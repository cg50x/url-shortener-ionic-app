(function () {
'use strict';

angular.module('app')
	.config(AppConfig);

var depNames = [
	// Constants
	'SHORT_URL_API_BASE_URL',

	// Providers
	'$sceDelegateProvider',
	'ShortURLAPIProvider',
];

function AppConfig () {
	// Attaching dependencies
	var deps = {};
	[].forEach.call(arguments, function (dependency, index) {
		deps[depNames[index]] = dependency;
	});

	deps.$sceDelegateProvider.resourceUrlWhitelist([
		'self',
		'*://www.youtube.com/**',
		'*://player.vimeo.com/video/**'
	]);
	deps.ShortURLAPIProvider.setBaseURL(deps.SHORT_URL_API_BASE_URL);
}
AppConfig.$inject = depNames;

})();