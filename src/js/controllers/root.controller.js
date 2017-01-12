(function () {
'use strict';

const depNames = [
	'$scope',
	'$rootScope'
];

class RootController {
	constructor (...dependencies) {
		// Attaching dependencies
		depNames.forEach((depName, index) => this[depName] = dependencies[index]);
		// TODO Do some initialization logic here?
	}
}
RootController.$inject = depNames;

angular.module('app.controllers')
	.controller('RootController', RootController);

})();