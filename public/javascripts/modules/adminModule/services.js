/**
 * Created by Heshanr on 7/20/2015.
 */
(function(mod){

    mod.service('adminDataService',['$window','Data.Comm','adminServiceCalls',function($window, Data_Comm, adminServiceCalls){
        var _adminGetItemList = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.adminGetItemListDao()));
        };

        var _addItem = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.addItemDao()));
        };

        var _updateItem = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.updateItemDao()));
        };

        var _adminUpdateItem = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.adminUpdateItemDao()));
        };

        var _getSubItem = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.getSubItemDao()));
        };

        var _removeItem = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.removeItemDao()));
        };

        var _getSizes = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.getSizesDao()));
        };

        var _changeSizes = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.changeSizesDao()));
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

        var _getBranchListToAssign = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.getBranchListToAssignDao()));
        };

        var _getBanner = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.getBannerDao()));
        };

        var _setBanner = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.setBannerDao()));
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

        var _addShopUser = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.addShopUserDao()));
        };

        var _updateShopUser = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.updateShopUserDao()));
        };

        var _removeShopUser = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.removeShopUserDao()));
        };

        var _getAdminPromotionList = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.getAdminPromotionListDao()));
        };

        var _addPromotion = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.addPromotionDao()));
        };
        var _updatePromotion = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.updatePromotionDao()));
        };

        var _removePromotion = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.removePromotionDao()));
        };

        var _adminGetUser = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.adminGetUserDao()));
        };

        var _adminUpdateUser = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.adminUpdateUserDao()));
        };

        var _adminResetPwd = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.adminResetPwdDao()));
        };

        var _adminGetBlogList = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.adminGetBlogListDao()));
        };

        var _insertBlog = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.insertBlogDao()));
        };

        var _updateBlog = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.updateBlogDao()));
        };

        var _removeBlog = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.removeBlogDao()));
        };

        var _adminGetTagList = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.adminGetTagListDao()));
        };

        var _getTagList = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.getTagListDao()));
        };

        var _addTag = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.addTagDao()));
        };

        var _removeTag = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.removeTagDao()));
        };


        var _getBrandList = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.getBrandListDao()));
        };

        var _addBrand = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.addBrandDao()));
        };

        var _removeBrand = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.removeBrandDao()));
        };

        var _getBankList = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.getBankListDao()));
        };

        var _addBank = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.addBankDao()));
        };

        var _removeBank = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.removeBankDao()));
        };

        var _getMessageList = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.getMessageListDao()));
        };

        var _sendMessage = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.sendMessageDao()));
        };

        var _replyMessage = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.replyMessageDao()));
        };

        var _updateMessage = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.updateMessageDao()));
        };

        var _getUnreadMessageList = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.getUnreadMessageListDao()));
        };

        var _getMessageCount = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.getMessageCountDao()));
        };

        var _getShopList = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.getShopListDao()));
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

        var _getEntitlements = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},adminServiceCalls.getEntitlementsDao()));
        };

        var _logOutService = function(){
            return adminServiceCalls.logOutDataDao();
        };


        return{
            adminGetItemList:_adminGetItemList,
            addItem:_addItem,
            updateItem:_updateItem,
            adminUpdateItem:_adminUpdateItem,
            getSubItem:_getSubItem,
            removeItem:_removeItem,
            shopData:_shopData,
            getShopList:_getShopList,
            registerShop:_registerShop,
            adminUpdateShop:_adminUpdateShop,
            getUserList:_getUserList,
            getBranchList:_getBranchList,
            getBranchListToAssign:_getBranchListToAssign,
            isAuthenticated: _isAuthenticated,
            fullUserData:_fullUserData,
            getEntitlements:_getEntitlements,
            getBanner:_getBanner,
            setBanner:_setBanner,
            addBranch:_addBranch,
            updateBranch:_updateBranch,
            removeBranch:_removeBranch,
            getAdminUserList:_getAdminUserList,
            addShopUser:_addShopUser,
            updateShopUser:_updateShopUser,
            removeShopUser:_removeShopUser,
            getAdminPromotionList:_getAdminPromotionList,
            addPromotion:_addPromotion,
            updatePromotion:_updatePromotion,
            removePromotion:_removePromotion,
            adminGetUser:_adminGetUser,
            adminUpdateUser:_adminUpdateUser,
            adminResetPwd:_adminResetPwd,
            adminGetBlogList:_adminGetBlogList,
            insertBlog:_insertBlog,
            updateBlog:_updateBlog,
            removeBlog:_removeBlog,
            adminGetTagList:_adminGetTagList,
            getTagList:_getTagList,
            addTag:_addTag,
            removeTag:_removeTag,
            getBrandList:_getBrandList,
            addBrand:_addBrand,
            removeBrand:_removeBrand,
            getBankList:_getBankList,
            addBank:_addBank,
            removeBank:_removeBank,
            getMessageList:_getMessageList,
            sendMessage:_sendMessage,
            replyMessage:_replyMessage,
            updateMessage:_updateMessage,
            getUnreadMessageList:_getUnreadMessageList,
            getMessageCount:_getMessageCount,
            getSizes:_getSizes,
            changeSizes:_changeSizes,
            logOutService:_logOutService
        }
    }]);



    mod.service('Confirmation', ['$modal',function (uiModal) {
        var _openConfirmation = function(header, message){
           return  uiModal.open({
                animation: true,
                templateUrl: '/views/adminModule/models/admin.confirm.model.html',
                controller: function($scope, $modalInstance){
                    $scope.header = header;
                    $scope.message = message;
                    $scope.ok = function (result) {
                        $modalInstance.close(1);
                    };
                    $scope.close = function (result) {
                        $modalInstance.close(0);
                    };
                } ,
                size: 'sm'
            }).result;
        };
        
        return {
            openConfirmation:_openConfirmation
        }

    }]);
})(com.TRENDI.ADMIN.modules.mainAdminModule);
