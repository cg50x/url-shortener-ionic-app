(function () {
'use strict';

var depNames = [
	'$scope',
	'$stateParams',
	'$window',
	'ShortURLRepository'
];

class ShortURLController {
	constructor (...dependencies) {
		// Attaching dependencies
		depNames.forEach((depName, index) => this[depName] = dependencies[index]);

		this.vm = {};
		this.$scope.$on('$ionicView.beforeEnter', this.onIonicViewBeforeEnter.bind(this));
	}

	// ==============================================================================
	// Event Handlers
	// ==============================================================================

	onIonicViewBeforeEnter () {
		var shortURLID = this.$stateParams.shortURLID;
		this.ShortURLRepository.getShortURL(shortURLID).then((shortURL) => {
			this.vm.headerText = `/u/${shortURL.shortUrlId}`;
			this.vm.originalURLText = shortURL.originalUrl;
			this.vm.linkURL = `https://radiant-oasis-85887.herokuapp.com/u/${shortURL.shortUrlId}`;
		});
	}
}
ShortURLController.$inject = depNames;

angular.module('app.controllers')
	.controller('ShortURLController', ShortURLController);

})();