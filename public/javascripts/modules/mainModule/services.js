/**
 * Created by Heshanr on 7/20/2015.
 */
(function(mod){
    mod.service('mainDataService',['$window','Data.Comm','mainServiceCalls',function($window, Data_Comm,mainServiceCalls){
        var _getLatestItem = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},mainServiceCalls.getLatestItemDao()));
        };

        var _getMainItemList = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},mainServiceCalls.getMainItemListDao()));
        };

        var _getPromotionList = function(){
            return Data_Comm.postPromise(angular.extend({},mainServiceCalls.getPromotionListDao()));
        };

        var _getMostTrendyItems = function(){
            return Data_Comm.postPromise(angular.extend({},mainServiceCalls.getMostTrendyListDao()));
        };

        var _getBlogList = function(){
            return Data_Comm.postPromise(angular.extend({},mainServiceCalls.getBlogListDao()));
        };

        var _getShop = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},mainServiceCalls.getShopDao()));
        };

        var _getOnSaleList = function(){ //TODO
            return Data_Comm.postPromise(angular.extend({},mainServiceCalls.getOnSaleListDao()));
        };

        var _getNewProductList = function(){ //TODO
            return Data_Comm.postPromise(angular.extend({},mainServiceCalls.getNewProductListDao()));
        };

        var _getTopRatedList = function(){ //TODO
            return Data_Comm.postPromise(angular.extend({},mainServiceCalls.getTopRatedListDao()));
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

        return{
            getLatestItem:_getLatestItem,
            getMainItemList:_getMainItemList,
            getPromotionList:_getPromotionList,
            getMostTrendyItems:_getMostTrendyItems,
            getBlogList:_getBlogList,
            getShop:_getShop,
            getOnSaleList:_getOnSaleList,
            getNewProductList:_getNewProductList,
            getTopRatedList:_getTopRatedList,
            getShopList:_getShopList,
            getSearchList:_getSearchList,
            getItemCount:_getItemCount,
            getSubItem:_getSubItem,
            getMainItem:_getMainItem
        }
    }]);
})(com.TRENDI.CATEGORY.modules.mainTrendiModule);
