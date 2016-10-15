/**
 * Created by Heshanr on 7/21/2015.
 */

(function (mod) {
    "use strict";

    mod.factory('adminServiceCalls', ['ADMIN_MOD_CONFIG', '$window', '$localStorage','$state', function (ADMIN_MOD_CONFIG, $window, $localStorage, $state) {

        var serviceCalls = {};
        var commonCallObj = {};

        var $storage = $localStorage;


        var _getCObj = function () {
         var userData = $storage.user;
             if(userData.session){
               commonCallObj = {email: userData.email , session: userData.session, userType: userData.userType };
                return commonCallObj; 
             }else{
                $state.go('login');
             }
            
        };



        serviceCalls.adminGetItemListDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_AdminGetItemList}, _getCObj());
        };

        serviceCalls.addItemDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_AddItems}, _getCObj());
        };

        serviceCalls.updateItemDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_UpdateItem}, _getCObj());
        };

        serviceCalls.adminUpdateItemDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_AdminUpdateItem}, _getCObj());
        };

        serviceCalls.getSubItemDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetSubItem}, _getCObj());
        };

        serviceCalls.removeItemDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_RemoveItems}, _getCObj());
        };

        serviceCalls.getSizesDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetSizes}, _getCObj());
        };

        serviceCalls.changeSizesDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_ChangeSizes}, _getCObj());
        };

        serviceCalls.getShopListDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetShopList}, _getCObj());
        };

        serviceCalls.registerShopDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_RegisterShop}, _getCObj());
        };

        serviceCalls.adminUpdateShopDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_AdminUpdateShop}, _getCObj());
        };

        serviceCalls.getUserListDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetUserList}, _getCObj());
        };

        serviceCalls.getBranchListDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetBranchList}, _getCObj());
        };

        serviceCalls.getBranchListToAssignDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC__GetBranchListToAssign}, _getCObj());
        };

        serviceCalls.getBannerDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetBanner}, _getCObj());
        };

        serviceCalls.setBannerDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_SetBanner}, _getCObj());
        };

        serviceCalls.addBranchDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_AddBranch}, _getCObj());
        };

        serviceCalls.updateBranchDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_UpdateBranch}, _getCObj());
        };

        serviceCalls.removeBranchDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_RemoveBranch}, _getCObj());
        };

        serviceCalls.getAdminUserListDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_AdminGetUserList}, _getCObj());
        };

        serviceCalls.getEntitlementsDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetEntitlements}, _getCObj());
        };

        serviceCalls.addShopUserDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_AddShopUser}, _getCObj());
        };

        serviceCalls.updateShopUserDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_UpdateShopUser}, _getCObj());
        };

        serviceCalls.removeShopUserDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_RemoveShopUser}, _getCObj());
        };

        serviceCalls.getAdminPromotionListDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_AdminGetPromotionList}, _getCObj());
        };

        serviceCalls.addPromotionDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_AddPromotion}, _getCObj());
        };

        serviceCalls.updatePromotionDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_UpdatePromotion}, _getCObj());
        };

        serviceCalls.removePromotionDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_RemovePromotion}, _getCObj());
        };

        serviceCalls.adminGetUserDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_AdminGetUser}, _getCObj());
        };

        serviceCalls.adminUpdateUserDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_UpdateShopUser}, _getCObj());
        };

        serviceCalls.adminResetPwdDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_AdminResetPwd}, _getCObj());
        };

        serviceCalls.adminGetBlogListDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_AdminGetBlogList}, _getCObj());
        };

        serviceCalls.insertBlogDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_insertBlog}, _getCObj());
        };

        serviceCalls.updateBlogDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_UpdateBlog}, _getCObj());
        };

        serviceCalls.removeBlogDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_RemoveBlog}, _getCObj());
        };

        serviceCalls.adminGetTagListDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_AdminGetTagList}, _getCObj());
        };

        serviceCalls.getTagListDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetTagList}, _getCObj());
        };

        serviceCalls.addTagDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_AddTag}, _getCObj());
        };

        serviceCalls.removeTagDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_RemoveTag}, _getCObj());
        };

        serviceCalls.getMessageListDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetMessageList}, _getCObj());
        };

        serviceCalls.sendMessageDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_SendMessage}, _getCObj());
        };

        serviceCalls.replyMessageDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_ReplyMessage}, _getCObj());
        };

        serviceCalls.updateMessageDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_UpdateMessage}, _getCObj());
        };

        serviceCalls.getUnreadMessageListDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetUnreadMessageList}, _getCObj());
        };

        serviceCalls.getMessageCountDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetMessageCount}, _getCObj());
        };

        serviceCalls.shopDataDao = function () {
            return $storage.user;
        };

        serviceCalls.fullUserDataDao = function () {
            return $storage.user;
        };

        serviceCalls.isAuthenticatedDao = function () {
            return (!!$storage.user);
        };

        serviceCalls.logOutDataDao = function () {
            $storage.user = null;
            $state.go('login');
            return $storage.user;
        };



        return serviceCalls;

    }]);


    mod.factory('Data.Toast', ['$mdToast','$document',function ($mdToast,$document) {

        var _error = function (p,err) {
            $mdToast.show({
                controller: function($scope, $mdToast) {
                    $scope.msg = p;
                    $scope.err = err;
                    $scope.closeToast = function() {
                        $mdToast.hide();
                    };
                },
                templateUrl: '/views/coreModule/toast/toast.error.html',
                parent : $document[0].querySelector('#toastBounds'),
                hideDelay: 3000,
                position: 'bottom right'
            });
        };

        var _success = function (p) {
            $mdToast.show({
                controller: function($scope, $mdToast) {
                    $scope.msg = p;
                    $scope.closeToast = function() {
                        $mdToast.hide();
                    };
                },
                templateUrl: '/views/coreModule/toast/toast.success.html',
                parent : $document[0].querySelector('#toastBounds'),
                hideDelay: 3000,
                position: 'bottom right'
            });
        };


        var _warning = function (p) {
            $mdToast.show({
                controller: function($scope, $mdToast) {
                    $scope.msg = p;
                    $scope.closeToast = function() {
                        $mdToast.hide();
                    };
                },
                templateUrl: '/views/coreModule/toast/toast.warning.html',
                parent : $document[0].querySelector('#toastBounds'),
                hideDelay: 3000,
                position: 'bottom right'
            });
        };

        return {
            error: _error,
            success: _success,
            warning:_warning
        };

    }]);

    mod.factory('Data.Comm', ['$http', '$rootScope',function ($http, $rootScope) {

        var URL = "/";

        var _getPromise = function (p) {
            return $http.get(URL, (p) ? p : {});
        };

        var _postPromise = function (p) {
            var value = CryptoJS.TripleDES.encrypt(JSON.stringify(p), "dsgfbdusiduigdfgndsgyufigyfldg");
            var encrypt = {enc : ""+value};
            return $http.post(URL, (encrypt) ? encrypt : {});
        };

        return {
            getPromise: _getPromise,
            postPromise: _postPromise
        };

    }]);

})(com.TRENDI.ADMIN.modules.mainAdminModule);