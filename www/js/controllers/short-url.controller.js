(function () {
'use strict';

angular.module('app.controllers')
	.controller('ShortURLController', ShortURLController);

var depNames = [
	'$scope',
	'$stateParams',
	'$window',
	'ShortURLRepository'
];

// ==============================================================================
// Constructor
// ==============================================================================

function ShortURLController () {
	var self = this;
	// Attaching dependencies
	[].forEach.call(arguments, function (dependency, index) {
		self[depNames[index]] = dependency;
	});

	self.vm = {};
	self.$scope.$on('$ionicView.beforeEnter', self.onIonicViewBeforeEnter.bind(self));
}
ShortURLController.$inject = depNames;

// ==============================================================================
// Event Handlers
// ==============================================================================

ShortURLController.prototype.onIonicViewBeforeEnter = function onIonicViewBeforeEnter () {
	var self = this;
	var shortURLID = self.$stateParams.shortURLID;
	self.ShortURLRepository.getShortURL(shortURLID).then(function (shortURL) {
		self.vm.headerText = '/u/' + shortURL['short_url_id'];
		self.vm.originalURLText = shortURL['original_url'];
		self.vm.linkURL = 'https://radiant-oasis-85887.herokuapp.com/u/' + shortURL['short_url_id'];
	});
};

ShortURLController.prototype.openLinkURL = function openLinkURL (linkURL) {
	var self = this;
	self.$window.open(linkURL);
};

})();