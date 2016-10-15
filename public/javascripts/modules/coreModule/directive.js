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
                items: '=',
                action:'='
            },
            templateUrl: '/views/coreModule/isotop/trendi.main.isotop.html',
            link: function(scope, elm, attrs) {
                scope.xList = scope.items;
                scope.$on('repeated', function(ngRepeatFinishedEvent) {
                    $timeout(function () {
                        scope.$emit('iso-method', {name:'shuffle', params:null})
                    },100);
                });

                scope.openItem = function(item) {
                    scope.action.itemClicked(item);
                };

            }
        };
    }]);


    mod.directive('trendiIsotopProduct',['$timeout','$state',function($timeout, $state){
        return {
            restrict: 'E',
            replace: true,
            scope: {
                items: '=',
                views: '=',
                action: '=',
                selector: '='
            },
            templateUrl: function(elem,attrs) {
                var url = '/views/coreModule/isotop/'+(attrs.template? attrs.template : 'trendi.product.isotop')+'.html';
                return url;
            },
            link: function(scope, elm, attrs) {
                scope.xList = scope.items;

                scope.paginationFunction = function(intx) {
                    scope.action.searchFromServer(1);
                };

                scope.openItem = function(item) {
                    scope.action.goto(item);
                };
                scope.$on('repeated', function(ngRepeatFinishedEvent) {
                    $timeout(function () {
                        scope.$emit('iso-method', {params:null})
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
                scope.$on('repeated', function(ngRepeatFinishedEvent) {
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
                scope.$on('repeated', function(ngRepeatFinishedEvent) {
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
                images: '=',
                action:'='
            },
            templateUrl:'/views/coreModule/imageSlider/trendi.vertical.slider.html',
            link: function(scope, elm, attrs) {
                scope.slides = [];
                for (var index = 0; index<scope.images.length; index+=3) {
                    if(scope.images.length >= index+3){
                        scope.slides.push(scope.images.slice(index,index+3));
                    }else{
                        scope.slides.push(scope.images);
                    }

                }
                scope.$on('repeated', function(ngRepeatFinishedEvent) {
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

                scope.openItem = function(item) {
                    scope.action.itemClicked(item);
                };
            }
        };
    }]);


    mod.directive('trendiOwlSlider',[function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                images: '=',
                action : '=',
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

                scope.openItem = function(item) {
                    scope.action.itemClicked(item);
                };


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
                scope.$on('repeated', function(ngRepeatFinishedEvent) {
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

    mod.directive('trendiAnimateSlider',[function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                slides: '='
            },
            templateUrl:'/views/coreModule/owlSlider/trendi.slider.banner.html',
            link: function(scope, elm, attrs) {
                scope.$on('repeated', function(ngRepeatFinishedEvent) {
                    elm.ready(function () {
                        var slider = elm.mainOwlSlider();
                    });


                });
            }
        };
    }]);

    mod.directive('trendiMenuBar',['$location',function($location) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                menuType:'='
            },
            templateUrl:'/views/coreModule/menu/trendi.menu.main.html',
            link: function(scope, elm, attrs) {
                scope.clickMenu = function(val){
                    delete $location.$$search.itemId;
                    $location.path('main/products/all/'+val.category+'/'+val.search);
                };
                scope.clickParentMenu = function(val){
                    delete $location.$$search.itemId;
                    $location.path('main/products/all/'+val.category+'/all');
                };
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

    mod.directive('trendiWideMenuBar',['$location',function($location) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                shoplist:'='
            },
            templateUrl: function(elem,attrs) {
                var url = '/views/coreModule/menu/'+(attrs.template? attrs.template : 'trendi.shop.menu')+'.html';
                return url;
            },
            link: function(scope, elm, attrs) {
                scope.$on('repeated', function(ngRepeatFinishedEvent) {
                    elm.ready(function () {
                        var menu = elm.trendiHideMenu();
                    });
                });


            }
        };
    }]);


    mod.directive('trendiMobileMenu',['$location',function($location) {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl:'/views/coreModule/menu/trendi.menu.mobile.html',
            link: function(scope, elm, attrs) {
                scope.slides = [];
                scope.clickMenu = function(val){
                    delete $location.$$search.itemId;
                    $location.path('main/products/all/'+val.category+'/'+val.value);
                };
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

    mod.directive('trendiExpandMenu',['$location',function($location) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                shop:'='
            },
            templateUrl:'/views/coreModule/menu/trendi.menu.expand.html',
            link: function(scope, elm, attrs) {
                scope.slides = [];
                scope.clickMenu = function(val){
                    delete $location.$$search.itemId;
                    $location.path('main/products/all/'+val.category+'/'+val.value);
                };
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


    mod.directive('trendiProductExpandMenu',[function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl:'/views/coreModule/menu/trendi.product.menu.html',
            link: function(scope, elm, attrs) {
                scope.slides = [];
                scope.mainMenu = [
                    {
                        title:'Women',
                        subMenu:[
                            {
                                title:"Dresses",
                                subMenu:[
                                    {
                                        title:"Club Dresses"
                                    },
                                    {
                                        title:"Evening Dresses"
                                    },
                                    {
                                        title:"Prom Dresses"
                                    }
                                ]
                            },
                            {
                                title:"Shirts",
                                subMenu:[
                                    {
                                        title:"Skinny type"
                                    },
                                    {
                                        title:"Net Shirt"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        title:'Men',
                        subMenu:[
                            {
                                title:"Shorts",
                                subMenu:[
                                    {
                                        title:"Beach Shorts"
                                    },
                                    {
                                        title:"Cama Shorts"
                                    }
                                ]
                            }
                        ]
                    }

                ]

                scope.clickExpand = function(item){
                    item.expand = !item.expand
                }

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



    mod.directive('trendiFileUpload',['Data.Toast',function(Data_Toast) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                files : '=',
                imageSize:'=',
                imageCount:'='
            },
            templateUrl: function(elem,attrs) {
                var url = '/views/coreModule/fileUpload/'+(attrs.template? attrs.template : 'trendi.fileupload.main')+'.html';
                return url;
            },
            link: function(scope, elm, attrs) {
                scope.imageCount = parseInt(scope.imageCount);
                scope.clickedDefault = false;
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
                                if (files[i].size < scope.imageSize.value) {
                                    // scope.files.push(files[i]);
                                    if (files[i].type == "image/jpeg" || files[i].type == "image/png" ) {
                                        scope.getFileContent(files[i]);
                                    } else {
                                        Data_Toast.error('File type should be PNG or JPEG');
                                    }
                                } else {
                                    Data_Toast.error('File size limit exceeded');
                                }

                            }
                        });
                    }
                }, false);


                scope.setFiles = function (element) {
                    scope.progressVisible = false;
                    scope.successfullyUploaded = false;
                    var files = element.files;
                    // Turn the FileList object into an Array
                    for (var i = 0; i < files.length; i++) {
                        if (files[i].size < scope.imageSize.value) {
                            // scope.files.push(files[i]);
                            if (files[i].type == "image/jpeg" || files[i].type == "image/png" ) {
                                scope.getFileContent(files[i]);
                            } else {
                                Data_Toast.error('File type should be PNG or JPEG');
                            }
                        } else {
                            Data_Toast.error('File size limit exceeded');
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
                    if(scope.files[index].default){
                        scope.clickedDefault = false;
                        scope.files.splice(index, 1);
                        scope.fileContent = '';
                        if(scope.files.length > 0)
                            scope.files[0].default = true;
                    }else{
                        scope.files.splice(index, 1);
                        scope.fileContent = '';
                    }



                };

                scope.setDefault = function (index) {
                    scope.clickedDefault = true;
                    _.each(scope.files,function(k){
                        k.default = false;
                    });
                    scope.files[index].default = true;
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
                            if(scope.files.length < scope.imageCount) {
                                scope.files.push(fileDetail);
                                if (!scope.clickedDefault) {
                                    scope.files[0].default = true;
                                }
                            }else{
                                Data_Toast.error('You can upload only '+scope.imageCount+' images');
                            }
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

    mod.directive('trendiChips',[function(){
        return{
            restrict:'E',
            templateUrl:'/views/coreModule/chip/trendi.chip.size.html',
            scope:{
                selectedItems:"=",
                placeholder:"@",
                itemList:"="
            },
            link:function(scope, elm, attrs){
                scope.selectedItem = null;
                scope.searchText = null;
                scope.querySearch = querySearch;
                scope.items = loadItems();


                function querySearch (query) {
                    var results = query ? scope.items.filter(createFilterFor(query)) : [];
                    return results;
                }

                function createFilterFor(query) {
                    var lowercaseQuery = angular.lowercase(query);
                    return function filterFn(item) {
                        return (item._lowername.indexOf(lowercaseQuery) === 0);
                    };
                }
                function loadItems() {
                    var items = scope.itemList;
                    return items.map(function (item) {
                        item._lowername = item.value.toLowerCase();
                        return item;
                    });
                }
            }
        }
    }]);


    mod.directive('trendiTestMap',[function(){

        var controller = ['$scope', '$timeout', 'uiGmapLogger', '$http', 'rndAddToLatLon','uiGmapGoogleMapApi', function ($scope, $timeout, $log, $http, rndAddToLatLon,GoogleMapApi) {
            $log.currentLevel = $log.LEVELS.debug;
            var initVal = function(){
                $scope.map = {
                    clickedMarker : {
                        id: 0,
                        options: {
                            labelContent: '',
                            labelClass: "marker-labels",
                            labelAnchor:"50 0"
                        },
                        latitude: $scope.getPoint[0]?$scope.getPoint[0]:6.933,
                        longitude: $scope.getPoint[1]?$scope.getPoint[1]:80.305
                    }
                 };

                GoogleMapApi.then(function(maps) {
                    $scope.googleVersion = maps.version;
                    maps.visualRefresh = true;

                });
            };
            initVal();



            var syncVal = function(){
                $scope.getPoint[0] = $scope.map.clickedMarker.latitude;
                $scope.getPoint[1] = $scope.map.clickedMarker.longitude;
            };


            var clusterTypes = ['standard','ugly','beer'];
            var selectedClusterTypes = {};

            angular.extend($scope, {
                example2: {
                    doRebuildAll: false
                },
                clickWindow: function () {
                    $log.info('CLICK CLICK');
                    Logger.info('CLICK CLICK');
                },
                map: {
                    show: true,
                    control: {},
                    version: "uknown",
                    heatLayerCallback: function (layer) {
                        //set the heat layers backend data
                        var mockHeatLayer = new MockHeatLayer(layer);
                    },
                    showTraffic: true,
                    showBicycling: false,
                    showWeather: false,
                    showHeat: false,
                    center: {
                        latitude: 6.933,
                        longitude: 80.305
                    },
                    options: {
                        streetViewControl: false,
                        panControl: false,
                        maxZoom: 20,
                        minZoom: 3
                    },
                    zoom: 10,
                    dragging: false,
                    bounds: {},
                    markers: [
                        {
                            id: 1,
                            latitude: 45,
                            longitude: -74,
                            showWindow: false,
                            options: {
                                animation: 1,
                                labelContent: 'Markers id 1',
                                labelAnchor: "22 0",
                                labelClass: "marker-labels"
                            }
                        }
                    ],
                    markers2: [
                        {
                            id: 2,
                            icon: '../../images/drag_marker.png',
                            latitude: $scope.getPoint[0]?$scope.getPoint[0]:6.933,
                            longitude:$scope.getPoint[1]?$scope.getPoint[1]:80.305,
                            showWindow: false,
                            options: {
                                labelContent: 'Drag to Shop',
                                labelAnchor: "22 0",
                                labelClass: "marker-labels",
                                draggable: true
                            }
                        }
                    ],
                    mexiIdKey: 'mid',
                    dynamicMarkers: [],
                    randomMarkers: [],
                    doClusterRandomMarkers: true,
                    currentClusterType: 'standard',
                    clusterTypes: clusterTypes,
                    /*                        selectClusterType: selectClusterType,
                     selectedClusterTypes: selectedClusterTypes,*/
                    clusterOptions: selectedClusterTypes['standard'],
                    clickedMarker: {
                        id: 0,
                        options:{
                        }
                    },
                    events: {

                        tilesloaded: function (map, eventName, originalEventArgs) {
                        },
                        click: function (mapModel, eventName, originalEventArgs) {
                            // 'this' is the directive's scope
                            $log.info("user defined event: " + eventName, mapModel, originalEventArgs);

                            var e = originalEventArgs[0];
                            var lat = e.latLng.lat(),
                                lon = e.latLng.lng();
                            $scope.map.markers2[0].latitude = lat;
                            $scope.map.markers2[0].longitude = lon;
                            syncVal();
                            $scope.map.clickedMarker = {
                                id: 0,
                                options: {
                                    labelContent: '',
                                    labelClass: "marker-labels",
                                    labelAnchor:"50 0"
                                },
                                latitude: lat,
                                longitude: lon
                            };
                            //scope apply required because this event handler is outside of the angular domain
                            $scope.$apply();
                        }

                    }

                },
                toggleColor: function (color) {
                    return color == 'red' ? '#6060FB' : 'red';
                }

            });


            $scope.map.markers2Events = {
                dragend: function (marker, eventName, model, args) {
                    $scope.map.clickedMarker.latitude = model.latitude;
                    $scope.map.clickedMarker.longitude = model.longitude;
                    syncVal();
                    model.options.labelContent = "Drag to Shop";
                }
            };

        }];

        return{
            restrict:'E',
            templateUrl:'/views/coreModule/googleMap/trendi.google.map.html',
            scope:{
                getPoint : '='
            },
            controller:controller
        }
    }]);


    mod.directive('trendiDirectionMap',[function(){

        var controller = ['$scope','uiGmapIsReady', '$timeout', 'uiGmapLogger', '$http', 'rndAddToLatLon','uiGmapGoogleMapApi',function ($scope, uiGmapIsReady, $timeout, $log, $http, rndAddToLatLon,GoogleMapApi) {
            var direction = $scope.direction;

            GoogleMapApi.then(function(maps) {
                $scope.googleVersion = maps.version;
                maps.visualRefresh = true;

            });

            $scope.map = {
                center : {
                    latitude: direction.end.lat,
                    longitude: direction.end.lon
                },
                zoom : 14,
                control : {}
            };


            $scope.map.markers =  [
                {
                    id: 1,
                    icon: '../../images/drag_marker.png',
                    latitude: direction.start.lat,
                    longitude: direction.start.lon,
                    showWindow: false,
                    options: {
                        labelContent: 'Your location',
                        labelAnchor: "26 0",
                        labelClass: "marker-labels"

                    }
                },
                {
                    id: 3,
                    icon: '../../images/drag_marker.png',
                    latitude: direction.end.lat,
                    longitude: direction.end.lon,
                    showWindow: true,
                    title: 'Plane',
                    options: {
                        animation: 1,
                        name: $scope.direction.end.name
                    }
                }
            ];



            var directionsDisplay, directionsService;

            uiGmapIsReady.promise(1).then(function(instances) {
                console.log('uiGmapIsReady');
                directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers : true});
                directionsService = new google.maps.DirectionsService();
                directionsDisplay.setMap(instances[0].map);
            });

            $scope.getDirection = function(){
                var request = {
                    origin: new google.maps.LatLng( direction.start.lat, direction.start.lon),
                    destination: new google.maps.LatLng(direction.end.lat , direction.end.lon),
                    travelMode: google.maps.TravelMode.DRIVING
                };
                directionsService.route(request, function(response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                    }else{

                    }
                });
            };

        }];

        return{
            restrict:'E',
            templateUrl:'/views/coreModule/googleMap/trendi.direction.map.html',
            scope:{
                direction : '='
            },
            controller:controller
        }
    }]);


    mod.directive('trendiMap',[function(){

        var controller = ['$scope','uiGmapIsReady', '$timeout', 'uiGmapLogger', '$http', 'rndAddToLatLon','uiGmapGoogleMapApi',function ($scope, uiGmapIsReady, $timeout, $log, $http, rndAddToLatLon,GoogleMapApi) {
           $scope.key = 80;
           $scope.location={
               latitude : $scope.getPoint[0]?$scope.getPoint[0]:6.933,
               longitude: $scope.getPoint[1]?$scope.getPoint[1]:80.305
           };

            $scope.map = {
                center: {
                    latitude: 6.933,
                    longitude: 80.305
                },
                zoom: 8,
                events: {
                    click: function (mapModel, eventName, originalEventArgs) {


                        $scope.getPoint[0] = originalEventArgs[0].latLng.lat();
                        $scope.getPoint[1] = originalEventArgs[0].latLng.lng();
                        //scope apply required because this event handler is outside of the angular domain
                        $scope.$apply();
                    }
                },
                marker: {
                    options: { draggable: true },
                    events: {
                        dragend: function (marker, eventName, args) {

                            $scope.getPoint[0] = marker.getPosition().lat();
                            $scope.getPoint[1] = marker.getPosition().lng();
                        }
                    }
                }

            };
            if($scope.getPoint[0] == undefined && $scope.getPoint[1] == undefined){
                $scope.map.lockLocation = false;
            }else{
                $scope.map.lockLocation = true;
            }

            $scope.map.getCenter = function(){
                if($scope.map.lockLocation){
                    return $scope.map.center;

                }else{
                    return $scope.location;
                }
            }

        }];

        return{
            restrict:'E',
            templateUrl:'/views/coreModule/googleMap/trendi.google.place.html',
            scope:{
                getPoint : '='
            },
            controller:controller
        }
    }]);


    mod.directive('compareTo',[function(){
        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=compareTo"
            },
            link: function(scope, element, attributes, ngModel) {

                ngModel.$validators.compareTo = function(modelValue) {
                    return modelValue == scope.otherModelValue;
                };

                scope.$watch("otherModelValue", function() {
                    ngModel.$validate();
                });
            }
        };
    }]);


    mod.directive('infiniteScroll', [
        '$rootScope', '$window', '$timeout', function($rootScope, $window, $timeout) {
            return {
                link: function(scope, elem, attrs) {
                    var checkWhenEnabled, handler, scrollDistance, scrollEnabled;
                    $window = angular.element($window);
                    scrollDistance = 0;
                    if (attrs.infiniteScrollDistance != null) {
                        scope.$watch(attrs.infiniteScrollDistance, function(value) {
                            return scrollDistance = parseInt(value, 10);
                        });
                    }
                    scrollEnabled = true;
                    checkWhenEnabled = false;
                    if (attrs.infiniteScrollDisabled != null) {
                        scope.$watch(attrs.infiniteScrollDisabled, function(value) {
                            scrollEnabled = !value;
                            if (scrollEnabled && checkWhenEnabled) {
                                checkWhenEnabled = false;
                                return handler();
                            }
                        });
                    }
                    handler = function() {
                        var elementBottom, remaining, shouldScroll, windowBottom;
                        windowBottom = $window.height() + $window.scrollTop();
                        elementBottom = elem.offset().top + elem.height();
                        remaining = elementBottom - windowBottom;
                        shouldScroll = remaining <= $window.height() * scrollDistance;
                        if (shouldScroll && scrollEnabled) {
                            if ($rootScope.$$phase) {
                                return scope.$eval(attrs.infiniteScroll);
                            } else {
                                return scope.$apply(attrs.infiniteScroll);
                            }
                        } else if (shouldScroll) {
                            return checkWhenEnabled = true;
                        }
                    };
                    $window.on('scroll', handler);
                    scope.$on('$destroy', function() {
                        return $window.off('scroll', handler);
                    });
                    return $timeout((function() {
                        if (attrs.infiniteScrollImmediateCheck) {
                            if (scope.$eval(attrs.infiniteScrollImmediateCheck)) {
                                return handler();
                            }
                        } else {
                            return handler();
                        }
                    }), 0);
                }
            };
        }
    ]);


    mod.directive('trendiStarBar',['mainDataService','$rootScope','Login.Window',function(mainDataService, $rootScope, Login_Window){
        return {
            restrict: 'E',
            replace: true,
            scope: {
                rateObject: "=",
                category:"@",
                objectId:"="
            },
            template: '<div><rating ng-model="rate" max="10" readonly="isReadonly" on-hover="hoveringOver(value)" ng-click="rateChange()" on-leave="overStar = null" state-on="\'icon-star-3\'" state-off="\'icon-star-empty\'"></rating><span class="label" ng-class="{\'label-warning\': percent<30, \'label-info\': percent>=30 && percent<70, \'label-success\': percent>=70}" ng-show="overStar">{{percent}}%</span></div>',
            link: function(scope, elm, attrs) {
                scope.isReadonly = false;
                if(scope.rateObject)
                    scope.rate = scope.rateObject.star/scope.rateObject.hit;
                scope.max = 10;
                scope.isReadonly = false;

                scope.hoveringOver = function(value) {
                    scope.overStar = value;
                    scope.percent = 100 * (value / scope.max);
                };

                scope.rateChange = function(){
                    if(Login_Window.checkUser()){
                        if(!scope.isReadonly) {
                            mainDataService.setRate({category:scope.category, id:scope.objectId, rate:scope.rate}).then(function(response){
                                scope.isReadonly = true;
                            },function(){
                            });
                        }
                    }else{
                         scope.rate = scope.rateObject.star/scope.rateObject.hit;
                         Login_Window.showLogin();
                    }
                  
                };


            }
        };
    }]);

    
})(com.TRENDI.CATEGORY.modules.coreModule);