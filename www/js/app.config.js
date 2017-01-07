(function () {
'use strict';

angular.module('app')
	.config(function ($ionicConfigProvider, $sceDelegateProvider) {
	$sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);
});

})();