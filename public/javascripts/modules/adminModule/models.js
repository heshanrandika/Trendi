/**
 * Created by heshan on 8/7/2016.
 */
(function (mod) {
	"use strict";

	mod.controller('productModel',['$scope', '$modalInstance','item','adminDataService','Data.Toast','MESSAGE_CONFIG', function ($scope, uiModalInstance, selectedItem, adminDataService, Data_Toast, MESSAGE_CONFIG) {
		$scope.item = selectedItem? selectedItem.item : {'group':{'men':false, 'women':false, 'kids':false}, 'types':[], 'sizes':[]};
		$scope.itemId = selectedItem? selectedItem.itemId: undefined;
		$scope.addNewItem = selectedItem? false:true;
		$scope.uploadedImages = [];
		$scope.imageSize = {value:1000000, text:'1MB'};
		$scope.imageCount = 5;
		$scope.availableSizes = [];
		$scope.availableTypes = [];
		$scope.subItem = [];
		var shopDetails = adminDataService.shopData();

		if(selectedItem){
			$scope.uploadedImages.push({image:$scope.item.image,default:true});
			adminDataService.getSubItem({itemId : selectedItem.itemId, seenEnable:false}).then(function(response){
			var subItemList = response.data.responData.data.itemList;
			if(subItemList.length > 0){
				_.each(subItemList,function(k){
					$scope.uploadedImages.push({image: k.image,default:false});
				});
			}
			});
		}



		adminDataService.getSizes({}).then(function(response){
			$scope.availableSizes = response.data.responData.data[0].sizes;
		});

		adminDataService.getTagList({}).then(function(response){
			$scope.availableTypes = response.data.responData.data;
		});


		var setData = function(){
			 if(($scope.item.name == '' || $scope.item.name == undefined) ||
                    ($scope.item.price == '' || $scope.item.price == undefined) ||
                    ($scope.item.description == '' || $scope.item.description == undefined) ||
                    $scope.uploadedImages.length == 0){
                    Data_Toast.warning(MESSAGE_CONFIG.ERROR_REQUIRED_FIELDS);
                    $scope.btnPressed = false;
                }else {
                    _.each($scope.uploadedImages, function (k) {
                        if (k.default) {
                            $scope.item.image = k.image;
                        } else {
                            $scope.subItem.push({image: k.image});
                        }
                    });
                    $scope.item.shop = shopDetails.branch;
                    $scope.item.colors = [];
                    $scope.item.rate = {rate:0, star:0, hit:0};

                    _.each($scope.item.types, function (k) {
                        delete k.$$hashKey
                    });

                    _.each($scope.item.sizes, function (k) {
                        delete k.$$hashKey
                    });
                }

		}

		$scope.save = function(){
			$scope.btnPressed = true;
			setData();
			var itemDetail = {mainItem: $scope.item, subItem: $scope.subItem};
            adminDataService.addItem(itemDetail).then(function (response) {
                Data_Toast.success(MESSAGE_CONFIG.SUCCESS_SAVED_SUCCESSFULLY);
                uiModalInstance.close({'option' :1, 'item' :$scope.item});
            },function(error){
                Data_Toast.error(MESSAGE_CONFIG.ERROR_SAVE_FAIL,error.data.responData.Error);
                $scope.btnPressed = false;
            });
		}

		$scope.update = function(){
			$scope.btnPressed = true;
			setData();
			var itemDetail = {mainItem: $scope.item, subItem: $scope.subItem, itemId:$scope.itemId};
            adminDataService.updateItem(itemDetail).then(function (response) {
                Data_Toast.success(MESSAGE_CONFIG.SUCCESS_UPDATE_SUCCESSFULLY);
                uiModalInstance.close({'option' :2, 'item' :$scope.item});
            },function(error){
                Data_Toast.error(MESSAGE_CONFIG.ERROR_UPDATE_FAIL,error.data.responData.Error);
                $scope.btnPressed = false;
            });
		}

		$scope.remove = function(){
			$scope.btnPressed = true;
            var itemDetail={itemId:$scope.itemId};
            adminDataService.removeItem(itemDetail).then(function(response){
                Data_Toast.success(MESSAGE_CONFIG.SUCCESS_REMOVED_SUCCESSFULLY);
                uiModalInstance.close({'option' :3, 'item' :$scope.item});
            },function(error){
                Data_Toast.error(MESSAGE_CONFIG.ERROR_REMOVE_FAIL,error.data.responData.Error);
                $scope.btnPressed = false;
            });
		}

		$scope.cancel = function () {
			uiModalInstance.dismiss('cancel');
		};
	}]);



})(com.TRENDI.ADMIN.modules.mainAdminModule);