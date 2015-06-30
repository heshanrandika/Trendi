/**
 * Created by Heshanr on 5/28/2015.
 */
(function (mod) {
    "use strict";
    mod.directive('trendiFractionSlider',['$timeout',function($timeout){
        return {
            restrict: 'E',
            replace: true,
            require:'ngModel',
            scope: {
                slidearray: '=',
                type: '@'
            },
            template: '<div class="">'+
                '<img ng-repeat="slide in slides" ng-if="isCurrentSlideIndex($index)" ng-src="{{slide.src}}" class="">'+
                '<img ng-repeat="slide in slides" ng-if="slide.show" ng-src="{{slide.src}}" width="10%" ng-style="">'+
                '</div>',
            link: function(scope, elm, attrs) {
                scope.slides = scope.slidearray;

                var INTERVAL = 3000;

                function setCurrentSlideIndex(index) {
                    scope.currentIndex = index;
                }

                function isCurrentSlideIndex(index) {
                    return scope.currentIndex === index;
                }

                function nextSlide() {
                    scope.currentIndex = (scope.currentIndex < scope.slides.length - 1) ? ++scope.currentIndex : 0;
                    $timeout(nextSlide, INTERVAL);
                }

                function loadSlides() {
                    $timeout(nextSlide, INTERVAL);
                }

                //  scope.slides = slides;
                scope.currentIndex = 0;
                scope.setCurrentSlideIndex = setCurrentSlideIndex;
                scope.isCurrentSlideIndex = isCurrentSlideIndex;

                loadSlides();
            }
        };
    }]);


})(com.TRENDI.CATEGORY.modules.mainTrendiModule);