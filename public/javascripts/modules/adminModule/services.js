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

        var _registerShop = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.registerShopDao()));
        };

        var _adminUpdateShop = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.adminUpdateShopDao()));
        };

        var _getUserList = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.getUserListDao()));
        };

        var _getBranchList = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.getBranchListDao()));
        };

        var _getBannerImage = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.getBannerImageDao()));
        };

        var _addBranch = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.addBranchDao()));
        };

        var _updateBranch = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.updateBranchDao()));
        };

        var _removeBranch = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.removeBranchDao()));
        };

        var _getAdminUserList = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.getAdminUserListDao()));
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

        var _getEntitlements = function(){
            return Data_Comm.postPromise(adminServiceCalls.getEntitlementsDao());
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
            adminUpdateShop:_adminUpdateShop,
            getUserList:_getUserList,
            getBranchList:_getBranchList,
            isAuthenticated: _isAuthenticated,
            fullUserData:_fullUserData,
            getEntitlements:_getEntitlements,
            getBannerImage:_getBannerImage,
            addBranch:_addBranch,
            updateBranch:_updateBranch,
            removeBranch:_removeBranch,
            getAdminUserList:_getAdminUserList
        }
    }]);
})(com.TRENDI.CATEGORY.modules.adminModule);
