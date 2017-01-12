(function () {
'use strict';

angular.module('app.controllers')
	.controller('CreateShortURLController', CreateShortURLController);

var depNames = [
	'$scope',
	'$stateParams',
	'$ionicPopup',
	'ShortURLRepository'
];

// ==============================================================================
// Constructor
// ==============================================================================

function CreateShortURLController () {
	var self = this;
	// Attaching dependencies
	[].forEach.call(arguments, function (dependency, index) {
		self[depNames[index]] = dependency;
	});

	self.vm = {};
	self.$scope.$on('$ionicView.beforeEnter', self.onIonicViewBeforeEnter.bind(self));
}
CreateShortURLController.$inject = depNames;

// ==============================================================================
// Event Handlers
// ==============================================================================

CreateShortURLController.prototype.onIonicViewBeforeEnter = function onIonicViewBeforeEnter () {
	var self = this;
	self.vm.longURLInput = '';
};

CreateShortURLController.prototype.onClickCreateButton = function onClickCreateButton () {
	var self = this;
	self.ShortURLRepository.createShortURL(self.vm.longURLInput).then(function (shortURL) {
		return self.$ionicPopup.alert({
			title: 'Short URL Created',
			template: 'Created short URL: /u/' + shortURL['short_url_id']
		});
	}).then(function () {
		// Clear out the input after the alert is dismissed.
		self.vm.longURLInput = '';
	});
};

})();