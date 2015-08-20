/**
 * Created by Heshanr on 5/28/2015.
 */
(function (mod) {
    "use strict";
    mod.directive('revolutionslider',function() {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                revolutionslider: '='
            },
            templateUrl: '/views/coreModule/slider/trendi.slider.revolution.html',
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

    mod.directive('trendiIsotop',['$timeout',function($timeout){
        return {
            restrict: 'E',
            replace: true,
            scope: {
                items: '='
            },
            templateUrl: '/views/coreModule/isotop/trendi.main.isotop.html',
            link: function(scope, elm, attrs) {
                scope.xList = scope.items;
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
            templateUrl:'/views/coreModule/imageSlider/trendi.slider.bxSlider.html',
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
            templateUrl:'/views/coreModule/imageSlider/trendi.slider.brand.html',
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
            templateUrl:'/views/coreModule/imageSlider/trendi.vertical.slider.html',
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
                paginationDisplay : '@',
                navigationDisplay : '@',
                rewindSpeed:'@',
                responsive:'@',
                items : '@',
                itemDisplay:'@'

            },
            templateUrl: function(elem,attrs) {
                var url = '/views/coreModule/owlSlider/'+(attrs.template? attrs.template : 'trendi.slider.owl')+'.html';
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
                var pagination = Boolean(scope.paginationDisplay)? Boolean(scope.paginationDisplay) : false;
                var navigation = Boolean(scope.navigationDisplay)? Boolean(scope.navigationDisplay) : false;
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
                            navigation : navigation,
                            navigationText : ["",""],
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
            templateUrl:'/views/coreModule/menu/trendi.menu.main.html',
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
            templateUrl:'/views/coreModule/menu/trendi.menu.mobile.html',
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
            templateUrl:'/views/coreModule/menu/trendi.menu.expand.html',
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


    mod.directive('trendiHideMenu',[function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            template:' <div class="navbar-switcher"> <span class="i-inactive"><img src="images/icon-small.png" width="35" height="35" alt="samll icon fashion.lk"></span> <span class="i-active icon-cancel-3"></span> </div>',
            link: function(scope, elm, attrs) {
                scope.slides = [];
                elm.ready(function () {
                    var menu = elm.trendiHideMenu({
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



    mod.directive('trendiFileUpload',[function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                files : '='
            },
            templateUrl: function(elem,attrs) {
                var url = '/views/coreModule/fileUpload/'+(attrs.template? attrs.template : 'trendi.fileupload.main')+'.html';
                return url;
            },
            link: function(scope, elm, attrs) {
                scope.files = [];
                var dropbox = angular.element('#dropbox').context;
                scope.dropText = 'Drop files here...';
                scope.successfullyUploaded = false;
                // init event handlers
                function dragEnterLeave(evt) {
                    evt.stopPropagation();
                    evt.preventDefault();
                    scope.$apply(function () {
                        scope.dropText = 'Drop files here...';
                        scope.dropClass = '';
                    });
                }

                dropbox.addEventListener("dragenter", dragEnterLeave, false);
                dropbox.addEventListener("dragleave", dragEnterLeave, false);
                dropbox.addEventListener("dragover", function (evt) {
                    evt.stopPropagation();
                    evt.preventDefault();
                    var clazz = 'not-available';
                    var ok = evt.dataTransfer && evt.dataTransfer.types && evt.dataTransfer.types.indexOf('Files') >= 0;
                    scope.$apply(function () {
                        scope.dropText = ok ? 'Drop files here...' : 'Only files are allowed!';
                        scope.dropClass = ok ? 'over' : 'not-available';
                    });
                }, false);

                //============== DRAG & DROP =============
                dropbox.addEventListener("drop", function (evt) {
                    evt.stopPropagation();
                    evt.preventDefault();
                    scope.$apply(function () {
                        scope.dropText = 'Drop files here...';
                        scope.dropClass = '';
                    });
                    var files = evt.dataTransfer.files;
                    if (files.length > 0) {
                        scope.$apply(function () {
                            scope.progressVisible = false;
                            scope.successfullyUploaded = false;
                            for (var i = 0; i < files.length; i++) {
                                if (files[i].size < 1000000) {
                                   // scope.files.push(files[i]);
                                       scope.getFileContent(files[i]);
                                } else {
                                    if (files[i].size > 1000000) {

                                    }
                                }

                            }
                        });
                    }
                }, false);


                scope.setFiles = function (element) {
                    scope.progressVisible = false;
                    scope.successfullyUploaded = false;
                        // Turn the FileList object into an Array
                        for (var i = 0; i < element.files.length; i++) {
                            if (element.files[i].size < 1000000) {
                               // scope.files.push(element.files[i]);
                                scope.getFileContent(element.files[i]);
                            }
                        }
                        scope.progressVisible = false;

                };

                function uploadCanceled(evt) {
                    scope.$apply(function () {
                        scope.progressVisible = false;
                    });
                    alert("The upload has been canceled by the user or the browser dropped the connection.");
                }


                scope.removeFile = function (index) {
                    scope.files.splice(index, 1);
                    scope.fileContent = '';
                };

                scope.getFileContent = function(file) {
                    var data = '';
                    var r;
                    r = new FileReader();
                    r.onloadend = function (e) {
                        var fileDetail = {
                            size : file.size,
                            name : file.name,
                            type : file.type,
                            image : e.target.result
                        };
                        scope.$apply(function (scope) {
                        scope.files.push(fileDetail);
                        });
                    };

                    r.readAsDataURL(file);
                }


            }
        };
    }]);


    mod.directive("trendiSearch", ['$mdDialog', function (dialogs) {
        return {
            restrict: 'E',
            templateUrl: '/views/coreModule/searchOption/search.bar.html',
            scope: {
                actions: '='
            },
            link: function (scope) {

                scope.seachDropdownData = scope.actions.one;
                scope.selectedOption = scope.seachDropdownData[0];

                scope.collectionDropDown = scope.actions.two;
                scope.selectedCollectionOption = scope.collectionDropDown[0];



                scope.options = {};


                scope.today = function() {
                    scope.dt_from = new Date();
                    scope.dt_to = new Date();
                };
                scope.today();

                scope.clear_from = function () {
                    scope.dt_from = null;
                };

                scope.clear_to = function () {
                    scope.dt_to = null;
                };
                // Disable weekend selection
                scope.disabled = function(date, mode) {
                    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
                };

                scope.toggleMin = function() {
                    scope.minDate = scope.minDate ? null : new Date();
                };
                scope.toggleMin();

                scope.open_from = function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    scope.status.opened_from = true;
                };

                scope.open_to = function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    scope.status.opened_to = true;
                };

                scope.options.dateOptions = {
                    formatYear: 'yy',
                    startingDay: 1
                };

                scope.formats = ['dd-MM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
                scope.format = scope.formats[0];

                scope.status = {
                    opened: false
                };






                scope.change_range = function () {
                    scope.date_text = "FROM DATE";
                    scope.dt_from = null;
                    scope.dt_to = null;
                };

                scope.searchCustomer = function () {
                    var dateStrToSend = undefined;
                    var todate = undefined;
                    var search_key = undefined;
                    var selectedCollectionOption = undefined;
                    var selectedOption = undefined;

                    if (scope.dt_from != undefined) {
                        dateStrToSend = com.DFN.BI.util.processDate(scope.dt_from);
                    }
                    if (scope.dt_to != undefined) {
                        todate = com.DFN.BI.util.processDate(scope.dt_to);
                    }
                    if (!!scope.search_key) {
                        search_key = scope.search_key;
                    }
                    selectedCollectionOption = scope.selectedCollectionOption.value;
                    selectedOption = scope.selectedOption.value;

                    if (scope.dateSelection === "DR") {
                        if ((dateStrToSend == undefined) && (todate != undefined)) {
                            dialogs.error({header: "ERROR", msg: "Please Select From Date"}, {
                                size: 'sm',
                                backdrop: 'static'
                            });
                        } else if ((dateStrToSend != undefined) && (todate == undefined)) {
                            dialogs.error({header: "ERROR", msg: "Please Select To Date"}, {
                                size: 'sm',
                                backdrop: 'static'
                            });
                        } else if ((dateStrToSend == undefined) && (todate == undefined)) {
                            dialogs.error({header: "ERROR", msg: "Please Select Date Range"}, {
                                size: 'sm',
                                backdrop: 'static'
                            });
                        } else if (search_key == '' || search_key == undefined) {
                            var fromDate = new Date(dateStrToSend);
                            var toDate = new Date(todate);
                            if (fromDate > toDate) {
                                dialogs.error({header: "ERROR", msg: "Please Select Valid Date Range"}, {
                                    size: 'sm',
                                    backdrop: 'static'
                                });
                            } else {
                                dialogs.error({header: "ERROR", msg: "Please Enter Search Text"}, {
                                    size: 'sm',
                                    backdrop: 'static'
                                });
                            }
                        } else {
                            console.log("call the function here");
                            scope.actions.searchDataFromServer({
                                fromDate: dateStrToSend,
                                toDate: todate,
                                one: selectedCollectionOption,
                                two: selectedOption,
                                key: search_key
                            });
                        }
                    } else {
                        if (search_key == '' || search_key == undefined) {
                            dialogs.error({header: "ERROR", msg: "Please Enter Search Text"}, {
                                size: 'sm',
                                backdrop: 'static'
                            });
                        } else {
                            console.log("call the function here");
                            scope.actions.searchDataFromServer({
                                fromDate: dateStrToSend,
                                toDate: dateStrToSend,
                                one: selectedCollectionOption,
                                two: selectedOption,
                                key: search_key
                            });
                        }
                    }
                };
            }
        }
    }]);


})(com.TRENDI.CATEGORY.modules.coreModule);