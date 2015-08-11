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

        var _updateItem = function(){
            return Data_Comm.postPromise(angular.extend({},adminServiceCalls.updateItemDao()));
        };

        var _getItem = function(){
            return Data_Comm.postPromise(angular.extend({},adminServiceCalls.getItemDao()));
        };

        var _removeItem = function(){
            return Data_Comm.postPromise(angular.extend({},adminServiceCalls.removeItemDao()));
        };


        return{
            getItemList:_getItemList,
            addItem:_addItem,
            updateItem:_updateItem,
            getItem:_getItem,
            removeItem:_removeItem
        }
    }]);
})(com.TRENDI.CATEGORY.modules.adminModule);
