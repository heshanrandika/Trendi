/**
 * Created by heshan on 8/7/2016.
 */
(function (mod) {
	"use strict";

	mod.controller('productModel',['$scope', '$modalInstance','item','adminDataService',function ($scope, uiModalInstance, selectedItem, adminDataService) {
		$scope.item = selectedItem.item;
		$scope.uploadedImages = [];
		$scope.imageSize = {value:1000000, text:'1MB'};
		$scope.imageCount = 5;
		$scope.availableSizes = [];
		$scope.availableTypes = [];

		$scope.uploadedImages.push({image:$scope.item.image,default:true});
		adminDataService.getSubItem({itemId : selectedItem.itemId, seenEnable:false}).then(function(response){
			var subItemList = response.data.responData.data.itemList;
			if(subItemList.length > 0){
				_.each(subItemList,function(k){
					$scope.uploadedImages.push({image: k.image,default:false});
				});
			}
		});


		adminDataService.getSizes({}).then(function(response){
			$scope.availableSizes = response.data.responData.data[0].sizes;
		});

		adminDataService.getTagList({}).then(function(response){
			$scope.availableTypes = response.data.responData.data;
		});




		$scope.availableColors = ['Red','Green','Blue','Yellow','Magenta','Maroon','Umbra','Turquoise'];
		$scope.multipleDemo = {};
		$scope.multipleDemo.colors = [];

		$scope.disable = function() {
			$scope.disabled = true;
		};

		$scope.ok = function () {
			console.log($scope.item.sizes);
			uiModalInstance.close($scope.selected.item);
		};

		$scope.cancel = function () {
			uiModalInstance.dismiss('cancel');
		};
	}]);



})(com.TRENDI.ADMIN.modules.mainAdminModule);