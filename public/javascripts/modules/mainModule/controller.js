/**
 * Created by Heshanr on 5/24/2015.
 */
(function (mod) {
    "use strict";

    mod.controller('trendiMainController', ['$scope', '$rootScope','$state','mainDataService','$location', function ($scope, $rootScope, $state, mainDataService,$location) {
        $scope.searchKey =  '';
        $scope.homeClick = function(val){
            if($location.path().split("/")[1] == "main" && undefined == $location.path().split("/")[2]){
                $state.go('main.home');
            }else if(val == 0){
                $state.go('main.home');
            }

        };
        $scope.homeClick();

        $scope.getShopList = function () {
            mainDataService.getShopList(
                {
                    skip: 0,
                    limit:6
                }
            ).then(function(response){
                $scope.shopList = response.data.responData.data.list;
            },function(){
            });
        };
        $scope.getShopList();

        $scope.gotoShop = function () {
            $location.search({});
            $location.path('main/shop');
        };

        $scope.searchTerm = function () {
            $location.search({});
            $location.path('main/search/'+($scope.searchKey == ''?'all':$scope.searchKey));
        };

        $scope.searchType = function (event) {
           if(event.keyCode == 13){
               $scope.searchTerm();
           }
        };

        $scope.womenMenu = [
            {category:'Women', search:'Dress', value:'Dresses'},
            {category:'Women', search:'Jean', value:'Jeans'},
            {category:'Women', search:'Pant', value:'Pants'},
            {category:'Women', search:'Denim', value:'Denim'},
            {category:'Women', search:'Skirt', value:'Skirts'},
            {category:'Women', search:'Office_Wear', value:'Office Wear'},
            {category:'Women', search:'Casual_Top', value:'Casual Tops'},
            {category:'Women', search:'Accessory', value:'Accessories'},
            {category:'Women', search:'Bottom', value:'Bottoms'},
            {category:'Women', search:'Foot_Wear', value:'Foot Wear'}
        ];

        $scope.menMenu = [
            {category:'Men', search:'T_Shirt', value:'T-Shirts'},
            {category:'Men', search:'Shirt', value:'Shirts'},
            {category:'Men', search:'Trouser', value:'Trousers'},
            {category:'Men', search:'Short', value:'Shorts'},
            {category:'Men', search:'Denim', value:'Denim'},
            {category:'Men', search:'Office_Wear', value:'Office Wear'}
        ];

        $scope.kidsMenu = [
            {category:'Kids', search:'Shirt', value:'Shirts'},
            {category:'Kids', search:'Napkin', value:'Napkins'},
            {category:'Kids', search:'Short', value:'Shorts'},
            {category:'Kids', search:'Frock', value:'Frock'},
            {category:'Kids', search:'Denim', value:'Denim'},
            {category:'Kids', search:'Skirt', value:'Skirts'}

        ];


    }]);

    mod.controller('trendiMainHomeController', ['$scope', '$rootScope','$state','mainDataService', function ($scope, $rootScope, $state, mainDataService) {

        $scope.slider ;
        $scope.showSlider = true;
        $scope.latestItemShow = false;
        $scope.mainItemShow = false;
        $scope.trendItemsShow = false;

        $scope.initWindow = function(){

            mainDataService.getLatestItem({skip:0,limit:16}).then(function(response){
                $scope.latestItems = response.data.responData.data;
                $scope.latestItemShow = true;
            }, function(error){
                $scope.latestItemShow = false;
            });

            mainDataService.getMainItemList({skip:0,limit:16}).then(function(response){
                $scope.mainItems = response.data.responData.data;
                $scope.mainItemShow = true;
            }, function(error){
                $scope.mainItemShow = false;
            });

            mainDataService.getMostTrendyItems({skip:0,limit:8}).then(function(response){
                $scope.trendItems = response.data.responData.data;
                $scope.trendItemsShow = true;
            }, function(error){
                $scope.trendItemsShow = false;
            });

        };

        $scope.initWindow();


        $scope.images=[
            {name:'a', number:'1', date:'1360413309421', src:'../../images/products/product-01.jpg' , class:'purple'}
            ,{name:'b', number:'5', date:'1360213309423', src:'../../images/products/product-02.jpg', class:'orange'}
            ,{name:'c', number:'10', date:'1360113309421', src:'../../images/products/product-03.jpg', class:'purple'}
            ,{name:'d', number:'2', date:'1360113309422', src:'../../images/products/product-04.jpg', class:'green'}
            ,{name:'e', number:'6', date:'1360413309421', src:'../../images/products/product-05.jpg', class:'purple'}
            ,{name:'f', number:'21', date:'1360113309422', src:'../../images/products/product-03.jpg', class:'green'}
            ,{name:'f', number:'21', date:'1360113309422', src:'../../images/products/product-03.jpg', class:'green'}
            ,{name:'g', number:'3', date:'1360213309423', src:'../../images/products/product-02.jpg', class:'orange'}
            ,{name:'h', number:'7', date:'1360113309422', src:'../../images/products/product-01.jpg', class:'blue'}
            ,{name:'i', number:'22', date:'1360413309421', src:'../../images/products/product-04.jpg', class:'blue'}
        ];

        $scope.brands=[
            {name:'a', number:'1', date:'1360413309421', src:'../../images/icon-payment-01.png' , class:'purple'}
            ,{name:'b', number:'5', date:'1360213309423', src:'../../images/icon-payment-02.png', class:'orange'}
            ,{name:'c', number:'10', date:'1360113309421', src:'../../images/icon-payment-03.png', class:'purple'}
            ,{name:'d', number:'2', date:'1360113309422', src:'../../images/icon-payment-04.png', class:'green'}
            ,{name:'e', number:'6', date:'1360413309421', src:'../../images/icon-payment-05.png', class:'purple'}
        ];


        $scope.onSale=[
            {name:'f', number:'21', date:'1360113309422', src:'../../images/products/product-03.jpg', class:'green'}
            ,{name:'f', number:'21', date:'1360113309422', src:'../../images/products/product-03.jpg', class:'green'}
            ,{name:'g', number:'3', date:'1360213309423', src:'../../images/products/product-02.jpg', class:'orange'}
            ,{name:'h', number:'7', date:'1360113309422', src:'../../images/products/product-01.jpg', class:'blue'}
            ,{name:'i', number:'22', date:'1360413309421', src:'../../images/products/product-04.jpg', class:'blue'}
        ];
        $scope.clickTab = function (tab) {
            if(tab == 1)
                $state.go('ladies');

            if(tab == 2)
                $state.go('gents');

            if(tab == 3)
                $state.go('babies');

            if(tab == 4)
                $state.go('shop');
        }

    }]);

    mod.controller('trendiMainProductsController', ['$scope', '$rootScope','$state','mainDataService','$timeout','$stateParams','$location','$anchorScroll', function ($scope, $rootScope, $state, mainDataService, $timeout, $stateParams, $location, $anchorScroll) {
        $scope.selectParams = $stateParams;
        $scope.mainItemShow = false;
        $scope.changeView = false;
        $scope.isoRefresh = true;
        $scope.mainItems = [];
        $scope.categoryMenu = {};
        $scope.count = 0;
        $scope.uiRef = $location.search().itemId;
        $scope.catMenu = [];
        $scope.selectedItem = {};
        $scope.imageArray = [];
        $scope.searchOption = {};


        $scope.changeList = function(val){
            $scope.isoRefresh = false;
            if(val == 1){
                $scope.changeView = true;
            }else{
                $scope.changeView = false;
            }
            $timeout(function () {
                $scope.isoRefresh = true;
            },100);
        };




        var getCount = function(val){
            var result = _.find( $scope.categoryMenu, function(obj){ return obj._id == val; });
           return result?result.count:0;
        };



        $scope.createCategoryMenu = function(){
            switch($scope.selectParams.category){
                case 'Women': $scope.catMenu = [
                    {'class':'m-icon m-icon-dress', 'value':'Dresses', search:'Dress', 'count':getCount('Dress')},
                    {'class':'m-icon m-icon-jeans', 'value':'Jeans', search:'Jean', 'count':getCount('Jean')},
                    {'class':'m-icon m-icon-skirts', 'value':'Skirts', search:'Skirt','count':getCount('Skirt')},
                    {'class':'m-icon m-icon-lingerie', 'value':'Lingerie',search:'Lingerie', 'count':getCount('Lingerie')},
                    {'class':'m-icon m-icon-tops', 'value':'Tops', search:'Top', 'count':getCount('Top')}
                ];
                    break;

                case 'Men'  :$scope.catMenu = [
                    {'class':'m-icon m-icon-shirts', 'value':'Shirts', search:'Shirt', 'count':getCount('Shirt')},
                    {'class':'m-icon m-icon-coats', 'value':'Coats', search:'Coat', 'count':getCount('Coat')},
                    {'class':'m-icon m-icon-jackets', 'value':'Jackets', search:'Jacket',  'count':getCount('Jacket')},
                    {'class':'m-icon m-icon-shorts', 'value':'Shorts', search:'Short', 'count':getCount('Short')}
                ];
                    break;

                case 'Kids' :$scope.catMenu = [
                    {'class':'m-icon m-icon-dress', 'value':'Dresses', search:'Dress', 'count':getCount('Dress')},
                    {'class':'m-icon m-icon-shirts', 'value':'Shirts', search:'Shirt', 'count':getCount('Shirt')},
                    {'class':'m-icon m-icon-shorts', 'value':'Shorts', search:'Short', 'count':getCount('Short')},
                    {'class':'m-icon m-icon-jeans', 'value':'Jeans', search:'Jean', 'count':getCount('Jean')},
                    {'class':'m-icon m-icon-skirts', 'value':'Skirts', search:'Skirt', 'count':getCount('Skirt')},
                    {'class':'m-icon m-icon-tops', 'value':'Tops', search:'Top', 'count':getCount('Top')}
                ];
                    break;

                case 'Other':$scope.catMenu = [
                    {'class':'m-icon m-icon-dress', 'value':'Dresses', search:'Dress', 'count':getCount('Dress')},
                    {'class':'m-icon m-icon-shirts', 'value':'Shirts', search:'Shirt', 'count':getCount('Shirt')},
                    {'class':'m-icon m-icon-coats', 'value':'Coats', search:'Coat', 'count':getCount('Coat')},
                    {'class':'m-icon m-icon-jackets', 'value':'Jackets', search:'Jacket', 'count':getCount('Jacket')},
                    {'class':'m-icon m-icon-shorts', 'value':'Shorts', search:'Short', 'count':getCount('Short')},
                    {'class':'m-icon m-icon-jeans', 'value':'Jeans', search:'Jean', 'count':getCount('Jean')},
                    {'class':'m-icon m-icon-skirts', 'value':'Skirts', search:'Skirt', 'count':getCount('Skirt')},
                    {'class':'m-icon m-icon-lingerie', 'value':'Lingerie', search:'Lingerie', 'count':getCount('Lingerie')},
                    {'class':'m-icon m-icon-tops', 'value':'Tops', search:'Top', 'count':getCount('Top')}
                ];
                    break;
            }
        };

        $scope.getCategoryMenuData = function () {
            mainDataService.getItemCount({category : $scope.selectParams.category, shop : $scope.selectParams.shop}).then(function(response){
                $scope.categoryMenu = response.data.responData.data;
                $scope.createCategoryMenu();
            },function(){
            });

            mainDataService.getTagList({shop : $scope.selectParams.shop}).then(function(response){
                $scope.tags = response.data.responData.data;
            },function(){
            });
        };
        $scope.getCategoryMenuData();






        $scope.searchObj = {
            skip: $scope.mainItems.length-1,
            limit:6,
            item : $scope.selectParams.selected,
            category : $scope.selectParams.category,
            shop : $scope.selectParams.shop,
            searchText:$location.search().searchTxt?$location.search().searchTxt:'',
            filterMap:{}
        };



        $scope.priceChange = function(){
            if($scope.searchOption.maxPrice){
                $scope.searchObj.filterMap['minPrice'] = $scope.searchOption.minPrice;
                $scope.searchObj.filterMap['maxPrice'] = $scope.searchOption.maxPrice;
                $scope.loadData(1);
                console.log("change");
            }
        };
        $scope.colorChange = function(){
            if($scope.searchOption.color) {
                $scope.searchObj.filterMap['color'] = $scope.searchOption.color;
                $scope.loadData(1);
                console.log("change");
            }
        };
        $scope.sizeChange = function(){
            if($scope.searchOption.size) {
                $scope.searchObj.filterMap['size'] = $scope.searchOption.size;
                $scope.loadData(1);
                console.log("change");
            }
        };
        $scope.$watch(function() { return $scope.searchOption.priceChange; },  $scope.priceChange);
        $scope.$watch(function() { return $scope.searchOption.color;    },  $scope.colorChange);
        $scope.$watch(function() { return $scope.searchOption.size;     },  $scope.sizeChange);

        $scope.loadData = function(init){
            if(init){
                $scope.mainItems = [];
                $scope.searchObj.skip =0;
                $scope.mainItemShow = false;
            }
            $scope.loading = true;
            mainDataService.getSearchList($scope.searchObj).then(function(response){
                $scope.mainItems.push.apply($scope.mainItems, response.data.responData.data.list);
                if(response.data.responData.data.count){
                    $scope.count = response.data.responData.data.count;
                }
                $scope.loading = false;
                $scope.mainItemShow = true;
            },function(){
            });
        };

        // Register event handler
        $scope.paginationFuntion = function() {
            $scope.searchObj.skip = $scope.mainItems.length-1;
            if ($scope.count > $scope.mainItems.length && !$scope.loading) {
                $scope.loadData();
            }
        };

        $scope.loadData(1);

        $scope.clickMenu = function(val){
            $location.path('main/products/'+$scope.selectParams.shop+'/'+$scope.selectParams.category+'/'+val.search);
        };



        $scope.clickTag = function(val){
            $location.path('main/products/'+$scope.selectParams.shop+'/'+$scope.selectParams.category+'/'+val.key);
        };


/*+++++++++++++++++++++++++++++++++++++PRODUCT VIEW PAGE++++++++++++++++++++++++++++++++++++++++++++++*/

        $scope.loadSubItem = function(id){
            $scope.subItem = {};
            mainDataService.getSubItem({itemId : id}).then(function(response){
                $scope.subItem =  response.data.responData.data;
                _.each($scope.subItem.itemList, function(sub){
                    $scope.imageArray.push(sub.image);
                })

            },function(){
            });
        };


        $scope.isotopPagination = {
            searchFromServer: function (d) {
                $scope.paginationFuntion();
            },
            goto: function (item) {
                $scope.selectedItem = item;
                $scope.imageArray = [];
                $scope.imageArray.push($scope.selectedItem.item.image);
                $scope.imageSelect(0);
                $scope.loadSubItem(item.itemId);
                $scope.uiRef = item.itemId;
                $location.search('itemId', item.itemId);
                $scope.scrollTo('back-btn');
                $scope.getDirection();
            }

        };



        //get main item when there is no selected item
        if($location.search().itemId){
            var id = parseInt($location.search().itemId);
            if(!$scope.selectedItem.item){
                $scope.imageArray = [];
                mainDataService.getMainItem({itemId : id}).then(function(response){
                    $scope.selectedItem =  response.data.responData.data;
                    $scope.imageArray.push($scope.selectedItem.item.image);
                    $scope.imageSelect(0);
                    $scope.loadSubItem(id);
                    $scope.getDirection();
                },function(){
                });
            }
        }

        var imageResize = function(url, width, height, callback) {
            var sourceImage = new Image();

            sourceImage.onload = function() {
                var canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                canvas.getContext("2d").drawImage(sourceImage, 0, 0, width, height);
                callback(canvas.toDataURL());
            };

            sourceImage.src = url;
        };

        //select image
        $scope.imageSelect = function(index){
            $scope.selectedImage = {
                big : $scope.imageArray[index],
                small : $scope.imageArray[index],
                tiny : $scope.imageArray[index]
            };

            imageResize($scope.imageArray[index], 700, 700, function(data){
                $scope.selectedImage.big = data;
            });

            imageResize($scope.imageArray[index], 400, 400, function(data){
                $scope.selectedImage.small = data;
            });

            imageResize($scope.imageArray[index], 200, 200, function(data){
                $scope.selectedImage.tiny = data;
            });

        };





        //back button click
        $scope.backTo = function(){
            var tmp = $scope.uiRef;
            $scope.uiRef = 0;
            $location.search({});
            $scope.scrollTo(tmp+"");
            $scope.selectedItem = {};
            $scope.showMap = false;
        };

        //set scroll position
        $scope.scrollTo = function(id) {
            var old = $location.hash();
            $location.hash(id);
            $anchorScroll();
        };

        //get related items
        mainDataService.getLatestItem({skip:0,limit:16}).then(function(response){
                $scope.relatedItems = response.data.responData.data;
                $scope.relatedItemsShow = true;
            }, function(error){
                $scope.relatedItemsShow = false;
        });


        $scope.getDirection = function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    $scope.direction = {
                        start : {
                            lat:position.coords.latitude,
                            lon:position.coords.longitude
                        },
                        end:{
                            lat:$scope.selectedItem.item.shop.shop.pos[0],
                            lon:$scope.selectedItem.item.shop.shop.pos[1],
                            name:$scope.selectedItem.item.shop.shop.name
                        }
                    };

                });
            }
        };



    }]);

    mod.controller('trendiMainSearchController', ['$scope', '$rootScope','$state','mainDataService','$timeout','$stateParams','$location','$anchorScroll', function ($scope, $rootScope, $state, mainDataService, $timeout, $stateParams, $location, $anchorScroll) {
        $scope.selectParams = $stateParams;
        $scope.mainItemShow = false;
        $scope.changeView = false;
        $scope.isoRefresh = true;
        $scope.mainItems = [];
        $scope.categoryMenu = {};
        $scope.count = 0;
        $scope.uiRef = $location.search().itemId;
        $scope.catMenu = [];
        $scope.selectedItem = {};
        $scope.imageArray = [];
        $scope.searchOption = {};


        $scope.changeList = function(val){
            $scope.isoRefresh = false;
            if(val == 1){
                $scope.changeView = true;
            }else{
                $scope.changeView = false;
            }
            $timeout(function () {
                $scope.isoRefresh = true;
            },100);
        };




        $scope.getCount = function(val){
            var result = _.find( $scope.categoryMenu, function(obj){ return obj._id == val; });
            return result?result.count:0;
        };



        $scope.createCategoryMenu = function(){
            mainDataService.getItemMenu().then(function(response){
                $scope.allMenu  = response.data.responData.data;
            },function(){
            });
        };

        $scope.getCategoryMenuData = function () {
            mainDataService.getItemCount({category : 'all', shop : 'all'}).then(function(response){
                $scope.categoryMenu = response.data.responData.data;
                $scope.createCategoryMenu();
            },function(){
            });
        };
        $scope.getCategoryMenuData();

        $scope.clickMenu = function(val, category){
            $location.path('main/products/all/'+category+'/'+val.search);
        };




        $scope.searchObj = {
            skip: $scope.mainItems.length-1,
            limit:6,
            searchText:$scope.selectParams.term?$scope.selectParams.term:'',
            filterMap:{}
        };



        $scope.priceChange = function(){
            if($scope.searchOption.maxPrice){
                $scope.searchObj.filterMap['minPrice'] = $scope.searchOption.minPrice;
                $scope.searchObj.filterMap['maxPrice'] = $scope.searchOption.maxPrice;
                $scope.loadData(1);
            }
        };
        $scope.colorChange = function(){
            if($scope.searchOption.color) {
                $scope.searchObj.filterMap['color'] = $scope.searchOption.color;
                $scope.loadData(1);
            }
        };
        $scope.sizeChange = function(){
            if($scope.searchOption.size) {
                $scope.searchObj.filterMap['size'] = $scope.searchOption.size;
                $scope.loadData(1);
            }
        };
        $scope.$watch(function() { return $scope.searchOption.priceChange; },  $scope.priceChange);
        $scope.$watch(function() { return $scope.searchOption.color;    },  $scope.colorChange);
        $scope.$watch(function() { return $scope.searchOption.size;     },  $scope.sizeChange);

        $scope.loadData = function(init){
            if(init){
                $scope.mainItems = [];
                $scope.searchObj.skip =0;
                $scope.mainItemShow = false;
            }
            $scope.loading = true;
            mainDataService.getSearchList($scope.searchObj).then(function(response){
                $scope.mainItems.push.apply($scope.mainItems, response.data.responData.data.list);
                if(response.data.responData.data.count){
                    $scope.count = response.data.responData.data.count;
                }
                $scope.loading = false;
                $scope.mainItemShow = true;
            },function(){
            });
        };

        // Register event handler
        $scope.paginationFuntion = function() {
            $scope.searchObj.skip = $scope.mainItems.length-1;
            if ($scope.count > $scope.mainItems.length && !$scope.loading) {
                $scope.loadData();
            }
        };

        $scope.loadData(1);


        /*+++++++++++++++++++++++++++++++++++++PRODUCT VIEW PAGE++++++++++++++++++++++++++++++++++++++++++++++*/

        $scope.loadSubItem = function(id){
            $scope.subItem = {};
            mainDataService.getSubItem({itemId : id}).then(function(response){
                $scope.subItem =  response.data.responData.data;
                _.each($scope.subItem.itemList, function(sub){
                    $scope.imageArray.push(sub.image);
                })

            },function(){
            });
        };


        $scope.isotopPagination = {
            searchFromServer: function (d) {
                $scope.paginationFuntion();
            },
            goto: function (item) {
                $scope.selectedItem = item;
                $scope.imageArray = [];
                $scope.imageArray.push($scope.selectedItem.item.image);
                $scope.imageSelect(0);
                $scope.loadSubItem(item.itemId);
                $scope.uiRef = item.itemId;
                $location.search('itemId', item.itemId);
                $scope.scrollTo('back-btn');
                $scope.getDirection();
            }

        };



        //get main item when there is no selected item
        if($location.search().itemId){
            var id = parseInt($location.search().itemId);
            if(!$scope.selectedItem.item){
                $scope.imageArray = [];
                mainDataService.getMainItem({itemId : id}).then(function(response){
                    $scope.selectedItem =  response.data.responData.data;
                    $scope.imageArray.push($scope.selectedItem.item.image);
                    $scope.imageSelect(0);
                    $scope.loadSubItem(id);
                    $scope.getDirection();
                },function(){
                });
            }
        }

        var imageResize = function(url, width, height, callback) {
            var sourceImage = new Image();

            sourceImage.onload = function() {
                var canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                canvas.getContext("2d").drawImage(sourceImage, 0, 0, width, height);
                callback(canvas.toDataURL());
            };

            sourceImage.src = url;
        };

        //select image
        $scope.imageSelect = function(index){
            $scope.selectedImage = {
                big : $scope.imageArray[index],
                small : $scope.imageArray[index],
                tiny : $scope.imageArray[index]
            };

            imageResize($scope.imageArray[index], 700, 700, function(data){
                $scope.selectedImage.big = data;
            });

            imageResize($scope.imageArray[index], 400, 400, function(data){
                $scope.selectedImage.small = data;
            });

            imageResize($scope.imageArray[index], 200, 200, function(data){
                $scope.selectedImage.tiny = data;
            });

        };





        //back button click
        $scope.backTo = function(){
            var tmp = $scope.uiRef;
            $scope.uiRef = 0;
            $location.search({});
            $scope.scrollTo(tmp+"");
            $scope.selectedItem = {};
            $scope.showMap = false;
        };

        //set scroll position
        $scope.scrollTo = function(id) {
            var old = $location.hash();
            $location.hash(id);
            $anchorScroll();
        };

        //get related items
        mainDataService.getLatestItem({skip:0,limit:16}).then(function(response){
            $scope.relatedItems = response.data.responData.data;
            $scope.relatedItemsShow = true;
        }, function(error){
            $scope.relatedItemsShow = false;
        });


        $scope.getDirection = function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    $scope.direction = {
                        start : {
                            lat:position.coords.latitude,
                            lon:position.coords.longitude
                        },
                        end:{
                            lat:$scope.selectedItem.item.shop.shop.pos[0],
                            lon:$scope.selectedItem.item.shop.shop.pos[1],
                            name:$scope.selectedItem.item.shop.shop.name
                        }
                    };

                });
            }
        };



    }]);

    mod.controller('trendiShopProductsController', ['$scope', '$rootScope','$state','mainDataService','$timeout','$stateParams','$location','$anchorScroll', function ($scope, $rootScope, $state, mainDataService, $timeout, $stateParams, $location, $anchorScroll) {
        $scope.user = {};
        $scope.user.pos = [];
        $scope.range = {txt : 'All', value:'0'};



        $scope.selectParams = $stateParams;
        $scope.uiRef = $location.search().shopId;
        $scope.shopChange = function(){
            $scope.uiRef = $location.search().shopId;
            if($scope.uiRef){
                var id = parseInt($scope.uiRef);
                $scope.getShopData(id);
            }

        };
        $scope.$watch(function() { return $location.search().shopId; },  $scope.shopChange);

        $scope.mainItemShow = false;
        $scope.changeView = false;
        $scope.isoRefresh = true;
        $scope.shopList = [];
        $scope.categoryMenu = {};
        $scope.count = 0;
        $scope.catMenu = [];
        $scope.selectedItem = {};
        $scope.searchOption = {};
        $scope.searchOpen = false;


        $scope.changeList = function(val){
            $scope.isoRefresh = false;
            if(val == 1){
                $scope.changeView = true;
            }else{
                $scope.changeView = false;
            }
            $timeout(function () {
                $scope.isoRefresh = true;
            },100);
        };

        $scope.searchSelect = function(){
           if($scope.searchOpen){
                $scope.searchOpen = false; 
                $scope.searchObj.pos = $scope.user.pos;
                $scope.searchObj.range = $scope.range.value;
                $scope.loadData(1);
           }else{
                $scope.searchOpen = true;  
           }
        };

        $scope.rangeSelect = function(val){
            $scope.range = val;
        };


        $scope.searchObj = {
            skip: $scope.shopList.length-1,
            limit:6,
            pos : {},
            range:''
        };


        $scope.loadData = function(init){
            if(init){
                $scope.shopList = [];
                $scope.searchObj.skip =0;
                $scope.mainItemShow = false;
            }
            $scope.loading = true;
            mainDataService.getShopList($scope.searchObj).then(function(response){
                $scope.shopList.push.apply($scope.shopList, response.data.responData.data.list);
                if(response.data.responData.data.count){
                    $scope.count = response.data.responData.data.count;
                }
                $scope.loading = false;
                $scope.mainItemShow = true;
            },function(){
            });
        };


        $scope.paginationFuntion = function() {
            $scope.searchObj.skip = $scope.shopList.length-1;
            if ($scope.count > $scope.shopList.length && !$scope.loading) {
                $scope.loadData();
            }
        };

        $scope.loadData(1);


        $scope.isotopPagination = {
            searchFromServer: function (d) {
                $scope.paginationFuntion();
            },
            goto: function (shop) {
                $scope.selectedItem = shop;
                // $scope.loadSubItem(shop.shopId);
                $location.search('shopId',shop.shopId);
                $scope.scrollTo('back-btn');
                $scope.getDirection();
            }

        };


        /*+++++++++++++++++++++++++++++++++++++SHOP VIEW PAGE++++++++++++++++++++++++++++++++++++++++++++++*/



        $scope.getCount = function(val){
            var result = _.find( $scope.categoryMenu, function(obj){ return obj._id == val; });
            return result?result.count:0;
        };



        $scope.createCategoryMenu = function(){
            mainDataService.getItemMenu().then(function(response){
                $scope.allMenu  = response.data.responData.data;
            },function(){
            });
        };

        $scope.getCategoryMenuData = function () {
            mainDataService.getItemCount({category : 'all', shop : $scope.selectedItem.shopId}).then(function(response){
                $scope.categoryMenu = response.data.responData.data;
                $scope.createCategoryMenu();
                $scope.getDirection();
            },function(){
            });
        };
        $scope.getCategoryMenuData();







        //get main item when there is no selected item
        if($location.search().shopId){
            var id = parseInt($location.search().shopId);
            if(!$scope.selectedItem){
                $scope.getShopData(id);
            }
        }

        $scope.getShopData = function(id){
            mainDataService.getShop({shopId : id}).then(function(response){
                $scope.selectedItem =  response.data.responData.data;
                $scope.getCategoryMenuData();
                //  $scope.loadSubItem(id);
                $scope.getDirection();
            },function(){
            });
        };

        $scope.clickMenu = function(val, category){
            $location.path('main/products/'+$scope.selectedItem.shopId+'/'+category+'/'+val.search);
        };

        //back button click
        $scope.backTo = function(){
            $location.search({});
            $scope.scrollTo($scope.selectParams.selected+"");
            $scope.selectedItem = {};
            $scope.showMap = false;
        };

        //set scroll position
        $scope.scrollTo = function(id) {
            var old = $location.hash();
            $location.hash(id);
            $anchorScroll();
        };

        //get related items
        mainDataService.getLatestItem({skip:0,limit:16}).then(function(response){
            $scope.relatedItems = response.data.responData.data;
            $scope.relatedItemsShow = true;
        }, function(error){
            $scope.relatedItemsShow = false;
        });


        $scope.getDirection = function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    if($scope.selectedItem.pos){
                        $scope.direction = {
                            start : {
                                lat:position.coords.latitude,
                                lon:position.coords.longitude
                            },
                            end:{
                                lat:$scope.selectedItem.pos[0],
                                lon:$scope.selectedItem.pos[1],
                                name:$scope.selectedItem.name
                            }
                        };
                    }else{
                        $scope.user.pos = [position.coords.latitude,position.coords.longitude];
                    }



                });
            }
        };



    }]);


})(com.TRENDI.CATEGORY.modules.mainTrendiModule);
