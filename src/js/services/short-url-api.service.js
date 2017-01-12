(function () {
'use strict';

angular.module('app.services')
	.provider('ShortURLAPI', ShortURLAPIProvider);

var depNames = [
	'$http',
	'$httpParamSerializer',
	'_'
];

// ==============================================================================
// ShortURLAPI Provider Recipe
// ==============================================================================

function ShortURLAPIProvider () {
	var baseURLToUse;
	var isUsingCamelCase = false;
	this.setBaseURL = function setBaseURL (baseURL) {
		baseURLToUse = baseURL;
	};
	this.useCamelCaseConversion = function useCamelCaseConversion (isEnabled) {
		isUsingCamelCase = isEnabled;
	};
	this.$get = depNames.concat(function () {
		var dependencies = Array.prototype.slice.call(arguments);
		var serviceInstance = new (Function.prototype.bind.apply(ShortURLAPI, [null].concat(dependencies)))();
		serviceInstance._BASE_URL = baseURLToUse;
		serviceInstance._USE_CAMEL_CASE = isUsingCamelCase;
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
};

// Wrapper around $http.post. Ensures that the auth token is included in the header.
ShortURLAPI.prototype._authPost = function _authPost (url, data, httpConfig) {
	var self = this;
	return self.$http.post(url, data, self._authHTTPConfig(httpConfig));
};

// Ensures that the http config object includes the access token in the header.
// This function mutates the http config object.
// Returns the http config object.
ShortURLAPI.prototype._authHTTPConfig = function _authHTTPConfig (httpConfig) {
	var self = this;
	httpConfig = self._getHTTPConfig(httpConfig);
	httpConfig.headers = Object.assign(httpConfig.headers || {}, {
		'Access-Token': self._authToken
	});
	return httpConfig;
};

ShortURLAPI.prototype._getHTTPConfig = function _getHTTPConfig (httpConfig) {
	var self = this;
	// Default param serializer and transformers
	var paramSerializer = self.$httpParamSerializer;
	var requestTransformers = self.$http.defaults.transformRequest;
	var responseTransformers = self.$http.defaults.transformResponse;
	// If camel case conversion is turned on, apply the transformations
	if (self._USE_CAMEL_CASE) {
		paramSerializer = self._paramSerializer.bind(self);
		requestTransformers = [].concat(requestTransformers, self._transformRequest.bind(self));
		responseTransformers = [].concat(responseTransformers, self._transformResponse.bind(self));
	}
	httpConfig = Object.assign(httpConfig || {}, {
		paramSerializer: paramSerializer,
		transformRequest: requestTransformers,
		transformResponse: responseTransformers
	});
	return httpConfig;
};

ShortURLAPI.prototype._paramSerializer = function _paramSerializer (paramObject) {
	var self = this;
	// Ensure http parameters are transformed into snake case before sent to the server
	paramObject = self._transformKeysDeep(paramObject, self._.snakeCase);
	return self.$httpParamSerializer(paramObject);
};

ShortURLAPI.prototype._transformRequest = function _transformRequest (data, headerGetter) {
	var self = this;
	// Ensure keys are converted to snake case before sent to server
	return self._transformKeysDeep(data, self._.snakeCase);
};

ShortURLAPI.prototype._transformResponse = function _transformResponse (data, headerGetter) {
	var self = this;
	// Ensure keys are converted to camel case after received from server
	return self._transformKeysDeep(data, self._.camelCase);
};

ShortURLAPI.prototype._transformKeysDeep = function _transformKeysDeep (data, keyTransformFunc) {
	var self = this;
	var _ = self._;
	function transformKeys (obj, v, k) {
		obj[keyTransformFunc(k)] = _.isObject(v) ? self._transformKeysDeep(v, keyTransformFunc) : v;
	}
	function transform (data) {
		return !_.isString(data) && !_.isNumber(data) ? _.transform(data, transformKeys) : data;
	}
	return _.isArray(data) ? _.map(data, transform) : transform(data);
};

})();