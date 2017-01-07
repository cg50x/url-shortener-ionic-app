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
		return _getCacheItem(shortURLID).then(function (cachedItem) {
			if (cachedItem) {
				return cachedItem;
			} else {
				return ShortURLAPI.getShortURL(shortURLID).then(function (shortURL) {
					_setCacheItem(shortURL['short_url_id'], shortURL);
					return shortURL;
				});
			}
		});
	}

	function createShortURL (longURL) {
		return ShortURLAPI.createShortURL(longURL).then(function (shortURL) {
			_setCacheItem(shortURL['short_url_id'], shortURL);
			return shortURL;
		});
	}

	// Returns a promise
	function _setCacheItem (cacheKey, shortURL) {
		var objectToCache = shortURL;
		return $q.resolve(ShortURLStore.setItem(cacheKey, objectToCache));
	}

	// Returns a promise
	function _getCacheItem (cacheKey, shortURL) {
		return $q.resolve(ShortURLStore.getItem(cacheKey, shortURL));
	}

	// Initializing the persistent cache
	var ShortURLStore = localforage.createInstance({
		driver: [
			localforage.LOCALSTORAGE,
			localforage.INDEXEDDB,
			localforage.WEBSQL
		],
		name: 'ShortURLs'
	});

	return {
		getShortURLs: getShortURLs,
		getShortURL: getShortURL,
		createShortURL: createShortURL
	};
}]);