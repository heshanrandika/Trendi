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

    mod.directive('trendiSearchOption',['$location',function($location) {
        return {
            restrict: 'E',
            replace: true,
            scope: {

            },
            templateUrl:'/views/coreModule/menu/trendi.menu.option.html',
            link: function(scope, elm, attrs) {
                scope.colorMenu = {
                    colors:[
                        {'class':'icon-color icon-color-black', 'txt':'Black', 'value':'#000000'},
                        {'class':'icon-color icon-color-blue', 'txt':'Blue', 'value':'#0000FF'},
                        {'class':'icon-color icon-color-brown', 'txt':'Brown', 'value':'#A52A2A'},
                        {'class':'icon-color icon-color-gray', 'txt':'Gray', 'value':'#808080'},
                        {'class':'icon-color icon-color-green', 'txt':'Green', 'value':'#00FF00'},
                        {'class':'icon-color icon-color-magneta', 'txt':'Magenta', 'value':'#FF00FF'},
                        {'class':'icon-color icon-color-pink', 'txt':'Pink', 'value':'#FFC0CB'},
                        {'class':'icon-color icon-color-red', 'txt':'Red', 'value':'#FF0000'},
                        {'class':'icon-color icon-color-white', 'txt':'White', 'value':'#FFFFFF'}
                    ]
                };

                scope.sizeMenu = {
                    sizes:[
                        {'txt':'3XL', 'value':'3XL'},
                        {'txt':'XS', 'value':'XS'},
                        {'txt':'S', 'value':'S'},
                        {'txt':'M', 'value':'M'},
                        {'txt':'L', 'value':'L'},
                        {'txt':'XL', 'value':'XL'},
                        {'txt':'2XL', 'value':'2XL'},
                        {'txt':'2', 'value':'2'},
                        {'txt':'4', 'value':'4'},
                        {'txt':'6', 'value':'6'},
                        {'txt':'8', 'value':'8'},
                        {'txt':'10', 'value':'10'},
                        {'txt':'12', 'value':'12'},
                        {'txt':'14', 'value':'14'}
                    ]
                };




                scope.clickExpand = function(item){
                    item.expand = !item.expand
                }

            }
        };
    }]);


})(com.TRENDI.CATEGORY.modules.mainTrendiModule);