(function () {
'use strict';

const depNames = [
	'$window',
	'$ionicPlatform',
	'ShortURLAPI'
];

function AppRun (...dependencies) {
	// Attaching dependencies
	let deps = {};
	depNames.forEach((depName, index) => deps[depName] = dependencies[index]);

	deps.$ionicPlatform.ready(() => {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		let cordova = deps.$window.cordova;
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

angular.module('app')
	.run(AppRun);

})();