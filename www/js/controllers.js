angular.module('app.controllers', [])
  
.controller('shortURLsCtrl', ['$scope', '$stateParams', 'ShortURLAPI',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, ShortURLAPI) {

var vm = {};
$scope.vm = vm;

$scope.$on('$ionicView.enter', function () {
	ShortURLAPI.getShortURLs().then(function (shortURLs) {
		vm.shortURLListItems = shortURLs.map(function (shortURL) {
			return {
				label: '/u/' + shortURL['short_url_id'] + ' - ' + shortURL['original_url'],
				shortURLID: shortURL['short_url_id']
			};
		});
	});
});

}])
   
.controller('createShortURLCtrl', ['$scope', '$stateParams', '$ionicPopup', 'ShortURLAPI', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicPopup, ShortURLAPI) {

var vm = {};
$scope.vm = vm;
// TODO on ionic view enter, get data from the server and populate the view
$scope.$on('$ionicView.enter', function () {
	vm.longURLInput = '';
});

vm.onClickCreateButton = function () {
	ShortURLAPI.createShortURL(vm.longURLInput).then(function (shortURL) {
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
      
.controller('shortURLCtrl', ['$scope', '$stateParams', 'ShortURLAPI',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, ShortURLAPI) {

var vm = {};
$scope.vm = vm;

// TODO on ionic view enter, get data from the server and populate the view
$scope.$on('$ionicView.enter', function () {
	var shortURLID = $stateParams.shortURLID;
	ShortURLAPI.getShortURL(shortURLID).then(function (shortURL) {
		vm.headerText = '/u/' + shortURL['short_url_id'];
		vm.originalURLText = shortURL['original_url'];
		vm.linkURL = 'https://radiant-oasis-85887.herokuapp.com/u/' + shortURL['short_url_id'];
	});
});

vm.openLinkURL = function (linkURL) {
	window.open(linkURL);
};

}])
 