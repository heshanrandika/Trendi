/**
 * Created by Heshanr on 7/21/2015.
 */

(function (mod) {
    "use strict";

    mod.factory('adminServiceCalls', ['ADMIN_MOD_CONFIG', '$window', '$localStorage', function (ADMIN_MOD_CONFIG, $window, $localStorage) {

        var serviceCalls = {};
        var commonCallObj = {};

        var $storage = $localStorage;


        var _getCObj = function () {
         var userData = $storage.user;
            commonCallObj = {email: userData.email , session: userData.session, userType: userData.userType };
            return commonCallObj;
        };



        serviceCalls.getItemListDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetItemList}, _getCObj());
        };

        serviceCalls.addItemDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_AddItems}, _getCObj());
        };

        serviceCalls.updateItemDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_UpdateItem}, _getCObj());
        };

        serviceCalls.getSubItemDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetSubItem}, _getCObj());
        };

        serviceCalls.removeItemDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_RemoveItems}, _getCObj());
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

        serviceCalls.getBannerImageDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetBannerImage}, _getCObj());
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

        serviceCalls.addTagDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_AddTag}, _getCObj());
        };

        serviceCalls.removeTagDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_RemoveTag}, _getCObj());
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




        return serviceCalls;

    }]);

})(com.TRENDI.CATEGORY.modules.adminModule);