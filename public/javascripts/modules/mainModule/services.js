/**
 * Created by Heshanr on 7/20/2015.
 */
(function(mod){
    mod.service('mainDataService',['$window','Data.Comm','mainServiceCalls',function($window, Data_Comm,mainServiceCalls){
        var _getFullItemList = function(){
            return Data_Comm.postPromise(angular.extend({},mainServiceCalls.getFullItemListDao()));
        };

        var _getOfferList = function(){
            return Data_Comm.postPromise(angular.extend({},mainServiceCalls.getOfferListDao()));
        };

        var _getMostTrendyList = function(){
            return Data_Comm.postPromise(angular.extend({},mainServiceCalls.getMostTrendyListDao()));
        };

        var _getBlogList = function(){
            return Data_Comm.postPromise(angular.extend({},mainServiceCalls.getBlogListDao()));
        };

        var _getBestSellerList = function(){
            return Data_Comm.postPromise(angular.extend({},mainServiceCalls.getBestSellerListDao()));
        };

        var _getOnSaleList = function(){
            return Data_Comm.postPromise(angular.extend({},mainServiceCalls.getOnSaleListDao()));
        };

        var _getNewProductList = function(){
            return Data_Comm.postPromise(angular.extend({},mainServiceCalls.getNewProductListDao()));
        };

        var _getTopRatedList = function(){
            return Data_Comm.postPromise(angular.extend({},mainServiceCalls.getTopRatedListDao()));
        };

        var _getPromotionList = function(){
            return Data_Comm.postPromise(angular.extend({},mainServiceCalls.getPromotionListDao()));
        };

        var _getShopList = function(){
            return Data_Comm.postPromise(angular.extend({},mainServiceCalls.getShopListDao()));
        };

        return{
            getFullItemList:_getFullItemList,
            getOfferList:_getOfferList,
            getMostTrendyList:_getMostTrendyList,
            getBlogList:_getBlogList,
            getBestSellerList:_getBestSellerList,
            getOnSaleList:_getOnSaleList,
            getNewProductList:_getNewProductList,
            getTopRatedList:_getTopRatedList,
            getPromotionList:_getPromotionList,
            getShopList:_getShopList
        }
    }]);
})(com.TRENDI.CATEGORY.modules.mainTrendiModule);
