(function () {
'use strict';

const depNames = [
	'$ionicPlatform',
	'$q',
	'$window',
	'ShortURLAPI'
];

class ShortURLRepository {
	constructor (...dependencies) {
		// Attaching dependencies
		depNames.forEach((depName, index) => this[depName] = dependencies[index]);

		this._initializeStore();
	}

	// ==============================================================================
	// Public Methods
	// ==============================================================================

	getShortURLs () {
		// For now, always use the API
		return this.ShortURLAPI.getShortURLs().then((shortURLs) => {
			// adding each short URL to the cache
			shortURLs.forEach((shortURL) => {
				this._setCacheItem(shortURL.shortUrlId, shortURL);
			});
			return shortURLs;
		});
	}

	getShortURL (shortURLID) {
		// Use the short url repository to retrieve the specific short url
		// if information doesn't exist, use the API
		// if information is expired, use the API
		return this._getCacheItem(shortURLID).then((cachedItem) => {
			if (cachedItem) {
				return cachedItem;
			} else {
				return this.ShortURLAPI.getShortURL(shortURLID).then((shortURL) => {
					this._setCacheItem(shortURL.shortUrlId, shortURL);
					return shortURL;
				});
			}
		});
	}

	createShortURL (longURL) {
		return this.ShortURLAPI.createShortURL(longURL).then((shortURL) => {
			this._setCacheItem(shortURL.shortUrlId, shortURL);
			return shortURL;
		});
	}

	// ==============================================================================
	// Private Methods
	// ==============================================================================

	// Initializes the persistent cache
	_initializeStore () {
		let localforage = this.$window.localforage;
		return this.$ionicPlatform.ready().then(() => {
			return localforage.defineDriver(this.$window.cordovaSQLiteDriver);
		}).then(() => {
			this._ShortURLStore = localforage.createInstance({
				name: 'ShortURLs',
				driver: [
					this.$window.cordovaSQLiteDriver._driver,
					localforage.LOCALSTORAGE,
					localforage.INDEXEDDB,
					localforage.WEBSQL
				]
			});
		});
	}

	// Returns a promise
	_setCacheItem (cacheKey, shortURL) {
		let setItemPromise = this._ShortURLStore.setItem(cacheKey, shortURL);
		return this.$q.resolve(setItemPromise);
	}

	// Returns a promise
	_getCacheItem (cacheKey, shortURL) {
		let getItemPromise = this._ShortURLStore.getItem(cacheKey, shortURL);
		return this.$q.resolve(getItemPromise);
	}
}
ShortURLRepository.$inject = depNames;


angular.module('app.repositories')
	.service('ShortURLRepository', ShortURLRepository);

})();