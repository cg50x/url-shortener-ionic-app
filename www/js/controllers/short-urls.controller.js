(function () {
'use strict';

angular.module('app.controllers')
	.controller('ShortURLsController', ShortURLsController);

var depNames = [
	'$scope',
	'$stateParams',
	'$timeout',
	'ShortURLRepository'
];

// ==============================================================================
// Constructor
// ==============================================================================

function ShortURLsController () {
	var self = this;
	// Attaching dependencies
	[].forEach.call(arguments, function (dependency, index) {
		self[depNames[index]] = dependency;
	});

	self.vm = {};
	self.$scope.$on('$ionicView.beforeEnter', self.onIonicViewBeforeEnter.bind(self));
}
ShortURLsController.$inject = depNames;

// ==============================================================================
// Event Handlers
// ==============================================================================

ShortURLsController.prototype.onIonicViewBeforeEnter = function onIonicViewBeforeEnter () {
	var self = this;
	self.vm.isLoadingData = true;
	self._refreshShortURLView().catch(function (err) {
		// Do something with the error
	}).finally(function () {
		self.vm.isLoadingData = false;
	});
};

ShortURLsController.prototype.onPullIonRefresher = function onPullIonRefresher () {
	var self = this;
	self._refreshShortURLView().catch(function (err) {
		// Do something with the error
	}).finally(function () {
		self.$scope.$broadcast('scroll.refreshComplete');
	});
};

// ==============================================================================
// Private Methods
// ==============================================================================

ShortURLsController.prototype._refreshShortURLView = function _refreshShortURLView () {
	var self = this;
	return self.$timeout(function () {}, 5000).then(function () {
		return self.ShortURLRepository.getShortURLs();
	}).then(function (shortURLs) {
		self.vm.shortURLListItems = shortURLs.map(function (shortURL) {
			return {
				label: '/u/' + shortURL['short_url_id'] + ' - ' + shortURL['original_url'],
				shortURLID: shortURL['short_url_id']
			};
		});
		// Reverse list items so that the short urls are listed from newest to oldest.
		// TODO expose created_on timestamp in server response and sort by created_on instead
		self.vm.shortURLListItems.reverse();
	});
};

})();