(function () {
'use strict';

var depNames = [
	'$http',
	'$httpParamSerializer',
	'_'
];

class ShortURLAPI {
	constructor (...dependencies) {
		// Attaching dependencies
		depNames.forEach((depName, index) => this[depName] = dependencies[index]);
	}

	// ==============================================================================
	// Public Methods
	// ==============================================================================

	getShortURLs () {
		return this._authGet(`${this._BASE_URL}/short_urls`).then((response) => response.data);
	};

	getShortURL (shortURLID) {
		return this._authGet(`{this._BASE_URL}/short_urls/${shortURLID}`).then((response) => response.data);
	};

	createShortURL (longURL) {
		var data = {
			originalUrl: longURL
		};
		return this._authPost(`${this._BASE_URL}/short_urls`, data).then((response) => response.data);
	};

	setAuthToken (token) {
		this._authToken = token;
	};

	// ==============================================================================
	// Private Methods
	// ==============================================================================

	// Wrapper around $http.get. Ensures that the auth token is included in the header.
	_authGet (url, httpConfig) {
		return this.$http.get(url, this._authHTTPConfig(httpConfig));
	};

	// Wrapper around $http.post. Ensures that the auth token is included in the header.
	_authPost (url, data, httpConfig) {
		return this.$http.post(url, data, this._authHTTPConfig(httpConfig));
	};

	// Ensures that the http config object includes the access token in the header.
	// This function mutates the http config object.
	// Returns the http config object.
	_authHTTPConfig (httpConfig) {
		httpConfig = this._getHTTPConfig(httpConfig);
		httpConfig.headers = Object.assign(httpConfig.headers || {}, {
			'Access-Token': this._authToken
		});
		return httpConfig;
	};

	_getHTTPConfig (httpConfig) {
		// Default param serializer and transformers
		var paramSerializer = this.$httpParamSerializer;
		var requestTransformers = this.$http.defaults.transformRequest;
		var responseTransformers = this.$http.defaults.transformResponse;
		// If camel case conversion is turned on, apply the transformations
		if (this._USE_CAMEL_CASE) {
			paramSerializer = this._paramSerializer.bind(this);
			requestTransformers = [].concat(requestTransformers, this._transformRequest.bind(this));
			responseTransformers = [].concat(responseTransformers, this._transformResponse.bind(this));
		}
		httpConfig = Object.assign(httpConfig || {}, {
			paramSerializer: paramSerializer,
			transformRequest: requestTransformers,
			transformResponse: responseTransformers
		});
		return httpConfig;
	};

	_paramSerializer (paramObject) {
		// Ensure http parameters are transformed into snake case before sent to the server
		paramObject = this._transformKeysDeep(paramObject, this._.snakeCase);
		return this.$httpParamSerializer(paramObject);
	};

	_transformRequest (data, headerGetter) {
		// Ensure keys are converted to snake case before sent to server
		return this._transformKeysDeep(data, this._.snakeCase);
	};

	_transformResponse (data, headerGetter) {
		// Ensure keys are converted to camel case after received from server
		return this._transformKeysDeep(data, this._.camelCase);
	};

	_transformKeysDeep (data, keyTransformFunc) {
		let _ = this._;
		let transformKeys = (obj, v, k) => {
			obj[keyTransformFunc(k)] = _.isObject(v) ? this._transformKeysDeep(v, keyTransformFunc) : v;
		};
		let transform = (data) => {
			return !_.isString(data) && !_.isNumber(data) ? _.transform(data, transformKeys) : data;
		};
		return _.isArray(data) ? _.map(data, transform) : transform(data);
	};
}
ShortURLAPI.$inject = depNames;


// ==============================================================================
// ShortURLAPI Provider Recipe
// ==============================================================================

class ShortURLAPIProvider {
	constructor () {
		this._baseURL = null;
		this._isUsingCamelCase = false;
		this.$get = [...depNames, this._factoryFunction.bind(this)];
	}

	setBaseURL (baseURL) {
		this._baseURL = baseURL;
	}

	useCamelCaseConversion (isEnabled) {
		this._isUsingCamelCase = isEnabled;
	}

	_factoryFunction (...dependencies) {
		let serviceInstance = new ShortURLAPI(...dependencies);
		serviceInstance._BASE_URL = this._baseURL;
		serviceInstance._USE_CAMEL_CASE = this._isUsingCamelCase;
		return serviceInstance;
	}
}

angular.module('app.services')
	.provider('ShortURLAPI', ShortURLAPIProvider);

})();