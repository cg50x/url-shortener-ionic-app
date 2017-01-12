(function () {
'use strict';

const depNames = [
	'$scope',
	'$stateParams',
	'$timeout',
	'ShortURLRepository'
];

class ShortURLsController {
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
		this.vm.isLoadingData = true;
		this._refreshShortURLView().catch((err) => {
			// Do something with the error
		}).finally(() => {
			this.vm.isLoadingData = false;
		});
	}

	onPullIonRefresher () {
		this._refreshShortURLView().catch((err) => {
			// Do something with the error
		}).finally(() => {
			this.$scope.$broadcast('scroll.refreshComplete');
		});
	}

	// ==============================================================================
	// Private Methods
	// ==============================================================================

	_refreshShortURLView () {
		return this.ShortURLRepository.getShortURLs().then((shortURLs) => {
			this.vm.shortURLList = this._getShortURLListViewModel(shortURLs);
		});
	}

	// Generates the view model given the short url data from the repository
	_getShortURLListViewModel (shortURLs) {
		let viewModel = shortURLs.map((shortURL) => {
			return {
				label: `/u/${shortURL.shortUrlId} - ${shortURL.originalUrl}`,
				shortURLID: shortURL.shortUrlId
			};
		});
		// TODO reversing the order so that the newest items show at the top.
		// Need to expose createdOn in the server API and sort by createdOn instead.
		viewModel.reverse();
		return viewModel;
	}
}
ShortURLsController.$inject = depNames;


angular.module('app.controllers')
	.controller('ShortURLsController', ShortURLsController);

})();