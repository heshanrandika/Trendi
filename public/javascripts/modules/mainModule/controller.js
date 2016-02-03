/**
 * Created by Heshanr on 5/24/2015.
 */
(function (mod) {
    "use strict";

    mod.controller('trendiMainController', ['$scope', '$rootScope','$state','mainDataService','$location', function ($scope, $rootScope, $state, mainDataService,$location) {

        $scope.homeClick = function(val){
            if($location.path().split("/")[1] == "main" && undefined == $location.path().split("/")[2]){
                $state.go('main.home');
            }else if(val == 0){
                $state.go('main.home');
            }

        };
        $scope.homeClick();



        $scope.womenMenu = [
            {category:'Women', value:'Dresses'},
            {category:'Women', value:'Jeans'},
            {category:'Women', value:'Pants'},
            {category:'Women', value:'Denim'},
            {category:'Women', value:'Skirts'},
            {category:'Women', value:'Office Wear'},
            {category:'Women', value:'Casual Tops'},
            {category:'Women', value:'Accesories'},
            {category:'Women', value:'Bottoms'},
            {category:'Women', value:'Foot Wear'}
        ];

        $scope.menMenu = [
            {category:'Men', value:'T-Shirts'},
            {category:'Men', value:'Shirts'},
            {category:'Men', value:'Trousers'},
            {category:'Men', value:'Shorts'},
            {category:'Men', value:'Denim'},
            {category:'Men', value:'Office Wear'}
        ];

        $scope.kidsMenu = [
            {category:'Kids', value:'Shirts'},
            {category:'Kids', value:'Napkins'},
            {category:'Kids', value:'Shorts'},
            {category:'Kids', value:'Frock'},
            {category:'Kids', value:'Denim'},
            {category:'Kids', value:'Skirts'}

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
                    {'class':'m-icon m-icon-dress', 'value':'Dresses', 'count':getCount('Dress')},
                    {'class':'m-icon m-icon-jeans', 'value':'Jeans', 'count':getCount('Jean')},
                    {'class':'m-icon m-icon-skirts', 'value':'Skirts', 'count':getCount('Skirt')},
                    {'class':'m-icon m-icon-lingerie', 'value':'Lingerie', 'count':getCount('Lingerie')},
                    {'class':'m-icon m-icon-tops', 'value':'Tops', 'count':getCount('Top')}
                ];
                    break;

                case 'Men'  :$scope.catMenu = [
                    {'class':'m-icon m-icon-shirts', 'value':'Shirts', 'count':getCount('Shirt')},
                    {'class':'m-icon m-icon-coats', 'value':'Coats', 'count':getCount('Coat')},
                    {'class':'m-icon m-icon-jackets', 'value':'Jackets', 'count':getCount('Jacket')},
                    {'class':'m-icon m-icon-shorts', 'value':'Shorts', 'count':getCount('Short')}
                ];
                    break;

                case 'Kids' :$scope.catMenu = [
                    {'class':'m-icon m-icon-dress', 'value':'Dresses', 'count':getCount('Dress')},
                    {'class':'m-icon m-icon-shirts', 'value':'Shirts', 'count':getCount('Shirt')},
                    {'class':'m-icon m-icon-shorts', 'value':'Shorts', 'count':getCount('Short')},
                    {'class':'m-icon m-icon-jeans', 'value':'Jeans', 'count':getCount('Jean')},
                    {'class':'m-icon m-icon-skirts', 'value':'Skirts', 'count':getCount('Skirt')},
                    {'class':'m-icon m-icon-tops', 'value':'Tops', 'count':getCount('Top')}
                ];
                    break;

                case 'Other':$scope.catMenu = [
                    {'class':'m-icon m-icon-dress', 'value':'Dresses', 'count':getCount('Tops')},
                    {'class':'m-icon m-icon-shirts', 'value':'Shirts', 'count':getCount('Tops')},
                    {'class':'m-icon m-icon-coats', 'value':'Coats', 'count':getCount('Tops')},
                    {'class':'m-icon m-icon-jackets', 'value':'Jackets', 'count':getCount('Tops')},
                    {'class':'m-icon m-icon-shorts', 'value':'Shorts', 'count':getCount('Tops')},
                    {'class':'m-icon m-icon-jeans', 'value':'Jeans', 'count':getCount('Tops')},
                    {'class':'m-icon m-icon-skirts', 'value':'Skirts', 'count':getCount('Tops')},
                    {'class':'m-icon m-icon-lingerie', 'value':'Lingerie', 'count':getCount('Tops')},
                    {'class':'m-icon m-icon-tops', 'value':'Tops', 'count':getCount('Tops')}
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
        };
        $scope.getCategoryMenuData();






        $scope.searchObj = {
            skip: $scope.mainItems.length,
            limit:6,
            item : $scope.selectParams.selected,
            category : $scope.selectParams.category,
            shop : $scope.selectParams.shop,
            searchText:$location.search().searchTxt?$location.search().searchTxt:'',
            filterMap:{}
        };



        $scope.minPriceChange = function(){
            $scope.searchObj.filterMap['minPrice'] = $scope.searchOption.minPrice;
            $scope.loadData(1);
            console.log("change");
        };$scope.maxPriceChange = function(){
            $scope.searchObj.filterMap['maxPrice'] = $scope.searchOption.maxPrice;
            $scope.loadData(1);
            console.log("change");
        };$scope.colorChange = function(){
            $scope.searchObj.filterMap['color'] = $scope.searchOption.color;
            $scope.loadData(1);
            console.log("change");
        };$scope.sizeChange = function(){
            $scope.searchObj.filterMap['size'] = $scope.searchOption.size;
            $scope.loadData(1);
            console.log("change");
        };
        $scope.$watch(function() { return $scope.searchOption.minPrice; },  $scope.minPriceChange);
        $scope.$watch(function() { return $scope.searchOption.maxPrice; },  $scope.maxPriceChange);
        $scope.$watch(function() { return $scope.searchOption.color;    },  $scope.colorChange);
        $scope.$watch(function() { return $scope.searchOption.size;     },  $scope.sizeChange);

        $scope.loadData = function(init){
            if(init){
                $scope.mainItems = [];
                $scope.searchObj.skip =0;
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
            $scope.searchObj.skip = $scope.mainItems.length;
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



        $scope.clickMenu = function(val){
            $location.path('main/products/'+$scope.selectParams.shop? $scope.selectParams.shop:'all'+'/'+$scope.selectParams.category+'/'+val.value);
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
                    {'class':'m-icon m-icon-dress', 'value':'Dresses', 'count':getCount('Dress')},
                    {'class':'m-icon m-icon-jeans', 'value':'Jeans', 'count':getCount('Jean')},
                    {'class':'m-icon m-icon-skirts', 'value':'Skirts', 'count':getCount('Skirt')},
                    {'class':'m-icon m-icon-lingerie', 'value':'Lingerie', 'count':getCount('Lingerie')},
                    {'class':'m-icon m-icon-tops', 'value':'Tops', 'count':getCount('Top')}
                ];
                    break;

                case 'Men'  :$scope.catMenu = [
                    {'class':'m-icon m-icon-shirts', 'value':'Shirts', 'count':getCount('Shirt')},
                    {'class':'m-icon m-icon-coats', 'value':'Coats', 'count':getCount('Coat')},
                    {'class':'m-icon m-icon-jackets', 'value':'Jackets', 'count':getCount('Jacket')},
                    {'class':'m-icon m-icon-shorts', 'value':'Shorts', 'count':getCount('Short')}
                ];
                    break;

                case 'Kids' :$scope.catMenu = [
                    {'class':'m-icon m-icon-dress', 'value':'Dresses', 'count':getCount('Dress')},
                    {'class':'m-icon m-icon-shirts', 'value':'Shirts', 'count':getCount('Shirt')},
                    {'class':'m-icon m-icon-shorts', 'value':'Shorts', 'count':getCount('Short')},
                    {'class':'m-icon m-icon-jeans', 'value':'Jeans', 'count':getCount('Jean')},
                    {'class':'m-icon m-icon-skirts', 'value':'Skirts', 'count':getCount('Skirt')},
                    {'class':'m-icon m-icon-tops', 'value':'Tops', 'count':getCount('Top')}
                ];
                    break;

                case 'Other':$scope.catMenu = [
                    {'class':'m-icon m-icon-dress', 'value':'Dresses', 'count':getCount('Tops')},
                    {'class':'m-icon m-icon-shirts', 'value':'Shirts', 'count':getCount('Tops')},
                    {'class':'m-icon m-icon-coats', 'value':'Coats', 'count':getCount('Tops')},
                    {'class':'m-icon m-icon-jackets', 'value':'Jackets', 'count':getCount('Tops')},
                    {'class':'m-icon m-icon-shorts', 'value':'Shorts', 'count':getCount('Tops')},
                    {'class':'m-icon m-icon-jeans', 'value':'Jeans', 'count':getCount('Tops')},
                    {'class':'m-icon m-icon-skirts', 'value':'Skirts', 'count':getCount('Tops')},
                    {'class':'m-icon m-icon-lingerie', 'value':'Lingerie', 'count':getCount('Tops')},
                    {'class':'m-icon m-icon-tops', 'value':'Tops', 'count':getCount('Tops')}
                ];
                    break;
            }
        };

        $scope.getCategoryMenuData = function () {
            mainDataService.getItemCount({category : $scope.selectParams.category}).then(function(response){
                $scope.categoryMenu = response.data.responData.data;
                $scope.createCategoryMenu();
            },function(){
            });
        };
        $scope.getCategoryMenuData();






        $scope.searchObj = {
            skip: $scope.mainItems.length,
            limit:6,
            searchKey:$stateParams.searchKey,
            searchValue:$stateParams.searchValue,
            searchText:$stateParams.searchText,
            filterMap:{}
        };



        $scope.searchChange = function(){
            console.log("change");
        };
        $scope.$watch(function() { return $scope.searchOption.minPrice; },  $scope.searchChange);
        $scope.$watch(function() { return $scope.searchOption.maxPrice; },  $scope.searchChange);
        $scope.$watch(function() { return $scope.searchOption.color;    },  $scope.searchChange);
        $scope.$watch(function() { return $scope.searchOption.size;     },  $scope.searchChange);

        $scope.loadData = function(init){
            if(init){
                $scope.mainItems = [];
                $scope.searchObj.skip =0;
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
            $scope.searchObj.skip = $scope.mainItems.length;
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



        $scope.clickMenu = function(val){
            $location.path('main/products/'+$scope.selectParams.category+'/'+val.value);
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


})(com.TRENDI.CATEGORY.modules.mainTrendiModule);
