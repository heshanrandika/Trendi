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

        serviceCalls.getEntitlementsDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetEntitlements}, _getCObj());
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