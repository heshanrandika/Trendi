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
            mainDataService.getItemCount().then(function(response){
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




        $scope.isotopPagination = {
            searchFromServer: function (d) {
                $scope.paginationFuntion();
            },
            goto: function (id) {
                $scope.uiRef = id;
                $location.search('itemId', id);
                $scope.scrollTo('back-btn');
            }

        };

        $scope.clickMenu = function(val){
            $location.path('main/products/'+$scope.selectParams.category+'/'+val.value);
        };

        $scope.backTo = function(){
            var tmp = $scope.uiRef;
            $scope.uiRef = 0;
            $location.search({});
            $scope.scrollTo(tmp+"");
        };


        $scope.scrollTo = function(id) {
            var old = $location.hash();
            $location.hash(id);
            $anchorScroll();
        }

    }]);


})(com.TRENDI.CATEGORY.modules.mainTrendiModule);
