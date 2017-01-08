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
	return self._authGet(self._BASE_URL + '/short_urls').then(function (response) {
		return response.data;
	});
};

ShortURLAPI.prototype.getShortURL = function getShortURL (shortURLID) {
	var self = this;
	return self._authGet(self._BASE_URL + '/short_urls/' + shortURLID).then(function (response) {
		return response.data;
	});
};

ShortURLAPI.prototype.createShortURL = function createShortURL (longURL) {
	var self = this;
	var data = {
		'original_url': longURL
	};
	return self._authPost(self._BASE_URL + '/short_urls', data).then(function (response) {
		return response.data;
	});
};

ShortURLAPI.prototype.setAuthToken = function setAuthToken (token) {
	var self = this;
	self._authToken = token;
};

// ==============================================================================
// Private Methods
// ==============================================================================

// Wrapper around $http.get. Ensures that the auth token is included in the header.
ShortURLAPI.prototype._authGet = function _authGet (url, httpConfig) {
	var self = this;
	return self.$http.get(url, self._authHTTPConfig(httpConfig));
}

// Wrapper around $http.post. Ensures that the auth token is included in the header.
ShortURLAPI.prototype._authPost = function _authPost (url, data, httpConfig) {
	var self = this;
	return self.$http.post(url, data, self._authHTTPConfig(httpConfig));
}

// Ensures that the http config object includes the access token in the header.
// This function mutates the http config object.
// Returns the http config object.
ShortURLAPI.prototype._authHTTPConfig = function _authHTTPConfig (httpConfig) {
	var self = this;
	httpConfig = httpConfig || {};
	httpConfig.headers = Object.assign(httpConfig.headers || {}, {
		'Access-Token': self._authToken
	});
	return httpConfig;
};

})();