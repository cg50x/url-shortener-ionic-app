(function () {
'use strict';

angular.module('app.services')
	.provider('ShortURLAPI', ShortURLAPIProvider);

var depNames = [
	'$http'
];

// ==============================================================================
// ShortURLAPI Provider Recipe
// ==============================================================================

function ShortURLAPIProvider () {
	var baseURLToUse;
	this.setBaseURL = function setBaseURL (baseURL) {
		baseURLToUse = baseURL;
	};
	this.$get = depNames.concat(function () {
		var dependencies = Array.prototype.slice.call(arguments);
		var serviceInstance = new (Function.prototype.bind.apply(ShortURLAPI, [null].concat(dependencies)))();
		serviceInstance._BASE_URL = baseURLToUse;
		return serviceInstance;
	});
}

// ==============================================================================
// ShortURLAPI Class Constructor
// ==============================================================================

function ShortURLAPI () {
	var self = this;
	// Attaching dependencies
	[].forEach.call(arguments, function (dependency, index) {
		self[depNames[index]] = dependency;
	});
}
ShortURLAPI.$inject = depNames;

// ==============================================================================
// Public Methods
// ==============================================================================

ShortURLAPI.prototype.getShortURLs = function getShortURLs () {
	var self = this;
	return self.$http.get(self._BASE_URL + '/short_urls').then(function (response) {
		return response.data;
	});
};

ShortURLAPI.prototype.getShortURL = function getShortURL (shortURLID) {
	var self = this;
	return self.$http.get(self._BASE_URL + '/short_urls/' + shortURLID).then(function (response) {
		return response.data;
	});
};

ShortURLAPI.prototype.createShortURL = function (longURL) {
	var self = this;
	return self.$http.post(self._BASE_URL + '/short_urls', {
		'original_url': longURL
	}).then(function (response) {
		return response.data;
	});
};

})();