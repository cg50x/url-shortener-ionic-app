angular.module('app.controllers', ['app.services', 'app.repositories'])
  
.controller('shortURLsCtrl', ['$scope', '$stateParams', 'ShortURLAPI', 'ShortURLRepository',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, ShortURLAPI, ShortURLRepository) {

var vm = {};
$scope.vm = vm;

$scope.$on('$ionicView.beforeEnter', function () {
	ShortURLRepository.getShortURLs().then(function (shortURLs) {
		vm.shortURLListItems = shortURLs.map(function (shortURL) {
			return {
				label: '/u/' + shortURL['short_url_id'] + ' - ' + shortURL['original_url'],
				shortURLID: shortURL['short_url_id']
			};
		});
		// Reverse list items so that the short urls are listed from newest to oldest.
		// TODO expose created_on timestamp in server response and sort by created_on instead
		vm.shortURLListItems.reverse();
	});
});

}])
   
.controller('createShortURLCtrl', ['$scope', '$stateParams', '$ionicPopup', 'ShortURLAPI', 'ShortURLRepository',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicPopup, ShortURLAPI, ShortURLRepository) {

var vm = {};
$scope.vm = vm;

$scope.$on('$ionicView.beforeEnter', function () {
	vm.longURLInput = '';
});

vm.onClickCreateButton = function () {
	ShortURLRepository.createShortURL(vm.longURLInput).then(function (shortURL) {
		return $ionicPopup.alert({
			title: 'Short URL Created',
			template: 'Created short URL: /u/' + shortURL['short_url_id']
		});
	}).then(function () {
		// Clear out the input after the alert is dismissed.
		vm.longURLInput = '';
	});
};

}])
      
.controller('shortURLCtrl', ['$scope', '$stateParams', 'ShortURLAPI', 'ShortURLRepository',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, ShortURLAPI, ShortURLRepository) {

var vm = {};
$scope.vm = vm;

$scope.$on('$ionicView.beforeEnter', function () {
	var shortURLID = $stateParams.shortURLID;
	ShortURLRepository.getShortURL(shortURLID).then(function (shortURL) {
		vm.headerText = '/u/' + shortURL['short_url_id'];
		vm.originalURLText = shortURL['original_url'];
		vm.linkURL = 'https://radiant-oasis-85887.herokuapp.com/u/' + shortURL['short_url_id'];
	});
});

vm.openLinkURL = function (linkURL) {
	window.open(linkURL);
};

}])
 