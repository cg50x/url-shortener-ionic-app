(function () {
'use strict';

/*
  This directive is used to open regular and dynamic href links inside of inappbrowser.
*/
function hrefInappbrowserDirective () {
	return {
		restrict: 'A',
		replace: false,
		transclude: false,
		link: function(scope, element, attrs) {
			var place = attrs['hrefInappbrowser'] || '_system';
			element.bind('click', function (event) {
				var href = event.currentTarget.href;

				window.open(href, place, 'location=yes');

				event.preventDefault();
				event.stopPropagation();
			});
		}
	};
}

angular.module('app.directives')
	.directive('hrefInappbrowser', hrefInappbrowserDirective);

})();