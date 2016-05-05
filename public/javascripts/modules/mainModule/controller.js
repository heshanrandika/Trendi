/**
 * Created by Heshanr on 5/24/2015.
 */
(function (mod) {
    "use strict";

    mod.controller('trendiMainController', ['$scope', '$rootScope','$state','mainDataService','$location','Login.Window','socket','webNotification','$timeout', function ($scope, $rootScope, $state, mainDataService, $location, Login_Window, socket, webNotification, $timeout) {
        $scope.searchKey =  '';
        $scope.messageList = [];
        $scope.unreadCount = 0;
        var notifyCount = 1;


        $scope.callback = function(response){
            console.log(response);
            alert('share callback');
        }


        socket.on('ticket', function(message){
            
                $timeout(function() {
                webNotification.showNotification('Example Notification', {
                        body: 'Notification Text...',
                        icon: message.item.image,
                        onClick: function onNotificationClicked() {
                            window.alert('Notification clicked.');
                        },
                        autoClose: 4000
                    }, function onShow(error, hide) {
                        if (error) {
                            console.log('Unable to show notification: ' + error.message);
                        } else {
                            setTimeout(function hideNotification() {
                                hide();
                            }, 5000);
                        }
                    });
                }, 1000*notifyCount);
                if(notifyCount > 5){
                    notifyCount = 1;
                }else{
                    notifyCount++;
                }


            });

        $scope.homeClick = function(val){
            var encrypt = CryptoJS.TripleDES.encrypt("message", "dsgfbdusiduigdfgndsgyufigyfldg");
            var decrypted = CryptoJS.TripleDES.decrypt(encrypt, "dsgfbdusiduigdfgndsgyufigyfldg");
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

        $scope.gotoMessage = function () {
            $location.search({});
            $scope.getCounts();
            $location.path('main/message');
        };

        $scope.searchType = function (event) {
            if(event.keyCode == 13){
                $scope.searchTerm();
            }
        };

        $scope.loginOpen = function () {
            if($scope.user){
                Login_Window.logoutUser();
            }else{
                Login_Window.showLogin();
            }

        };

        $scope.checkLogin = function () {
            $scope.user =  Login_Window.checkUser();
            return $scope.user
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


        $scope.getCounts = function(){
            mainDataService.getMessageCount({type:'INBOX', read:true}).then(function(response){
                $scope.unreadCount = response.data.responData.data.count;
                $scope.messageList.push.apply($scope.messageList, response.data.responData.data.list);
            },function(){
                $scope.unreadCount = 0;
            });


        };
        $scope.getCounts();


    }]);

    mod.controller('trendiMainHomeController', ['$scope', '$rootScope','$state','mainDataService','$location', function ($scope, $rootScope, $state, mainDataService, $location) {

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

            mainDataService.getMainItemList({skip:0,limit:10}).then(function(response){
                $scope.mainItems = response.data.responData.data;
                $scope.mainItemShow = true;
            }, function(error){
                $scope.mainItemShow = false;
            });

            mainDataService.getMostTrendyItems({skip:10,limit:18}).then(function(response){
                $scope.trendItems = response.data.responData.data;
                $scope.trendItemsShow = true;
            }, function(error){
                $scope.trendItemsShow = false;
            });

            mainDataService.getNewProductList({skip:0, limit:18, type:2}).then(function(response){
                $scope.newProductList = response.data.responData.data;
            }, function(error){
            });

            mainDataService.getOnSaleList({skip:0, limit:18, type:1}).then(function(response){
                $scope.onSaleList = response.data.responData.data;
            }, function(error){
            });

            mainDataService.getMostSeen({skip:0,tlimit:18, type:3}).then(function(response){
                $scope.mostSeenList = response.data.responData.data;
            }, function(error){
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


         $scope.moduleClick = {
            itemClicked: function (selected) {
                var shopId = selected.item.shop.shopId;
                var category = "Women";
                if(selected.item.group.women){
                    category = "Women";
                }else if(selected.item.group.men){
                    category = "Men";
                }else if(selected.item.group.kids){
                    category = "Kids";
                }
                $location.path('main/products/'+shopId+'/'+category+'/'+'all');
                $location.search('itemId', selected.itemId);
            }
        };

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
            skip: 0,
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
                if($location.search().itemId){
                    $scope.mainItemShow = false;
                }else{
                    $scope.mainItemShow = true;
                }
            },function(){
            });
        };

        // Register event handler
        $scope.paginationFuntion = function() {
            $scope.searchObj.skip = $scope.searchObj.limit;
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
                $scope.itemSelected = true;
                $scope.imageArray = [];
                $scope.imageArray.push($scope.selectedItem.item.image);
                $scope.imageSelect(0);
                $scope.loadSubItem(item.itemId);
                $scope.uiRef = item.itemId;
                $location.search('itemId', item.itemId);
                $scope.scrollTo('back-btn');
                $scope.getDirection();
                $scope.getRelatedItems($scope.selectedItem);
            }

        };


        $rootScope.$on('$locationChangeSuccess', function(event){
            if(!$location.search().itemId && $scope.itemSelected){
                $scope.backTo();
            }
        });


        //get main item when there is no selected item
        if($location.search().itemId){
            var id = parseInt($location.search().itemId);
            $scope.mainItemShow = false;
            if(!$scope.selectedItem.item){
                $scope.itemSelected = true;
                $scope.imageArray = [];
                mainDataService.getMainItem({itemId : id}).then(function(response){
                    $scope.selectedItem =  response.data.responData.data;
                    $scope.imageArray.push($scope.selectedItem.item.image);
                    $scope.imageSelect(0);
                    $scope.loadSubItem(id);
                    $scope.getDirection();
                    $scope.getRelatedItems($scope.selectedItem);
                },function(){
                });
            }
        }else{
            $scope.itemSelected = false;
        }

        var imageResize = function(url, width, height, callback) {
            var sourceImage = new Image();
           
            sourceImage.onload = function() {
                var canvas = document.createElement("canvas");
                var ratio= sourceImage.height/sourceImage.width;
                canvas.width = width;
                canvas.height = height*ratio;
                canvas.getContext("2d").drawImage(sourceImage, 0, 0, width, height*ratio);
                callback(canvas.toDataURL());
            };

            sourceImage.src = url;
        };


        //select image

        $scope.imageSelect = function(index){
            $scope.renderd = 0;
            $scope.selectedImage = {
                big : $scope.imageArray[index],
                small : $scope.imageArray[index],
                tiny : $scope.imageArray[index]
            };


            function setImage(){
                $scope.renderd += 1;
                if($scope.renderd == 3){
                    $scope.$apply(function(){
                        $scope.renderd = true;
                    });
                }
            }
            imageResize($scope.imageArray[index], 700, 700, function(data){
                $scope.selectedImage.big = data;
                setImage();
            });

            imageResize($scope.imageArray[index], 400, 400, function(data){
                $scope.selectedImage.small = data;
                setImage()
            });

            imageResize($scope.imageArray[index], 200, 200, function(data){
                $scope.selectedImage.tiny = data;
                setImage();
            });



        };



        //back button click
        $scope.backTo = function(){
            var tmp = $scope.uiRef;
            $scope.uiRef = 0;
            $location.search({});
            $scope.mainItemShow = true;
            $scope.scrollTo(tmp+"");
            $scope.selectedItem = {};
            $scope.itemSelected = false;
            $scope.showMap = false;
        };

         $scope.homeBtn= function(){
            $location.search({});
            $location.path('main/home');
        };

        //set scroll position
        $scope.scrollTo = function(id) {
            var old = $location.hash();
            $location.hash(id);
            $anchorScroll();
        };

        //get related items
        $scope.getRelatedItems = function(item){
            mainDataService.getLatestItem({skip:0,limit:16, searchText : item.searchText, group:item.group}).then(function(response){
            $scope.relatedItems = response.data.responData.data;
            $scope.relatedItemsShow = true;
        }, function(error){
            $scope.relatedItemsShow = false;
        });
        }
        


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

            mainDataService.getTagList({shop : 'all'}).then(function(response){
                $scope.tags = response.data.responData.data;
            },function(){
            });
        };
        $scope.getCategoryMenuData();

        $scope.clickMenu = function(val, category){
            $location.path('main/products/all/'+category+'/'+val.search);
        };

        $scope.clickTag = function(val){
            $location.path('main/search/'+val.key);
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
                if($location.search().itemId){
                    $scope.mainItemShow = false;
                }else{
                    $scope.mainItemShow = true;
                }
                
            },function(){
            });
        };

        // Register event handler
        $scope.paginationFuntion = function() {
            $scope.searchObj.skip = $scope.searchObj.limit;
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
                $scope.itemSelected = true;
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


        $rootScope.$on('$locationChangeSuccess', function(event){
            if(!$location.search().itemId && $scope.itemSelected){
                $scope.backTo();
            }
        });


        //get main item when there is no selected item
        if($location.search().itemId){
            $scope.mainItemShow = false;
            var id = parseInt($location.search().itemId);
            if(!$scope.selectedItem.item){
                $scope.itemSelected = true;
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
        }else{
            $scope.itemSelected = false;
        }

        var imageResize = function(url, width, height, callback) {
            var sourceImage = new Image();

            sourceImage.onload = function() {
                var canvas = document.createElement("canvas");
                var ratio= sourceImage.height/sourceImage.width;
                canvas.width = width;
                canvas.height = height*ratio;
                canvas.getContext("2d").drawImage(sourceImage, 0, 0, width, height*ratio);
                callback(canvas.toDataURL());
            };

            sourceImage.src = url;
        };

        //select image
        $scope.imageSelect = function(index){
            $scope.renderd = 0;
            $scope.selectedImage = {
                big : $scope.imageArray[index],
                small : $scope.imageArray[index],
                tiny : $scope.imageArray[index]
            };


            function setImage(){
                $scope.renderd += 1;
                if($scope.renderd == 3){
                    $scope.$apply(function(){
                        $scope.renderd = true;
                    });
                }
            }
            imageResize($scope.imageArray[index], 700, 700, function(data){
                $scope.selectedImage.big = data;
                setImage();
            });

            imageResize($scope.imageArray[index], 400, 400, function(data){
                $scope.selectedImage.small = data;
                setImage()
            });

            imageResize($scope.imageArray[index], 200, 200, function(data){
                $scope.selectedImage.tiny = data;
                setImage();
            });



        };





        //back button click
        $scope.backTo = function(){
            var tmp = $scope.uiRef;
            $scope.uiRef = 0;
            $scope.mainItemShow = true;
            $location.search({});
            $scope.scrollTo(tmp+"");
            $scope.selectedItem = {};
            $scope.itemSelected = false;
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
                if($location.search().shopId){
                    $scope.mainItemShow = false;
                }else{
                    $scope.mainItemShow = true;
                }
                
            },function(){
            });
        };


        $scope.paginationFuntion = function() {
            $scope.searchObj.skip = $scope.searchObj.limit;
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
                $scope.itemSelected = true;
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

            mainDataService.getTagList({shop : 'all'}).then(function(response){
                $scope.tags = response.data.responData.data;
            },function(){
            });
        };
        $scope.getCategoryMenuData();






        $rootScope.$on('$locationChangeSuccess', function(event){
            if(!$location.search().shopId && $scope.itemSelected){
                $scope.backTo();
            }
        });


        //get main item when there is no selected item
        if($location.search().shopId){
            $scope.mainItemShow = false;
            var id = parseInt($location.search().shopId);
            if(!$scope.selectedItem){
                $scope.itemSelected = true;
                $scope.getShopData(id);
            }
        }else{
            $scope.itemSelected = false;
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

        /*  $scope.clickTag = function(val){
         $location.path('main/products/'+$scope.selectedItem.shopId+'/'+$scope.selectParams.category+'/'+val.key);
         };*/

        //back button click
        $scope.backTo = function(){
            $location.search({});
            $scope.scrollTo($scope.selectedItem.shopId+"");
            $scope.selectedItem = {};
            $scope.itemSelected = false;
            $scope.showMap = false;
            $scope.mainItemShow = true;
            
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

    mod.controller('trendiBagController', ['$scope', '$rootScope','$state','mainDataService','$timeout','$stateParams','$location','$anchorScroll', function ($scope, $rootScope, $state, mainDataService, $timeout, $stateParams, $location, $anchorScroll) {
        $scope.selectParams = $stateParams;
        $scope.mainItemShow = false;
        $scope.mainItems = [];
        $scope.count = 0;
        $scope.uiRef = $location.search().itemId;
        $scope.selectedItem = {};
        $scope.imageArray = [];


        $scope.loadData = function(){
            $scope.mainItemShow = false;
            mainDataService.getWatchList({all:true}).then(function(response){
                $scope.mainItems = response.data.responData.data;
                if($location.search().itemId){
                    $scope.mainItemShow = false;
                }else{
                    $scope.mainItemShow = true;
                }
                
            },function(){
            });

            mainDataService.getNewProductList({skip:0, limit:18, type:2}).then(function(response){
                $scope.newProductList = response.data.responData.data;
            }, function(error){
            });

            mainDataService.getOnSaleList({skip:0, limit:18, type:1}).then(function(response){
                $scope.onSaleList = response.data.responData.data;
            }, function(error){
            });

            mainDataService.getMostSeen({skip:0,tlimit:18, type:3}).then(function(response){
                $scope.mostSeenList = response.data.responData.data;
            }, function(error){
            });
        };
        $scope.loadData();


                 $scope.moduleClick = {
            itemClicked: function (selected) {
                var shopId = selected.item.shop.shopId;
                var category = "Women";
                if(selected.item.group.women){
                    category = "Women";
                }else if(selected.item.group.men){
                    category = "Men";
                }else if(selected.item.group.kids){
                    category = "Kids";
                }
                $location.path('main/products/'+shopId+'/'+category+'/'+'all');
                $location.search('itemId', selected.itemId);
            }
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
            },
            goto: function (item) {
                $scope.selectedItem = item;
                $scope.itemSelected = true;
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


        $rootScope.$on('$locationChangeSuccess', function(event){
           if(!$location.search().itemId && $scope.itemSelected){
                $scope.backTo();
            }
        });


        //get main item when there is no selected item
        if($location.search().itemId){
            var id = parseInt($location.search().itemId);
            $scope.mainItemShow = false;
            if(!$scope.selectedItem.item){
                $scope.itemSelected = true;
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
        }else{
            $scope.itemSelected = false;
        }

        var imageResize = function(url, width, height, callback) {
            var sourceImage = new Image();

            sourceImage.onload = function() {
                var canvas = document.createElement("canvas");
                var ratio= sourceImage.height/sourceImage.width;
                canvas.width = width;
                canvas.height = height*ratio;
                canvas.getContext("2d").drawImage(sourceImage, 0, 0, width, height*ratio);
                callback(canvas.toDataURL());
            };

            sourceImage.src = url;
        };

        //select image
        $scope.imageSelect = function(index){
            $scope.renderd = 0;
            $scope.selectedImage = {
                big : $scope.imageArray[index],
                small : $scope.imageArray[index],
                tiny : $scope.imageArray[index]
            };


            function setImage(){
                $scope.renderd += 1;
                if($scope.renderd == 3){
                    $scope.$apply(function(){
                        $scope.renderd = true;
                    });
                }
            }
            imageResize($scope.imageArray[index], 700, 700, function(data){
                $scope.selectedImage.big = data;
                setImage();
            });

            imageResize($scope.imageArray[index], 400, 400, function(data){
                $scope.selectedImage.small = data;
                setImage()
            });

            imageResize($scope.imageArray[index], 200, 200, function(data){
                $scope.selectedImage.tiny = data;
                setImage();
            });



        };





        //back button click
        $scope.backTo = function(){
            var tmp = $scope.uiRef;
            $scope.uiRef = 0;
            $scope.mainItemShow = true;
            $location.search({});
            $scope.scrollTo(tmp+"");
            $scope.selectedItem = {};
            $scope.itemSelected = true;
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



    }]);  mod.controller('trendiMessageController', ['$scope', '$rootScope','$state','mainDataService','$timeout','$stateParams','$mdMedia','$mdDialog', 'Login.Window', function ($scope, $rootScope, $state, mainDataService, $timeout, $stateParams, $mdMedia, $mdDialog, Login_Window) {
       $scope.unreadCount = 0;
        $scope.draftCount = 0;
        $scope.userDetails = {};

        var inbox = 'INBOX';
        var draft = 'DRAFTS';
        var sent = 'SENT';
        var itemPerPage = 10;
        $scope.messageList =[];





        $scope.userDetails = Login_Window.checkUser();
        var userDetails = $scope.userDetails;
        $scope.format = function(from, mail){
            if($scope.userDetails.email.trim() == from.trim()){
                return "me"+(undefined == mail.REPLY?'':" ("+mail.REPLY.length+")");
            }else{
                return from+(undefined == mail.REPLY?'':" ("+mail.REPLY.length+")");
            }
        };



        $scope.searchObj = {
            skip: $scope.messageList.length,
            limit:itemPerPage,
            searchKey:'',
            searchValue:'',
            type: inbox
        };


        $scope.getCounts = function(){
            mainDataService.getMessageCount({type:inbox, read:true}).then(function(response){
                $scope.unreadCount = response.data.responData.data.count;
                mainDataService.getMessageCount({type:draft}).then(function(response){
                    $scope.draftCount = response.data.responData.data.count;
                },function(){
                    $scope.draftCount = 0;
                });
            },function(){
                $scope.unreadCount = 0;
            });


        };
        $scope.getCounts();

        $scope.changeStatus = function(data){
            if(!data.read){
                mainDataService.updateMessage(data).then(function(response){
                    data.read = true;
                    $scope.getCounts();
                     $scope.$parent.getCounts();
                },function(){
                    data.read = false;
                });
            }
        };

        $scope.loadData = function(init){
            if(init){
                $scope.messageList = [];
                $scope.searchObj.skip =0;
            }
            $scope.loading = true;
            mainDataService.getMessageList($scope.searchObj).then(function(response){
                $scope.messageList.push.apply($scope.messageList, response.data.responData.data.list);
                if(response.data.responData.data.count){
                    $scope.count = response.data.responData.data.count;
                }
                $scope.loading = false;
            },function(){
                $scope.messageList = [];
            });


        };

        $scope.paginationFuntion = function() {
            $scope.searchObj.skip = $scope.messageList.length;
            if ($scope.count > $scope.messageList.length  && !$scope.loading) {
                $scope.loadData();
            }
        };




        $scope.selectTab = function(tab){
            $scope.selectedTab = tab;
            switch (tab){
                case 0:
                    $scope.currentTab = 'Inbox';
                    $scope.searchObj.type =  inbox;
                    break;
                case 1:
                    $scope.currentTab = 'Sent';
                    $scope.searchObj.type =  sent;
                    break;
                case 2:
                    $scope.currentTab = 'Draft';
                    $scope.searchObj.type =  draft;
                    break;
            }
            $scope.loadData(1);

        };
        $scope.selectTab(0);


        $scope.composeMail = function(event, data) {

            $mdDialog.show({
                locals:{mailData: data},
                controller: DialogController,
                templateUrl: '/views/adminModule/extras/compose.mail.modal.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose:false,
                focusOnOpen:false,
                fullscreen: $mdMedia('sm') && $scope.customFullscreen
            })
                .then(function(answer) {

                    mainDataService.sendMessage({message:answer}).then(function(response){
                        $scope.loadData(1);
                    },function(){
                        $scope.composeMail(event, answer);
                    });


                }, function() {

                });
            $scope.$watch(function() {
                return $mdMedia('sm');
            }, function(sm) {
                $scope.customFullscreen = (sm === true);
            });
        };

        function DialogController($scope, $mdDialog, mailData){
            $scope.sendClicked = true;
            $scope.mail = {};
            $scope.mail.to = mailData?mailData.to:'';
            $scope.mail.subject = mailData?mailData.subject:'';
            $scope.mail.message = mailData?mailData.message:'';

            $scope.hide = function() {
                $mdDialog.hide();
            };
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            $scope.answer = function(answer) {
                $scope.sendClicked = false;
                $mdDialog.hide(answer);
            };

        }


        $scope.replyMailClick = function(event, data, type, rplyMsg) {
            if(type == 0){
                $scope.changeStatus(data);
            }
            $mdDialog.show({
                locals:{mailData: data, type:type, rplyMsg:rplyMsg},
                controller: ReplyDialogController,
                templateUrl: '/views/adminModule/extras/reply.mail.modal.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose:false,
                focusOnOpen:false,
                fullscreen: $mdMedia('sm') && $scope.customFullscreen
            })
                .then(function(answer) {
                    mainDataService.replyMessage({message:answer}).then(function(response){
                        $scope.loadData(1);
                    },function(){
                        $scope.replyMailClick(answer, event, type, rplyMsg);
                    });


                }, function() {

                });
            $scope.$watch(function() {
                return $mdMedia('sm');
            }, function(sm) {
                $scope.customFullscreen = (sm === true);
            });
        };

        function ReplyDialogController($scope, $mdDialog, mailData, type, rplyMsg){
            $scope.replyClicked = true;
            $scope.rplyMail = mailData?mailData:{};
            $scope.replyMail = {};
            $scope.replyMail.replyId = mailData?mailData.id:'';
            if(userDetails.email.trim() == mailData.from.trim()){
                $scope.replyMail.to = mailData?mailData.to:'';
            }else{
                $scope.replyMail.to = mailData?mailData.from:'';
            }

            $scope.replyMail.message = rplyMsg?rplyMsg:'';

            $scope.hide = function() {
                $mdDialog.hide();
            };
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            $scope.answer = function(answer) {
                $scope.replyClicked = false;
                $mdDialog.hide(answer);
            };

        }


    }]);


})(com.TRENDI.CATEGORY.modules.mainTrendiModule);
