/**
 * Created by Heshanr on 5/28/2015.
 */
(function (mod) {
    "use strict";
    mod.directive('trendiFractionSlider',['$timeout',function($timeout){
        return {
            restrict: 'E',
            replace: true,
            require:'ngModel',
            scope: {
                slidearray: '=',
                type: '@'
            },
            template: '<div class="">'+
            '<img ng-repeat="slide in slides" ng-if="isCurrentSlideIndex($index)" ng-src="{{slide.src}}" class="">'+
            '<img ng-repeat="slide in slides" ng-if="slide.show" ng-src="{{slide.src}}" width="10%" ng-style="">'+
            '</div>',
            link: function(scope, elm, attrs) {
                scope.slides = scope.slidearray;

                var INTERVAL = 3000;

                function setCurrentSlideIndex(index) {
                    scope.currentIndex = index;
                }

                function isCurrentSlideIndex(index) {
                    return scope.currentIndex === index;
                }

                function nextSlide() {
                    scope.currentIndex = (scope.currentIndex < scope.slides.length - 1) ? ++scope.currentIndex : 0;
                    $timeout(nextSlide, INTERVAL);
                }

                function loadSlides() {
                    $timeout(nextSlide, INTERVAL);
                }

                //  scope.slides = slides;
                scope.currentIndex = 0;
                scope.setCurrentSlideIndex = setCurrentSlideIndex;
                scope.isCurrentSlideIndex = isCurrentSlideIndex;

                loadSlides();
            }
        };
    }]);

    mod.directive('trendiSearchOption',['mainDataService',function(mainDataService) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                shopoption : '='
            },
            templateUrl:'/views/coreModule/menu/trendi.menu.option.html',
            link: function(scope, elm, attrs) {
                scope.colorPalletShow = true;
                scope.sizePalletShow = true;
                scope.shopoption.priceChange = 0;
                scope.colorMenu = {
                    colors:[
                        {'class':'icon-color icon-color-black', 'txt':'Black', 'value':'#000000'},
                        {'class':'icon-color icon-color-blue', 'txt':'Blue', 'value':'#0000FF'},
                        {'class':'icon-color icon-color-brown', 'txt':'Brown', 'value':'#A52A2A'},
                        {'class':'icon-color icon-color-gray', 'txt':'Gray', 'value':'#808080'},
                        {'class':'icon-color icon-color-green', 'txt':'Green', 'value':'#00FF00'},
                        {'class':'icon-color icon-color-magneta', 'txt':'Magenta', 'value':'#FF00FF'},
                        {'class':'icon-color icon-color-pink', 'txt':'Pink', 'value':'#FFC0CB'},
                        {'class':'icon-color icon-color-red', 'txt':'Red', 'value':'#FF0000'},
                        {'class':'icon-color icon-color-white', 'txt':'White', 'value':'#FFFFFF'}
                    ]
                };
                scope.sizeMenu = {
                    sizes:[]
                };

                mainDataService.getSizes({}).then(function(response){
                    scope.sizeMenu.sizes = response.data.responData.data[0].sizes;
                });



                scope.clickExpand = function(item){
                    item.expand = !item.expand
                };

                scope.clickItem = function(val , type){
                    val.select = false;
                    switch(type){
                        case 'color' :
                            scope.colorPalletShow = false;
                            scope.shopoption.color = val;
                            break;

                        case 'size' :
                            scope.sizePalletShow = false;
                            scope.shopoption.size = val;
                            break;
                    }
                };

                scope.removeOption = function(key){
                    switch(key){
                        case 'color' :
                            scope.colorPalletShow = true;
                            scope.shopoption.color = {};
                            //delete scope.shopoption.color;
                            break;

                        case 'size' :
                            scope.sizePalletShow = true;
                            scope.shopoption.size = {};
                            //delete scope.shopoption.size;
                            break;
                    }
                };

                scope.rangeValue = {
                    range:{
                        min:0,
                        max:10000
                    },
                    minPrice:0,
                    maxPrice:10000
                };


                scope.setValue = function(){
                    scope.shopoption.priceChange += 1;
                    scope.shopoption.minPrice = scope.rangeValue.minPrice;
                    scope.shopoption.maxPrice = scope.rangeValue.maxPrice;
                }
            }
        };
    }]);


    mod.directive('zoom2', ['$compile',
        function($compile) {
            return {
                restrict: 'AC',
                scope: {
                    tiny: "=",
                    small: "=",
                    big: "=",
                    title: "@"
                },

                controller: ["$scope", "$attrs", "$element", "$compile",
                    function($scope, $attrs, $element, $compile) {

                        $scope.init = function() {


                            $scope.$watch('tiny + small + big + title', function(newValue, oldValue) {
                                console.log("in watch.");


                                var str = ' <a href="' + $scope.big + '" class="cloud-zoom" rel="adjustX: 10, adjustY:-4">' +
                                    '<img src="' + $scope.small + '"/></a>';
                                var e = $compile(str)($scope);

                                $element.html(e);

                                $(".cloud-zoom, .cloud-zoom-gallery").CloudZoom();

                            }, true);

                        };

                        $scope.init();

                    }
                ]

            };
        }
    ]);

    mod.directive('trendiWatchListAdd',['mainDataService','Login.Window','$rootScope',function(mainDataService, Login_Window, $rootScope){
        return {
            restrict: 'E',
            replace: true,
            scope: {
                itemId: '='
            },
            template: '<div>'+
            '<button class="btn btn-mega btn-lg" type="submit" ng-click="addToWatchList()"> Add to Bag</button>'+
            '</div>',

            link: function(scope, elm, attrs) {
                scope.addToWatchList = function(){
                    var user = Login_Window.checkUser();
                    if(user){
                        mainDataService.addToWatchList({itemId: scope.itemId}).then(function(response){
                            if (user.watchList.indexOf(scope.itemId) == -1) {
                                user.watchList.push(scope.itemId);
                                $rootScope.$broadcast('event:trendi-add-to-bag');
                            }

                        },function(){
                        });
                    }else{
                        var login = Login_Window.showLogin();
                        if(login){
                            mainDataService.addToWatchList({itemId: scope.itemId}).then(function(response){
                                if (user.watchList.indexOf(scope.itemId) == -1) {
                                    user.watchList.push(scope.itemId);
                                    $rootScope.$broadcast('event:trendi-add-to-bag');
                                }
                            },function(){
                            });
                        }
                    }
                }
            }
        };
    }]);

    mod.directive('trendiBag',['mainDataService','Login.Window','$location',function(mainDataService, Login_Window, $location){
        return{
            restrict:'E',
            scope:{
                listSize:'='
            },
            templateUrl: function(elem,attrs) {
                var url = '/views/mainModule/directiveViews/'+(attrs.template? attrs.template : 'main.bag.small')+'.html';
                return url;
            },
            link:function(scope, elm, attrs){
                scope.user = Login_Window.checkUser();

                scope.loadItem = function(){
                    scope.listSize = scope.user.watchList.length;
                    mainDataService.getWatchList({all:false}).then(function(response){
                        scope.itemList = response.data.responData.data;
                    },function(){
                    });
                };
                if(scope.user){
                    scope.loadItem();
                }

                scope.openBagFunction = function(){
                    scope.user = Login_Window.checkUser();
                    if(scope.user){
                        scope.openBag = !scope.openBag;
                        if(scope.openBag){
                            scope.loadItem();
                        }
                    }else{
                        scope.listSize = 0;
                    }
                };

                scope.closeBag = function(){
                    scope.openBag = false;
                };

                scope.viewBag = function(){
                    scope.openBag = false;
                    delete $location.$$search.itemId;
                    $location.path('main/bag');
                };

                scope.itemClicked = function (selected) {
                    $location.path('main/bag');
                    $location.search('itemId', selected.itemId);
                    scope.openBag = false;
                };


                scope.itemRemove = function (selected) {
                    mainDataService.removeFromWatchList({itemId:selected.itemId}).then(function(response){
                        scope.loadItem();
                        scope.user.watchList =  _.filter(scope.user.watchList, function(n) {
                               return n != selected.itemId;
                        });
                        scope.listSize = scope.user.watchList.length;
                    },function(){
                    });
                };

                scope.$on('event:trendi-signin-success', function (event,authResult) {

                    scope.user = Login_Window.checkUser();
                    if(scope.user){
                        scope.loadItem();
                    }else{
                        scope.itemList = [];
                        scope.listSize = 0;
                    }
                });

                scope.$on('event:trendi-add-to-bag', function (event,authResult) {

                    scope.user = Login_Window.checkUser();
                    if(scope.user){
                        scope.loadItem();
                    }else{
                        scope.itemList = [];
                        scope.listSize = 0;
                    }
                });

                scope.$on('event:trendi-bag-item-remove', function (event,item) {
                    scope.itemRemove(item);
                });
            }
        }
    }]);


    mod.directive('trendiMessageSmall',['mainDataService','Login.Window',function(mainDataService, Login_Window){
        return{
            restrict:'E',
            templateUrl:'/views/mainModule/directiveViews/main.message.small.html',
            scope:{
                itemObj : '=',
                shop : '='
            },
            link:function(scope, elm, attrs){
                scope.user = Login_Window.checkUser();

                if(scope.itemObj){
                    scope.shopMail = scope.itemObj.item.shop.shopEmail;
                }else if(scope.shop){
                    scope.shopMail = scope.shop.shopEmail;
                }

                scope.openMessageFunction = function(){
                    scope.user = Login_Window.checkUser();
                    if(scope.user){
                        scope.openMessage = !scope.openMessage;
                        if(scope.openMessage){
                            scope.loadItem();
                        }
                    }

                };

                scope.closeMessage = function(){
                    scope.openMessage = false;
                };

            }
        }
    }]);

    mod.directive('trendiComment',['mainDataService','Login.Window',function(mainDataService, Login_Window){
        return{
            restrict:'E',
            templateUrl:'/views/mainModule/directiveViews/main.comment.html',
            scope:{
                id : "=",
                category:"@"
            },
            link:function(scope, elm, attrs){

                scope.user = Login_Window.checkUser();
                scope.typedComment = '';
                scope.getCommentList = function(){
                    var query = {};
                    if(scope.category == 'item'){
                        query = {itemId : scope.id};
                    }else{
                        query = {shopId : scope.id};
                    }
                    mainDataService.getCommentList(query).then(function(response){
                        scope.commentResponse =  response.data.responData.data;
                    },function(){
                        scope.commentResponse =  {};
                    });
                };
                scope.getCommentList();


                scope.commentPost= function(event){
                    if(event.keyCode == 13 && scope.typedComment != ''){
                        var commentObject = {
                            user : scope.user.email,
                            name : scope.user.name?scope.user.name:'unknown',
                            comment : scope.typedComment
                        };
                        scope.typedComment = '';
                        var query = {};
                        if(scope.category == 'item'){
                            query = {itemId : scope.id, comment:commentObject};
                        }else{
                            query = {shopId : scope.id, comment:commentObject};
                        }
                        mainDataService.addComment(query).then(function(response){
                            scope.typedComment = '';
                            scope.getCommentList();
                        },function(){
                            scope.typedComment = commentObject.comment;
                        });
                    }
                };

                scope.removePost= function(commnt, commntObj){
                    if(commnt.user == scope.user.email){
                        mainDataService.removeComment({itemId : commntObj.itemId, comId:commnt.comId}).then(function(response){
                            scope.getCommentList();
                        },function(){
                        });
                    }
                };

            }
        }
    }]);


    mod.directive("outsideClick", ['$document','$parse', function( $document, $parse ){
        return {
            link: function( $scope, $element, $attributes ){
                var scopeExpression = $attributes.outsideClick,
                    onDocumentClick = function(event){
                        var isChild = $element.find(event.target).length > 0;

                        if(!isChild) {
                            $scope.$apply(scopeExpression);
                        }
                    };

                $document.on("click", onDocumentClick);

                $element.on('$destroy', function() {
                    $document.off("click", onDocumentClick);
                });
            }
        }
    }]);

    mod.directive('trendiFbShare',['mainDataService','Login.Window','ngFB',function(mainDataService, Login_Window, ngFB){
        return{
            restrict:'E',
            template:'<a ng-click="share()"  class="circle"><span class="icon-facebook"></span></a>',
            scope:{
            },
            link:function(scope, elm, attrs){
                scope.user = Login_Window.checkUser();
                scope.share = function () {
                    ngFB.api({
                        method: 'POST',
                        path: '/me/feed',
                        params: {
                            message: "I'll be attending: by"
                        }
                    }).then(
                        function () {
                            alert('The session was shared on Facebook');
                        },
                        function () {
                            alert('An error occurred while sharing this session on Facebook');
                        });
                };

            }
        }
    }]);

    mod.directive('trendiShopList',['mainDataService',function(mainDataService){
        return{
            restrict:'E',
            templateUrl:'/views/mainModule/directiveViews/main.shoplist.html',
            scope:{
                selctedShop : "=",
                selectedShopName : "="
            },
            link:function(scope, elm, attrs){
                scope.shopList = [{name:'All', shopId:'all'}];
                mainDataService.getShopList().then(function(response){
                    scope.shopList.push.apply(scope.shopList, response.data.responData.data.list);
                    scope.getShopName();
                },function(){
                });

                scope.clickMenu = function(shop){
                    scope.selctedShop = shop.shopId;
                    scope.getShopName();
                }

                scope.getShopName = function(){
                    _.each( scope.shopList, function(k){
                        if(k.shopId == scope.selctedShop){
                            scope.selectedShopName = k.shop.name;
                        }
                    })
                }

            }
        }
    }]);

    mod.directive('trendiTopBar',['mainDataService','$stateParams',function(mainDataService, $stateParams){
        return{
            restrict:'E',
            templateUrl:'/views/mainModule/directiveViews/main.top.bar.html',
            scope:{},
            link:function(scope, elm, attrs){
                if($stateParams.shop != 'all'){
                    var shopId = parseInt($stateParams.shop);
                    mainDataService.getShop({shopId : shopId}).then(function(response){
                        scope.shop =  response.data.responData.data;
                    },function(){
                    });
                }
                

                scope.category = $stateParams.category;
                scope.selected = $stateParams.selected;

            }
        }
    }]);


})(com.TRENDI.CATEGORY.modules.mainTrendiModule);