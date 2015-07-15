/**
 * Created by Heshanr on 5/28/2015.
 */
(function (mod) {
    "use strict";
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

    mod.directive('isotoplist',['$timeout',function($timeout){
        return {
            restrict: 'A',
            replace: true,
            scope: {
                isotoplist: '='
            },
            templateUrl: '/views/coreModule/isotop.html',
            link: function(scope, elm, attrs) {
                scope.key = "1360413309421";
                scope.xList=[
                    {name:'a', number:'1', date:'1360413309421', src:'../../images/products/product-01.jpg' , class:'purple'}
                    ,{name:'b', number:'5', date:'1360213309423', src:'../../images/products/product-02.jpg', class:'orange'}
                    ,{name:'c', number:'10', date:'1360113309421', src:'../../images/products/product-03.jpg', class:'purple'}
                    ,{name:'d', number:'2', date:'1360113309422', src:'../../images/products/product-04.jpg', class:'green'}
                    ,{name:'e', number:'6', date:'1360413309421', src:'../../images/products/product-05.jpg', class:'purple'}
                    ,{name:'f', number:'21', date:'1360113309422', src:'../../images/products/product-03.jpg', class:'green'}
                    ,{name:'f', number:'21', date:'1360113309422', src:'../../images/products/product-03.jpg', class:'green'}
                    ,{name:'g', number:'3', date:'1360213309423', src:'../../images/products/product-02.jpg', class:'orange'}
                    ,{name:'h', number:'7', date:'1360113309422', src:'../../images/products/product-01.jpg', class:'blue'}
                    ,{name:'i', number:'22', date:'1360413309421', src:'../../images/products/product-04.jpg', class:'blue'}
                ];

                scope.$on('test', function(ngRepeatFinishedEvent) {
                    $timeout(function () {
                        scope.$emit('iso-method', {name:'shuffle', params:null})
                    },100);
                });

            }
        };
    }]);

    mod.directive('trendibxslider',[function() {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                trendibxslider: '=',
                type: '@'
            },
            templateUrl:'/views/coreModule/bxSlider.html',
            link: function(scope, elm, attrs) {
                scope.slides = scope.trendibxslider;
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
                                slideWidth: 300,
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
                                slideWidth: 300,
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
    }]);



    mod.directive('trendiBrandSlider',[function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                brands: '=',
                type: '@'
            },
            templateUrl:'/views/coreModule/brandSlider.html',
            link: function(scope, elm, attrs) {
                scope.slides = scope.brands;
                var slider;
                scope.$on('test', function(ngRepeatFinishedEvent) {
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


                })
            }
        };
    }]);


    mod.directive('trendiVerticalSlider',[function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                images: '='
            },
            templateUrl:'/views/coreModule/verticalSlider.html',
            link: function(scope, elm, attrs) {
                scope.slides = [];
                for (var index = 0; index<scope.images.length; index+=3) {
                    if(scope.images.length >= index+3)
                        scope.slides.push(scope.images.slice(index,index+3));
                }
                scope.$on('test', function(ngRepeatFinishedEvent) {
                    elm.ready(function () {
                        var slider = elm.bxSlider({
                            minSlides: 1,
                            maxSlides: 1,
                            slideWidth:300,
                            slideMargin: 5,
                            mode: 'vertical'
                        });


                    });


                })
            }
        };
    }]);


    mod.directive('trendiOwlSlider',[function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                images: '=',
                slideSpeed : '@',
                paginationSpeed:'@',
                stopOnHover : '@',
                autoPlay : '@',
                pagination : '@',
                rewindSpeed:'@',
                responsive:'@',
                items : '@',
                itemDisplay:'@'

            },
            templateUrl: function(elem,attrs) {
                var url = '/views/coreModule/'+(attrs.template? attrs.template : 'owlSlider')+'.html';
                return url;
            },
            link: function(scope, elm, attrs) {
                scope.slides = scope.images;
                var stopOnHover = Boolean(scope.stopOnHover)? Boolean(scope.stopOnHover) : false;
                var slideSpeed = scope.slideSpeed? parseInt(scope.slideSpeed) : 200;
                var items = scope.items? parseInt(scope.items) : 1;
                var paginationSpeed = scope.paginationSpeed? parseInt(scope.paginationSpeed) :800;
                var rewindSpeed = scope.rewindSpeed? scope.rewindSpeed : 1000;
                var autoPlay = Boolean(scope.autoPlay)? Boolean(scope.autoPlay) : false;
                var pagination = Boolean(scope.pagination)? Boolean(scope.pagination) : true;
                var responsive = Boolean(scope.responsive)? Boolean(scope.responsive) : true;
                var itemsDesktop = Boolean(scope.itemDisplay)? Boolean(scope.itemDisplay) : 4;
                var itemsDesktopSmall = Boolean(scope.itemDisplay)? Boolean(scope.itemDisplay) : 3;
                var itemsTablet = Boolean(scope.itemDisplay)? Boolean(scope.itemDisplay) : 2;
                var itemsMobile = Boolean(scope.itemDisplay)? Boolean(scope.itemDisplay) : 1;



                var slider;
                scope.$on('test', function(ngRepeatFinishedEvent) {
                    elm.ready(function () {
                        var slider = elm.owlCarousel({
                            items : items,

                            slideSpeed : slideSpeed,
                            paginationSpeed : paginationSpeed,
                            rewindSpeed : rewindSpeed,

                            //Autoplay
                            autoPlay : autoPlay,
                            stopOnHover :stopOnHover,

                            // Navigation
                            navigation : false,
                            navigationText : ["prev","next"],
                            rewindNav : true,
                            scrollPerPage : false,

                            //Pagination
                            pagination : pagination,

                            // Responsive
                            responsive: responsive,
                            responsiveRefreshRate : 200,
                            responsiveBaseWidth: window,

                            itemsDesktop : [1199,itemsDesktop],
                            itemsDesktopSmall:[979,itemsDesktopSmall],
                            itemsTablet	: [768,itemsTablet],
                            itemsMobile	:[479,itemsMobile]
                        });


                    });


                })
            }

        };
    }]);


    mod.directive('trendiMenuBar',[function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl:'/views/coreModule/menuBar.html',
            link: function(scope, elm, attrs) {
                scope.slides = [];
                    elm.ready(function () {
                        var menu = elm.supersubs({
                            minWidth:	12,	 // minimum width of submenus in em units
                            maxWidth:	27,	 // maximum width of submenus in em units
                            extraWidth:	1	 // extra width can ensure lines don't sometimes turn over
                            // due to slight rounding differences and font-family
                        }).superfish();


                    });

            }
        };
    }]);


    mod.directive('trendiMobileMenu',[function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl:'/views/coreModule/trendiMobileMenu.html',
            link: function(scope, elm, attrs) {
                scope.slides = [];
                elm.ready(function () {
                    var menu = elm.trendiMenu({
                        minWidth:	12,	 // minimum width of submenus in em units
                        maxWidth:	27,	 // maximum width of submenus in em units
                        extraWidth:	1	 // extra width can ensure lines don't sometimes turn over
                        // due to slight rounding differences and font-family
                    });


                });

            }
        };
    }]);

    mod.directive('trendiExpandMenu',[function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl:'/views/coreModule/trendiExpandMenu.html',
            link: function(scope, elm, attrs) {
                scope.slides = [];
                elm.ready(function () {
                    var menu = elm.trendiExpander({
                        minWidth:	12,	 // minimum width of submenus in em units
                        maxWidth:	27,	 // maximum width of submenus in em units
                        extraWidth:	1	 // extra width can ensure lines don't sometimes turn over
                        // due to slight rounding differences and font-family
                    });


                });

            }
        };
    }]);


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

})(com.TRENDI.CATEGORY.modules.coreModule);