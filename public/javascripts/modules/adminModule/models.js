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
        $scope.removedItems = [];
		$scope.imageSize = {value:1000000, text:'1MB'};
		$scope.imageCount = 5;
		$scope.availableSizes = [];
		$scope.availableTypes = [];
        $scope.brands = [];
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

        adminDataService.getBrandList({}).then(function(response){
            $scope.brands = response.data.responData.data.list;
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

                    if($scope.item.brand)
                        delete $scope.item.brand.$$hashKey;
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
			var itemDetail = {mainItem: $scope.item, subItem: $scope.subItem, itemId:$scope.itemId, removed:$scope.removedItems};
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
		$scope.removedItems = [];
		$scope.profilePicSize = {value:100000, text:'100kB'};
		$scope.profilePicCount = 1;
		$scope.loadEntitlements = false;
		$scope.loadAllEntitlements = false;
		$scope.tmp = {};
		$scope.tmp.oldEntitlements = [];

		var shopDetails = adminDataService.shopData();


		$scope.titles =[
			{value:0 , key:'User'},
			{value:1 , key:'Admin'}
		];
		
		

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


        $scope.tmp.selectedTitle = $scope.titles[0];

        adminDataService.getUserList({shopId :  shopDetails.shopId, email : shopDetails.email}).then(function(response){
            $scope.tmp.allEntitlements = response.data.responData.data.list[0].entitlements;
            $scope.loadAllEntitlements = true;
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
        }else{
        	$scope.loadEntitlements = true;
        }





		var setData = function(){
			if(($scope.regUser.name == '' || $scope.regUser.name == undefined) &&
                    ($scope.regUser.password == '' || $scope.regUser.password == undefined) &&
                    ($scope.regUser.email == '' || $scope.regUser.email == undefined)){
                    Data_Toast.warning(MESSAGE_CONFIG.ERROR_REQUIRED_FIELDS);
                    $scope.btnPressed = false;
                }else {
                    $scope.regUser.shopId = shopDetails.shopId;
                    $scope.regUser.title = $scope.tmp.selectedTitle;
                    $scope.regUser.branch = $scope.tmp.selectedBranch;
                    $scope.regUser.profilePic = $scope.uploadedImages[0]?$scope.uploadedImages[0].image:'';
                    $scope.regUser.entitlements =[];
                    _.each($scope.tmp.entitlements,function(group){
                        var valueArray =  _.chain(group.entitlements)
                            .filter(function(obj) {
                                return obj.select;
                            })
                            .map(function(obj) {
                                return _.omit(obj,['select', '$$hashKey']);
                            })
                            .value();
                        $scope.regUser.entitlements = $scope.regUser.entitlements.concat(valueArray);
                    });

                }
		};

		$scope.save = function(){
			$scope.btnPressed = true;
			setData();
			var userDetails = {regUser:$scope.regUser};
            adminDataService.addShopUser(userDetails).then(function (response) {
                Data_Toast.success(MESSAGE_CONFIG.SUCCESS_SAVED_SUCCESSFULLY);
                uiModalInstance.close();
            },function (error) {
                Data_Toast.error(MESSAGE_CONFIG.ERROR_SAVE_FAIL,error.data.responData.Error);
                $scope.btnPressed = false;
            });
		};

		$scope.update = function(){
			$scope.btnPressed = true;
			setData();
			var userDetails = {regUser:$scope.regUser, profileUpdate:false, removed:$scope.removedItems};
            adminDataService.updateShopUser(userDetails).then(function (response) {
                Data_Toast.success(MESSAGE_CONFIG.SUCCESS_UPDATE_SUCCESSFULLY);
                uiModalInstance.close($scope.regUser);
            },function (error) {
                Data_Toast.error(MESSAGE_CONFIG.ERROR_UPDATE_FAIL,error.data.responData.Error);
                $scope.btnPressed = false;
            });
		};


		$scope.cancel = function () {
			uiModalInstance.dismiss('cancel');
		};
	}]);

	mod.controller('branchModel',['$scope', '$modalInstance','item','adminDataService','Data.Toast','MESSAGE_CONFIG','$timeout', function ($scope, uiModalInstance, selectedItem, adminDataService, Data_Toast, MESSAGE_CONFIG, $timeout) {
		$scope.branch = selectedItem? selectedItem.shop : {};
		$scope.branchId = selectedItem? selectedItem.branchId : undefined;
		$scope.addNewBranch = selectedItem? false:true;
        $scope.tmp = {};
        $scope.tmp.iconImage = []; 
        $scope.removedItems = [];
        $scope.userList = [];

		$scope.initMap = false;
		$scope.iconSize = {value:10000, text:'10kB'};
		$scope.iconCount = 1;

		var shopDetails = adminDataService.shopData();

        if(!selectedItem){
            $scope.branch.pos = [];
            $scope.branch.iconImage = '';
        }else{
           if(!($scope.branch.iconImage == '' || $scope.branch.iconImage == undefined)){
                $scope.tmp.iconImage.push({image:$scope.branch.iconImage});
            }

            adminDataService.getUserList({shopId :  shopDetails.shopId, branchId:$scope.branchId}).then(function(response){
                $scope.userList = response.data.responData.data.list;
            });
        }

		$timeout(function () {
			$scope.initMap = true;
		}, 100);

		var setData = function(){
			 if(($scope.branch.name == '' || $scope.branch.name == undefined) ){
                    Data_Toast.warning(MESSAGE_CONFIG.ERROR_REQUIRED_FIELDS);
                    $scope.btnPressed = false;
                }else {
                    $scope.branch.iconImage = $scope.tmp.iconImage[0]?$scope.tmp.iconImage[0].image:'';
                }    
		};

		$scope.save = function(){
			$scope.btnPressed = true;
			setData();
			var branchDetails = {shopId:shopDetails.shopId, shop: $scope.branch};
            adminDataService.addBranch(branchDetails).then(function (response) {
                Data_Toast.success(MESSAGE_CONFIG.SUCCESS_SAVED_SUCCESSFULLY);
                uiModalInstance.close();
            },function (error) {
                Data_Toast.error(MESSAGE_CONFIG.ERROR_SAVE_FAIL,error.data.responData.Error);
                $scope.btnPressed = false;
            });
		};

		$scope.update = function(){
			$scope.btnPressed = true;
			setData();
			var  branchDetails = {shopId:shopDetails.shopId, branchId:$scope.branchId, shop: $scope.branch, removed:$scope.removedItems};
            adminDataService.updateBranch(branchDetails).then(function (response) {
                Data_Toast.success(MESSAGE_CONFIG.SUCCESS_UPDATE_SUCCESSFULLY);
                uiModalInstance.close();
            },function (error) {
                Data_Toast.error(MESSAGE_CONFIG.ERROR_UPDATE_FAIL,error.data.responData.Error);
                $scope.btnPressed = false;
            });
		};


		$scope.cancel = function () {
			uiModalInstance.dismiss('cancel');
		};
	}]);

    mod.controller('promotionModel',['$scope', '$modalInstance','item','adminDataService','Data.Toast','MESSAGE_CONFIG', function ($scope, uiModalInstance, selectedItem, adminDataService, Data_Toast, MESSAGE_CONFIG) {
        $scope.promotion = selectedItem? selectedItem : {};
        $scope.promotionId = selectedItem? selectedItem.promotionId: undefined;
        $scope.addNewPromotion = selectedItem? false:true;
        $scope.uploadedImages = [];
        $scope.removedItems = [];
        $scope.promotionPicSize = {value:500000, text:'500kB'};
        $scope.promotionPicCount = 1;


       
        $scope.availableTypes = [];
        
        var shopDetails = adminDataService.shopData();

        adminDataService.getTagList({}).then(function(response){
            $scope.availableTypes = response.data.responData.data;
        });


        if(selectedItem){
            $scope.uploadedImages.push({image:$scope.promotion.promotionPic});
            $scope.promotion.expDate = new Date($scope.promotion.expDate);
        }

        var setData = function(){
            if(($scope.uploadedImages.length <= 0)){
                Data_Toast.warning(MESSAGE_CONFIG.ERROR_REQUIRED_IMAGE);
                $scope.btnPressed = false;
            }else {
                $scope.promotion.promotionPic = $scope.uploadedImages[0]?$scope.uploadedImages[0].image:'';
                $scope.promotion.rate = {rate:0, star:0, hit:0};

                _.each($scope.promotion.tags, function (k) {
                    delete k.$$hashKey
                });
            }

        };

        $scope.save = function(){
            $scope.btnPressed = true;
            setData();
            $scope.promotion.shopId = shopDetails.shopId;
            $scope.promotion.branchId = shopDetails.branch.branchId;
            var promotionDetails = {promotion:$scope.promotion};
            adminDataService.addPromotion(promotionDetails).then(function (response) {
                Data_Toast.success(MESSAGE_CONFIG.SUCCESS_SAVED_SUCCESSFULLY);
                uiModalInstance.close();
                $scope.btnPressed = false;
                $scope.initWindow = false;
            },function (error) {
                Data_Toast.error(MESSAGE_CONFIG.ERROR_SAVE_FAIL,error.data.responData.Error);
                $scope.btnPressed = false;
            });
        };

        $scope.update = function(){
            $scope.btnPressed = true;
            setData();
            var promotionDetails = {promotion:$scope.promotion, removed:$scope.removedItems};
            adminDataService.updatePromotion(promotionDetails).then(function (response) {
                Data_Toast.success(MESSAGE_CONFIG.SUCCESS_UPDATE_SUCCESSFULLY);
                uiModalInstance.close();
                $scope.btnPressed = false;
            },function (error) {
                Data_Toast.error(MESSAGE_CONFIG.ERROR_UPDATE_FAIL,error.data.responData.Error);
                $scope.btnPressed = false;
            });
        };


        $scope.cancel = function () {
            uiModalInstance.dismiss('cancel');
        };
    }]);

    mod.controller('blogModel',['$scope', '$modalInstance','item','adminDataService','Data.Toast','MESSAGE_CONFIG', function ($scope, uiModalInstance, selectedItem, adminDataService, Data_Toast, MESSAGE_CONFIG) {
        $scope.blog = selectedItem? selectedItem : {};
        $scope.blogId = selectedItem? selectedItem.blogId: undefined;
        $scope.addNewBlog = selectedItem? false:true;
        $scope.uploadedImages = [];
        $scope.removedItems = [];
        $scope.blogImageSize = {value:500000, text:'500kB'};
        $scope.blogImageCount = 1;


        var shopDetails = adminDataService.shopData();


        if(selectedItem){
            $scope.uploadedImages.push({image:$scope.blog.img});
            $scope.blog.date = new Date($scope.blog.date);
        }else{
            $scope.blog.date = new Date();
        }

        var setData = function(){
            if(($scope.uploadedImages.length <= 0)){
                Data_Toast.warning(MESSAGE_CONFIG.ERROR_REQUIRED_IMAGE);
                $scope.btnPressed = false;
            }else {
                $scope.blog.img = $scope.uploadedImages[0]?$scope.uploadedImages[0].image:'';
                $scope.blog.shop = shopDetails.branch.shop;
                $scope.blog.rate = {rate:0, star:0, hit:0};
            }

        };

        $scope.save = function(){
            $scope.btnPressed = true;
            setData();
            var blogDetails = {blog:$scope.blog};
            adminDataService.insertBlog(blogDetails).then(function (response) {
                Data_Toast.success(MESSAGE_CONFIG.SUCCESS_SAVED_SUCCESSFULLY);
                uiModalInstance.close();
                $scope.btnPressed = false;
            },function (error) {
                Data_Toast.error(MESSAGE_CONFIG.ERROR_SAVE_FAIL,error.data.responData.Error);
                $scope.btnPressed = false;
            });
        };

        $scope.update = function(){
            $scope.btnPressed = true;
            setData();
            var blogDetails = {blog:$scope.blog, removed:$scope.removedItems};
            adminDataService.updateBlog(blogDetails).then(function (response) {
                Data_Toast.success(MESSAGE_CONFIG.SUCCESS_UPDATE_SUCCESSFULLY);
                uiModalInstance.close();
                $scope.btnPressed = false;
            },function (error) {
                Data_Toast.error(MESSAGE_CONFIG.ERROR_SAVE_FAIL,error.data.responData.Error);
                $scope.btnPressed = false;
            });
        };


        $scope.cancel = function () {
            $scope.initWindow = false;
            uiModalInstance.dismiss('cancel');
        };
    }]);

    mod.controller('bannerModel',['$scope', '$modalInstance','item','adminDataService','Data.Toast','MESSAGE_CONFIG', function ($scope, uiModalInstance, selectedItem, adminDataService, Data_Toast, MESSAGE_CONFIG) {
        $scope.bannerObject = selectedItem? selectedItem : {};
        $scope.banner = $scope.bannerObject.banner;

        $scope.uploadedImages = [];
        $scope.removedItems = [];
        $scope.bannerImageSize = {value:1000000, text:'1Mb'};
        $scope.bannerImageCount = 3;


        if(selectedItem){
            _.each($scope.banner,function(k){
                $scope.uploadedImages.push({image: k.image});
            });
        }


        var setData = function(){
            if(($scope.uploadedImages.length <= 0)){
                Data_Toast.warning(MESSAGE_CONFIG.ERROR_REQUIRED_IMAGE);
                $scope.btnPressed = false;
            }else {
                for(var index in $scope.uploadedImages){
                    $scope.banner[index].image = $scope.uploadedImages[index].image;
                }
            }

        };

        $scope.save = function(){
            $scope.btnPressed = true;
            setData();
            $scope.bannerObject.banner = $scope.banner;
            adminDataService.setBanner($scope.bannerObject).then(function (response) {
                Data_Toast.success(MESSAGE_CONFIG.SUCCESS_SAVED_SUCCESSFULLY);
                uiModalInstance.close();
                $scope.btnPressed = false;
            },function (error) {
                Data_Toast.error(MESSAGE_CONFIG.ERROR_SAVE_FAIL,error.data.responData.Error);
                $scope.btnPressed = false;
            });
        };



        $scope.cancel = function () {
            $scope.initWindow = false;
            uiModalInstance.dismiss('cancel');
        };
    }]);

    mod.controller('albumModel',['$scope', '$modalInstance','item','adminDataService','Data.Toast','MESSAGE_CONFIG', function ($scope, uiModalInstance, selectedItem, adminDataService, Data_Toast, MESSAGE_CONFIG) {
        $scope.album = selectedItem? selectedItem : {};
        $scope.tempList=[];
        $scope.viewList=[];
        $scope.itemList = [];
        $scope.removedList = [];
        $scope.count = 0;
        var shopDetails = {};
        var itemPerPage = 8;

        if(selectedItem){
            $scope.addNewAlbum = false;
            $scope.tempList = angular.copy($scope.album.itemList);
            adminDataService.getAlbumItemList({album:$scope.album}).then(function(response){
                $scope.viewList.push.apply($scope.viewList, response.data.responData.data);
            },function(){
                $scope.viewList = [];
            });
        }else{
            $scope.addNewAlbum = true;
            $scope.album.itemList=[];
        }

        shopDetails = adminDataService.shopData();
        $scope.searchObj = {
            skip: $scope.itemList.length,
            limit:itemPerPage,
            searchArray:[{key:'albumId', value:null},{key:'approved', value:true}],
            shopId : shopDetails.branch.shopId,
            branchId : shopDetails.branch.branchId
        };

        $scope.search={};

        $scope.searchPress = function(event, search){
            if(event.keyCode == 13 || search){
                var array = [];
                for(var i in $scope.search) {
                    if(i == "approved"){
                        if($scope.search[i] == "undefined"){
                            array.push({key:i, value:{$exists: false}})
                        }else if($scope.search[i] == "true"){
                            array.push({key:i, value:true})
                        }else if($scope.search[i] == "false"){
                            array.push({key:i, value:false})
                        }

                    }else if($scope.search[i] != ""){
                        if(!isNaN(parseFloat($scope.search[i])) && isFinite($scope.search[i])){
                            array.push({key:i, value:parseInt($scope.search[i])})
                        }else{
                            array.push({key:i, value:{'$regex': $scope.search[i]}})
                        }
                    }


                }
                $scope.searchObj.searchArray = array;
                $scope.loadData(1);
            }
        };

        $scope.refresh = function(){
            $scope.searchObj.searchKey = '';
            $scope.searchObj.searchValue = '';
            $scope.searchObj.searchArray=[{key:'albumId', value:null},{key:'approved', value:true}],
            $scope.search = {};
            $scope.searchPress({},true);
        }

        $scope.loadData = function(init){
            if(init){
                $scope.itemList = [];
                $scope.searchObj.skip =0;
            }
            $scope.loading = true;
            adminDataService.adminGetItemList($scope.searchObj).then(function(response){
                $scope.itemList.push.apply($scope.itemList, response.data.responData.data.list);
                if(response.data.responData.data.count){
                    $scope.count = response.data.responData.data.count;
                }
                $scope.loading = false;
            },function(){
                $scope.itemList = [];
            });


        };

        // Register event handler
        $scope.paginationFuntion = function() {
            $scope.searchObj.skip = $scope.itemList.length;
            if ($scope.count > $scope.itemList.length && !$scope.loading) {
                $scope.loadData();
            }
        };

        $scope.loadData(1);


        $scope.addItem = function(item){
            if($scope.album.itemList.length<5){
                $scope.album.itemList.push(item._id);
                $scope.viewList.push(item);
                $scope.itemList = _.without($scope.itemList, _.findWhere($scope.itemList, {_id: item._id}));
            }
        };

        $scope.removeItem = function(item){
            $scope.viewList = _.without($scope.viewList, _.findWhere($scope.viewList, {_id:item._id}));
            $scope.album.itemList = _.without($scope.album.itemList,item._id);
            $scope.itemList.push(item);
        };


        $scope.setData = function(item){
            _.each($scope.tempList, function(k){
               if(_.indexOf($scope.album.itemList, k) == -1){
                   $scope.removedList.push(k);
               }
            })

        };


        $scope.save = function(){
            $scope.btnPressed = true;
            $scope.album.shop = shopDetails.branch.shop;
            adminDataService.addAlbum({album:$scope.album}).then(function (response) {
                uiModalInstance.close();
                $scope.btnPressed = false;
            },function (error) {
                Data_Toast.error(MESSAGE_CONFIG.ERROR_SAVE_FAIL,error.data.responData.Error);
                $scope.btnPressed = false;
            });
        };

        $scope.update = function(){
            $scope.btnPressed = true;
            $scope.setData();
            var updateObj = {album:$scope.album,removed:$scope.removedList};
            adminDataService.adminUpdateAlbum(updateObj).then(function (response) {
                uiModalInstance.close($scope.album);
                $scope.btnPressed = false;
            },function (error) {
                Data_Toast.error(MESSAGE_CONFIG.ERROR_SAVE_FAIL,error.data.responData.Error);
                $scope.btnPressed = false;
            });
        };



        $scope.cancel = function () {
            $scope.initWindow = false;
            uiModalInstance.dismiss('cancel');
        };
    }]);

})(com.TRENDI.ADMIN.modules.mainAdminModule);