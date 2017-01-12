(function () {
'use strict';

const depNames = [
	'$ionicSideMenuDelegate',
	'$rootScope'
];

/*
  This directive is used to disable the "drag to open" functionality of the Side-Menu
  when you are dragging a Slider component.
*/
function disableSideMenuDragDirective (...dependencies) {
	// Attaching dependencies
	let deps = depNames.reduce((deps, depName, index) => deps[depName] = dependencies[index], {});
    return {
        restrict: "A",  
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

            function stopDrag(){
              deps.$ionicSideMenuDelegate.canDragContent(false);
            }

            function allowDrag(){
              deps.$ionicSideMenuDelegate.canDragContent(true);
            }

            deps.$rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
            $element.on('touchstart', stopDrag);
            $element.on('touchend', allowDrag);
            $element.on('mousedown', stopDrag);
            $element.on('mouseup', allowDrag);

        }]
    };
};
disableSideMenuDragDirective.$inject = depNames;

angular.module('app.directives')
	.directive('disableSideMenuDrag', disableSideMenuDragDirective);

})();