/**
 * Created by Heshanr on 7/21/2015.
 */

(function (mod) {
    "use strict";

    mod.factory('mainServiceCalls', ['MAIN_MOD_CONFIG', '$window','$localStorage', function (MAIN_MOD_CONFIG, $window, $localStorage) {

        var serviceCalls = {};
        var commonCallObj = {};

        var $storage = $localStorage;


        var _getCObj = function () {
            var userData = $storage.loginUser;
            if(userData != undefined){
                commonCallObj = {email: userData.email , session: userData.session, userType: userData.userType };
            }else{
                commonCallObj = {};   
            }

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

        serviceCalls.getRelatedItemsDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetRelatedItems}, _getCObj());
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

        serviceCalls.getMostSeenDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetCommonItemList}, _getCObj());
        };

        serviceCalls.getShopListDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetShopList}, _getCObj());
        }; 

        serviceCalls.getBannerImagesDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetShopBannerImages}, _getCObj());
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
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_SetRate}, _getCObj());
        };

        serviceCalls.getTagListDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetTagList}, _getCObj());
        };

        serviceCalls.getCommentListDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetCommentList}, _getCObj());
        };

        serviceCalls.addCommentDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_AddComment}, _getCObj());
        };

        serviceCalls.removeCommentDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_RemoveComment}, _getCObj());
        };

        serviceCalls.addToWatchListDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_AddToWatchList}, _getCObj());
        };

        serviceCalls.removeFromWatchListDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_RemoveFromWatchList}, _getCObj());
        };

        serviceCalls.getWatchListDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetWatchList}, _getCObj());
        };
  
        serviceCalls.getMessageListDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetMessageList}, _getCObj());
        };

        serviceCalls.sendMessageDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_SendMessage}, _getCObj());
        };

        serviceCalls.replyMessageDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_ReplyMessage}, _getCObj());
        };

        serviceCalls.updateMessageDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_UpdateMessage}, _getCObj());
        };

        serviceCalls.getUnreadMessageListDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetUnreadMessageList}, _getCObj());
        };

        serviceCalls.getMessageCountDao = function () {
            return angular.extend({functionId: MAIN_MOD_CONFIG.REQ_CONFIG.FUNC_GetMessageCount}, _getCObj());
        };

        serviceCalls.getSocketLogoutDao = function () {
            return _getCObj();
        };

        return serviceCalls;

    }]);


})(com.TRENDI.CATEGORY.modules.mainTrendiModule);