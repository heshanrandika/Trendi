/**
 * Created by Heshanr on 5/25/2015.
 */
(function (mod) {
    "use strict";

    var defs = {
        URL_CONFIG: {
            'main': {
                url: '/main',
                templateUrl: 'views/mainModule/main.html',
                controller: 'trendiMainController'
            },
            'main.home': {
                url: '/home',
                templateUrl: 'views/mainModule/main.home.html',
                controller: 'trendiMainHomeController'

            },
            'main.products': {
                url: '/products/:shop/:category/:selected',
                templateUrl: 'views/mainModule/main.product.html',
                controller: 'trendiMainProductsController'

            },
            'main.shops': {
                url: '/shop/:selected',
                templateUrl: 'views/mainModule/main.shop.html',
                controller: 'trendiShopProductsController'

            }

        },REQ_CONFIG: {
            FUNC_GetLatestItem:         1001,
            FUNC_GetMostTrendyItems:    1002,
            FUNC_GetSubItem:            1004,
            FUNC_GetRelatedItems:       1005,
            FUNC_GetCommonItemList:     1008,
            FUNC_GetMainItemList:       1009,
            FUNC_GetSearchList:         1012,
            FUNC_GetItemCount:          1013,
            FUNC_GetMainItem:           1014,
            FUNC_GetShopList:           2000,
            FUNC_GetRatedShopList:      2001,
            FUNC_GetNearestShopList:    2002,
            FUNC_GetShop:               2004,
            FUNC_GetPromotionList:      3000,
            FUNC_GetRatedPromotionList: 3001,
            FUNC_GetPromotion:          3005,
            FUNC_GetBlogList:           6000



        }

    };

    mod.config(['$provide', function ($provide) {
        $provide.constant('MAIN_MOD_CONFIG', {
            URL_CONFIG: defs.URL_CONFIG,
            REQ_CONFIG: defs.REQ_CONFIG
        });

    }]);

    mod.config(['$stateProvider','$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {
        _.each(defs.URL_CONFIG, function (e, k) {
            $stateProvider.state(k, e);
        });
        $urlRouterProvider.otherwise('/err');
    }]);

})(com.TRENDI.CATEGORY.modules.mainTrendiModule);
