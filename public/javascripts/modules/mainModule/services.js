/**
 * Created by Heshanr on 7/20/2015.
 */
(function(mod){
    mod.service('mainDataService',['$window','Data.Comm','mainServiceCalls',function($window, Data_Comm,mainServiceCalls){
        var _getLatestItem = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},mainServiceCalls.getLatestItemDao()));
        }; 

        var _getRelatedItem = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},mainServiceCalls.getRelatedItemsDao()));
        };

        var _getMainItemList = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},mainServiceCalls.getMainItemListDao()));
        };

        var _getPromotionList = function(){
            return Data_Comm.postPromise(angular.extend({},mainServiceCalls.getPromotionListDao()));
        };

        var _getMostTrendyItems = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},mainServiceCalls.getMostTrendyListDao()));
        };

        var _getBlogList = function(){
            return Data_Comm.postPromise(angular.extend({},mainServiceCalls.getBlogListDao()));
        };

        var _getShop = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},mainServiceCalls.getShopDao()));
        };

        var _getBanner = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},mainServiceCalls.getBannerDao()));
        };

        var _getMapMarker = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},mainServiceCalls.getMapMarkerDao()));
        };

        var _getOnSaleList = function(d){ //TODO
            return Data_Comm.postPromise(angular.extend({params:d},mainServiceCalls.getOnSaleListDao()));
        };

        var _getNewProductList = function(d){ //TODO
            return Data_Comm.postPromise(angular.extend({params:d},mainServiceCalls.getNewProductListDao()));
        };

        var _getMostSeen = function(d){ //TODO
            return Data_Comm.postPromise(angular.extend({params:d},mainServiceCalls.getMostSeenDao()));
        };

        var _getShopList = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},mainServiceCalls.getShopListDao()));
        };

        var _getSearchList = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},mainServiceCalls.getSearchListDao()));
        };

        var _getItemCount = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},mainServiceCalls.getItemCountDao()));
        };

        var _getSubItem = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},mainServiceCalls.getSubItemDao()));
        };

        var _getMainItem = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},mainServiceCalls.getMainItemDao()));
        }; 

        var _getItemMenu = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},mainServiceCalls.getItemMenuDao()));
        };

        var _setRate = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},mainServiceCalls.getRateDao()));
        };

        var _getTagList = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},mainServiceCalls.getTagListDao()));
        };

        var _getSizes = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},mainServiceCalls.getSizesDao()));
        };

        var _getCommentList = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},mainServiceCalls.getCommentListDao()));
        };

        var _addComment = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},mainServiceCalls.addCommentDao()));
        };

        var _removeComment = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},mainServiceCalls.removeCommentDao()));
        };
         
        var _addToWatchList = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},mainServiceCalls.addToWatchListDao()));
        };
         
        var _getWatchList = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},mainServiceCalls.getWatchListDao()));
        };

        var _removeFromWatchList = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},mainServiceCalls.removeFromWatchListDao()));
        };

        var _getMessageList = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},mainServiceCalls.getMessageListDao()));
        };

        var _sendMessage = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},mainServiceCalls.sendMessageDao()));
        };

        var _replyMessage = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},mainServiceCalls.replyMessageDao()));
        };

        var _updateMessage = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},mainServiceCalls.updateMessageDao()));
        };

        var _getUnreadMessageList = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},mainServiceCalls.getUnreadMessageListDao()));
        };

        var _getMessageCount = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},mainServiceCalls.getMessageCountDao()));
        };

        return{
            getLatestItem:_getLatestItem,
            getRelatedItem:_getRelatedItem,
            getMainItemList:_getMainItemList,
            getPromotionList:_getPromotionList,
            getMostTrendyItems:_getMostTrendyItems,
            getBlogList:_getBlogList,
            getShop:_getShop,
            getOnSaleList:_getOnSaleList,
            getNewProductList:_getNewProductList,
            getMostSeen:_getMostSeen,
            getShopList:_getShopList,
            getBanner:_getBanner,
            getMapMarker:_getMapMarker,
            getSearchList:_getSearchList,
            getItemCount:_getItemCount,
            getSubItem:_getSubItem,
            getMainItem:_getMainItem,
            getItemMenu:_getItemMenu,
            setRate:_setRate,
            getTagList:_getTagList,
            getSizes:_getSizes,
            getCommentList:_getCommentList,
            addComment:_addComment,
            removeComment:_removeComment,
            addToWatchList:_addToWatchList,
            getWatchList:_getWatchList,
            removeFromWatchList:_removeFromWatchList,
            getMessageList:_getMessageList,
            sendMessage:_sendMessage,
            replyMessage:_replyMessage,
            updateMessage:_updateMessage,
            getUnreadMessageList:_getUnreadMessageList,
            getMessageCount:_getMessageCount
        }
    }]);
})(com.TRENDI.CATEGORY.modules.mainTrendiModule);
