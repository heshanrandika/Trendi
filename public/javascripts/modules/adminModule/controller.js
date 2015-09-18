/**
 * Created by Heshanr on 5/24/2015.
 */
(function (mod) {
    "use strict";

    mod.controller('adminItemController', ['$scope', '$rootScope','$state','adminDataService', function ($scope, $rootScope, $state, adminDataService) {
        $scope.itemList = [];
        var shopDetails = {};

        //=======Item Edit Window================
        $scope.mainImage = [];
        $scope.subItem = [];
        $scope.headerText = '';
        $scope.addNew = true;

        $scope.mainItem = {};
        $scope.selectedColors = [];
        $scope.slectedSizes = [];
        $scope.slectedTypes = [];
        $scope.selectedIndex = 0;

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

        $scope.resetForm = function(){
            $scope.mainImage = [];
            $scope.subItem = [];
            $scope.headerText = '';
            $scope.addNew = '';
            $scope.selectedColors = [];
            $scope.slectedSizes = [];
            $scope.slectedTypes = [];
        };

        $scope.$watch('selectedIndex', function(current, old){
          if(current<old){
              $scope.headerText = '';
          }
        });

        $scope.EditViewController = function(itemData) {
            $scope.itemId = itemData.itemId;
            $scope.resetForm();
            $scope.selectedIndex = 1;
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








        };

        $scope.close = function() {
            $scope.selectedIndex = 0;
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
                                $scope.selectedIndex = 0;
                            });
                            break;
                        case 2 :
                            itemDetail = {mainItem: $scope.mainItem, subItem: $scope.subItem, itemId:$scope.itemId};
                            adminDataService.updateItem(itemDetail).then(function (response) {
                                initData();
                                $scope.selectedIndex = 0;
                            });
                            break;
                        default :
                            break;
                    }

                }

            }else{
                var itemDetail={itemId:$scope.itemId};
                adminDataService.removeItem(itemDetail).then(function(response){
                    initData();
                    $scope.selectedIndex = 0;
                });
            }

        };

      /*  $scope.goToItem = function(item, event) {
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
         };*/


    }]);


    mod.controller('adminBranchesController', ['$scope', '$rootScope','$state','adminDataService', function ($scope, $rootScope, $state, adminDataService) {
        $scope.itemList = [];
        var shopDetails = {};

        //=======Item Edit Window================
        $scope.mainImage = [];
        $scope.subItem = [];
        $scope.headerText = '';
        $scope.addNew = true;

        $scope.mainItem = {};
        $scope.selectedColors = [];
        $scope.slectedSizes = [];
        $scope.slectedTypes = [];
        $scope.selectedIndex = 0;

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

        $scope.resetForm = function(){
            $scope.mainImage = [];
            $scope.subItem = [];
            $scope.headerText = '';
            $scope.addNew = '';
            $scope.selectedColors = [];
            $scope.slectedSizes = [];
            $scope.slectedTypes = [];
        };

        $scope.$watch('selectedIndex', function(current, old){
            if(current<old){
                $scope.headerText = '';
            }
        });

        $scope.EditViewController = function(itemData) {
            $scope.itemId = itemData.itemId;
            $scope.resetForm();
            $scope.selectedIndex = 1;
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








        };

        $scope.close = function() {
            $scope.selectedIndex = 0;
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
                                $scope.selectedIndex = 0;
                            });
                            break;
                        case 2 :
                            itemDetail = {mainItem: $scope.mainItem, subItem: $scope.subItem, itemId:$scope.itemId};
                            adminDataService.updateItem(itemDetail).then(function (response) {
                                initData();
                                $scope.selectedIndex = 0;
                            });
                            break;
                        default :
                            break;
                    }

                }

            }else{
                var itemDetail={itemId:$scope.itemId};
                adminDataService.removeItem(itemDetail).then(function(response){
                    initData();
                    $scope.selectedIndex = 0;
                });
            }

        };

        /*  $scope.goToItem = function(item, event) {
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
         };*/


    }]);


    mod.controller('adminShopsController', ['$scope', '$rootScope','$state','adminDataService', function ($scope, $rootScope, $state, adminDataService) {
        $scope.testPoint = {
            long : 28,
            lat : 23
        };
        $scope.shopList = [];
        $scope.userList = [];
        $scope.branchList = [];
        $scope.regUser = {};
        $scope.shop = {};

        $scope.headerText = '';
        $scope.addNew = true;
        $scope.selectedIndex = 0;

        var initData = function(){
            adminDataService.getShopList().then(function(response){
                $scope.shopList = response.data.responData.data
            },function(){
                $scope.shopList = [];
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

        $scope.resetForm = function(){
            $scope.userList = [];
            $scope.branchList = [];
            $scope.regUser = {};
            $scope.shop = {};
            $scope.headerText = '';
            $scope.addNew = '';
        };

        $scope.$watch('selectedIndex', function(current, old){
            if(current<old){
                $scope.headerText = '';
            }
        });

        $scope.EditViewController = function(shopData) {
            $scope.shopId = shopData.shopId;
            $scope.resetForm();
            $scope.selectedIndex = 1;
            if(shopData){


                adminDataService.getBranchList({itemId : itemData.itemId, seenEnable:false}).then(function(response){
                    var subItemList = response.data.responData.data.itemList;
                    if(subItemList.length > 0){
                        _.each(subItemList,function(k){
                            $scope.mainImage.push({image: k.image,default:false});
                        });
                    }
                });
                adminDataService.getUserList({itemId : itemData.itemId, seenEnable:false}).then(function(response){
                    var subItemList = response.data.responData.data.itemList;
                    if(subItemList.length > 0){
                        _.each(subItemList,function(k){
                            $scope.mainImage.push({image: k.image,default:false});
                        });
                    }
                });
                $scope.headerText = 'Edit Shop #'+itemData.itemId;
                $scope.addNew = false;
            }else{

                $scope.mainItem = {};
                $scope.headerText = 'Add New Shop';
                $scope.addNew = true;
            }

        };

        $scope.close = function() {
            $scope.selectedIndex = 0;
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
                                $scope.selectedIndex = 0;
                            });
                            break;
                        case 2 :
                            itemDetail = {mainItem: $scope.mainItem, subItem: $scope.subItem, itemId:$scope.itemId};
                            adminDataService.updateItem(itemDetail).then(function (response) {
                                initData();
                                $scope.selectedIndex = 0;
                            });
                            break;
                        default :
                            break;
                    }

                }

            }else{
                var itemDetail={itemId:$scope.itemId};
                adminDataService.removeItem(itemDetail).then(function(response){
                    initData();
                    $scope.selectedIndex = 0;
                });
            }

        };

        /*  $scope.goToItem = function(item, event) {
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
         };*/


    }]);

    mod.controller('adminUsersController', ['$scope', '$rootScope','$state','adminDataService', function ($scope, $rootScope, $state, adminDataService) {
        $scope.itemList = [];
        var shopDetails = {};

        //=======Item Edit Window================
        $scope.mainImage = [];
        $scope.subItem = [];
        $scope.headerText = '';
        $scope.addNew = true;

        $scope.mainItem = {};
        $scope.selectedColors = [];
        $scope.slectedSizes = [];
        $scope.slectedTypes = [];
        $scope.selectedIndex = 0;

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

        $scope.resetForm = function(){
            $scope.mainImage = [];
            $scope.subItem = [];
            $scope.headerText = '';
            $scope.addNew = '';
            $scope.selectedColors = [];
            $scope.slectedSizes = [];
            $scope.slectedTypes = [];
        };

        $scope.$watch('selectedIndex', function(current, old){
            if(current<old){
                $scope.headerText = '';
            }
        });

        $scope.EditViewController = function(itemData) {
            $scope.itemId = itemData.itemId;
            $scope.resetForm();
            $scope.selectedIndex = 1;
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








        };

        $scope.close = function() {
            $scope.selectedIndex = 0;
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
                                $scope.selectedIndex = 0;
                            });
                            break;
                        case 2 :
                            itemDetail = {mainItem: $scope.mainItem, subItem: $scope.subItem, itemId:$scope.itemId};
                            adminDataService.updateItem(itemDetail).then(function (response) {
                                initData();
                                $scope.selectedIndex = 0;
                            });
                            break;
                        default :
                            break;
                    }

                }

            }else{
                var itemDetail={itemId:$scope.itemId};
                adminDataService.removeItem(itemDetail).then(function(response){
                    initData();
                    $scope.selectedIndex = 0;
                });
            }

        };

        /*  $scope.goToItem = function(item, event) {
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
         };*/


    }]);

    mod.controller('adminBlogsController', ['$scope', '$rootScope','$state','adminDataService', function ($scope, $rootScope, $state, adminDataService) {
        $scope.itemList = [];
        var shopDetails = {};

        //=======Item Edit Window================
        $scope.mainImage = [];
        $scope.subItem = [];
        $scope.headerText = '';
        $scope.addNew = true;

        $scope.mainItem = {};
        $scope.selectedColors = [];
        $scope.slectedSizes = [];
        $scope.slectedTypes = [];
        $scope.selectedIndex = 0;

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

        $scope.resetForm = function(){
            $scope.mainImage = [];
            $scope.subItem = [];
            $scope.headerText = '';
            $scope.addNew = '';
            $scope.selectedColors = [];
            $scope.slectedSizes = [];
            $scope.slectedTypes = [];
        };

        $scope.$watch('selectedIndex', function(current, old){
            if(current<old){
                $scope.headerText = '';
            }
        });

        $scope.EditViewController = function(itemData) {
            $scope.itemId = itemData.itemId;
            $scope.resetForm();
            $scope.selectedIndex = 1;
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








        };

        $scope.close = function() {
            $scope.selectedIndex = 0;
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
                                $scope.selectedIndex = 0;
                            });
                            break;
                        case 2 :
                            itemDetail = {mainItem: $scope.mainItem, subItem: $scope.subItem, itemId:$scope.itemId};
                            adminDataService.updateItem(itemDetail).then(function (response) {
                                initData();
                                $scope.selectedIndex = 0;
                            });
                            break;
                        default :
                            break;
                    }

                }

            }else{
                var itemDetail={itemId:$scope.itemId};
                adminDataService.removeItem(itemDetail).then(function(response){
                    initData();
                    $scope.selectedIndex = 0;
                });
            }

        };

        /*  $scope.goToItem = function(item, event) {
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
         };*/


    }]);

    mod.controller('adminPromotionsController', ['$scope', '$rootScope','$state','adminDataService', function ($scope, $rootScope, $state, adminDataService) {
        $scope.itemList = [];
        var shopDetails = {};

        //=======Item Edit Window================
        $scope.mainImage = [];
        $scope.subItem = [];
        $scope.headerText = '';
        $scope.addNew = true;

        $scope.mainItem = {};
        $scope.selectedColors = [];
        $scope.slectedSizes = [];
        $scope.slectedTypes = [];
        $scope.selectedIndex = 0;

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

        $scope.resetForm = function(){
            $scope.mainImage = [];
            $scope.subItem = [];
            $scope.headerText = '';
            $scope.addNew = '';
            $scope.selectedColors = [];
            $scope.slectedSizes = [];
            $scope.slectedTypes = [];
        };

        $scope.$watch('selectedIndex', function(current, old){
            if(current<old){
                $scope.headerText = '';
            }
        });

        $scope.EditViewController = function(itemData) {
            $scope.itemId = itemData.itemId;
            $scope.resetForm();
            $scope.selectedIndex = 1;
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








        };

        $scope.close = function() {
            $scope.selectedIndex = 0;
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
                                $scope.selectedIndex = 0;
                            });
                            break;
                        case 2 :
                            itemDetail = {mainItem: $scope.mainItem, subItem: $scope.subItem, itemId:$scope.itemId};
                            adminDataService.updateItem(itemDetail).then(function (response) {
                                initData();
                                $scope.selectedIndex = 0;
                            });
                            break;
                        default :
                            break;
                    }

                }

            }else{
                var itemDetail={itemId:$scope.itemId};
                adminDataService.removeItem(itemDetail).then(function(response){
                    initData();
                    $scope.selectedIndex = 0;
                });
            }

        };

        /*  $scope.goToItem = function(item, event) {
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
         };*/


    }]);
 /*   mod.controller('adminLoginController',['$scope','$state',function($scope, $state){
        $scope.login = function(){
            $state.go('admin.home');
        };
    }]);*/


})(com.TRENDI.CATEGORY.modules.adminModule);
