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
               // scope.files = [];
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
                                if (files[i].size < 1000000) {
                                   // scope.files.push(files[i]);
                                    if (files[i].type == "image/jpeg" || files[i].type == "image/png" ) {
                                        scope.getFileContent(files[i]);
                                    } else {

                                    }
                                } else {

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
                            if (files[i].size < 1000000) {
                                // scope.files.push(files[i]);
                                if (files[i].type == "image/jpeg" || files[i].type == "image/png" ) {
                                    scope.getFileContent(files[i]);
                                } else {

                                }
                            } else {

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
                        scope.files.push(fileDetail);
                            if(!scope.clickedDefault){
                                scope.files[0].default = true;
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


    mod.directive('trendiMap',[function(){

        var controller = ['$scope', '$timeout', 'uiGmapLogger', '$http', 'rndAddToLatLon','uiGmapGoogleMapApi', function ($scope, $timeout, $log, $http, rndAddToLatLon,GoogleMapApi) {
                $log.currentLevel = $log.LEVELS.debug;
                var val = $scope.getPoint;
                GoogleMapApi.then(function(maps) {
                    $scope.googleVersion = maps.version;
                    maps.visualRefresh = true;
/*                    $log.info('$scope.map.rectangle.bounds set');
                    $scope.map.rectangle.bounds = new maps.LatLngBounds(
                        new maps.LatLng(55,-100),
                        new maps.LatLng(49,-78)
                    );*/
                  /*  $scope.map.polylines = [
                        {
                            id: 1,
                            path: [
                                {
                                    latitude: 45,
                                    longitude: -74
                                },
                                {
                                    latitude: 30,
                                    longitude: -89
                                },
                                {
                                    latitude: 37,
                                    longitude: -122
                                },
                                {
                                    latitude: 60,
                                    longitude: -95
                                }
                            ],
                            stroke: {
                                color: '#6060FB',
                                weight: 3
                            },
                            editable: true,
                            draggable: true,
                            geodesic: true,
                            visible: true,
                            icons: [
                                {
                                    icon: {
                                        path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW
                                    },
                                    offset: '25px',
                                    repeat: '50px'
                                }
                            ]
                        },
                        {
                            id: 2,
                            path: [
                                {
                                    latitude: 47,
                                    longitude: -74
                                },
                                {
                                    latitude: 32,
                                    longitude: -89
                                },
                                {
                                    latitude: 39,
                                    longitude: -122
                                },
                                {
                                    latitude: 62,
                                    longitude: -95
                                }
                            ],
                            stroke: {
                                color: '#6060FB',
                                weight: 3
                            },
                            editable: true,
                            draggable: true,
                            geodesic: true,
                            visible: true,
                            icons: [
                                {
                                    icon: {
                                        path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW
                                    },
                                    offset: '25px',
                                    repeat: '50px'
                                }
                            ]
                        },
                        {
                            id: 3,
                            path: google.maps.geometry.encoding.decodePath("uowfHnzb}Uyll@i|i@syAcx}Cpj[_wXpd}AhhCxu[ria@_{AznyCnt^|re@nt~B?m|Awn`G?vk`RzyD}nr@uhjHuqGrf^ren@"),
                            stroke: {
                                color: '#4EAE47',
                                weight: 3
                            },
                            editable: false,
                            draggable: false,
                            geodesic: false,
                            visible: true
                        }
                    ]*/
                });

               /* var versionUrl = (window.location.host === "rawgithub.com" || window.location.host === "rawgit.com") ?
                    "../package.json" : "/package.json";*/

            /*    $http.get(versionUrl).success(function (data) {
                    if (!data)
                        console.error("no version object found!!");
                    $scope.version = data.version;
                });*/

              /*  var onMarkerClicked = function (marker) {
                    marker.showWindow = true;
                    $scope.$apply();
                    //window.alert("Marker: lat: " + marker.latitude + ", lon: " + marker.longitude + " clicked!!")
                };*/

/*                var genRandomMarkers = function (numberOfMarkers, scope) {
                    var markers = [];
                    for (var i = 0; i < numberOfMarkers; i++) {
                        markers.push(createRandomMarker(i, scope.map.bounds))
                    }
                    scope.map.randomMarkers = markers;
                };*/

/*                var createRandomMarker = function (i, bounds, idKey) {
                    var lat_min = bounds.southwest.latitude,
                        lat_range = bounds.northeast.latitude - lat_min,
                        lng_min = bounds.southwest.longitude,
                        lng_range = bounds.northeast.longitude - lng_min;

                    if (idKey == null)
                        idKey = "id";

                    var latitude = lat_min + (Math.random() * lat_range);
                    var longitude = lng_min + (Math.random() * lng_range);
                    var ret = {
                        latitude: latitude,
                        longitude: longitude,
                        title: 'm' + i
                    };
                    ret[idKey] = i;
                    return ret;
                };*/


                var clusterTypes = ['standard','ugly','beer'];
                var selectedClusterTypes = {};
/*                var selectClusterType = function(value){
                    var cloned = _.clone($scope.map.randomMarkers, true);
                    $scope.map.randomMarkers = [];
                    $scope.map.clusterOptions = $scope.map.selectedClusterTypes[value] || $scope.map.selectedClusterTypes['standard'];
                    $scope.map.clusterOptionsText =  angular.toJson($scope.map.clusterOptions);
                    if(!value){
                        value = 'standard';
                    }
                    $timeout(function(){
                        $scope.map.randomMarkers = cloned;
                    },200);

                    return value;
                };*/

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
                            },
                            {
                                id: 2,
                                latitude: 15,
                                longitude: 30,
                                showWindow: false
                            },
                            {
                                id: 3,
                                icon: 'assets/images/plane.png',
                                latitude: 37,
                                longitude: -122,
                                showWindow: false,
                                title: 'Plane',
                                options: {
                                    labelContent: 'Markers id 3',
                                    labelAnchor: "26 0",
                                    labelClass: "marker-labels"
                                }
                            }
                        ],
                        markers2: [
                            {
                                id: 2,
                                icon: '../../images/drag_marker.png',
                                latitude: 7.273,
                                longitude: 80.113,
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
                       /* mexiMarkers: [
                            {
                                mid: 1,
                                latitude: 29.302567,
                                longitude: -106.248779

                            },
                            {
                                mid: 2,
                                latitude: 30.369913,
                                longitude: -109.434814
                            },
                            {
                                mid: 3,
                                latitude: 26.739478,
                                longitude: -108.61084
                            }
                        ],
                        clickMarkers: [
                            {id: 1, "latitude": 50.948968, "longitude": 6.944781}
                            ,
                            {id: 2, "latitude": 50.94129, "longitude": 6.95817}
                            ,
                            {id: 3, "latitude": 50.9175, "longitude": 6.943611}
                        ],*/
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
                           /* dragend: function () {
                                $timeout(function () {
                                    var markers = [];

                                    var id = 0;
                                    if ($scope.map.mexiMarkers !== null && $scope.map.mexiMarkers.length > 0) {
                                        var maxMarker = _.max($scope.map.mexiMarkers, function (marker) {
                                            return marker.mid;
                                        });
                                        id = maxMarker.mid;
                                    }
                                    for (var i = 0; i < 4; i++) {
                                        id++;
                                        markers.push(createRandomMarker(id, $scope.map.bounds, "mid"));
                                    }
                                    $scope.map.mexiMarkers = markers.concat($scope.map.mexiMarkers);
                                });
                            }*/
                        }/*,
                        infoWindow: {
                            coords: {
                                latitude: 36.270850,
                                longitude: -44.296875
                            },
                            options: {
                                disableAutoPan: true
                            },
                            show: false
                        }*/
                        /*infoWindowWithCustomClass: {
                            coords: {
                                latitude: 36.270850,
                                longitude: -44.296875
                            },
                            options: {
                                boxClass: 'custom-info-window',
                                closeBoxDiv: '<div" class="pull-right" style="position: relative; cursor: pointer; margin: -20px -15px;">X</div>',
                                disableAutoPan: true
                            },
                            show: true
                        },*/
                       /* templatedInfoWindow: {
                            coords: {
                                latitude: 48.654686,
                                longitude: -75.937500
                            },
                            options: {
                                disableAutoPan: true
                            },
                            show: true,
                            templateUrl: 'assets/templates/info.html',
                            templateParameter: {
                                message: 'passed in from the opener'
                            }
                        }*/
/*                        circles: [
                            {
                                id: 1,
                                center: {
                                    latitude: 44,
                                    longitude: -108
                                },
                                radius: 500000,
                                stroke: {
                                    color: '#08B21F',
                                    weight: 2,
                                    opacity: 1
                                },
                                fill: {
                                    color: '#08B21F',
                                    opacity: 0.5
                                },
                                geodesic: true, // optional: defaults to false
                                draggable: true, // optional: defaults to false
                                clickable: true, // optional: defaults to true
                                editable: true, // optional: defaults to false
                                visible: true, // optional: defaults to true
                                events:{
                                    dblclick: function(){
                                        window.alert("circle dblclick");
                                    }
                                }
                            }
                        ],
                        rectangle:{
                            bounds:{},
                            stroke: {
                                color: '#08B21F',
                                weight: 2,
                                opacity: 1
                            },
                            fill: {
                                color: 'pink',
                                opacity: 0.5
                            },
                            events:{
                                dblclick: function(){
                                    window.alert("rectangle dblclick");
                                }
                            },
                            draggable: true, // optional: defaults to false
                            clickable: true, // optional: defaults to true
                            editable: true, // optional: defaults to false
                            visible: true // optional: defaults to true
                        },
                        polygonEvents:{
                            dblclick:function(){
                                alert("Polgon Double Clicked!");
                            }
                        },
                        polygons: [
                            {
                                id: 1,
                                path: [
                                    {
                                        latitude: 50,
                                        longitude: -80
                                    },
                                    {
                                        latitude: 30,
                                        longitude: -120
                                    },
                                    {
                                        latitude: 20,
                                        longitude: -95
                                    }
                                ],
                                stroke: {
                                    color: '#6060FB',
                                    weight: 3
                                },
                                editable: true,
                                draggable: true,
                                geodesic: false,
                                visible: true,
                                fill: {
                                    color: '#ff0000',
                                    opacity: 0.8
                                }
                            }
                        ],
                        polygons2: [
                            {
                                id: 1,
                                path: [
                                    {
                                        latitude: 60,
                                        longitude: -80
                                    },
                                    {
                                        latitude: 40,
                                        longitude: -120
                                    },
                                    {
                                        latitude: 45,
                                        longitude: -95
                                    }
                                ],
                                stroke: {
                                    color: '#33CDDC',
                                    weight: 3
                                },
                                editable: true,
                                draggable: true,
                                geodesic: false,
                                visible: true,
                                fill: {
                                    color: '#33CCCC',
                                    opacity: 0.8
                                }
                            }
                        ],
                        polylines: []*/
                    },
                    toggleColor: function (color) {
                        return color == 'red' ? '#6060FB' : 'red';
                    }

                });


                $scope.map.markers2Events = {
                    dragend: function (marker, eventName, model, args) {
                        $scope.map.clickedMarker.latitude = model.latitude;
                        $scope.map.clickedMarker.longitude = model.longitude;
                        model.options.labelContent = "Drag to Shop";
                    }
                };
            /*
                _.each($scope.map.markers, function (marker) {
                    marker.closeClick = function () {
                        marker.showWindow = false;
                        $scope.$evalAsync();
                    };
                    marker.onClicked = function () {
                        onMarkerClicked(marker);
                    };
                });

                $scope.map.markers2.forEach( function (marker) {
                    marker.onClicked = function () {
                        onMarkerClicked(marker);
                    };
                    marker.closeClick = function () {
                        marker.showWindow = false;
                        $scope.$evalAsync();
                    };
                });

                $scope.removeMarkers = function () {
                    $log.info("Clearing markers. They should disappear from the map now");
                    $scope.map.markers = [];
                    $scope.map.markers2 = [];
                    $scope.map.dynamicMarkers = [];
                    $scope.map.randomMarkers = [];
                    $scope.map.mexiMarkers = [];
                    $scope.map.clickMarkers = [];
                    $scope.map.polylines = [];
                    $scope.map.polygons = [];
                    $scope.map.polygons2 = [];
                    $scope.map.circles = [];
                    $scope.map.rectangle = null;
                    $scope.map.clickedMarker = null;
                    $scope.staticMarker = null;
                    $scope.map.infoWindow.show = false;
                    $scope.map.templatedInfoWindow.show = false;
                    $scope.map.templatedInfoWindow.coords = null;
                    $scope.map.infoWindowWithCustomClass.show = false
                    $scope.map.infoWindowWithCustomClass.coords = null;
                    $scope.map.infoWindow.show = false
                    $scope.map.infoWindow.coords = null;
                };
                $scope.refreshMap = function () {
                    //optional param if you want to refresh you can pass null undefined or false or empty arg
                    $scope.map.control.refresh({latitude: 32.779680, longitude: -79.935493});
                    $scope.map.control.getGMap().setZoom(11);
                    return;
                };
                $scope.getMapInstance = function () {
                    alert("You have Map Instance of" + $scope.map.control.getGMap().toString());
                    return;
                }
                $scope.map.clusterOptionsText = JSON.stringify($scope.map.clusterOptions);
                $scope.$watch('map.clusterOptionsText', function (newValue, oldValue) {
                    if (newValue !== oldValue)
                        $scope.map.clusterOptions = angular.fromJson($scope.map.clusterOptionsText);
                });

                $scope.genRandomMarkers = function (numberOfMarkers) {
                    genRandomMarkers(numberOfMarkers, $scope);
                };

                $scope.staticMarker = {
                    id: 0,
                    coords: {
                        latitude: 40.1451,
                        longitude: -99.6680
                    },
                    options: { draggable: true },
                    events: {
                        dragend: function (marker, eventName, args) {
                            $log.log('marker dragend');
                            $log.log(marker.getPosition().lat());
                            $log.log(marker.getPosition().lng());
                        }
                    }
                };
                $scope.onMarkerClicked = onMarkerClicked;

                $scope.clackMarker = function (gMarker,eventName, model) {
                    alert("clackMarker: " + model);
                    $log.log("from clackMarker");
                    $log.log(model);
                };*/

                /*$timeout(function () {
                    $scope.map.infoWindow.show = true;
                    var dynamicMarkers = [
                        {
                            id: 1,
                            latitude: 46,
                            longitude: -79,
                            showWindow: false
                        },
                        {
                            id: 2,
                            latitude: 33,
                            longitude: -79,
                            showWindow: false
                        },
                        {
                            id: 3,
                            icon: 'assets/images/plane.png',
                            latitude: 35,
                            longitude: -127,
                            showWindow: false
                        }
                    ];

                    $scope.map.polylines.push({
                        id: 3,
                        path: [
                            {
                                latitude: 65,
                                longitude: -74
                            },
                            {
                                latitude: 50,
                                longitude: -89
                            },
                            {
                                latitude: 57,
                                longitude: -122
                            },
                            {
                                latitude: 20,
                                longitude: -95
                            }
                        ],
                        stroke: {
                            color: '#FF0066',
                            weight: 3
                        },
                        editable: true,
                        draggable: true,
                        geodesic: true,
                        visible: true
                    });

                    $scope.map.polylines = $scope.map.polylines.slice(1);
                    _.each(dynamicMarkers, function (marker) {
                        marker.closeClick = function () {
                            marker.showWindow = false;
                            $scope.$apply();
                        };
                        marker.onClicked = function () {
                            onMarkerClicked(marker);
                        };
                    });
                    $scope.map.dynamicMarkers = dynamicMarkers;
                }, 2000);*/
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

        var controller = ['$scope', '$timeout', 'uiGmapLogger', '$http', 'rndAddToLatLon','uiGmapGoogleMapApi', function ($scope, $timeout, $log, $http, rndAddToLatLon,GoogleMapApi) {
            $log.currentLevel = $log.LEVELS.debug;

            GoogleMapApi.then(function(maps) {
                $scope.googleVersion = maps.version;
                maps.visualRefresh = true;
                $log.info('$scope.map.rectangle.bounds set');
                $scope.map.rectangle.bounds = new maps.LatLngBounds(
                    new maps.LatLng(55,-100),
                    new maps.LatLng(49,-78)
                );
                $scope.map.polylines = [
                    {
                        id: 1,
                        path: [
                            {
                                latitude: 45,
                                longitude: -74
                            },
                            {
                                latitude: 30,
                                longitude: -89
                            },
                            {
                                latitude: 37,
                                longitude: -122
                            },
                            {
                                latitude: 60,
                                longitude: -95
                            }
                        ],
                        stroke: {
                            color: '#6060FB',
                            weight: 3
                        },
                        editable: true,
                        draggable: true,
                        geodesic: true,
                        visible: true,
                        icons: [
                            {
                                icon: {
                                    path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW
                                },
                                offset: '25px',
                                repeat: '50px'
                            }
                        ]
                    },
                    {
                        id: 2,
                        path: [
                            {
                                latitude: 47,
                                longitude: -74
                            },
                            {
                                latitude: 32,
                                longitude: -89
                            },
                            {
                                latitude: 39,
                                longitude: -122
                            },
                            {
                                latitude: 62,
                                longitude: -95
                            }
                        ],
                        stroke: {
                            color: '#6060FB',
                            weight: 3
                        },
                        editable: true,
                        draggable: true,
                        geodesic: true,
                        visible: true,
                        icons: [
                            {
                                icon: {
                                    path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW
                                },
                                offset: '25px',
                                repeat: '50px'
                            }
                        ]
                    },
                    {
                        id: 3,
                        path: google.maps.geometry.encoding.decodePath("uowfHnzb}Uyll@i|i@syAcx}Cpj[_wXpd}AhhCxu[ria@_{AznyCnt^|re@nt~B?m|Awn`G?vk`RzyD}nr@uhjHuqGrf^ren@"),
                        stroke: {
                            color: '#4EAE47',
                            weight: 3
                        },
                        editable: false,
                        draggable: false,
                        geodesic: false,
                        visible: true
                    }
                ]
            });

            var versionUrl = (window.location.host === "rawgithub.com" || window.location.host === "rawgit.com") ?
                "../package.json" : "/package.json";

            $http.get(versionUrl).success(function (data) {
                if (!data)
                    console.error("no version object found!!");
                $scope.version = data.version;
            });

            var onMarkerClicked = function (marker) {
                marker.showWindow = true;
                $scope.$apply();
                //window.alert("Marker: lat: " + marker.latitude + ", lon: " + marker.longitude + " clicked!!")
            };

            var genRandomMarkers = function (numberOfMarkers, scope) {
                var markers = [];
                for (var i = 0; i < numberOfMarkers; i++) {
                    markers.push(createRandomMarker(i, scope.map.bounds))
                }
                scope.map.randomMarkers = markers;
            };

            var createRandomMarker = function (i, bounds, idKey) {
                var lat_min = bounds.southwest.latitude,
                    lat_range = bounds.northeast.latitude - lat_min,
                    lng_min = bounds.southwest.longitude,
                    lng_range = bounds.northeast.longitude - lng_min;

                if (idKey == null)
                    idKey = "id";

                var latitude = lat_min + (Math.random() * lat_range);
                var longitude = lng_min + (Math.random() * lng_range);
                var ret = {
                    latitude: latitude,
                    longitude: longitude,
                    title: 'm' + i
                };
                ret[idKey] = i;
                return ret;
            };


            var clusterTypes = ['standard','ugly','beer'];
            var selectedClusterTypes = {
                ugly:{
                    title: 'Hi I am a Cluster!',
                    gridSize: 60, ignoreHidden: true,
                    minimumClusterSize: 2,
                    imageExtension: 'png',
                    imagePath: 'assets/images/cluster', imageSizes: [72]
                },
                beer:{
                    title: 'Beer!',
                    gridSize: 60,
                    ignoreHidden: true,
                    minimumClusterSize: 2,
                    enableRetinaIcons: true,
                    styles: [{
                        url: 'assets/images/beer.png',
                        textColor: '#ddddd',
                        textSize: 18,
                        width: 33,
                        height: 33
                    }]
                },
                standard:{
                    title: 'Hi I am a Cluster!', gridSize: 60, ignoreHidden: true, minimumClusterSize: 2
                }
            };
            var selectClusterType = function(value){
                var cloned = _.clone($scope.map.randomMarkers, true);
                $scope.map.randomMarkers = [];
                $scope.map.clusterOptions = $scope.map.selectedClusterTypes[value] || $scope.map.selectedClusterTypes['standard'];
                $scope.map.clusterOptionsText =  angular.toJson($scope.map.clusterOptions);
                if(!value){
                    value = 'standard';
                }
                $timeout(function(){
                    $scope.map.randomMarkers = cloned;
                },200);

                return value;
            };

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
                        latitude: 45,
                        longitude: -73
                    },
                    options: {
                        streetViewControl: false,
                        panControl: false,
                        maxZoom: 20,
                        minZoom: 3
                    },
                    zoom: 3,
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
                        },
                        {
                            id: 2,
                            latitude: 15,
                            longitude: 30,
                            showWindow: false
                        },
                        {
                            id: 3,
                            icon: 'assets/images/plane.png',
                            latitude: 37,
                            longitude: -122,
                            showWindow: false,
                            title: 'Plane',
                            options: {
                                labelContent: 'Markers id 3',
                                labelAnchor: "26 0",
                                labelClass: "marker-labels"
                            }
                        }
                    ],
                    markers2: [
                        {
                            id: 1,
                            icon: 'assets/images/blue_marker.png',
                            latitude: 46,
                            longitude: -77,
                            showWindow: false,
                            options: {
                                labelContent: '[46,-77]',
                                labelAnchor: "22 0",
                                labelClass: "marker-labels"
                            }
                        },
                        {
                            id: 2,
                            icon: 'assets/images/blue_marker.png',
                            latitude: 33,
                            longitude: -77,
                            showWindow: false,
                            options: {
                                labelContent: 'DRAG ME!',
                                labelAnchor: "22 0",
                                labelClass: "marker-labels",
                                draggable: true
                            }
                        },
                        {
                            id: 3,
                            icon: 'assets/images/blue_marker.png',
                            latitude: 35,
                            longitude: -125,
                            showWindow: false,
                            options: {
                                labelContent: '[35,-125]',
                                labelAnchor: "22 0",
                                labelClass: "marker-labels"
                            }
                        }
                    ],
                    mexiIdKey: 'mid',
                    mexiMarkers: [
                        {
                            mid: 1,
                            latitude: 29.302567,
                            longitude: -106.248779

                        },
                        {
                            mid: 2,
                            latitude: 30.369913,
                            longitude: -109.434814
                        },
                        {
                            mid: 3,
                            latitude: 26.739478,
                            longitude: -108.61084
                        }
                    ],
                    clickMarkers: [
                        {id: 1, "latitude": 50.948968, "longitude": 6.944781}
                        ,
                        {id: 2, "latitude": 50.94129, "longitude": 6.95817}
                        ,
                        {id: 3, "latitude": 50.9175, "longitude": 6.943611}
                    ],
                    dynamicMarkers: [],
                    randomMarkers: [],
                    doClusterRandomMarkers: true,
                    currentClusterType: 'standard',
                    clusterTypes: clusterTypes,
                    selectClusterType: selectClusterType,
                    selectedClusterTypes: selectedClusterTypes,
                    clusterOptions: selectedClusterTypes['standard'],
                    clickedMarker: {
                        id: 0,
                        options:{
                        }
                    },
                    events: {
//This turns of events and hits against scope from gMap events this does speed things up
// adding a blacklist for watching your controller scope should even be better
//        blacklist: ['drag', 'dragend','dragstart','zoom_changed', 'center_changed'],
                        tilesloaded: function (map, eventName, originalEventArgs) {
                        },
                        click: function (mapModel, eventName, originalEventArgs) {
                            // 'this' is the directive's scope
                            $log.info("user defined event: " + eventName, mapModel, originalEventArgs);

                            var e = originalEventArgs[0];
                            var lat = e.latLng.lat(),
                                lon = e.latLng.lng();
                            $scope.map.clickedMarker = {
                                id: 0,
                                options: {
                                    labelContent: 'You clicked here ' + 'lat: ' + lat + ' lon: ' + lon,
                                    labelClass: "marker-labels",
                                    labelAnchor:"50 0"
                                },
                                latitude: lat,
                                longitude: lon
                            };
                            //scope apply required because this event handler is outside of the angular domain
                            $scope.$apply();
                        },
                        dragend: function () {
                            $timeout(function () {
                                var markers = [];

                                var id = 0;
                                if ($scope.map.mexiMarkers !== null && $scope.map.mexiMarkers.length > 0) {
                                    var maxMarker = _.max($scope.map.mexiMarkers, function (marker) {
                                        return marker.mid;
                                    });
                                    id = maxMarker.mid;
                                }
                                for (var i = 0; i < 4; i++) {
                                    id++;
                                    markers.push(createRandomMarker(id, $scope.map.bounds, "mid"));
                                }
                                $scope.map.mexiMarkers = markers.concat($scope.map.mexiMarkers);
                            });
                        }
                    },
                    infoWindow: {
                        coords: {
                            latitude: 36.270850,
                            longitude: -44.296875
                        },
                        options: {
                            disableAutoPan: true
                        },
                        show: false
                    },
                    infoWindowWithCustomClass: {
                        coords: {
                            latitude: 36.270850,
                            longitude: -44.296875
                        },
                        options: {
                            boxClass: 'custom-info-window',
                            closeBoxDiv: '<div" class="pull-right" style="position: relative; cursor: pointer; margin: -20px -15px;">X</div>',
                            disableAutoPan: true
                        },
                        show: true
                    },
                    templatedInfoWindow: {
                        coords: {
                            latitude: 48.654686,
                            longitude: -75.937500
                        },
                        options: {
                            disableAutoPan: true
                        },
                        show: true,
                        templateUrl: 'assets/templates/info.html',
                        templateParameter: {
                            message: 'passed in from the opener'
                        }
                    },
                    circles: [
                        {
                            id: 1,
                            center: {
                                latitude: 44,
                                longitude: -108
                            },
                            radius: 500000,
                            stroke: {
                                color: '#08B21F',
                                weight: 2,
                                opacity: 1
                            },
                            fill: {
                                color: '#08B21F',
                                opacity: 0.5
                            },
                            geodesic: true, // optional: defaults to false
                            draggable: true, // optional: defaults to false
                            clickable: true, // optional: defaults to true
                            editable: true, // optional: defaults to false
                            visible: true, // optional: defaults to true
                            events:{
                                dblclick: function(){
                                    window.alert("circle dblclick");
                                }
                            }
                        }
                    ],
                    rectangle:{
                        bounds:{},
                        stroke: {
                            color: '#08B21F',
                            weight: 2,
                            opacity: 1
                        },
                        fill: {
                            color: 'pink',
                            opacity: 0.5
                        },
                        events:{
                            dblclick: function(){
                                window.alert("rectangle dblclick");
                            }
                        },
                        draggable: true, // optional: defaults to false
                        clickable: true, // optional: defaults to true
                        editable: true, // optional: defaults to false
                        visible: true // optional: defaults to true
                    },
                    polygonEvents:{
                        dblclick:function(){
                            alert("Polgon Double Clicked!");
                        }
                    },
                    polygons: [
                        {
                            id: 1,
                            path: [
                                {
                                    latitude: 50,
                                    longitude: -80
                                },
                                {
                                    latitude: 30,
                                    longitude: -120
                                },
                                {
                                    latitude: 20,
                                    longitude: -95
                                }
                            ],
                            stroke: {
                                color: '#6060FB',
                                weight: 3
                            },
                            editable: true,
                            draggable: true,
                            geodesic: false,
                            visible: true,
                            fill: {
                                color: '#ff0000',
                                opacity: 0.8
                            }
                        }
                    ],
                    polygons2: [
                        {
                            id: 1,
                            path: [
                                {
                                    latitude: 60,
                                    longitude: -80
                                },
                                {
                                    latitude: 40,
                                    longitude: -120
                                },
                                {
                                    latitude: 45,
                                    longitude: -95
                                }
                            ],
                            stroke: {
                                color: '#33CDDC',
                                weight: 3
                            },
                            editable: true,
                            draggable: true,
                            geodesic: false,
                            visible: true,
                            fill: {
                                color: '#33CCCC',
                                opacity: 0.8
                            }
                        }
                    ],
                    polylines: []
                },
                toggleColor: function (color) {
                    return color == 'red' ? '#6060FB' : 'red';
                }

            });
            $scope.map.markers2Events = {
                dragend: function (marker, eventName, model, args) {
                    model.options.labelContent = "Dragged lat: " + model.latitude + " lon: " + model.longitude;
                }
            };

            _.each($scope.map.markers, function (marker) {
                marker.closeClick = function () {
                    marker.showWindow = false;
                    $scope.$evalAsync();
                };
                marker.onClicked = function () {
                    onMarkerClicked(marker);
                };
            });

            $scope.map.markers2.forEach( function (marker) {
                marker.onClicked = function () {
                    onMarkerClicked(marker);
                };
                marker.closeClick = function () {
                    marker.showWindow = false;
                    $scope.$evalAsync();
                };
            });

            $scope.removeMarkers = function () {
                $log.info("Clearing markers. They should disappear from the map now");
                $scope.map.markers = [];
                $scope.map.markers2 = [];
                $scope.map.dynamicMarkers = [];
                $scope.map.randomMarkers = [];
                $scope.map.mexiMarkers = [];
                $scope.map.clickMarkers = [];
                $scope.map.polylines = [];
                $scope.map.polygons = [];
                $scope.map.polygons2 = [];
                $scope.map.circles = [];
                $scope.map.rectangle = null;
                $scope.map.clickedMarker = null;
                $scope.staticMarker = null;
                $scope.map.infoWindow.show = false;
                $scope.map.templatedInfoWindow.show = false;
                $scope.map.templatedInfoWindow.coords = null;
                $scope.map.infoWindowWithCustomClass.show = false;
                $scope.map.infoWindowWithCustomClass.coords = null;
                $scope.map.infoWindow.show = false;
                $scope.map.infoWindow.coords = null;
            };
            $scope.refreshMap = function () {
                //optional param if you want to refresh you can pass null undefined or false or empty arg
                $scope.map.control.refresh({latitude: 32.779680, longitude: -79.935493});
                $scope.map.control.getGMap().setZoom(11);
                return;
            };
            $scope.getMapInstance = function () {
                alert("You have Map Instance of" + $scope.map.control.getGMap().toString());
                return;
            }
            $scope.map.clusterOptionsText = JSON.stringify($scope.map.clusterOptions);
            $scope.$watch('map.clusterOptionsText', function (newValue, oldValue) {
                if (newValue !== oldValue)
                    $scope.map.clusterOptions = angular.fromJson($scope.map.clusterOptionsText);
            });

            $scope.genRandomMarkers = function (numberOfMarkers) {
                genRandomMarkers(numberOfMarkers, $scope);
            };

            $scope.staticMarker = {
                id: 0,
                coords: {
                    latitude: 40.1451,
                    longitude: -99.6680
                },
                options: { draggable: true },
                events: {
                    dragend: function (marker, eventName, args) {
                        $log.log('marker dragend');
                        $log.log(marker.getPosition().lat());
                        $log.log(marker.getPosition().lng());
                    }
                }
            };
            $scope.onMarkerClicked = onMarkerClicked;

            $scope.clackMarker = function (gMarker,eventName, model) {
                alert("clackMarker: " + model);
                $log.log("from clackMarker");
                $log.log(model);
            };

            $timeout(function () {
                $scope.map.infoWindow.show = true;
                var dynamicMarkers = [
                    {
                        id: 1,
                        latitude: 46,
                        longitude: -79,
                        showWindow: false
                    },
                    {
                        id: 2,
                        latitude: 33,
                        longitude: -79,
                        showWindow: false
                    },
                    {
                        id: 3,
                        icon: 'assets/images/plane.png',
                        latitude: 35,
                        longitude: -127,
                        showWindow: false
                    }
                ];

                $scope.map.polylines.push({
                    id: 3,
                    path: [
                        {
                            latitude: 65,
                            longitude: -74
                        },
                        {
                            latitude: 50,
                            longitude: -89
                        },
                        {
                            latitude: 57,
                            longitude: -122
                        },
                        {
                            latitude: 20,
                            longitude: -95
                        }
                    ],
                    stroke: {
                        color: '#FF0066',
                        weight: 3
                    },
                    editable: true,
                    draggable: true,
                    geodesic: true,
                    visible: true
                });

                $scope.map.polylines = $scope.map.polylines.slice(1);
                _.each(dynamicMarkers, function (marker) {
                    marker.closeClick = function () {
                        marker.showWindow = false;
                        $scope.$apply();
                    };
                    marker.onClicked = function () {
                        onMarkerClicked(marker);
                    };
                });
                $scope.map.dynamicMarkers = dynamicMarkers;
            }, 2000);

        }];

        return{
            restrict:'E',
            templateUrl:'/views/coreModule/googleMap/trendi.direction.map.html',
            scope:{
                getPoint : '='
            },
            controller:controller
        }
    }]);


})(com.TRENDI.CATEGORY.modules.coreModule);