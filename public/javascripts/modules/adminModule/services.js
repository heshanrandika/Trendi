/**
 * Created by Heshanr on 7/20/2015.
 */
(function(mod){
    mod.service('adminDataService',['$window','Data.Comm','adminServiceCalls',function($window, Data_Comm, adminServiceCalls){
        var _getItemList = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.getItemListDao()));
        };

        var _addItem = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.addItemDao()));
        };

        var _updateItem = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.updateItemDao()));
        };

        var _getSubItem = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.getSubItemDao()));
        };

        var _removeItem = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.removeItemDao()));
        };

        var _registerShop = function(){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.registerShopDao()));
        };

        var _getShopList = function(){
            return Data_Comm.postPromise(adminServiceCalls.getShopListDao());
        };

        var _shopData = function(){
            return adminServiceCalls.shopDataDao();
        };

        var _fullUserData = function(){
            return adminServiceCalls.fullUserDataDao();
        };

        var _isAuthenticated = function(){
            return adminServiceCalls.isAuthenticatedDao();
        };


        return{
            getItemList:_getItemList,
            addItem:_addItem,
            updateItem:_updateItem,
            getSubItem:_getSubItem,
            removeItem:_removeItem,
            shopData:_shopData,
            getShopList:_getShopList,
            registerShop:_registerShop,
            isAuthenticated: _isAuthenticated,
            fullUserData:_fullUserData
        }
    }]);
})(com.TRENDI.CATEGORY.modules.adminModule);
