(function () {
'use strict';

angular.module('app.repositories')
	.service('ShortURLRepository', ShortURLRepository);

var depNames = [
	'$q',
	'$window',
	'ShortURLAPI'
];

// ==============================================================================
// Constructor
// ==============================================================================

function ShortURLRepository () {
	var self = this;
	// Attaching dependencies
	[].forEach.call(arguments, function (dependency, index) {
		self[depNames[index]] = dependency;
	});

	// Initializing the persistent cache
	self._ShortURLStore = self.$window.localforage.createInstance({
		driver: [
			localforage.LOCALSTORAGE,
			localforage.INDEXEDDB,
			localforage.WEBSQL
		],
		name: 'ShortURLs'
	});
}
ShortURLRepository.$inject = depNames;

// ==============================================================================
// Public Methods
// ==============================================================================

ShortURLRepository.prototype.getShortURLs = function getShortURLs () {
	var self = this;
	// For now, always use the API
	return self.ShortURLAPI.getShortURLs().then(function (shortURLs) {
		// adding each short URL to the cache
		shortURLs.forEach(function (shortURL) {
			self._setCacheItem(shortURL['short_url_id'], shortURL);
		});
		return shortURLs;
	});
};

ShortURLRepository.prototype.getShortURL = function getShortURL (shortURLID) {
	var self = this;
	// Use the short url repository to retrieve the specific short url
	// if information doesn't exist, use the API
	// if information is expired, use the API
	return self._getCacheItem(shortURLID).then(function (cachedItem) {
		if (cachedItem) {
			return cachedItem;
		} else {
			return self.ShortURLAPI.getShortURL(shortURLID).then(function (shortURL) {
				self._setCacheItem(shortURL['short_url_id'], shortURL);
				return shortURL;
			});
		}
	});
};

ShortURLRepository.prototype.createShortURL = function createShortURL (longURL) {
	var self = this;
	return self.ShortURLAPI.createShortURL(longURL).then(function (shortURL) {
		self._setCacheItem(shortURL['short_url_id'], shortURL);
		return shortURL;
	});
};

// ==============================================================================
// Private Methods
// ==============================================================================

// Returns a promise
ShortURLRepository.prototype._setCacheItem = function _setCacheItem (cacheKey, shortURL) {
	var self = this;
	var setItemPromise = self._ShortURLStore.setItem(cacheKey, shortURL);
	return self.$q.resolve(setItemPromise);
};

// Returns a promise
ShortURLRepository.prototype._getCacheItem = function _getCacheItem (cacheKey, shortURL) {
	var self = this;
	var getItemPromise = self._ShortURLStore.getItem(cacheKey, shortURL);
	return self.$q.resolve(getItemPromise);
};

})();