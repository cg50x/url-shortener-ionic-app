(function () {
'use strict';

angular.module('app.routes', [])
	.config(function ($urlRouterProvider) {
	$urlRouterProvider.otherwise('/page1/short_urls')
});

})();