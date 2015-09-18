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

        serviceCalls.shopDataDao = function () {
            return $storage.user;
        };




        return serviceCalls;

    }]);

})(com.TRENDI.CATEGORY.modules.adminModule);