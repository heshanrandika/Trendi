/**
 * Created by heshan on 9/20/2016.
 */
(function (mod) {
    "use strict";

    mod.controller('sysShopModel',['$scope', '$modalInstance','item','adminDataService','Data.Toast','MESSAGE_CONFIG','$timeout', function ($scope, uiModalInstance, selectedItem, adminDataService, Data_Toast, MESSAGE_CONFIG, $timeout) {
        $scope.shop = selectedItem? selectedItem : {itemCount:0, blogCount:0, promoCount:0};
        $scope.shopId = selectedItem? selectedItem.shopId : undefined;
        $scope.addNewShop = selectedItem? false:true;
        $scope.regUser = {};
        $scope.loadEntitlements = false;
        $scope.loadAllEntitlements = false;

        $scope.tmp = {};
        $scope.tmp.entitlements = [];
        $scope.tmp.oldEntitlements = [];
        $scope.tmp.allEntitlements = [];
        $scope.tmp.iconImage = [];
        $scope.tmp.profilePic = [];
        $scope.removedItems = [];


        $scope.iconSize = {value:10000, text:'10kB'};
        $scope.profilePicSize = {value:100000, text:'100kB'};
        $scope.iconCount = 1;
        $scope.profilePicCount = 1;

        $scope.userList = [];
        $scope.branchList = [];

        $scope.initMap = false;
        $scope.iconSize = {value:10000, text:'10kB'};
        $scope.iconCount = 1;



        adminDataService.getEntitlements({type:1}).then(function(response){
            $scope.tmp.allEntitlements = response.data.responData.data.entitlements;
            $scope.loadAllEntitlements = true;
        });

        if(!selectedItem){
            $scope.shop.pos = [];
            $scope.shop.iconImage = '';
            $scope.loadEntitlements = true;
            $scope.shop.rate = {rate: 0, star: 0, hit: 0};
        }else{
            if(!($scope.shop.iconImage == '' || $scope.shop.iconImage == undefined)){
                $scope.tmp.iconImage.push({image:$scope.shop.iconImage});
            }

            adminDataService.getUserList({shopId :  $scope.shop.shopId}).then(function(response){
                $scope.userList = response.data.responData.data.list;
            });

            adminDataService.getBranchList({shopId : $scope.shop.shopId}).then(function(response){
                $scope.branchList = response.data.responData.data.list;
            });


            adminDataService.getUserList({shopId :  $scope.shop.shopId, superAdmin : true}).then(function(response){
                var adminUser = response.data.responData.data.list[0];
                $scope.tmp.oldEntitlements = adminUser.entitlements;
                $scope.regUser = adminUser;
                if(!($scope.regUser.profilePic == '' || $scope.regUser.profilePic == undefined)){
                    $scope.tmp.profilePic.push({image:$scope.regUser.profilePic});
                }
                $scope.loadEntitlements = true;
            });
        }

        $timeout(function () {
            $scope.initMap = true;
        }, 100);

        var setData = function(){
            if(($scope.shop.name == '' || $scope.shop.name == undefined) ||
                ($scope.regUser.email == '' || $scope.regUser.email == undefined) ||
                ($scope.regUser.password == '' || $scope.regUser.password == undefined)
            ){
                Data_Toast.warning(MESSAGE_CONFIG.ERROR_REQUIRED_FIELDS);
                $scope.btnPressed = false;
            }else {

                $scope.shop.iconImage = $scope.tmp.iconImage[0] ? $scope.tmp.iconImage[0].image : '';
                $scope.regUser.profilePic = $scope.tmp.profilePic[0] ? $scope.tmp.profilePic[0].image : '';

                var shopDetails = {};

                $scope.regUser.entitlements = [];
                _.each($scope.tmp.entitlements, function (group) {
                    var valueArray = _.chain(group.entitlements)
                        .filter(function (obj) {
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
            var shopDetails = {shop: $scope.shop, regUser: $scope.regUser};
            adminDataService.registerShop(shopDetails).then(function (response) {
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
            var shopDetails = {shop: $scope.shop, regUser: $scope.regUser, removed:$scope.removedItems};
            adminDataService.adminUpdateShop(shopDetails).then(function (response) {
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

    mod.controller('sysProductModel',['$scope', '$modalInstance','item','adminDataService','Data.Toast','MESSAGE_CONFIG', function ($scope, uiModalInstance, selectedItem, adminDataService, Data_Toast, MESSAGE_CONFIG) {
        $scope.item = selectedItem? selectedItem.item : {'group':{'men':false, 'women':false, 'kids':false}, 'types':[], 'sizes':[]};
        $scope.approved = selectedItem? selectedItem.approved : undefined;
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
            var itemDetail = {mainItem: $scope.item, subItem: $scope.subItem, itemId:$scope.itemId, approved:$scope.approved, removed:$scope.removedItems};
            adminDataService.updateItem(itemDetail).then(function (response) {
                Data_Toast.success(MESSAGE_CONFIG.SUCCESS_UPDATE_SUCCESSFULLY);
                uiModalInstance.close($scope.item);
            },function(error){
                Data_Toast.error(MESSAGE_CONFIG.ERROR_UPDATE_FAIL,error.data.responData.Error);
                $scope.btnPressed = false;
            });
        };

        $scope.approveReject = function(result){
            $scope.btnPressed = true;
            setData();
            var itemDetail = {mainItem: $scope.item, subItem: $scope.subItem, itemId:$scope.itemId, approved:result, removed:$scope.removedItems};
            adminDataService.adminUpdateItem(itemDetail).then(function (response) {
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

    mod.controller('sysUserModel',['$scope', '$modalInstance','item','adminDataService','Data.Toast','MESSAGE_CONFIG', function ($scope, uiModalInstance, selectedItem, adminDataService, Data_Toast, MESSAGE_CONFIG) {
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

        var shopDetails={};


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

        adminDataService.getEntitlements({type:1}).then(function(response){
            $scope.tmp.allEntitlements = response.data.responData.data.entitlements;
            $scope.loadAllEntitlements = true;
        });



        //Modal is open for edit exist user
        if(selectedItem){
            shopDetails.shopId =  $scope.regUser.shopId;
            $scope.uploadedImages.push({image:$scope.regUser.profilePic});

            getIndex($scope.branchList,$scope.regUser.branch,'branchId', function(value){
                $scope.tmp.selectedBranch = $scope.branchList[value];
            });

            adminDataService.getUserList({shopId :  $scope.regUser.shopId, email : $scope.regUser.email}).then(function(response){
                $scope.tmp.oldEntitlements = response.data.responData.data.list[0].entitlements;
                $scope.loadEntitlements = true;
            });

            getIndex($scope.titles,$scope.regUser.title,'value', function(value){
                $scope.tmp.selectedTitle = $scope.titles[value];
            });
        }else{
            $scope.loadEntitlements = true;
        }


        adminDataService.getBranchListToAssign({shopId:shopDetails.shopId}).then(function(response){
            $scope.branchList = response.data.responData.data;
            $scope.tmp.selectedBranch = $scope.branchList[0];
        },function(){
            $scope.branchList = [];
        });


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

    mod.controller('sysBranchModel',['$scope', '$modalInstance','item','adminDataService','Data.Toast','MESSAGE_CONFIG','$timeout', function ($scope, uiModalInstance, selectedItem, adminDataService, Data_Toast, MESSAGE_CONFIG, $timeout) {
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

        var shopDetails ={};

        if(!selectedItem){
            $scope.branch.pos = [];
            $scope.branch.iconImage = '';
        }else{
            shopDetails.shopId =  selectedItem.shopId;
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

    mod.controller('sysPromotionModel',['$scope', '$modalInstance','item','adminDataService','Data.Toast','MESSAGE_CONFIG', function ($scope, uiModalInstance, selectedItem, adminDataService, Data_Toast, MESSAGE_CONFIG) {
        $scope.promotion = selectedItem? selectedItem : {};
        $scope.promotionId = selectedItem? selectedItem.promotionId: undefined;
        $scope.approved = selectedItem? selectedItem.approved : undefined;
        $scope.addNewPromotion = selectedItem? false:true;
        $scope.uploadedImages = [];
        $scope.removedItems = [];
        $scope.promotionPicSize = {value:500000, text:'500kB'};
        $scope.promotionPicCount = 1;



        $scope.availableTypes = [];
        $scope.bankList = [];

        var shopDetails = {};

        adminDataService.getTagList({}).then(function(response){
            $scope.availableTypes = response.data.responData.data;
        });

        adminDataService.getBankList({}).then(function(response){
            $scope.bankList = response.data.responData.data.list;
        });

        if(selectedItem){
            $scope.uploadedImages.push({image:$scope.promotion.promotionPic});
            $scope.promotion.expDate = new Date($scope.promotion.expDate); 
            shopDetails = adminDataService.shopData();
        }else{
            shopDetails.shopId =  selectedItem.shopId;
            shopDetails.branch = {};
            shopDetails.branchbranchId =  selectedItem.branchId;
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

                _.each($scope.promotion.banks, function (k) {
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

        $scope.approveReject = function(result){
            $scope.btnPressed = true;
            setData();
            var promoDetail = {promotionId: $scope.promotion.promotionId, objectId:$scope.promotion._id, approved:result, removed:$scope.removedItems};
            adminDataService.adminUpdatePromotion(promoDetail).then(function (response) {
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

    mod.controller('sysBlogModel',['$scope', '$modalInstance','item','adminDataService','Data.Toast','MESSAGE_CONFIG', function ($scope, uiModalInstance, selectedItem, adminDataService, Data_Toast, MESSAGE_CONFIG) {
        $scope.blog = selectedItem? selectedItem : {};
        $scope.blogId = selectedItem? selectedItem.blogId: undefined;
        $scope.approved = selectedItem? selectedItem.approved : undefined;
        $scope.addNewBlog = selectedItem? false:true;
        $scope.uploadedImages = [];
        $scope.removedItems = [];
        $scope.blogImageSize = {value:500000, text:'500kB'};
        $scope.blogImageCount = 1;


        var shopDetails = {};


        if(selectedItem){
            $scope.uploadedImages.push({image:$scope.blog.img});
            $scope.blog.date = new Date($scope.blog.date);
            shopDetails.branch = {};
            shopDetails.branch.shop = selectedItem.shop;

        }else{
            $scope.blog.date = new Date();
            shopDetails = adminDataService.shopData();
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

        $scope.approveReject = function(result){
            $scope.btnPressed = true;
            setData();
            var blogDetails = {blog:$scope.blog,  approved:result};
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

    mod.controller('sysBrandModel',['$scope', '$modalInstance','item','adminDataService','Data.Toast','MESSAGE_CONFIG', function ($scope, uiModalInstance, selectedItem, adminDataService, Data_Toast, MESSAGE_CONFIG) {
        $scope.brand = selectedItem? selectedItem : {models:[]};
        $scope.approved = selectedItem? selectedItem.approved : undefined;
        $scope.addNewBrand = selectedItem? false:true;
        $scope.uploadedImages = [];
        $scope.removedItems = [];
        $scope.brandImageSize = {value:500000, text:'500kB'};
        $scope.brandImageCount = 1;



        if(selectedItem){
            $scope.uploadedImages.push({image:$scope.brand.img});
        }

        var setData = function(){
            if(($scope.uploadedImages.length <= 0)){
                Data_Toast.warning(MESSAGE_CONFIG.ERROR_REQUIRED_IMAGE);
                $scope.btnPressed = false;
            }else {
                $scope.brand.img = $scope.uploadedImages[0]?$scope.uploadedImages[0].image:'';
                $scope.brand.rate = {rate:0, star:0, hit:0};
            }

        };

        $scope.save = function(){
            $scope.btnPressed = true;
            setData();
            var brandDetails = {brand:$scope.brand};
            adminDataService.addBrand(brandDetails).then(function (response) {
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
            var brandDetails = {brand:$scope.brand, removed:$scope.removedItems};
            adminDataService.addBrand(brandDetails).then(function (response) {
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
        
        
        
        
        $scope.typed = '';
        $scope.tracker = 1;
        $scope.tags =[];


        $scope.$watch('typed', function(current, old){
            if(current != old){
                $scope.tracker = 2;
                _.each($scope.brand.models, function(tg){
                    if(current.toLowerCase() == tg.toLowerCase()){
                            $scope.tracker = 1;
                            return false;
                    }
                });
            }
        });


        $scope.answer = function(){
            switch($scope.tracker){
                case 2:
                	$scope.brand.models.push($scope.typed);
                	$scope.typed = '';
                    break;

                case 1:
                    for(var index=0; index<$scope.brand.models.length; index++){
                    	if($scope.brand.models[index].toLowerCase() == $scope.typed.toLowerCase()){
                    		$scope.brand.models.splice(index, 1);
                    		$scope.typed = '';
                    		break;
                    	}
                    }
                    break;

                default :
                    console.log('cannot find tracker value');
            }
        };


        $scope.removeTag = function(tag){
        	for(var index=0; index<$scope.brand.models.length; index++){
            	if($scope.brand.models[index].toLowerCase() == tag.toLowerCase()){
            		$scope.brand.models.splice(index, 1);
            		break;
            	}
            }
        };

        
        
        
    }]);

    mod.controller('sysBankModel',['$scope', '$modalInstance','item','adminDataService','Data.Toast','MESSAGE_CONFIG', function ($scope, uiModalInstance, selectedItem, adminDataService, Data_Toast, MESSAGE_CONFIG) {
        $scope.bank = selectedItem? selectedItem : {};
        $scope.approved = selectedItem? selectedItem.approved : undefined;
        $scope.addNewBank = selectedItem? false:true;
        $scope.uploadedImages = [];
        $scope.removedItems = [];
        $scope.bankImageSize = {value:500000, text:'500kB'};
        $scope.bankImageCount = 1;



        if(selectedItem){
            $scope.uploadedImages.push({image:$scope.bank.img});
        }

        var setData = function(){
            if(($scope.uploadedImages.length <= 0)){
                Data_Toast.warning(MESSAGE_CONFIG.ERROR_REQUIRED_IMAGE);
                $scope.btnPressed = false;
            }else {
                $scope.bank.img = $scope.uploadedImages[0]?$scope.uploadedImages[0].image:'';
                $scope.bank.rate = {rate:0, star:0, hit:0};
            }

        };

        $scope.save = function(){
            $scope.btnPressed = true;
            setData();
            var bankDetails = {bank:$scope.bank};
            adminDataService.addBank(bankDetails).then(function (response) {
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
            var bankDetails = {bank:$scope.bank, removed:$scope.removedItems};
            adminDataService.addBank(bankDetails).then(function (response) {
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

    mod.controller('sysAlbumModel',['$scope', '$modalInstance','item','adminDataService','Data.Toast','MESSAGE_CONFIG', function ($scope, uiModalInstance, selectedItem, adminDataService, Data_Toast, MESSAGE_CONFIG) {
        $scope.album = selectedItem? selectedItem : {};
        $scope.approved = selectedItem? selectedItem.approved : undefined;
        $scope.viewList = [];


        if(selectedItem) {
            $scope.addNewAlbum = false;
            adminDataService.getAlbumItemList({album: $scope.album}).then(function (response) {
                $scope.viewList.push.apply($scope.viewList, response.data.responData.data);
            }, function () {
                $scope.viewList = [];
            });
        }


        $scope.update = function(){
            $scope.btnPressed = true;
            var updateObj = {album:$scope.album,removed:$scope.removedList};
            adminDataService.adminUpdateAlbum(updateObj).then(function (response) {
                uiModalInstance.close($scope.album);
                $scope.btnPressed = false;
            },function (error) {
                Data_Toast.error(MESSAGE_CONFIG.ERROR_SAVE_FAIL,error.data.responData.Error);
                $scope.btnPressed = false;
            });
        };


        $scope.approveReject = function(result){
            $scope.btnPressed = true;
            $scope.album.approved= result;
            var updateObj = {album:$scope.album,approved:result};
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