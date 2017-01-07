(function () {
'use strict';

angular.module('app.services')
	.service('ShortURLAPI', ShortURLAPI);

var depNames = [
	'$http'
];

// ==============================================================================
// Constructor
// ==============================================================================

function ShortURLAPI () {
	var self = this;
	// Attaching dependencies
	[].forEach.call(arguments, function (dependency, index) {
		self[depNames[index]] = dependency;
	});

	// TODO should be set by a constant or via provider in app.config
	self.BASE_URL = 'https://radiant-oasis-85887.herokuapp.com/api';
}
ShortURLAPI.$inject = depNames;

// ==============================================================================
// Public Methods
// ==============================================================================

ShortURLAPI.prototype.getShortURLs = function getShortURLs () {
	var self = this;
	return self.$http.get(self.BASE_URL + '/short_urls').then(function (response) {
		return response.data;
	});
};

ShortURLAPI.prototype.getShortURL = function getShortURL (shortURLID) {
	var self = this;
	return self.$http.get(self.BASE_URL + '/short_urls/' + shortURLID).then(function (response) {
		return response.data;
	});
};

ShortURLAPI.prototype.createShortURL = function (longURL) {
	var self = this;
	return self.$http.post(self.BASE_URL + '/short_urls', {
		'original_url': longURL
	}).then(function (response) {
		return response.data;
	});
};

})();