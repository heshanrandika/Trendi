/**
 * Created by Heshanr on 5/28/2015.
 */
(function (mod) {
    "use strict";
    mod.directive('slideit',function($timeout) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                slideit: '=',
                type: '@'
            },
            template: '<ul class="bxslider">' +
                '<li ng-repeat="slide in slides" on-finish-render="test">' +
                '<div>'+
                '<img ng-src="{{slide.src}}"  alt="" />' +
                '<span>Price:{{slide.price}}</span></br>'+
                '<span>Shop:{{slide.shop}}</span>'+
                '</div>'+
                '</li>' +
                '</ul>',
            link: function(scope, elm, attrs) {
                scope.slides = scope.slideit;
                var slider;
                scope.$on('test', function(ngRepeatFinishedEvent) {
                  /*  $(document).on("click", ".bx-pager-link", function() {
                        console.log("click");
                        slider.stopAuto();
                        slider.startAuto();
                    });*/
                    if(scope.type == 'v'){
                        elm.ready(function () {
                            slider = elm.bxSlider({
                                auto: true,
                                minSlides: 3,
                                maxSlides: 4,
                                slideWidth: 200,
                                slideMargin: 10,
                                onSliderLoad: function () {
                                    $(document).on("click", ".bx-pager-link", function() {
                                        slider.stopAuto();
                                        slider.startAuto();
                                        return false;
                                    });
                                    $(document).on("click", ".bx-next", function() {
                                        slider.stopAuto();
                                        slider.startAuto();
                                        return false;
                                    });
                                    $(document).on("click", ".bx-prev", function() {
                                        slider.stopAuto();
                                        slider.startAuto();
                                        return false;
                                    });
                                }
                            });


                        });
                    }else{
                        elm.ready(function () {
                            var slider = elm.bxSlider({
                                auto: true,
                                minSlides: 3,
                                maxSlides: 4,
                                slideWidth: 200,
                                slideMargin: 10,
                                onSliderLoad: function () {
                                    $(document).on("click", ".bx-pager-link", function() {
                                        slider.stopAuto();
                                        slider.startAuto();
                                        return false;
                                    });
                                    $(document).on("click", ".bx-next", function() {
                                        slider.stopAuto();
                                        slider.startAuto();
                                        return false;
                                    });
                                    $(document).on("click", ".bx-prev", function() {
                                        slider.stopAuto();
                                        slider.startAuto();
                                        return false;
                                    });
                                }
                            });


                        });
                    }

                })
            }
        };
    });

    mod.directive('onFinishRender', ['$timeout',function ($timeout) {
            return {
                restrict: 'A',
                link: function (scope, element, attr) {
                    if (scope.$last === true) {
                        $timeout(function () {
                            scope.$emit(attr.onFinishRender);
                        });
                    }
                }
            }
        }]);

    mod.directive('trendiMainSlider',['$timeout',function($timeout){
        return {
            restrict: 'E',
            replace: true,
            require:'ngModel',
            scope: {
                slidearray: '=',
                type: '@'
            },
            template: '<div style="max-height: 50%; width: auto; overflow: hidden; display:block;"><img ng-repeat="slide in slides" class="slide-right" ng-if="isCurrentSlideIndex($index)" ng-src="{{slide.src}}" ></div>',
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
                scope.currentAnimation = 'fade-in-animation';
                scope.currentIndex = 0;
                scope.setCurrentSlideIndex = setCurrentSlideIndex;
                scope.isCurrentSlideIndex = isCurrentSlideIndex;

                loadSlides();
            }
        };
    }]);

    mod.directive('fractionslider',function($timeout) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                fractionslider: '=',
                type: '@'
            },
            templateUrl: '/views/coreModule/fractionSlider.html',
            link: function(scope, elm, attrs) {
                scope.slides = scope.fractionslider;
                var slider;
                        elm.ready(function () {
                            slider = elm.fractionSlider({
                                'fullWidth': 			true,
                                'controls': 			true,
                                'pager': 				true,
                                'responsive': 			true,
                                'dimensions': 			"1000,400",
                                'increase': 			false,
                                'pauseOnHover': 		true,
                                'slideEndAnimation': 	true
                            });

                        });

            }
        };
    });


    mod.directive('revolutionslider',function($timeout) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                revolutionslider: '='
            },
            templateUrl: '/views/coreModule/revolutionSlider.html',
            link: function(scope, elm, attrs) {
                scope.slides = scope.revolutionslider;
                elm.ready(function () {
                    var slider =  $('.tp-banner').show().revolution({
                        dottedOverlay:"none",
                        delay:16000,
                        startwidth:1170,
                        startheight:795,
                        hideThumbs:200,

                        thumbWidth:100,
                        thumbHeight:50,
                        thumbAmount:5,

                        navigationType:"none",
                        navigationArrows:"solo",
                        navigationStyle:"none",

                        touchenabled:"on",
                        onHoverStop:"on",

                        swipe_velocity: 0.7,
                        swipe_min_touches: 1,
                        swipe_max_touches: 1,
                        drag_block_vertical: false,

                        parallax:"mouse",
                        parallaxBgFreeze:"on",
                        parallaxLevels:[7,4,3,2,5,4,3,2,1,0],

                        keyboardNavigation:"off",

                        navigationHAlign:"center",
                        navigationVAlign:"bottom",
                        navigationHOffset:0,
                        navigationVOffset:20,

                        soloArrowLeftHalign:"left",
                        soloArrowLeftValign:"center",
                        soloArrowLeftHOffset:20,
                        soloArrowLeftVOffset:0,

                        soloArrowRightHalign:"right",
                        soloArrowRightValign:"center",
                        soloArrowRightHOffset:20,
                        soloArrowRightVOffset:0,

                        shadow:0,
                        fullWidth:"off",
                        fullScreen:"on",

                        spinner:"off",

                        stopLoop:"off",
                        stopAfterLoops:-1,
                        stopAtSlide:-1,

                        shuffle:"off",

                        autoHeight:"off",
                        forceFullWidth:"off",



                        hideThumbsOnMobile:"off",
                        hideNavDelayOnMobile:1500,
                        hideBulletsOnMobile:"off",
                        hideArrowsOnMobile:"off",
                        hideThumbsUnderResolution:0,
                        hideTimerBar:"on",
                        hideSliderAtLimit:0,
                        hideCaptionAtLimit:0,
                        hideAllCaptionAtLilmit:0,
                        startWithSlide:0,
                        fullScreenOffsetContainer: ".navbar"
                    });

                });

            }
        };
    });

