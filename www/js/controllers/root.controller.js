(function () {
'use strict';

angular.module('app.controllers')
	.controller('RootController', RootController);

var depNames = [
	'$scope',
	'$rootScope'
];

// ==============================================================================
// Constructor
// ==============================================================================

function RootController () {
	var self = this;
	// Attaching dependencies
	[].forEach.call(arguments, function (dependency, index) {
		self[depNames[index]] = dependency;
	});
	// TODO Do some initialization logic here?
}
RootController.$inject = depNames;


})();