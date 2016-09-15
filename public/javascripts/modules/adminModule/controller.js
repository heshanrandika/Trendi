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


    mod.controller('adminItemController', ['$scope', '$rootScope','$state','adminDataService','Data.Toast','MESSAGE_CONFIG','$modal','Confirmation', function ($scope, $rootScope, $state, adminDataService, Data_Toast, MESSAGE_CONFIG, uiModal, Confirmation) {
        $scope.itemList = [];
        $scope.count = 0;
        var shopDetails = {};
        var itemPerPage = 8;
       

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


        $scope.open = function (selectedItem) {

            var modalInstance = uiModal.open({
                animation: true,
                templateUrl: '/views/adminModule/models/admin.product.model.html',
                controller: 'productModel',
                size: 'lg',
                resolve:{
                    item : function(){
                        var editItem = angular.copy(selectedItem);
                        return editItem;
                    }
                }
            });

            modalInstance.result.then(function (editedItem) {
               selectedItem.item = editedItem;
            }, function () {
                
            });
        };

        $scope.addNew = function () {

            var modalInstance = uiModal.open({
                animation: true,
                templateUrl: '/views/adminModule/models/admin.product.model.html',
                controller: 'productModel',
                size: 'lg',
                resolve:{
                    item : function(){
                        return undefined;
                    }
                }
            });

            modalInstance.result.then(function () {
                $scope.loadData(1);
            }, function () {
            });
        };

        $scope.remove = function (itemId) {
            Confirmation.openConfirmation("Confirmation", "Are you sure you want to remove this?").then(function (result) {
                 if(result == 1){
                    var itemDetail={'itemId':itemId};
                    adminDataService.removeItem(itemDetail).then(function(response){
                        Data_Toast.success(MESSAGE_CONFIG.SUCCESS_REMOVED_SUCCESSFULLY);
                        $scope.loadData(1);
                        $scope.btnPressed = false;
                    },function(error){
                        Data_Toast.error(MESSAGE_CONFIG.ERROR_REMOVE_FAIL,error.data.responData.Error);
                        $scope.btnPressed = false;
                    });
                 }else{
                    $scope.btnPressed = false;
                 }
            });
        };

    }]);


    mod.controller('adminUsersController', ['$scope', '$rootScope','$state','adminDataService','Data.Toast','MESSAGE_CONFIG','$modal','Confirmation', function ($scope, $rootScope, $state, adminDataService, Data_Toast, MESSAGE_CONFIG, uiModal, Confirmation) {
        $scope.userList = [];
        $scope.count = 0;
        var shopDetails = {};
        var itemPerPage = 8;

        shopDetails = adminDataService.shopData();
        $scope.searchObj = {
            shopId:shopDetails.shopId,
            notInMail : shopDetails.email,
            superAdmin:false,
            skip: $scope.userList.length,
            limit:itemPerPage
        };

        $scope.loadData = function(init){
            if(init){
                $scope.userList = [];
                $scope.searchObj.skip =0;
            }
            $scope.loading = true;
            adminDataService.getAdminUserList($scope.searchObj).then(function(response){
                $scope.userList.push.apply($scope.userList, response.data.responData.data.list);
                if(response.data.responData.data.count){
                    $scope.count = response.data.responData.data.count;
                }
                $scope.loading = false;
            },function(){
                $scope.userList = [];
            });

        };

        // Register event handler
        $scope.paginationFuntion = function() {
            $scope.searchObj.skip = $scope.userList.length;
            if ($scope.count > $scope.userList.length && !$scope.loading) {
                $scope.loadData();
            }
        };

        $scope.loadData(1);

        $scope.open = function (selectedItem) {
            $scope.btnPressed = true;
            var modalInstance = uiModal.open({
                animation: true,
                templateUrl: '/views/adminModule/models/admin.user.model.html',
                controller: 'userModel',
                size: 'lg',
                resolve:{
                    item : function(){
                        var editItem = angular.copy(selectedItem);
                        return editItem;
                    }
                }
            });

            modalInstance.result.then(function (editedItem) {
                $scope.loadData(1);
                $scope.btnPressed = false;
            }, function () {
                $scope.btnPressed = false;
            });
        };


        $scope.addNew = function () {
            $scope.btnPressed = true;
            var modalInstance = uiModal.open({
                animation: true,
                templateUrl: '/views/adminModule/models/admin.user.model.html',
                controller: 'userModel',
                size: 'lg',
                resolve:{
                    item : function(){
                        return undefined;
                    }
                }
            });

            modalInstance.result.then(function () {
                $scope.loadData(1);
                $scope.btnPressed = false;
            }, function () {
                $scope.btnPressed = false;
            });
        };

        $scope.remove = function (user) {
            $scope.btnPressed = true;
            Confirmation.openConfirmation("Confirmation", "Are you sure you want to remove this?").then(function (result) {
                 if(result == 1){
                    var userDetails = {regUser:{email:user.email}};
                    adminDataService.removeShopUser(userDetails).then(function(response){
                    Data_Toast.success(MESSAGE_CONFIG.SUCCESS_REMOVED_SUCCESSFULLY);
                    $scope.loadData(1);
                    $scope.btnPressed = false;
                },function (error) {
                    Data_Toast.error(MESSAGE_CONFIG.ERROR_REMOVE_FAIL,error.data.responData.Error);
                    $scope.btnPressed = false;
                });
                 }else{
                    $scope.btnPressed = false;
                 }
            });
        };


    }]);

    
    mod.controller('adminBranchesController', ['$scope', '$rootScope','$state','adminDataService','Data.Toast','MESSAGE_CONFIG','$modal','Confirmation', function ($scope, $rootScope, $state, adminDataService, Data_Toast, MESSAGE_CONFIG, uiModal, Confirmation) { 
        $scope.branchList = [];
        $scope.count = 0;
        var shopDetails = {};
        var itemPerPage = 10;


        shopDetails = adminDataService.shopData();
        $scope.searchObj = {
            skip: $scope.branchList.length,
            limit:itemPerPage,
            searchKey:'',
            searchValue:'',
            shopId : shopDetails.branch.shopId
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


        $scope.open = function (selectedItem) {
            $scope.btnPressed = true;
            var modalInstance = uiModal.open({
                animation: true,
                templateUrl: '/views/adminModule/models/admin.branch.model.html',
                controller: 'branchModel',
                size: 'lg',
                resolve:{
                    item : function(){
                        var editItem = angular.copy(selectedItem);
                        return editItem;
                    }
                }
            });

            modalInstance.result.then(function (editedItem) {
                $scope.loadData(1);
                $scope.btnPressed = false;
            }, function () {
                $scope.btnPressed = false;
            });
        };

         $scope.addNew = function () {
            $scope.btnPressed = true;
            var modalInstance = uiModal.open({
                animation: true,
                templateUrl: '/views/adminModule/models/admin.branch.model.html',
                controller: 'branchModel',
                size: 'lg',
                resolve:{
                    item : function(){
                        return undefined;
                    }
                }
            });

            modalInstance.result.then(function () {
                $scope.loadData(1);
                $scope.btnPressed = false;
            }, function () {
                $scope.btnPressed = false;
            });
        };

        $scope.remove = function (branch) {
            $scope.btnPressed = true;
            Confirmation.openConfirmation("Confirmation", "Are you sure you want to remove this?").then(function (result) {
                 if(result == 1){
                    var branchDetails={shopId:shopDetails.shopId,branchId:branch.branchId};
                    adminDataService.removeBranch(branchDetails).then(function(response){
                    Data_Toast.success(MESSAGE_CONFIG.SUCCESS_REMOVED_SUCCESSFULLY);
                    $scope.loadData(1);
                    $scope.btnPressed = false;
                },function (error) {
                    Data_Toast.error(MESSAGE_CONFIG.ERROR_REMOVE_FAIL,error.data.responData.Error);
                    $scope.btnPressed = false;
                });
                 }else{
                    $scope.btnPressed = false;
                 }
            });
        };


    }]);


    mod.controller('adminPromotionsController', ['$scope', '$rootScope','$state','adminDataService','Data.Toast','MESSAGE_CONFIG','$modal','Confirmation', function ($scope, $rootScope, $state, adminDataService, Data_Toast, MESSAGE_CONFIG, uiModal, Confirmation) { 
        $scope.promotionList = [];
        $scope.count = 0;
        var shopDetails = {};
        var itemPerPage = 10;


        shopDetails = adminDataService.shopData();
        $scope.searchObj = {
            skip: $scope.promotionList.length,
            limit:itemPerPage,
            searchKey:'',
            searchValue:'',
            shopId : shopDetails.branch.shopId
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




        $scope.open = function (selectedItem) {
            $scope.btnPressed = true;
            var modalInstance = uiModal.open({
                animation: true,
                templateUrl: '/views/adminModule/models/admin.promotions.model.html',
                controller: 'promotionModel',
                size: 'lg',
                resolve:{
                    item : function(){
                        var editItem = angular.copy(selectedItem);
                        return editItem;
                    }
                }
            });

            modalInstance.result.then(function (editedItem) {
                $scope.loadData(1);
                $scope.btnPressed = false;
            }, function () {
                $scope.btnPressed = false;
            });
        };

         $scope.addNew = function () {
            $scope.btnPressed = true;
            var modalInstance = uiModal.open({
                animation: true,
                templateUrl: '/views/adminModule/models/admin.promotions.model.html',
                controller: 'promotionModel',
                size: 'lg',
                resolve:{
                    item : function(){
                        return undefined;
                    }
                }
            });

            modalInstance.result.then(function () {
                $scope.loadData(1);
                $scope.btnPressed = false;
            }, function () {
                $scope.btnPressed = false;
            });
        };

        $scope.remove = function (branch) {
            $scope.btnPressed = true;
            Confirmation.openConfirmation("Confirmation", "Are you sure you want to remove this?").then(function (result) {
                 if(result == 1){
                    var branchDetails={shopId:shopDetails.shopId,branchId:branch.branchId};
                    adminDataService.removeBranch(branchDetails).then(function(response){
                    Data_Toast.success(MESSAGE_CONFIG.SUCCESS_REMOVED_SUCCESSFULLY);
                    $scope.loadData(1);
                    $scope.btnPressed = false;
                },function (error) {
                    Data_Toast.error(MESSAGE_CONFIG.ERROR_REMOVE_FAIL,error.data.responData.Error);
                    $scope.btnPressed = false;
                });
                 }else{
                    $scope.btnPressed = false;
                 }
            });
        };


    }]);



    mod.controller('adminTest',['$scope',function($scope){
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
