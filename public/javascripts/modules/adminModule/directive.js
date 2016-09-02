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

})(com.TRENDI.ADMIN.modules.mainAdminModule);