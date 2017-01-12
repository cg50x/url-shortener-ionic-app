(function () {
'use strict';

var depNames = [
	'$scope',
	'$stateParams',
	'$ionicPopup',
	'ShortURLRepository'
];

class CreateShortURLController {
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
		this.vm.longURLInput = '';
	}

	onClickCreateButton () {
		this.ShortURLRepository.createShortURL(this.vm.longURLInput).then((shortURL) => {
			return this.$ionicPopup.alert({
				title: 'Short URL Created',
				template: `Created short URL: /u/${shortURL.shortUrlId}`
			});
		}).then(() => {
			// Clear out the input after the alert is dismissed.
			this.vm.longURLInput = '';
		});
	}
}
CreateShortURLController.$inject = depNames;

angular.module('app.controllers')
	.controller('CreateShortURLController', CreateShortURLController);

})();