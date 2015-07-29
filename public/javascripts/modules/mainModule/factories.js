/**
 * Created by Heshanr on 7/21/2015.
 */

(function (mod) {
    "use strict";

    mod.factory('mainServiceCalls', ['MAIN_MOD_CONFIG', '$window', function (MAIN_MOD_CONFIG, $window) {

        var serviceCalls = {};
        var commonCallObj = {};

        var _getCObj = function () {
            var userData = JSON.parse($window.localStorage.getItem('__'));
            commonCallObj = {userName: userData.username, sessionId: userData.sessionId};
            return commonCallObj;
        };

        serviceCalls.getLoginDao = function () {
            return {functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_1000};
        };

        serviceCalls.getLogoutDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_1001}, _getCObj());
        };

        serviceCalls.getFullItemListDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_1001}, _getCObj());
        };

        serviceCalls.getOfferListDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_1001}, _getCObj());
        };

        serviceCalls.getMostTrendyListDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_1001}, _getCObj());
        };

        serviceCalls.getBlogListDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_1001}, _getCObj());
        };

        serviceCalls.getBestSellerListDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_1001}, _getCObj());
        };

        serviceCalls.getOnSaleListDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_1001}, _getCObj());
        };

        serviceCalls.getNewProductListDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_1001}, _getCObj());
        };

        serviceCalls.getTopRatedListDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_1001}, _getCObj());
        };

        serviceCalls.getPromotionListDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_1001}, _getCObj());
        };

        serviceCalls.getShopListDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_1001}, _getCObj());
        };

        serviceCalls.getSocketLogoutDao = function () {
            return _getCObj();
        };

        return serviceCalls;

    }]);

})(com.TRENDI.CATEGORY.modules.mainTrendiModule);