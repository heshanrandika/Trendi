/**
 * Created by Heshanr on 7/20/2015.
 */
(function(mod){
    mod.service('mainDataService',['$window','Data.Comm','mainServiceCalls',function($window, Data_Comm,mainServiceCalls){
        var _getLatestItem = function(){
            return Data_Comm.postPromise(angular.extend({},mainServiceCalls.getLatestItemDao()));
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

        var _getBestSellerList = function(){ //TODO
            return Data_Comm.postPromise(angular.extend({},mainServiceCalls.getBestSellerListDao()));
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

        var _getShopList = function(){
            return Data_Comm.postPromise(angular.extend({},mainServiceCalls.getShopListDao()));
        };

        return{
            getLatestItem:_getLatestItem,
            getPromotionList:_getPromotionList,
            getMostTrendyItems:_getMostTrendyItems,
            getBlogList:_getBlogList,
            getBestSellerList:_getBestSellerList,
            getOnSaleList:_getOnSaleList,
            getNewProductList:_getNewProductList,
            getTopRatedList:_getTopRatedList,
            getShopList:_getShopList
        }
    }]);
})(com.TRENDI.CATEGORY.modules.mainTrendiModule);
