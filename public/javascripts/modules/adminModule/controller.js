/**
 * Created by Heshanr on 5/24/2015.
 */
(function (mod) {
    "use strict";

    mod.controller('adminController', ['$scope', '$rootScope','$state','adminDataService','$mdDialog', function ($scope, $rootScope, $state, adminDataService, $mdDialog) {
        $scope.itemList = [];
        var shopDetails = {};

        var initData = function(){
            shopDetails = adminDataService.shopData();
            adminDataService.getItemList(shopDetails.shop).then(function(response){
                $scope.itemList = response.data.responData.data
            },function(){
                $scope.itemList = [];
            });


        };
        initData();


        $scope.search = {
            one: [{
                key: "All",
                value: 0
            }, {
                key: "Name",
                value: 1
            }, {
                key: "Application ID",
                value: 2
            }, {
                key: "Mobile Number",
                value: 3
            }, {
                key: "Loan Amount",
                value: 4
            }],
            two: [{
                keyc: "--",
                value: "--"
            }],
            searchDataFromServer: function (d) {
                adminDataService.getItemList({
                    params: d
                }).then(function (response) {



                }, function (error) {
                    console.log(error.data);
                    $scope.applicationList = [];

                })
            }
        };


        function DialogController($scope, $mdDialog, $timeout, $q, itemData) {
            $scope.mainImage = [];
            $scope.subItem = [];
            $scope.headerText = '';
            $scope.addNew = '';

            if(itemData){
                $scope.mainItem = itemData.item;
                $scope.mainImage.push({image:$scope.mainItem.image,default:true});

                $scope.selectedColors = itemData.item.colors;
                $scope.slectedSizes = itemData.item.sizes?itemData.item.sizes:[];
                $scope.slectedTypes = itemData.item.types?itemData.item.types:[];

                adminDataService.getSubItem({itemId : itemData.itemId, seenEnable:false}).then(function(response){
                    var subItemList = response.data.responData.data.itemList;
                    if(subItemList.length > 0){
                        _.each(subItemList,function(k){
                            $scope.mainImage.push({image: k.image,default:false});
                        });
                    }
                });
                $scope.headerText = 'Edit Item #'+itemData.itemId;
                $scope.addNew = false;
            }else{

                $scope.mainItem = {};
                $scope.selectedColors = [{color:'#FFFFFF'},{color:'#FFFFFF'},{color:'#FFFFFF'},{color:'#FFFFFF'}];
                $scope.slectedSizes = [{'value': 'X-small'}];
                $scope.slectedTypes = [];
                $scope.headerText = 'Add New Item';
                $scope.addNew = true;
            }


            $scope.sizes = [
                {
                    'value': 'X-small'
                },
                {
                    'value': 'Small'
                },
                {
                    'value': 'Medium'
                },
                {
                    'value': 'Large'
                },
                {
                    'value': 'X-large'
                }
            ];


            $scope.types = [
                {
                    'value': 'Blouse'
                },
                {
                    'value': 'High-neck'
                },
                {
                    'value': 'Short-skirt'
                },
                {
                    'value': 'Shirt'
                },
                {
                    'value': 'Short'
                }
            ];

            $scope.close = function(option) {
                $mdDialog.cancel();
            };

            $scope.answer = function(option) {
                if(option){
                    if(($scope.mainItem.name == '' || $scope.mainItem.name == undefined) &&
                        ($scope.mainItem.price == '' || $scope.mainItem.price == undefined) &&
                        ($scope.mainItem.description == '' || $scope.mainItem.description == undefined) &&
                        $scope.mainImage.length == 0){

                    }else {
                        _.each($scope.mainImage, function (k) {
                            if (k.default) {
                                $scope.mainItem.image = k.image;
                            } else {
                                $scope.subItem.push({image: k.image});
                            }
                        });
                        $scope.mainItem.shop = shopDetails.shop;
                        $scope.mainItem.types = $scope.slectedTypes;
                        $scope.mainItem.sizes = $scope.slectedSizes;
                        $scope.mainItem.colors = $scope.selectedColors;
                        var itemDetail = {};
                        switch (option) {
                            case 1 :
                                itemDetail = {mainItem: $scope.mainItem, subItem: $scope.subItem};
                                adminDataService.addItem(itemDetail).then(function (response) {
                                    initData();
                                    $mdDialog.hide();
                                });
                                break;
                            case 2 :
                                itemDetail = {mainItem: $scope.mainItem, subItem: $scope.subItem, itemId:itemData.itemId};
                                adminDataService.updateItem(itemDetail).then(function (response) {
                                    initData();
                                    $mdDialog.hide();
                                });
                                break;
                            default :
                                break;
                        }

                    }

                }else{
                    var itemDetail={itemId:itemData.itemId};
                    adminDataService.removeItem(itemDetail).then(function(response){
                        initData();
                        $mdDialog.hide();
                    });
                }





            };

        };

        $scope.goToItem = function(item, event) {
            $mdDialog.show({
                locals:{itemData: item},
                controller: DialogController,
                templateUrl: '/views/adminModule/admin.item.modal.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose:false,
                focusOnOpen:false
            })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
        };


    }]);


    mod.controller('adminLoginController',['$scope','$state',function($scope, $state){
        $scope.login = function(){
            $state.go('admin.home');
        };
    }]);


})(com.TRENDI.CATEGORY.modules.adminModule);
