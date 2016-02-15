/**
 * Created by Heshanr on 7/21/2015.
 */

(function (mod) {
    "use strict";

    mod.factory('mainServiceCalls', ['MAIN_MOD_CONFIG', '$window', function (MAIN_MOD_CONFIG, $window) {

        var serviceCalls = {};
        var commonCallObj = {};

        var _getCObj = function () {
          /*  var userData = JSON.parse($window.localStorage.getItem('__'));
            commonCallObj = {userName: userData.username, sessionId: userData.sessionId};*/
            return commonCallObj;
        };

        serviceCalls.getLoginDao = function () {
            return {functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_1000};
        };

        serviceCalls.getLogoutDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_1001}, _getCObj());
        };

        serviceCalls.getLatestItemDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetLatestItem}, _getCObj());
        };

        serviceCalls.getMainItemListDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetMainItemList}, _getCObj());
        };

        serviceCalls.getPromotionListDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetPromotionList}, _getCObj());
        };

        serviceCalls.getMostTrendyListDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetMostTrendyItems}, _getCObj());
        };

        serviceCalls.getBlogListDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetBlogList}, _getCObj());
        };

        serviceCalls.getShopDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetShop}, _getCObj());
        };

        serviceCalls.getOnSaleListDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetCommonItemList}, _getCObj());
        };

        serviceCalls.getNewProductListDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetCommonItemList}, _getCObj());
        };

        serviceCalls.getTopRatedListDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetCommonItemList}, _getCObj());
        };

        serviceCalls.getShopListDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetShopList}, _getCObj());
        };

        serviceCalls.getSearchListDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetSearchList}, _getCObj());
        };

        serviceCalls.getItemCountDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetItemCount}, _getCObj());
        };

        serviceCalls.getSubItemDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetSubItem}, _getCObj());
        };

        serviceCalls.getMainItemDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetMainItem}, _getCObj());
        };

        serviceCalls.getItemMenuDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetItemMenu}, _getCObj());
        }; 

        serviceCalls.getRateDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetItemMenu}, _getCObj());
        };

        serviceCalls.getSocketLogoutDao = function () {
            return _getCObj();
        };

        return serviceCalls;

    }]);

})(com.TRENDI.CATEGORY.modules.mainTrendiModule);