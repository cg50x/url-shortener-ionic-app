angular.module('app.services', [])

.factory('ShortURLAPI', ['$http',

function ($http) {

	var BASE_URL = 'https://radiant-oasis-85887.herokuapp.com/api';

	function getShortURLs () {
		return $http.get(BASE_URL + '/short_urls').then(function (response) {
			return response.data;
		});
	}

	function getShortURL (shortURLID) {
		return $http.get(BASE_URL + '/short_urls/' + shortURLID).then(function (response) {
			return response.data;
		});
	}

	function createShortURL (longURL) {
		return $http.post(BASE_URL + '/short_urls', {
			'original_url': longURL
		}).then(function (response) {
			return response.data;
		});
	}

	return {
		getShortURLs: getShortURLs,
		getShortURL: getShortURL,
		createShortURL: createShortURL
	};

}]);