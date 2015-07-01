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



    mod.directive('isotoplist',[function($timeout){
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
            }
        };
    }]);

})(com.TRENDI.CATEGORY.modules.coreModule);