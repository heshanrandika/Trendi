/**
 * Created by Heshanr on 5/24/2015.
 */
(function (mod) {
    "use strict";

    mod.controller('adminMasterController',['$scope', '$rootScope','$state','ADMIN_MOD_CONFIG','adminDataService',function($scope, $rootScope, $state, ADMIN_MOD_CONFIG, adminDataService){
        $scope.menuList = ADMIN_MOD_CONFIG.MENU_CONFIG;
        $scope.userData = adminDataService.fullUserData();
        var entitlementList = [];
        if($scope.userData.entitlements.length > 0){
            entitlementList = _.pluck($scope.userData.entitlements, '_id');
        }

        $scope.initMenu = function(menu){
            return _.contains(entitlementList, menu.authorization);
        };

        $scope.menuClick= function(menu){
            $state.go(menu.key);
        };

        $scope.isActive = function (viewLocation) {
            return (viewLocation.split('.')[0] === $state.current.name.split('.')[0] && viewLocation.split('.')[1] === $state.current.name.split('.')[1]);
        };

    }]);

    mod.controller('adminItemController', ['$scope', '$rootScope','$state','adminDataService','Data.Toast','MESSAGE_CONFIG', function ($scope, $rootScope, $state, adminDataService, Data_Toast, MESSAGE_CONFIG) {
        $scope.itemList = [];
        $scope.count = 0;
        var shopDetails = {};
        var itemPerPage = 8;

        //=======Item Edit Window================
        $scope.mainImage = [];
        $scope.imageSize = {value:1000000, text:'1MB'};
        $scope.imageCount = 5;
        $scope.subItem = [];
        $scope.headerText = '';
        $scope.addNew = true;

        $scope.mainItem = {};
        $scope.selectedColors = [];
        $scope.slectedSizes = [];
        $scope.slectedTypes = [];
        $scope.selectedIndex = 0;
        $scope.btnPressed = false;

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



        shopDetails = adminDataService.shopData();
        $scope.searchObj = {
            skip: $scope.itemList.length,
            limit:itemPerPage,
            searchKey:'',
            searchValue:'',
            shopId : shopDetails.branch.shopId,
            branchId : shopDetails.branch.branchId
        };

        $scope.loadData = function(init){
            if(init){
                $scope.itemList = [];
                $scope.searchObj.skip =0;
            }
            $scope.loading = true;
            adminDataService.adminGetItemList($scope.searchObj).then(function(response){
                $scope.itemList.push.apply($scope.itemList, response.data.responData.data.list);
                if(response.data.responData.data.count){
                    $scope.count = response.data.responData.data.count;
                }
                $scope.loading = false;
            },function(){
                $scope.itemList = [];
            });


        };

        // Register event handler
        $scope.paginationFuntion = function() {
            $scope.searchObj.skip = $scope.itemList.length;
            if ($scope.count > $scope.itemList.length && !$scope.loading) {
                $scope.loadData();
            }
        };

        $scope.loadData(1);





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
                $scope.searchObj = {
                    skip:0,
                    limit:itemPerPage,
                    searchKey: d.searchKey,
                    searchValue: d.searchValue,
                    shopId : shopDetails.branch.shopId,
                    branchId : shopDetails.branch.branchId
                };
                $scope.load(1);
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
            $scope.btnPressed = false;
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
            $scope.btnPressed = true;
            if(option){
                if(($scope.mainItem.name == '' || $scope.mainItem.name == undefined) ||
                    ($scope.mainItem.price == '' || $scope.mainItem.price == undefined) ||
                    ($scope.mainItem.description == '' || $scope.mainItem.description == undefined) ||
                    $scope.mainImage.length == 0){
                    Data_Toast.warning(MESSAGE_CONFIG.ERROR_REQUIRED_FIELDS);
                    $scope.btnPressed = false;
                }else {
                    _.each($scope.mainImage, function (k) {
                        if (k.default) {
                            $scope.mainItem.image = k.image;
                        } else {
                            $scope.subItem.push({image: k.image});
                        }
                    });
                    $scope.mainItem.shop = shopDetails.branch;
                    $scope.mainItem.types = $scope.slectedTypes;
                    $scope.mainItem.sizes = $scope.slectedSizes;
                    $scope.mainItem.colors = $scope.selectedColors;
                    var itemDetail = {};
                    switch (option) {
                        case 1 :
                            itemDetail = {mainItem: $scope.mainItem, subItem: $scope.subItem};
                            adminDataService.addItem(itemDetail).then(function (response) {
                                $scope.loadData(1);
                                $scope.selectedIndex = 0;
                                Data_Toast.success(MESSAGE_CONFIG.SUCCESS_SAVED_SUCCESSFULLY);
                            },function(error){
                                Data_Toast.error(MESSAGE_CONFIG.ERROR_SAVE_FAIL,error.data.responData.Error);
                                $scope.btnPressed = false;
                            });
                            break;
                        case 2 :
                            itemDetail = {mainItem: $scope.mainItem, subItem: $scope.subItem, itemId:$scope.itemId};
                            adminDataService.updateItem(itemDetail).then(function (response) {
                                $scope.loadData(1);
                                $scope.selectedIndex = 0;
                                Data_Toast.success(MESSAGE_CONFIG.SUCCESS_UPDATE_SUCCESSFULLY);
                            },function(error){
                                Data_Toast.error(MESSAGE_CONFIG.ERROR_UPDATE_FAIL,error.data.responData.Error);
                                $scope.btnPressed = false;
                            });
                            break;
                        default :
                            $scope.btnPressed = false;
                            break;
                    }

                }

            }else{
                $scope.btnPressed = true;
                var itemDetail={itemId:$scope.itemId};
                adminDataService.removeItem(itemDetail).then(function(response){
                    $scope.loadData(1);
                    $scope.selectedIndex = 0;
                    Data_Toast.success(MESSAGE_CONFIG.SUCCESS_REMOVED_SUCCESSFULLY);
                },function(error){
                    Data_Toast.error(MESSAGE_CONFIG.ERROR_REMOVE_FAIL,error.data.responData.Error);
                    $scope.btnPressed = false;
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

    mod.controller('adminBranchesController', ['$scope', '$rootScope','$state','adminDataService','Data.Toast','MESSAGE_CONFIG', function ($scope, $rootScope, $state, adminDataService, Data_Toast, MESSAGE_CONFIG) {
        $scope.branchList = [];
        $scope.tmp = {};
        $scope.branch = {};
        $scope.branch.pos = [];
        $scope.branch.iconImage = '';
        $scope.tmp.iconImage = [];
        $scope.iconSize = {value:10000, text:'10kB'};
        $scope.iconCount = 1;
        $scope.btnPressed = false;


        $scope.headerText = '';
        $scope.addNew = true;
        $scope.selectedIndex = 0;

        $scope.count = 0;
        $scope.shopDetails = {};
        var itemPerPage = 10;







        $scope.shopDetails = adminDataService.shopData();
        $scope.searchObj = {
            skip: $scope.branchList.length,
            limit:itemPerPage,
            searchKey:'',
            searchValue:'',
            shopId : $scope.shopDetails.branch.shopId
        };

        $scope.loadData = function(init){
            if(init){
                $scope.branchList = [];
                $scope.searchObj.skip =0;
            }
            $scope.loading = true;
            adminDataService.getBranchList($scope.searchObj).then(function(response){
                $scope.branchList.push.apply($scope.branchList, response.data.responData.data.list);
                if(response.data.responData.data.count){
                    $scope.count = response.data.responData.data.count;
                }
                $scope.loading = false;
            },function(){
                $scope.branchList = [];
            });


        };

        $scope.paginationFuntion = function() {
            $scope.searchObj.skip = $scope.branchList.length;
            if ($scope.count > $scope.branchList.length  && !$scope.loading) {
                $scope.loadData();
            }
        };

        $scope.loadData(1);



/*        var initData = function(){
            $scope.shopDetails = adminDataService.shopData();
            adminDataService.getBranchList({shopId:$scope.shopDetails.shopId}).then(function(response){
                $scope.branchList = response.data.responData.data
            },function(){
                $scope.branchList = [];
            });
        };
        initData();*/


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
               $scope.searchObj = {
                    skip:0,
                    limit:itemPerPage,
                    searchKey: d.searchKey,
                    searchValue: d.searchValue,
                    shopId : $scope.shopDetails.branch.shopId
                };
                $scope.load(1);
            }
        };

        $scope.resetForm = function(){
            $scope.tmp = {};
            $scope.branch = {};
            $scope.branch.pos = [];
            $scope.branch.iconImage = '';
            $scope.tmp.iconImage = [];
            $scope.headerText = '';
            $scope.addNew = '';
            $scope.tmp.iconImage = [];
            $scope.btnPressed = false;
            $scope.userList = [];
        };

        $scope.$watch('selectedIndex', function(current, old){
            if(current<= old){
                $scope.headerText = '';
                $scope.initDirective = false;
            }else{
                $scope.initDirective = true;
            }

        });


        $scope.EditViewController = function(branchData) {
            $scope.branchId = branchData.branchId;
            $scope.resetForm();
            $scope.selectedIndex = 1;


            if(branchData.shop){
                $scope.branch = branchData.shop;
                if(!(branchData.shop.iconImage == '' || branchData.shop.iconImage == undefined)){
                    $scope.tmp.iconImage.push({image:branchData.shop.iconImage});
                }

                adminDataService.getUserList({shopId :  $scope.shopDetails.shopId, branchId:$scope.branchId}).then(function(response){
                    $scope.userList = response.data.responData.data;
                });

                $scope.headerText = 'Edit Branch #'+ $scope.branchId;
                $scope.addNew = false;

            }else{
                $scope.headerText = 'Add New Branch';
                $scope.addNew = true;
            }

        };

        $scope.close = function() {
            $scope.selectedIndex = 0;
        };

        $scope.answer = function(option) {
            $scope.btnPressed = true;
            if(option){
                if(($scope.branch.name == '' || $scope.branch.name == undefined) ){
                    Data_Toast.warning(MESSAGE_CONFIG.ERROR_REQUIRED_FIELDS);
                    $scope.btnPressed = false;
                }else {

                    $scope.branch.iconImage = $scope.tmp.iconImage[0]?$scope.tmp.iconImage[0].image:'';
                    var branchDetails = {};



                    switch (option) {
                        case 1 :
                            branchDetails = {shopId:$scope.shopDetails.shopId, shop: $scope.branch};
                            adminDataService.addBranch(branchDetails).then(function (response) {
                                $scope.loadData(1);
                                $scope.selectedIndex = 0;
                                Data_Toast.success(MESSAGE_CONFIG.SUCCESS_SAVED_SUCCESSFULLY);
                            },function (error) {
                                Data_Toast.error(MESSAGE_CONFIG.ERROR_SAVE_FAIL,error.data.responData.Error);
                                $scope.btnPressed = false;
                            });
                            break;
                        case 2 :
                            branchDetails = {shopId:$scope.shopDetails.shopId,branchId:$scope.branchId, shop: $scope.branch};
                            adminDataService.updateBranch(branchDetails).then(function (response) {
                                $scope.loadData(1);
                                $scope.selectedIndex = 0;
                                Data_Toast.success(MESSAGE_CONFIG.SUCCESS_UPDATE_SUCCESSFULLY);
                            },function (error) {
                                Data_Toast.error(MESSAGE_CONFIG.ERROR_UPDATE_FAIL,error.data.responData.Error);
                                $scope.btnPressed = false;
                            });
                            break;
                        default :
                            $scope.btnPressed = false;
                            break;
                    }

                }

            }else{
                $scope.btnPressed = true;
                var branchDetails={shopId:$scope.shopDetails.shopId,branchId:$scope.branchId};
                adminDataService.removeBranch(branchDetails).then(function(response){
                    $scope.loadData(1);
                    $scope.selectedIndex = 0;
                    Data_Toast.success(MESSAGE_CONFIG.SUCCESS_REMOVED_SUCCESSFULLY);
                },function (error) {
                    Data_Toast.error(MESSAGE_CONFIG.ERROR_REMOVE_FAIL,error.data.responData.Error);
                    $scope.btnPressed = false;
                });
            }

        };

    }]);

    mod.controller('adminShopsController', ['$scope', '$rootScope','$state','adminDataService','Data.Toast','MESSAGE_CONFIG', function ($scope, $rootScope, $state, adminDataService, Data_Toast, MESSAGE_CONFIG) {

        $scope.shopList = [];
        $scope.userList = [];
        $scope.branchList = [];
        $scope.tmp = {};
        $scope.userData = {};
        $scope.regUser = {};
        $scope.shop = {};
        $scope.shop.pos = [];
        $scope.shop.iconImage = '';
        $scope.bannerImage = '';
        $scope.regUser.profilePic = '';
        $scope.tmp.entitlements = [];
        $scope.tmp.oldEntitlements = [];
        $scope.tmp.allEntitlements = [];
        $scope.tmp.iconImage = [];
        $scope.tmp.profilePic = [];
        $scope.tmp.bannerImage = [];
        $scope.regUser.entitlements = [];
        $scope.iconSize = {value:10000, text:'10kB'};
        $scope.bannerSize = {value:1000000, text:'1MB'};
        $scope.profilePicSize = {value:100000, text:'100kB'};
        $scope.iconCount = 1;
        $scope.bannerCount = 1;
        $scope.profilePicCount = 1;

        $scope.headerText = '';
        $scope.addNew = true;
        $scope.selectedIndex = 0;
        $scope.btnPressed = false;






        $scope.count = 0;
        var itemPerPage = 10;

        $scope.searchObj = {
            skip: $scope.shopList.length,
            limit:itemPerPage,
            searchKey:'',
            searchValue:'',
        };

        $scope.loadData = function(init){
            if(init){
                $scope.shopList = [];
                $scope.searchObj.skip =0;
            }
            $scope.loading = true;
            adminDataService.getShopList($scope.searchObj).then(function(response){
                $scope.shopList.push.apply($scope.shopList, response.data.responData.data.list);
                if(response.data.responData.data.count){
                    $scope.count = response.data.responData.data.count;
                }
                $scope.loading = false;
            },function(){
                $scope.shopList = [];
            });


        };

        $scope.paginationFuntion = function() {
            $scope.searchObj.skip = $scope.shopList.length;
            if ($scope.count > $scope.shopList.length  && !$scope.loading) {
                $scope.loadData();
            }
        };

        $scope.loadData(1);
















/*        var initData = function(){
            adminDataService.getShopList().then(function(response){
                $scope.shopList = response.data.responData.data
            },function(){
                $scope.shopList = [];
            });
        };
        initData();*/


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
                $scope.searchObj = {
                    skip:0,
                    limit:itemPerPage,
                    searchKey: d.searchKey,
                    searchValue: d.searchValue
                };
                $scope.load(1);
            }
        };

        $scope.resetForm = function(){
            $scope.userList = [];
            $scope.branchList = [];
            $scope.regUser = {};
            $scope.shop = {};
            $scope.tmp = {};
            $scope.shop.pos = [];
            $scope.shop.iconImage = '';
            $scope.bannerImage = '';
            $scope.regUser.profilePic = '';
            $scope.tmp.entitlements = [];
            $scope.tmp.oldEntitlements = [];
            $scope.regUser.entitlements = [];
            $scope.headerText = '';
            $scope.addNew = '';
            $scope.tmp.allEntitlements = [];
            $scope.tmp.iconImage = [];
            $scope.tmp.profilePic = [];
            $scope.tmp.bannerImage = [];
            $scope.btnPressed = false;
        };

        $scope.$watch('selectedIndex', function(current, old){
            if(current<= old){
                $scope.headerText = '';
                $scope.initDirective = false;
            }else{
                $scope.initDirective = true;
            }

        });


        $scope.EditViewController = function(shopData) {
            $scope.loadEntitlements = false;
            $scope.shopId = shopData.shopId;
            $scope.resetForm();
            adminDataService.getEntitlements().then(function(response){
                $scope.tmp.allEntitlements = response.data.responData.data;
                $scope.selectedIndex = 1;
            });

            if(shopData){
                $scope.shop = shopData;
                if(!(shopData.iconImage == '' || shopData.iconImage == undefined)){
                    $scope.tmp.iconImage.push({image:shopData.iconImage});
                }



                adminDataService.getUserList({shopId :  $scope.shopId, superAdmin : true}).then(function(response){
                    var adminUser = response.data.responData.data[0];
                    $scope.tmp.oldEntitlements = adminUser.entitlements;
                    $scope.regUser = adminUser;
                    if(!($scope.regUser.profilePic == '' || $scope.regUser.profilePic == undefined)){
                        $scope.tmp.profilePic.push({image:$scope.regUser.profilePic});
                    }
                    $scope.loadEntitlements = true;
                });

                adminDataService.getBranchList({shopId : $scope.shopId}).then(function(response){
                    $scope.branchList = response.data.responData.data;
                });
                adminDataService.getUserList({shopId :  $scope.shopId}).then(function(response){
                    $scope.userList = response.data.responData.data;
                });

                adminDataService.getBannerImage({shopId :  $scope.shopId}).then(function(response){
                    if(!(response.data.responData.data == '' || response.data.responData.data == undefined)){
                        delete response.data.responData.data._id;
                        $scope.tmp.bannerImage.push(response.data.responData.data);
                    }

                });

                $scope.headerText = 'Edit Shop #'+ $scope.shopId;
                $scope.addNew = false;

            }else{
                $scope.loadEntitlements = true;
                $scope.headerText = 'Add New Shop';
                $scope.addNew = true;
            }

        };

        $scope.close = function() {
            $scope.selectedIndex = 0;
        };

        $scope.answer = function(option) {
            $scope.btnPressed = true;
            if(option){
                if(($scope.shop.name == '' || $scope.shop.name == undefined) ||
                    ($scope.regUser.email == '' || $scope.regUser.email == undefined) ||
                    ($scope.regUser.password == '' || $scope.regUser.password == undefined)
                ){
                    Data_Toast.warning(MESSAGE_CONFIG.ERROR_REQUIRED_FIELDS);
                    $scope.btnPressed = false;
                }else {

                    $scope.shop.iconImage = $scope.tmp.iconImage[0]?$scope.tmp.iconImage[0].image:'';
                    $scope.bannerImage = $scope.tmp.bannerImage[0]?$scope.tmp.bannerImage[0].image:'';
                    $scope.regUser.profilePic = $scope.tmp.profilePic[0]?$scope.tmp.profilePic[0].image:'';
                    var shopDetails = {};

                    $scope.regUser.entitlements =[];
                    _.each($scope.tmp.entitlements,function(group){
                        var valueArray =  _.chain(group.entitlements)
                            .filter(function(obj) {
                                return obj.select;
                            })
                            .map(function(obj) {
                                return _.omit(obj,'select')
                            })
                            .value();
                        $scope.regUser.entitlements = $scope.regUser.entitlements.concat(valueArray);
                    });

                    switch (option) {
                        case 1 :
                            shopDetails = {shop: $scope.shop, regUser: $scope.regUser, bannerImage:$scope.bannerImage};
                            adminDataService.registerShop(shopDetails).then(function (response) {
                                $scope.loadData(1);
                                $scope.selectedIndex = 0;
                                Data_Toast.success(MESSAGE_CONFIG.SUCCESS_SAVED_SUCCESSFULLY);
                            },function (error) {
                                Data_Toast.error(MESSAGE_CONFIG.ERROR_SAVE_FAIL,error.data.responData.Error);
                                $scope.btnPressed = false;
                            });
                            break;
                        case 2 :
                            shopDetails = {shop: $scope.shop, regUser: $scope.regUser, bannerImage:$scope.bannerImage};
                            adminDataService.adminUpdateShop(shopDetails).then(function (response) {
                                $scope.loadData(1);
                                $scope.selectedIndex = 0;
                                Data_Toast.success(MESSAGE_CONFIG.SUCCESS_UPDATE_SUCCESSFULLY);
                            },function (error) {
                                Data_Toast.error(MESSAGE_CONFIG.ERROR_UPDATE_FAIL,error.data.responData.Error);
                                $scope.btnPressed = false;
                            });
                            break;
                        default :
                            $scope.btnPressed = false;
                            break;
                    }

                }

            }else{
                $scope.btnPressed = true;
                //TODO SHOP REMOVE
                var shopDetails={shopId: $scope.shopId};
                adminDataService.removeItem(shopDetails).then(function(response){
                    $scope.loadData(1);
                    $scope.selectedIndex = 0;
                    Data_Toast.success(MESSAGE_CONFIG.SUCCESS_REMOVED_SUCCESSFULLY);
                },function (error) {
                    Data_Toast.error(MESSAGE_CONFIG.ERROR_REMOVE_FAIL,error.data.responData.Error);
                    $scope.btnPressed = false;
                });
            }

        };





    }]);

    mod.controller('adminUsersController', ['$scope', '$rootScope','$state','adminDataService','Data.Toast','MESSAGE_CONFIG', function ($scope, $rootScope, $state, adminDataService, Data_Toast, MESSAGE_CONFIG) {
        $scope.userList = [];
        $scope.tmp = {};
        $scope.tmp.profilePic = [];
        $scope.tmp.entitlements = [];
        $scope.tmp.oldEntitlements = [];
        $scope.tmp.allEntitlements = [];
        $scope.branchList = [];
        $scope.tmp.selectedBranch = {};
        $scope.regUser = {};

        $scope.profilePicSize = {value:100000, text:'100kB'};
        $scope.profilePicCount = 1;
        $scope.btnPressed = false;

        $scope.headerText = '';
        $scope.addNew = true;
        $scope.selectedIndex = 0;

        $scope.titles =[
            {value:0 , key:'User'},
            {value:1 , key:'Admin'}
        ];



        var initData = function(){
            $scope.shopDetails = adminDataService.shopData();
            adminDataService.getAdminUserList({shopId:$scope.shopDetails.shopId, notInMail : $scope.shopDetails.email, superAdmin:false}).then(function(response){
                $scope.userList = response.data.responData.data
            },function(){
                $scope.userList = [];
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
            $scope.tmp = {};
            $scope.tmp.profilePic = [];
            $scope.tmp.entitlements = [];
            $scope.tmp.oldEntitlements = [];
            $scope.tmp.allEntitlements = [];
            $scope.tmp.selectedBranch = {};
            $scope.branchList = [];
            $scope.regUser = {};

            $scope.headerText = '';
            $scope.addNew = '';
            $scope.btnPressed = false;
        };

        $scope.$watch('selectedIndex', function(current, old){
            if(current<= old){
                $scope.headerText = '';
                $scope.initDirective = false;
            }else{
                $scope.initDirective = true;
            }

        });


        var getIndex = function(itemList, item,searchKey, callback){
            var index = 0;
            if(!(item == undefined)){
                _.each(itemList, function(k){
                    if(k[searchKey] == item[searchKey]){
                        callback(index);
                    }
                    index++;
                });
            }else{
                callback(0);
            }

        };


        $scope.EditViewController = function(userData) {
            $scope.loadEntitlements = false;
            $scope.resetForm();
            $scope.tmp.title = $scope.titles[0];

            adminDataService.getUserList({shopId :  $scope.shopId, email : $scope.shopDetails.email}).then(function(response){
                $scope.tmp.allEntitlements = response.data.responData.data[0].entitlements;
                $scope.selectedIndex = 1;
            });

            adminDataService.getBranchList({shopId:$scope.shopDetails.shopId}).then(function(response){
                $scope.branchList = response.data.responData.data;
                $scope.tmp.selectedBranch = $scope.branchList[0];
                getIndex($scope.branchList,userData.branch,'branchId', function(value){
                    $scope.tmp.selectedBranch = $scope.branchList[value];
                });

            },function(){
                $scope.branchList = [];
            });


            if(userData){

                adminDataService.getUserList({shopId :  $scope.shopId, email : userData.email}).then(function(response){
                    $scope.tmp.oldEntitlements = response.data.responData.data[0].entitlements;
                    $scope.loadEntitlements = true;
                });


                $scope.regUser = userData;
                getIndex($scope.titles,userData.title,'value', function(value){
                    $scope.tmp.title = $scope.titles[value];
                });

                if(!(userData.profilePic == '' || userData.profilePic == undefined)){
                    $scope.tmp.profilePic.push({image:userData.profilePic});
                }

                $scope.headerText = 'Edit User #'+ $scope.regUser.name;
                $scope.addNew = false;

            }else{
                $scope.loadEntitlements = true;
                $scope.regUser.shopId = $scope.shopDetails.shopId;
                $scope.headerText = 'Add New User';
                $scope.addNew = true;
            }

        };

        $scope.close = function() {
            $scope.selectedIndex = 0;
        };

        $scope.answer = function(option) {
            $scope.btnPressed = true;
            if(option){
                if(($scope.regUser.name == '' || $scope.regUser.name == undefined) &&
                    ($scope.regUser.password == '' || $scope.regUser.password == undefined) &&
                    ($scope.regUser.email == '' || $scope.regUser.email == undefined)){
                    Data_Toast.warning(MESSAGE_CONFIG.ERROR_REQUIRED_FIELDS);
                    $scope.btnPressed = false;
                }else {
                    $scope.regUser.shopId = $scope.shopDetails.shopId;
                    $scope.regUser.title = $scope.tmp.title;
                    $scope.regUser.branch = $scope.tmp.selectedBranch;
                    $scope.regUser.profilePic = $scope.tmp.profilePic[0]?$scope.tmp.profilePic[0].image:'';
                    $scope.regUser.entitlements =[];
                    _.each($scope.tmp.entitlements,function(group){
                        var valueArray =  _.chain(group.entitlements)
                            .filter(function(obj) {
                                return obj.select;
                            })
                            .map(function(obj) {
                                return _.omit(obj,'select')
                            })
                            .value();
                        $scope.regUser.entitlements = $scope.regUser.entitlements.concat(valueArray);
                    });


                    var userDetails = {};

                    switch (option) {
                        case 1 :
                            userDetails = {regUser:$scope.regUser};
                            adminDataService.addShopUser(userDetails).then(function (response) {
                                initData();
                                $scope.selectedIndex = 0;
                                Data_Toast.success(MESSAGE_CONFIG.SUCCESS_SAVED_SUCCESSFULLY);
                            },function (error) {
                                Data_Toast.error(MESSAGE_CONFIG.ERROR_SAVE_FAIL,error.data.responData.Error);
                                $scope.btnPressed = false;
                            });
                            break;
                        case 2 :
                            userDetails = {regUser:$scope.regUser, profileUpdate:false};
                            adminDataService.updateShopUser(userDetails).then(function (response) {
                                initData();
                                $scope.selectedIndex = 0;
                                Data_Toast.success(MESSAGE_CONFIG.SUCCESS_UPDATE_SUCCESSFULLY);
                            },function (error) {
                                Data_Toast.error(MESSAGE_CONFIG.ERROR_UPDATE_FAIL,error.data.responData.Error);
                                $scope.btnPressed = false;
                            });
                            break;
                        default :
                            $scope.btnPressed = false;
                            break;
                    }

                }

            }else{
                $scope.btnPressed = true;
                userDetails = {regUser:{email:$scope.regUser.email}};
                adminDataService.removeShopUser(userDetails).then(function(response){
                    initData();
                    $scope.selectedIndex = 0;
                    Data_Toast.success(MESSAGE_CONFIG.SUCCESS_REMOVED_SUCCESSFULLY);
                },function (error) {
                    Data_Toast.error(MESSAGE_CONFIG.ERROR_REMOVE_FAIL,error.data.responData.Error);
                    $scope.btnPressed = false;
                });
            }

        };


    }]);

    mod.controller('adminPromotionsController', ['$scope', '$rootScope','$state','adminDataService','Data.Toast','MESSAGE_CONFIG', function ($scope, $rootScope, $state, adminDataService, Data_Toast, MESSAGE_CONFIG) {
        $scope.promotionList = [];
        $scope.promotion = {};
        $scope.tmp = {};
        $scope.tmp.promotionPic = [];
        $scope.slectedTypes = [];

        $scope.promotionPicSize = {value:500000, text:'500kB'};
        $scope.promotionPicCount = 1;
        $scope.btnPressed = false;

        $scope.headerText = '';
        $scope.addNew = true;
        $scope.selectedIndex = 0;

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




        $scope.count = 0;
        $scope.shopDetails = {};
        var itemPerPage = 10;







        $scope.shopDetails = adminDataService.shopData();
        $scope.searchObj = {
            skip: $scope.promotionList.length,
            limit:itemPerPage,
            searchKey:'',
            searchValue:'',
            shopId : $scope.shopDetails.branch.shopId
        };

        $scope.loadData = function(init){
            if(init){
                $scope.promotionList = [];
                $scope.searchObj.skip =0;
            }
            $scope.loading = true;
            adminDataService.getAdminPromotionList($scope.searchObj).then(function(response){
                $scope.promotionList.push.apply($scope.promotionList, response.data.responData.data.list);
                if(response.data.responData.data.count){
                    $scope.count = response.data.responData.data.count;
                }
                $scope.loading = false;
            },function(){
                $scope.promotionList = [];
            });


        };

        $scope.paginationFuntion = function() {
            $scope.searchObj.skip = $scope.promotionList.length;
            if ($scope.count > $scope.promotionList.length  && !$scope.loading) {
                $scope.loadData();
            }
        };

        $scope.loadData(1);















/*        var initData = function(){
            $scope.shopDetails = adminDataService.shopData();
            adminDataService.getAdminPromotionList({shopId:$scope.shopDetails.shopId}).then(function(response){
                $scope.promotionList = response.data.responData.data
            },function(){
                $scope.promotionList = [];
            });
        };
        initData();*/


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
                $scope.searchObj = {
                    skip:0,
                    limit:itemPerPage,
                    searchKey: d.searchKey,
                    searchValue: d.searchValue,
                    shopId : $scope.shopDetails.branch.shopId,
                    branchId : $scope.shopDetails.branch.branchId
                };
                $scope.load(1);
            }
        };

        $scope.resetForm = function(){
            $scope.tmp = {};
            $scope.tmp.promotionPic = [];
            $scope.slectedTypes = [];
            $scope.promotion = {};

            $scope.headerText = '';
            $scope.addNew = '';
            $scope.btnPressed = false;
        };

        $scope.$watch('selectedIndex', function(current, old){
            if(current<= old){
                $scope.headerText = '';
                $scope.initDirective = false;
            }else{
                $scope.initDirective = true;
            }

        });


        $scope.EditViewController = function(promotionData) {
            $scope.resetForm();
            $scope.selectedIndex = 1;

            if(promotionData){
                $scope.promotion = promotionData;
                if(!(promotionData.promotionPic == '' || promotionData.promotionPic == undefined)){
                    $scope.tmp.promotionPic.push({image:promotionData.promotionPic});
                }
                $scope.slectedTypes = $scope.promotion.tags;
                $scope.headerText = 'Edit Promotion #'+ $scope.promotion.promotionId;
                $scope.addNew = false;

            }else{

                $scope.headerText = 'Add New Promotion';
                $scope.addNew = true;
            }

        };

        $scope.close = function() {
            $scope.selectedIndex = 0;
        };

        $scope.answer = function(option) {
            $scope.btnPressed = true;
            if(option){
                if(($scope.tmp.promotionPic.length <= 0)){
                    Data_Toast.warning(MESSAGE_CONFIG.ERROR_REQUIRED_IMAGE);
                    $scope.btnPressed = false;
                }else {
                    $scope.promotion.promotionPic = $scope.tmp.promotionPic[0]?$scope.tmp.promotionPic[0].image:'';
                    $scope.promotion.tags = $scope.slectedTypes;

                    var promotionDetails = {};

                    switch (option) {
                        case 1 :
                            $scope.promotion.shopId = $scope.shopDetails.shopId;
                            $scope.promotion.branchId = $scope.shopDetails.branch.branchId;
                            promotionDetails = {promotion:$scope.promotion};
                            adminDataService.addPromotion(promotionDetails).then(function (response) {
                                $scope.loadData(1);
                                $scope.selectedIndex = 0;
                                Data_Toast.success(MESSAGE_CONFIG.SUCCESS_SAVED_SUCCESSFULLY);
                            },function (error) {
                                Data_Toast.error(MESSAGE_CONFIG.ERROR_SAVE_FAIL,error.data.responData.Error);
                                $scope.btnPressed = false;
                            });
                            break;
                        case 2 :
                            promotionDetails = {promotion:$scope.promotion};
                            adminDataService.updatePromotion(promotionDetails).then(function (response) {
                                $scope.loadData(1);
                                $scope.selectedIndex = 0;
                                Data_Toast.success(MESSAGE_CONFIG.SUCCESS_UPDATE_SUCCESSFULLY);
                            },function (error) {
                                Data_Toast.error(MESSAGE_CONFIG.ERROR_UPDATE_FAIL,error.data.responData.Error);
                                $scope.btnPressed = false;
                            });
                            break;
                        default :
                            $scope.btnPressed = false;
                            break;
                    }

                }

            }else{
                $scope.btnPressed = true;
                promotionDetails = {promotion:$scope.promotion};
                adminDataService.removePromotion(promotionDetails).then(function(response){
                    $scope.loadData(1);
                    $scope.selectedIndex = 0;
                    Data_Toast.success(MESSAGE_CONFIG.SUCCESS_REMOVED_SUCCESSFULLY);
                },function (error) {
                    Data_Toast.error(MESSAGE_CONFIG.ERROR_REMOVE_FAIL,error.data.responData.Error);
                    $scope.btnPressed = false;
                });
            }

        };


    }]);

    mod.controller('adminExtrasController', ['$scope', '$rootScope','$state','adminDataService','Data.Toast','MESSAGE_CONFIG','ADMIN_MOD_CONFIG', function ($scope, $rootScope, $state, adminDataService, Data_Toast, MESSAGE_CONFIG, ADMIN_MOD_CONFIG) {

        $scope.menuList = ADMIN_MOD_CONFIG.EXTRA_MENU_CONFIG;
        $scope.userData = adminDataService.fullUserData();
        var entitlementList = [];
        if($scope.userData.entitlements.length > 0){
            entitlementList = _.pluck($scope.userData.entitlements, '_id');
        }

        $scope.initMenu = function(menu){
            return _.contains(entitlementList, menu.authorization);
        };


        $scope.isActive = function () {
            var menuList = _.pluck($scope.menuList, 'key');
            $scope.selectedTab =  _.indexOf(menuList, $state.current.name);
        };
        $scope.isActive();
    }]);

    mod.controller('adminExtraProfileController', ['$scope', '$rootScope','$state','adminDataService','Data.Toast','MESSAGE_CONFIG', function ($scope, $rootScope, $state, adminDataService, Data_Toast, MESSAGE_CONFIG) {

        $scope.edit = true;
        $scope.user = {};
        $scope.temp = {};
        $scope.changePwd = false;
        $scope.user.profilePic =[];
        $scope.profilePicSize = {value:500000, text:'500kB'};
        $scope.profilePicCount = 1;

        var initData = function(){
            $scope.user.profilePic =[];
            $scope.shopDetails = adminDataService.shopData();
            adminDataService.adminGetUser({shopId:$scope.shopDetails.shopId, email:$scope.shopDetails.email}).then(function(response){
                $scope.regUser = response.data.responData.data[0];
                $scope.branch = $scope.regUser.branch;
                if($scope.regUser.profilePic != ''){
                    $scope.user.profilePic.push({image:$scope.regUser.profilePic});
                }
            },function(error){
                $scope.regUser = {};
            });
        };
        initData();

        $scope.resetPwd =function(){
            adminDataService.adminResetPwd($scope.temp).then(function(response){
                Data_Toast.success(MESSAGE_CONFIG.SUCCESS_SAVED_SUCCESSFULLY);
                $scope.temp = {};
                $scope.changePwd = false;
            },function(error){
                Data_Toast.error(MESSAGE_CONFIG.ERROR_UPDATE_FAIL,error.data.responData.Error);
            });
        };

        $scope.updateProfile = function(){
            $scope.regUser.profilePic = $scope.user.profilePic[0]?$scope.user.profilePic[0].image:'';
            adminDataService.adminUpdateUser({regUser:$scope.regUser , profileUpdate:true}).then(function(response){
                Data_Toast.success(MESSAGE_CONFIG.SUCCESS_SAVED_SUCCESSFULLY);
                $scope.regUser ={};
                $scope.edit = true;
                initData();
            },function(error){
                Data_Toast.error(MESSAGE_CONFIG.ERROR_UPDATE_FAIL,error.data.responData.Error);
            });
        }

    }]);

    mod.controller('adminExtraMessageController', ['$scope', '$rootScope','$state','adminDataService','Data.Toast','MESSAGE_CONFIG', function ($scope, $rootScope, $state, adminDataService, Data_Toast, MESSAGE_CONFIG) {
        var itemPerPage = 25;


        $scope.pagination = {
            current_page:0,
            total_pages:0
        };

        var shopDetails = adminDataService.shopData();
        $scope.searchObj = {
            skip:0,
            limit:itemPerPage,
            searchKey:'',
            searchValue:'',
            shopId : shopDetails.shop.shopId
        };

        var loadData = function(){
            adminDataService.adminGetItemList($scope.searchObj).then(function(response){
                $scope.itemList.push.apply($scope.itemList, response.data.responData.data.list);
                if(response.data.responData.data.count){
                    var count = response.data.responData.data.count;
                    $scope.pagination.total_pages = (count%itemPerPage > 0)?(count/itemPerPage)+1:(count/itemPerPage);
                }
                $scope.loading = false;
            },function(){
                $scope.itemList = [];
            });


        };





        function load(page) {
            var params     = { page: page };
            var isTerminal = $scope.pagination && $scope.pagination.current_page >= $scope.pagination.total_pages && $scope.pagination.current_page <= 1;

            // Determine if there is a need to load a new page
            if (!isTerminal) {
                // Flag loading as started
                $scope.loading = true;

            }
        }

        // Register event handler
        $scope.$on('endlessScroll:next', function() {
            // Determine which page to load
            var page = $scope.pagination ? $scope.pagination.current_page + 1 : 1;

            // Load page
            load(page);
        });

        // Load initial page (first page or from query param)
        load($routeParams.page ? parseInt($routeParams.page, 10) : 1);






    }]);

    mod.controller('adminExtraTagsController', ['$scope', '$rootScope','$state','adminDataService','Data.Toast','MESSAGE_CONFIG', function ($scope, $rootScope, $state, adminDataService, Data_Toast, MESSAGE_CONFIG) {

        $scope.typed = '';
        $scope.tracker = 1;
        $scope.typed ='';
        $scope.tags =[];


        $scope.$watch('typed', function(current, old){
            if(current != old){
                $scope.tracker = 3;
                _.each($scope.tags, function(tg){
                    if(current.toLowerCase() == tg.key.toLowerCase()){
                        if(tg.shopId == $scope.shopDetails.shopId){
                            $scope.tracker = 1;
                            return false;
                        }else{
                            $scope.tracker = 2;
                            return false;
                        }
                    }
                });
            }
        });


        var initData = function(){
            $scope.shopDetails = adminDataService.shopData();
            adminDataService.adminGetTagList().then(function(response){
                $scope.tags = response.data.responData.data;
            },function(error){
                $scope.tags =[];
            });
        };
        initData();


        $scope.answer = function(){
            var tag ={key:$scope.typed.toLowerCase(), shopId:$scope.shopDetails.shopId};
            switch($scope.tracker){
                case 3:
                    adminDataService.addTag({tag:tag}).then(function(response){
                        $scope.typed = '';
                        Data_Toast.success(MESSAGE_CONFIG.SUCCESS_SAVED_SUCCESSFULLY);
                        initData();
                    },function(error){
                        Data_Toast.error(MESSAGE_CONFIG.ERROR_SAVE_FAIL,error.data.responData.Error);
                    });
                    break;

                case 1:
                    adminDataService.removeTag({tag:tag}).then(function(response){
                        $scope.typed = '';
                        Data_Toast.success(MESSAGE_CONFIG.SUCCESS_REMOVED_SUCCESSFULLY);
                        initData();
                    },function(error){
                        Data_Toast.error(MESSAGE_CONFIG.ERROR_REMOVE_FAIL,error.data.responData.Error);
                    });
                    break;

                default :
                    console.log('cannot find tracker value');
            }
        };

        $scope.checkShop = function(tag){
            return (tag.shopId == $scope.shopDetails.shopId);
        }

    }]);

    mod.controller('adminExtraBlogController', ['$scope', '$rootScope','$state','adminDataService','Data.Toast','MESSAGE_CONFIG', function ($scope, $rootScope, $state, adminDataService, Data_Toast, MESSAGE_CONFIG) {
        $scope.blogImageSize = {value:500000, text:'500kB'};
        $scope.blogImageCount = 1;
        $scope.blogImage = [];
        $scope.blogData = {};


        var initData = function(){
            $scope.blogImage = [];
            $scope.shopDetails = adminDataService.shopData();
            adminDataService.adminGetBlogList({shopId:$scope.shopDetails.shopId}).then(function(response){
                $scope.blogs = response.data.responData.data;
                if($scope.blogs.length <= 0){
                    $scope.addNew = true;
                }
            },function(error){
                $scope.blogs = {};
            });
        };
        initData();


        $scope.update = function(blog){
            blog.shop = $scope.shopDetails.branch.shop;
            blog.img = $scope.blogImage[0]?$scope.blogImage[0].image:'';
            delete blog.open;
            adminDataService.updateBlog({blog:blog}).then(function (response) {
                initData();
                Data_Toast.success(MESSAGE_CONFIG.SUCCESS_UPDATE_SUCCESSFULLY);
            },function (error) {
                Data_Toast.error(MESSAGE_CONFIG.ERROR_UPDATE_FAIL,error.data.responData.Error);
            });
        };

        $scope.remove = function(blog){
            adminDataService.removeBlog({blog:blog}).then(function (response) {
                initData();
                Data_Toast.success(MESSAGE_CONFIG.SUCCESS_REMOVED_SUCCESSFULLY);
            },function (error) {
                Data_Toast.error(MESSAGE_CONFIG.ERROR_REMOVE_FAIL,error.data.responData.Error);
            });
        };

        $scope.add = function(){
            $scope.blogData.shop = $scope.shopDetails.branch.shop;
            $scope.blogData.img = $scope.blogImage[0]?$scope.blogImage[0].image:'';
            adminDataService.insertBlog({blog:$scope.blogData}).then(function (response) {
                $scope.blogData = {};
                $scope.blogImage = [];
                $scope.addNew = false;
                initData();
                Data_Toast.success(MESSAGE_CONFIG.SUCCESS_SAVED_SUCCESSFULLY);
            },function (error) {
                Data_Toast.error(MESSAGE_CONFIG.ERROR_SAVE_FAIL,error.data.responData.Error);
            });
        };


        $scope.setImage = function (blog) {
            $scope.blogImage = [];
            if(blog.img != ''){
                $scope.blogImage.push({image:blog.img});
            }
        };

        $scope.close = function (blog) {
            blog.open = false;
        };



    }]);
})(com.TRENDI.CATEGORY.modules.adminModule);
