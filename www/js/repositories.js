angular.module('app.repositories', ['app.services'])

.factory('ShortURLRepository', ['$window', '$q','ShortURLAPI',

function ($window, $q, ShortURLAPI) {

	function getShortURLs () {
		// For now, always use the API
		return ShortURLAPI.getShortURLs().then(function (shortURLs) {
			// adding each short URL to the cache
			shortURLs.forEach(function (shortURL) {
				_setCacheItem(shortURL['short_url_id'], shortURL);
			});
			return shortURLs;
		});
	}

	function getShortURL (shortURLID) {
		// Use the short url repository to retrieve the specific short url
		// if information doesn't exist, use the API
		// if information is expired, use the API
		var cachedItem = _getCacheItem(shortURLID);
		if (cachedItem) {
			return $q.resolve(cachedItem);
		} else {
			return ShortURLAPI.getShortURL(shortURLID).then(function (shortURL) {
				_setCacheItem(shortURL['short_url_id'], shortURL);
				return shortURL;
			});
		}
	}

	function createShortURL (longURL) {
		return ShortURLAPI.createShortURL(longURL).then(function (shortURL) {
			_setCacheItem(shortURL['short_url_id'], shortURL);
			return shortURL;
		});
	}

	// TODO use localForage for caching
	function _setCacheItem (cacheKey, shortURL) {
		var objectToCache = shortURL;
		var jsonToCache = JSON.stringify(objectToCache);
		return $window.localStorage.setItem(CACHE_KEY_PREFIX + cacheKey, jsonToCache);
	}

	function _getCacheItem (cacheKey, shortURL) {
		var jsonString = $window.localStorage.getItem(CACHE_KEY_PREFIX + cacheKey, shortURL);
		return JSON.parse(jsonString);
	}

	// Because all repositories will be sharing the same cache - localStorage,
	// need to add a prefix to all cache keys.
	var CACHE_KEY_PREFIX = 'shortURLs/';

	return {
		getShortURLs: getShortURLs,
		getShortURL: getShortURL,
		createShortURL: createShortURL
	};
}]);