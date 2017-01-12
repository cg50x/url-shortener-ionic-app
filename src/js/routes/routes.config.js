(function () {
'use strict';

angular.module('app.routes')
	.config(function ($urlRouterProvider) {
	$urlRouterProvider.otherwise('/short_urls');
});

})();