/**
 * Created by Heshanr on 5/24/2015.
 */
(function (mod) {
    "use strict";

    mod.controller('masterCtrl',['$scope', 'applicationService', 'builderService','$state','$location','ADMIN_MOD_CONFIG','adminDataService',function ($scope, applicationService, builderService, $state, $location, ADMIN_MOD_CONFIG, adminDataService) {
        setTimeout(function(){
            $(document).ready(function () {
                applicationService.init();
                builderService.init();
            });

            $scope.$on('$viewContentLoaded', function () {

                applicationService.customScroll();
                applicationService.handlePanelAction();


                $('.nav.nav-sidebar .nav-active').removeClass('nav-active active');
                $('.nav.nav-sidebar .active:not(.nav-parent)').closest('.nav-parent').addClass('nav-active active');

                if($location.$$path == '/' || $location.$$path == '/layout-api'){
                    $('.nav.nav-sidebar .nav-parent').removeClass('nav-active active');
                    $('.nav.nav-sidebar .nav-parent .children').removeClass('nav-active active');
                    if ($('body').hasClass('sidebar-collapsed') && !$('body').hasClass('sidebar-hover')) return;
                    if ($('body').hasClass('submenu-hover')) return;
                    $('.nav.nav-sidebar .nav-parent .children').slideUp(200);
                    $('.nav-sidebar .arrow').removeClass('active');
                }

            });
        }, 0);
        $scope.isActive = function (viewLocation) {
            return (viewLocation.split('.')[0] === $state.current.name.split('.')[0] && viewLocation.split('.')[1] === $state.current.name.split('.')[1]);
        };

        $scope.goto = function (category) {
            var state = 'main.'+category;
            $state.go(state);
        };


        var entitlementList = [];
        var init= function(){
                $scope.userData = adminDataService.fullUserData();
            if($scope.userData.superAdmin){
                $scope.menuList = ADMIN_MOD_CONFIG.SYS_MENU_CONFIG;
            }else{
                $scope.menuList = ADMIN_MOD_CONFIG.MENU_CONFIG;
            }

            
            if($scope.userData.entitlements.length > 0){
                entitlementList = _.pluck($scope.userData.entitlements, '_id');
            }
        };
        init();
        

        $scope.initMenu = function(menu){
            if(menu.subMenu){
                return true;
            }else{
                return _.contains(entitlementList, menu.authorization);
            }
            
        };

        $scope.menuClick= function(menu){
            $state.go(menu.key);
        };


    }]);


    mod.controller('adminItemController', ['$scope', '$rootScope','$state','adminDataService','Data.Toast','MESSAGE_CONFIG','$modal', function ($scope, $rootScope, $state, adminDataService, Data_Toast, MESSAGE_CONFIG, uiModal) {
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
        $scope.group = {};

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


        $scope.open = function () {

            var modalInstance = uiModal.open({
                animation: true,
                templateUrl: '/views/adminModule/models/admin.product.model.html',
                controller: 'productModel',
                size: 'lg'
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };



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
            $scope.group = {
                men: false,
                women: false,
                kids: false
            };

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
                $scope.group = itemData.item.group?itemData.item.group:{
                    men: false,
                    women: false,
                    kids: false
                };

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
                $scope.group = {
                    men: false,
                    women: false,
                    kids: false
                };
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
                    $scope.mainItem.group = $scope.group;
                    $scope.mainItem.rate = {rate:0, star:0, hit:0};
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

    mod.controller('adminTest',['$scope','$modal',function($scope, uiModal){
        $scope.open = function () {

            var modalInstance = uiModal.open({
                animation: true,
                templateUrl: '/views/adminModule/models/admin.product.model.html',
                controller: 'productModel',
                size: 'lg'
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    }]);

})(com.TRENDI.ADMIN.modules.mainAdminModule);
