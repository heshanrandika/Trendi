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

		};

		$scope.save = function(){
			$scope.btnPressed = true;
			setData();
			var itemDetail = {mainItem: $scope.item, subItem: $scope.subItem};
            adminDataService.addItem(itemDetail).then(function (response) {
                Data_Toast.success(MESSAGE_CONFIG.SUCCESS_SAVED_SUCCESSFULLY);
                uiModalInstance.close();
            },function(error){
                Data_Toast.error(MESSAGE_CONFIG.ERROR_SAVE_FAIL,error.data.responData.Error);
                $scope.btnPressed = false;
            });
		};

		$scope.update = function(){
			$scope.btnPressed = true;
			setData();
			var itemDetail = {mainItem: $scope.item, subItem: $scope.subItem, itemId:$scope.itemId};
            adminDataService.updateItem(itemDetail).then(function (response) {
                Data_Toast.success(MESSAGE_CONFIG.SUCCESS_UPDATE_SUCCESSFULLY);
                uiModalInstance.close($scope.item);
            },function(error){
                Data_Toast.error(MESSAGE_CONFIG.ERROR_UPDATE_FAIL,error.data.responData.Error);
                $scope.btnPressed = false;
            });
		};


		$scope.cancel = function () {
			uiModalInstance.dismiss('cancel');
		};
	}]);

	mod.controller('userModel',['$scope', '$modalInstance','item','adminDataService','Data.Toast','MESSAGE_CONFIG', function ($scope, uiModalInstance, selectedItem, adminDataService, Data_Toast, MESSAGE_CONFIG) {
		$scope.regUser = selectedItem? selectedItem : {};
		$scope.addNewuser = selectedItem? false:true;
		$scope.uploadedImages = [];
		$scope.profilePicSize = {value:100000, text:'100kB'};
		$scope.profilePicCount = 1;
		$scope.loadEntitlements = false;

		var shopDetails = adminDataService.shopData();


		$scope.titles =[
			{value:0 , key:'User'},
			{value:1 , key:'Admin'}
		];
		$scope.tmp = {};
		

		var getIndex = function(itemList, item,searchKey, callback){
            var index = 0;
            if(!(item == undefined)){
                _.each(itemList, function(k){
                    if(k[searchKey] == item[searchKey]){
                        callback(index);
                    }
                    index++;
                });
            }else{
                callback(0);
            }

        };



        adminDataService.getUserList({shopId :  shopDetails.shopId, email : shopDetails.email}).then(function(response){
            $scope.tmp.allEntitlements = response.data.responData.data.list[0].entitlements;
        });

        adminDataService.getBranchListToAssign({shopId:shopDetails.shopId}).then(function(response){
            $scope.branchList = response.data.responData.data;
            $scope.tmp.selectedBranch = $scope.branchList[0];
        },function(){
            $scope.branchList = [];
        });

		//Modal is open for edit exist user
        if(selectedItem){
        	$scope.uploadedImages.push({image:$scope.regUser.profilePic});

        	getIndex($scope.branchList,$scope.regUser.branch,'branchId', function(value){
                $scope.tmp.selectedBranch = $scope.branchList[value];
            });

            adminDataService.getUserList({shopId :  $scope.shopId, email : $scope.regUser.email}).then(function(response){
                $scope.tmp.oldEntitlements = response.data.responData.data.list[0].entitlements;
                $scope.loadEntitlements = true;
            });

            getIndex($scope.titles,$scope.regUser.title,'value', function(value){
                    $scope.tmp.selectedTitle = $scope.titles[value];
            });
        }





		var setData = function(){

		};

		$scope.save = function(){
			$scope.btnPressed = true;
			setData();
			var itemDetail = {mainItem: $scope.item, subItem: $scope.subItem};
			adminDataService.addItem(itemDetail).then(function (response) {
				Data_Toast.success(MESSAGE_CONFIG.SUCCESS_SAVED_SUCCESSFULLY);
				uiModalInstance.close();
			},function(error){
				Data_Toast.error(MESSAGE_CONFIG.ERROR_SAVE_FAIL,error.data.responData.Error);
				$scope.btnPressed = false;
			});
		};

		$scope.update = function(){
			$scope.btnPressed = true;
			setData();
			var itemDetail = {mainItem: $scope.item, subItem: $scope.subItem, itemId:$scope.itemId};
			adminDataService.updateItem(itemDetail).then(function (response) {
				Data_Toast.success(MESSAGE_CONFIG.SUCCESS_UPDATE_SUCCESSFULLY);
				uiModalInstance.close($scope.item);
			},function(error){
				Data_Toast.error(MESSAGE_CONFIG.ERROR_UPDATE_FAIL,error.data.responData.Error);
				$scope.btnPressed = false;
			});
		};


		$scope.cancel = function () {
			uiModalInstance.dismiss('cancel');
		};
	}]);


})(com.TRENDI.ADMIN.modules.mainAdminModule);