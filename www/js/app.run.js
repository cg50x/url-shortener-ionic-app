(function () {
'use strict';

angular.module('app')
	.run(AppRun);

var depNames = [
	'$window',
	'$ionicPlatform',
	'ShortURLAPI'
];

function AppRun () {
	var deps = {};
	[].forEach.call(arguments, function (dependency, index) {
		deps[depNames[index]] = dependency;
	});
	deps.$ionicPlatform.ready(function () {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		var cordova = deps.$window.cordova;
		if (cordova && cordova.plugins && cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);
		}
		if (deps.$window.StatusBar) {
			// org.apache.cordova.statusbar required
			deps.$window.StatusBar.styleDefault();
		}
	});
	deps.ShortURLAPI.setAuthToken('12345');
}
AppRun.$inject = depNames;

})();