/**
 * Created by Heshanr on 5/28/2015.
 */
(function (mod) {
    "use strict";
    mod.directive('trendiEntitlements',[function () {
        function link( scope, element, attributes, controller ) {

            scope.entitlementGroups = [];

            scope.initSelect =function(entitlementGroup){
                var selected =  _.filter(entitlementGroup.entitlements, function(obj){
                    return !obj.select
                });
                if(selected.length>0){
                    entitlementGroup.select = false;
                }else{
                    entitlementGroup.select = true;
                }
            };

            var init = function(){
                if(scope.oldEntitlements.length > 0){
                    _.each(scope.inputEntitlements, function(obj){
                        var exist = _.filter(scope.oldEntitlements, function(oldObj){
                            return (obj._id == oldObj._id);
                        });
                        if(exist.length>0){
                            obj.select = true;
                        }
                    })

                }
                var entitlementGrouping =  _.groupBy(scope.inputEntitlements,'belongingModule');
                _.map(entitlementGrouping,function(value, key){
                    scope.entitlementGroups.push(
                        {
                            category:key,
                            entitlements: value,
                            select : false
                        })
                });

                _.each(scope.entitlementGroups,function(obj){
                    scope.initSelect(obj);
                })
                scope.outputEntitlements = scope.entitlementGroups;


            };
            init();

            /*            scope.$watch('scope.outputEntitlements', function(current, old){
             if(current != old){
             console.log("change value")
             }
             });*/

            scope.selectAll = function(entitlementObj){
                _.each(entitlementObj.entitlements,function(k){
                    k.select = entitlementObj.select;
                });
                scope.outputEntitlements = scope.entitlementGroups;
            };

        }
        return {
            restrict: 'E',
            scope :{
                inputEntitlements:'=',
                oldEntitlements:'=',
                outputEntitlements:'='
            },
            link: link,
            templateUrl: "/views/adminModule/entitlementsView/trendi.entitlements.html"

        };
    }]);

    mod.directive('trendiFileUpload',['Data.Toast',function(Data_Toast) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                files : '=',
                imageSize:'=',
                imageCount:'=',
                removedItems:'='
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
                console.log(scope.files);
                console.log(scope.removedItems);

                dropbox.addEventListener("dragenter", dragEnterLeave, false);
                dropbox.addEventListener("dragleave", dragEnterLeave, false);
                dropbox.addEventListener("dragover",dragOverFunc, false);
                dropbox.addEventListener("drop",dropFunc, false);

                function dragOverFunc (evt) {
                    evt.stopPropagation();
                    evt.preventDefault();
                    var clazz = 'not-available';
                    var ok = evt.dataTransfer && evt.dataTransfer.types && evt.dataTransfer.types.indexOf('Files') >= 0;
                    scope.$apply(function () {
                        scope.dropText = ok ? 'Drop files here...' : 'Only files are allowed!';
                        scope.dropClass = ok ? 'over' : 'not-available';
                    });
                }

                //============== DRAG & DROP =============
                 function dropFunc(evt) {
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
                }


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
                	if(!scope.files[index].type && !scope.files[index].name){
                		scope.removedItems.push(scope.files[index]);
                	}
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
                        scope.$apply(function () {
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
                };

                scope.$on('$destroy', function(){
                    dropbox.removeEventListener("dragenter", dragEnterLeave, false);
                    dropbox.removeEventListener("dragleave", dragEnterLeave, false);
                    dropbox.removeEventListener("dragover",dragOverFunc, false);
                    dropbox.removeEventListener("drop",dropFunc, false);
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

    mod.directive('trendiMap',[function(){

        var controller = ['$scope','uiGmapIsReady', '$timeout', 'uiGmapLogger', '$http', 'rndAddToLatLon','uiGmapGoogleMapApi',function ($scope, uiGmapIsReady, $timeout, $log, $http, rndAddToLatLon,GoogleMapApi) {
            var direction = $scope.getPoint;

            GoogleMapApi.then(function(maps) {
                $scope.googleVersion = maps.version;
                maps.visualRefresh = true;

            });

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
                        $scope.location['latitude']= $scope.getPoint[0];
                        $scope.location['longitude']= $scope.getPoint[1];
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
                },
                control : {}

            };


            var events = {
                places_changed: function (searchBox) {
                    var place = searchBox.getPlaces();
                    if (!place || place == 'undefined' || place.length == 0) {
                        console.log('no place data :(');
                        return;
                    }

                    $scope.map["center"] = {
                        "latitude": place[0].geometry.location.lat(),
                        "longitude": place[0].geometry.location.lng()
                    };
                    $scope.map["zoom"] = 18;

                }
            };
            $scope.map.searchbox = { template: 'searchbox.tpl.html', events: events, parentdiv:'searchBoxParent'};



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
            templateUrl:'/views/adminModule/extras/trendi.google.place.html',
            scope:{
                getPoint : '='
            },
            controller:controller
        }
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

    mod.directive("outsideClick", ['$document','$parse', function( $document, $parse ){
        return {
            link: function( $scope, $element, $attributes ){
                var scopeExpression = $attributes.outsideClick,
                    onDocumentClick = function(event){
                        var isChild = $element.find(event.target).length > 0;

                        if(!isChild) {
                            $scope.$apply(scopeExpression);
                        }
                    };

                $document.on("click", onDocumentClick);

                $element.on('$destroy', function() {
                    $document.off("click", onDocumentClick);
                });
            }
        }
    }]);

})(com.TRENDI.ADMIN.modules.mainAdminModule);