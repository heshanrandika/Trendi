/**
 * Created by Heshanr on 7/21/2015.
 */

(function (mod) {
    "use strict";

    mod.factory('adminServiceCalls', ['ADMIN_MOD_CONFIG', '$window', function (ADMIN_MOD_CONFIG, $window) {

        var serviceCalls = {};
        var commonCallObj = {};

        var _getCObj = function () {
          /*  var userData = JSON.parse($window.localStorage.getItem('__'));*/
            commonCallObj = {Email: '', sessionId: ''};
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

        serviceCalls.getItemDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetItem}, _getCObj());
        };

        serviceCalls.removeItemDao = function () {
            return angular.extend({functionId: ADMIN_MOD_CONFIG.REQ_CONFIG.FUNC_RemoveItems}, _getCObj());
        };


        return serviceCalls;

    }]);

})(com.TRENDI.CATEGORY.modules.adminModule);