/*    mod.directive('trendiSlideShow',[function () {
        function link( scope, element, attributes, controller ) {
            var stopActions = function ($event) {
                if ($event.stopPropagation) {
                    $event.stopPropagation();
                }
                if ($event.preventDefault) {
                    $event.preventDefault();
                }
                $event.cancelBubble = true;
                $event.returnValue = false;
            };
            scope.currentFirst = 0;
            scope.currentLast = 4;
            // Carousel thing
            scope.index = 0;
            // Hide menu
            scope.showMenu = false;
            // Links
            scope.navigation = [{imageSource : "/images/splash.png" , visible : false },
                {imageSource : "/images/icon-trendi1.png" , visible : false },
                {imageSource : "/images/icon-trenditest.png" , visible : false },
                {imageSource : "/images/passenger.jpg" , visible : false },
                {imageSource : "/images/taxi.png" , visible : false },
                {imageSource : "/images/taxidi.png" , visible : false }];

            scope.resetSlider = function(){
              for(var index in scope.navigation){
                  if(index > scope.currentFirst && index < scope.currentLast){
                      scope.navigation[index].visible = true;
                  }else{
                      scope.navigation[index].visible = false;
                  }
              }
            };
            scope.resetSlider();
            // Increment carousel thing
            scope.next = function ($event) {
                stopActions($event);
                if( scope.currentLast < scope.navigation.length){
                    scope.currentFirst += 1;
                    scope.currentLast += 1;
                    scope.resetSlider();
                }

            };
            // Decrement carousel thing
            scope.prev = function ($event) {
                stopActions($event);
                if(scope.currentFirst >= 0 ){
                    scope.currentFirst -= 1;
                    scope.currentLast -= 1;
                    scope.resetSlider();
                }

            };
        }
        return {
            restrict: 'E',
            require: 'ngModel',
            link: link,
            templateUrl: "/views/coreModule/imageSlider.html"

        };
    }]);*/

})(com.TRENDI.CATEGORY.modules.coreModule);