/**
 * Created by heshan on 9/20/2016.
 */

(function (mod) {
    "use strict";

    mod.controller('sysAdminShopsController', ['$scope', '$rootScope','$state','adminDataService','Data.Toast','MESSAGE_CONFIG','$modal','Confirmation', function ($scope, $rootScope, $state, adminDataService, Data_Toast, MESSAGE_CONFIG, uiModal, Confirmation) {
        $scope.shopList = [];
        var shopDetails = {};


        $scope.count = 0;
        var itemPerPage = 10;

        $scope.searchObj = {
            skip: $scope.shopList.length,
            limit:itemPerPage,
            searchKey:'',
            searchValue:'',
            searchArray:[]
        };


        $scope.search={};

        $scope.searchPress = function(event, search){
            if(event.keyCode == 13 || search){
                var array = [];
                for(var i in $scope.search) {
                    if($scope.search[i] != ""){
                        if(!isNaN(parseFloat($scope.search[i])) && isFinite($scope.search[i])){
                            array.push({key:i, value:parseInt($scope.search[i])})
                        }else{
                            array.push({key:i, value:{'$regex': $scope.search[i]}})
                        }
                    }


                }
                $scope.searchObj.searchArray = array;
                $scope.loadData(1);
            }
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




        $scope.open = function (selectedItem) {

            var modalInstance = uiModal.open({
                animation: true,
                templateUrl: '/views/adminModule/sysAdmin/sysModels/sys.admin.shop.model.html',
                controller: 'sysShopModel',
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
                templateUrl: '/views/adminModule/sysAdmin/sysModels/sys.admin.shop.model.html',
                controller: 'sysShopModel',
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

    mod.controller('sysAdminItemController', ['$scope', '$rootScope','$state','adminDataService','Data.Toast','MESSAGE_CONFIG','$modal','Confirmation', function ($scope, $rootScope, $state, adminDataService, Data_Toast, MESSAGE_CONFIG, uiModal, Confirmation) {
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
            searchArray:[],
            shopId : '',
            branchId : ''
        };

        $scope.search={};

        $scope.searchPress = function(event, search){
            if(event.keyCode == 13 || search){
                var array = [];
                for(var i in $scope.search) {
                    if(i == "approved"){
                        if($scope.search[i] == "undefined"){
                            array.push({key:i, value:{$exists: false}})
                        }else if($scope.search[i] == "true"){
                            array.push({key:i, value:true})
                        }else if($scope.search[i] == "false"){
                            array.push({key:i, value:false})
                        }

                    }else if($scope.search[i] != ""){
                        if(!isNaN(parseFloat($scope.search[i])) && isFinite($scope.search[i])){
                            array.push({key:i, value:parseInt($scope.search[i])})
                        }else{
                            array.push({key:i, value:{'$regex': $scope.search[i]}})
                        }
                    }


                }
                $scope.searchObj.searchArray = array;
                $scope.loadData(1);
            }
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
                templateUrl: '/views/adminModule/sysAdmin/sysModels/sys.admin.product.model.html',
                controller: 'sysProductModel',
                size: 'lg',
                resolve:{
                    item : function(){
                        var editItem = angular.copy(selectedItem);
                        return editItem;
                    }
                }
            });

            modalInstance.result.then(function () {
                $scope.loadData(1);
            }, function () {

            });
        };

        $scope.addNew = function () {

            var modalInstance = uiModal.open({
                animation: true,
                templateUrl: '/views/adminModule/sysAdmin/sysModels/sys.admin.product.model.html',
                controller: 'sysProductModel',
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


    mod.controller('sysAdminUsersController', ['$scope', '$rootScope','$state','adminDataService','Data.Toast','MESSAGE_CONFIG','$modal','Confirmation', function ($scope, $rootScope, $state, adminDataService, Data_Toast, MESSAGE_CONFIG, uiModal, Confirmation) {
        $scope.userList = [];
        $scope.count = 0;
        var shopDetails = {};
        var itemPerPage = 8;

        shopDetails = adminDataService.shopData();
        $scope.searchObj = {
            shopId:undefined,
            notInMail : shopDetails.email,
            superAdmin:false,
            skip: $scope.userList.length,
            searchArray:[],
            limit:itemPerPage

        };
        $scope.search={};

        $scope.searchPress = function(event, search){
            if(event.keyCode == 13 || search){
                var array = [];
                for(var i in $scope.search) {
                    if($scope.search[i] != ""){
                        if(!isNaN(parseFloat($scope.search[i])) && isFinite($scope.search[i])){
                            array.push({key:i, value:parseInt($scope.search[i])})
                        }else{
                            array.push({key:i, value:{'$regex': $scope.search[i]}})
                        }
                    }


                }
                $scope.searchObj.searchArray = array;
                $scope.loadData(1);
            }
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
                templateUrl: '/views/adminModule/sysAdmin/sysModels/sys.admin.user.model.html',
                controller: 'sysUserModel',
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
                templateUrl: '/views/adminModule/sysAdmin/sysModels/sys.admin.user.model.html',
                controller: 'sysUserModel',
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


    mod.controller('sysAdminBranchesController', ['$scope', '$rootScope','$state','adminDataService','Data.Toast','MESSAGE_CONFIG','$modal','Confirmation', function ($scope, $rootScope, $state, adminDataService, Data_Toast, MESSAGE_CONFIG, uiModal, Confirmation) {
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
            searchArray:[],
            shopId : undefined
        };


        $scope.search={};

        $scope.searchPress = function(event, search){
            if(event.keyCode == 13 || search){
                var array = [];
                for(var i in $scope.search) {
                    if($scope.search[i] != ""){
                        if(!isNaN(parseFloat($scope.search[i])) && isFinite($scope.search[i])){
                            array.push({key:i, value:parseInt($scope.search[i])})
                        }else{
                            array.push({key:i, value:{'$regex': $scope.search[i]}})
                        }
                    }


                }
                $scope.searchObj.searchArray = array;
                $scope.loadData(1);
            }
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
                templateUrl: '/views/adminModule/sysAdmin/sysModels/sys.admin.branch.model.html',
                controller: 'sysBranchModel',
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
                templateUrl: '/views/adminModule/sysAdmin/sysModels/sys.admin.branch.model.html',
                controller: 'sysBranchModel',
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


    mod.controller('sysAdminPromotionsController', ['$scope', '$rootScope','$state','adminDataService','Data.Toast','MESSAGE_CONFIG','$modal','Confirmation', function ($scope, $rootScope, $state, adminDataService, Data_Toast, MESSAGE_CONFIG, uiModal, Confirmation) {
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
            searchArray:[],
            shopId : shopDetails.branch.shopId
        };


        $scope.search={};

        $scope.searchPress = function(event, search){
            if(event.keyCode == 13 || search){
                var array = [];
                for(var i in $scope.search) {
                    if(i == "approved"){
                        if($scope.search[i] == "undefined"){
                            array.push({key:i, value:{$exists: false}})
                        }else if($scope.search[i] == "true"){
                            array.push({key:i, value:true})
                        }else if($scope.search[i] == "false"){
                            array.push({key:i, value:false})
                        }

                    }else if($scope.search[i] != ""){
                        if(!isNaN(parseFloat($scope.search[i])) && isFinite($scope.search[i])){
                            array.push({key:i, value:parseInt($scope.search[i])})
                        }else{
                            array.push({key:i, value:{'$regex': $scope.search[i]}})
                        }
                    }


                }
                $scope.searchObj.searchArray = array;
                $scope.loadData(1);
            }
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
                templateUrl: '/views/adminModule/sysAdmin/sysModels/sys.admin.promotions.model.html',
                controller: 'sysPromotionModel',
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
                templateUrl: '/views/adminModule/sysAdmin/sysModels/sys.admin.promotions.model.html',
                controller: 'sysPromotionModel',
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

        $scope.remove = function (promotion) {
            $scope.btnPressed = true;
            Confirmation.openConfirmation("Confirmation", "Are you sure you want to remove this?").then(function (result) {
                if(result == 1){
                    var promotionDetails = {promotion:promotion};
                    adminDataService.removePromotion(promotionDetails).then(function(response){
                        $scope.loadData(1);
                        $scope.btnPressed = false;
                        Data_Toast.success(MESSAGE_CONFIG.SUCCESS_REMOVED_SUCCESSFULLY);
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


    mod.controller('sysAdminBlogController', ['$scope', '$rootScope','$state','adminDataService','Data.Toast','MESSAGE_CONFIG','$modal','Confirmation', function ($scope, $rootScope, $state, adminDataService, Data_Toast, MESSAGE_CONFIG, uiModal, Confirmation) {
        $scope.blogs = [];
        var shopDetails = {};
        var itemPerPage = 10;


        shopDetails = adminDataService.shopData();
        $scope.searchObj = {
            skip: $scope.blogs.length,
            limit:itemPerPage,
            searchKey:'',
            searchValue:'',
            searchArray:[],
            shopId : shopDetails.branch.shopId
        };



        $scope.search={};

        $scope.searchPress = function(event, search){
            if(event.keyCode == 13 || search){
                var array = [];
                for(var i in $scope.search) {
                    if(i == "approved"){
                        if($scope.search[i] == "undefined"){
                            array.push({key:i, value:{$exists: false}})
                        }else if($scope.search[i] == "true"){
                            array.push({key:i, value:true})
                        }else if($scope.search[i] == "false"){
                            array.push({key:i, value:false})
                        }

                    }else if($scope.search[i] != ""){
                        if(!isNaN(parseFloat($scope.search[i])) && isFinite($scope.search[i])){
                            array.push({key:i, value:parseInt($scope.search[i])})
                        }else{
                            array.push({key:i, value:{'$regex': $scope.search[i]}})
                        }
                    }


                }
                $scope.searchObj.searchArray = array;
                $scope.loadData(1);
            }
        };

        $scope.loadData = function(init){
            if(init){
                $scope.blogs = [];
                $scope.searchObj.skip =0;
            }
            $scope.loading = true;
            adminDataService.adminGetBlogList($scope.searchObj).then(function(response){
                $scope.blogs.push.apply($scope.blogs, response.data.responData.data.list);
                if(response.data.responData.data.count){
                    $scope.count = response.data.responData.data.count;
                }
                if($scope.blogs.length <= 0){
                    $scope.addNew = true;
                }
                $scope.loading = false;
            },function(){
                $scope.blogs = [];
            });


        };

        $scope.paginationFuntion = function() {
            $scope.searchObj.skip = $scope.blogs.length;
            if ($scope.count > $scope.blogs.length  && !$scope.loading) {
                $scope.loadData();
            }
        };

        $scope.loadData(1);




        $scope.open = function (selectedItem) {
            $scope.btnPressed = true;
            var modalInstance = uiModal.open({
                animation: true,
                templateUrl: '/views/adminModule/sysAdmin/sysModels/sys.admin.blog.model.html',
                controller: 'sysBlogModel',
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
                templateUrl: '/views/adminModule/sysAdmin/sysModels/sys.admin.blog.model.html',
                controller: 'sysBlogModel',
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

        $scope.remove = function (blog) {
            $scope.btnPressed = true;
            Confirmation.openConfirmation("Confirmation", "Are you sure you want to remove this?").then(function (result) {
                if(result == 1){
                    var blogDetails = {blog:blog};
                    adminDataService.removeBlog(blogDetails).then(function (response) {
                        $scope.loadData(1);
                        $scope.btnPressed = false;
                        Data_Toast.success(MESSAGE_CONFIG.SUCCESS_REMOVED_SUCCESSFULLY);
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


    mod.controller('sysAdminMessageController', ['$scope', '$rootScope','$state','adminDataService','Data.Toast','MESSAGE_CONFIG','$modal', function ($scope, $rootScope, $state, adminDataService, Data_Toast, MESSAGE_CONFIG, uiModal) {
        $scope.unreadCount = 0;
        $scope.draftCount = 0;
        $scope.shopDetails = {};

        var inbox = 'INBOX';
        var draft = 'DRAFTS';
        var sent = 'SENT';
        var itemPerPage = 10;
        $scope.messageList =[];





        var shopDetails = adminDataService.shopData();
        $scope.format = function(from, mail){
            if(shopDetails.email.trim() == from.trim()){
                return "me"+(undefined == mail.REPLY?'':" ("+mail.REPLY.length+")");
            }else{
                return from+(undefined == mail.REPLY?'':" ("+mail.REPLY.length+")");
            }
        };



        $scope.searchObj = {
            skip: $scope.messageList.length,
            limit:itemPerPage,
            searchKey:'',
            searchValue:'',
            type: inbox
        };


        $scope.getCounts = function(){
            adminDataService.getMessageCount({type:inbox, read:true}).then(function(response){
                $scope.unreadCount = response.data.responData.data.count;
                adminDataService.getMessageCount({type:draft}).then(function(response){
                    $scope.draftCount = response.data.responData.data.count;
                },function(){
                    $scope.draftCount = 0;
                });
            },function(){
                $scope.unreadCount = 0;
            });


        };
        $scope.getCounts();

        $scope.changeStatus = function(data){
            if(!data.read){
                adminDataService.updateMessage(data).then(function(response){
                    data.read = true;
                    $scope.getCounts();
                },function(){
                    data.read = false;
                });
            }
        };

        $scope.loadData = function(init){
            if(init){
                $scope.messageList = [];
                $scope.searchObj.skip =0;
            }
            $scope.loading = true;
            adminDataService.getMessageList($scope.searchObj).then(function(response){
                $scope.messageList.push.apply($scope.messageList, response.data.responData.data.list);
                if(response.data.responData.data.count){
                    $scope.count = response.data.responData.data.count;
                }
                $scope.loading = false;
            },function(){
                $scope.messageList = [];
            });


        };

        $scope.paginationFuntion = function() {
            $scope.searchObj.skip = $scope.messageList.length;
            if ($scope.count > $scope.messageList.length  && !$scope.loading) {
                $scope.loadData();
            }
        };




        $scope.selectTab = function(tab){
            $scope.selectedTab = tab;
            switch (tab){
                case 0:
                    $scope.currentTab = 'Inbox';
                    $scope.searchObj.type =  inbox;
                    break;
                case 1:
                    $scope.currentTab = 'Sent';
                    $scope.searchObj.type =  sent;
                    break;
                case 2:
                    $scope.currentTab = 'Draft';
                    $scope.searchObj.type =  draft;
                    break;
            }
            $scope.loadData(1);

        };
        $scope.selectTab(0);





        $scope.composeMail = function () {
            $scope.btnPressed = true;
            var modalInstance = uiModal.open({
                animation: true,
                templateUrl: '/views/adminModule/models/admin.mail.compose.model.html',
                controller: DialogController,
                size: 'lg',
                resolve:{
                    mailData : function(){
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

        function DialogController($scope, $modalInstance, mailData, adminDataService, MESSAGE_CONFIG){

            $scope.mail = {};
            $scope.mail.to = mailData?mailData.to:'';
            $scope.mail.subject = mailData?mailData.subject:'';
            $scope.mail.message = mailData?mailData.message:'';

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            $scope.send = function () {
                $scope.sendClicked = true;
                adminDataService.sendMessage({message:$scope.mail}).then(function(response){
                    Data_Toast.success(MESSAGE_CONFIG.SUCCESS_SAVED_SUCCESSFULLY);
                    $modalInstance.close();
                    $scope.sendClicked = false;
                },function(error){
                    Data_Toast.error(MESSAGE_CONFIG.ERROR_SAVE_FAIL,error.data.responData.Error);
                    $scope.sendClicked = false;
                });
            };



        }


        $scope.replyMailClick = function(event, data, type, rplyMsg) {
            if(type == 0){
                $scope.changeStatus(data);
            }
            var modalInstance = uiModal.open({
                animation: true,
                templateUrl: '/views/adminModule/models/admin.mail.reply.model.html',
                controller: ReplyDialogController,
                size: 'lg',
                resolve:{
                    mailData : function(){
                        return {mailDetails: data, type:type, rplyMsg:rplyMsg};
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

        function ReplyDialogController($scope, $modalInstance, mailData, adminDataService, MESSAGE_CONFIG){
            $scope.replyClicked = true;
            $scope.rplyMail = mailData?mailData.mailDetails:{};
            $scope.replyMail = {};
            $scope.replyMail.replyId = mailData?mailData.mailDetails.id:'';
            if(shopDetails.email.trim() == mailData.mailDetails.from.trim()){
                $scope.replyMail.to = mailData?mailData.mailDetails.to:'';
            }else{
                $scope.replyMail.to = mailData?mailData.mailDetails.from:'';
            }

            $scope.replyMail.message = mailData.rplyMsg?mailData.rplyMsg:'';

            $scope.clickItem = function(item){
                item.open = !item.open;
                setTimeout(function(){
                    $(':focus').blur();
                })
            };

            $scope.initOpen = function(condition,item){
                if(condition){
                    item.open = true;
                }else{
                    item.open = false;
                }
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

        }

    }]);


    mod.controller('sysAdminProfileController', ['$scope', '$rootScope','$state','adminDataService','Data.Toast','MESSAGE_CONFIG', function ($scope, $rootScope, $state, adminDataService, Data_Toast, MESSAGE_CONFIG) {
        $scope.edit = true;
        $scope.user = {};
        $scope.temp = {};
        $scope.changePwd = false;
        $scope.user.profilePic =[];
        $scope.profilePicSize = {value:500000, text:'500kB'};
        $scope.profilePicCount = 1;

        $scope.pwdChange = false;
        $scope.profChange = false;

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
            $scope.btnPressed = true;
            adminDataService.adminResetPwd($scope.temp).then(function(response){
                Data_Toast.success(MESSAGE_CONFIG.SUCCESS_SAVED_SUCCESSFULLY);
                $scope.temp = {};
                $scope.changePwd = false;
                $scope.btnPressed = false;
            },function(error){
                Data_Toast.error(MESSAGE_CONFIG.ERROR_UPDATE_FAIL,error.data.responData.Error);
            });
        };

        $scope.updateProfile = function(){
            $scope.btnPressed = true;
            $scope.regUser.profilePic = $scope.user.profilePic[0]?$scope.user.profilePic[0].image:'';
            adminDataService.adminUpdateUser({regUser:$scope.regUser , profileUpdate:true}).then(function(response){
                Data_Toast.success(MESSAGE_CONFIG.SUCCESS_SAVED_SUCCESSFULLY);
                $scope.regUser ={};
                $scope.edit = true;
                initData();
                $scope.profChange = false;
                $scope.btnPressed = false;
            },function(error){
                Data_Toast.error(MESSAGE_CONFIG.ERROR_UPDATE_FAIL,error.data.responData.Error);
            });
        };

        $scope.pwdEdit = function(){
            $scope.pwdChange = !$scope.pwdChange;
        };

        $scope.profEdit = function(){
            $scope.profChange = !$scope.profChange;
            if($scope.profChange){
                $scope.dupUser = angular.copy($scope.regUser);
            }else{
                $scope.regUser = $scope.dupUser;
            }
        };

    }]);


    mod.controller('sysAdminTagsController', ['$scope', '$rootScope','$state','adminDataService','Data.Toast','MESSAGE_CONFIG', function ($scope, $rootScope, $state, adminDataService, Data_Toast, MESSAGE_CONFIG) {

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
        };

        $scope.removeTag = function(tag){
            adminDataService.removeTag({tag:tag}).then(function(response){
                $scope.typed = '';
                Data_Toast.success(MESSAGE_CONFIG.SUCCESS_REMOVED_SUCCESSFULLY);
                initData();
            },function(error){
                Data_Toast.error(MESSAGE_CONFIG.ERROR_REMOVE_FAIL,error.data.responData.Error);
            });
        };

    }]);


})(com.TRENDI.ADMIN.modules.mainAdminModule);
