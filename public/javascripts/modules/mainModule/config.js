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
            'main.search': {
                url: '/search/:term',
                templateUrl: 'views/mainModule/main.search.html',
                controller: 'trendiMainSearchController'

            },
            'main.shops': {
                url: '/shop',
                templateUrl: 'views/mainModule/main.shop.html',
                controller: 'trendiShopProductsController'

            },
            'main.deals': {
                url: '/deals/:shop/:selected',
                templateUrl: 'views/mainModule/main.deal.html',
                controller: 'trendiMainDealController'

            },
            'main.bag': {
                url: '/bag',
                templateUrl: 'views/mainModule/main.bag.html',
                controller: 'trendiBagController'

            },
            'main.message': {
                url: '/message',
                templateUrl: 'views/mainModule/main.message.html',
                controller: 'trendiMessageController'

            },
            'main.offers': {
                url: '/offers/:bank/:shop',
                templateUrl: 'views/mainModule/main.offers.html',
                controller: 'trendiMainOffersController'

            },
            'main.contact': {
                url: '/contact',
                templateUrl: 'views/mainModule/main.contact.html',
                controller: 'trendiContactController'

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
            FUNC_GetItemMenu:           1015,
            FUNC_SetRate:               1016,
            FUNC_GetSizes:              1017,
            FUNC_GetShopList:           2000,
            FUNC_GetRatedShopList:      2001,
            FUNC_GetNearestShopList:    2002,
            FUNC_GetShop:               2004,
            FUNC_GetShopBanner:         2014,
            FUNC_GetMapMarker:          2021,
            FUNC_GetPromotionList:      3000,
            FUNC_GetRatedPromotionList: 3001,
            FUNC_GetPromotion:          3005,   
            FUNC_GetBlogList:           6004,
            FUNC_GetTagList:            7001,
            FUNC_GetBrandList :         7010,
            FUNC_GetBankList :          7020,
            FUNC_AddComment:            8000,
            FUNC_RemoveComment:         8001,
            FUNC_GetCommentList:        8002,
            FUNC_AddToWatchList:        9000,
            FUNC_RemoveFromWatchList:   9001,
            FUNC_GetWatchList:          9002,
            FUNC_GetMessageList  :      5000,
            FUNC_SendMessage:           5001,
            FUNC_ReplyMessage  :        5002,
            FUNC_UpdateMessage:         5003,
            FUNC_GetUnreadMessageList:  5004,
            FUNC_GetMessageCount  :     5005



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
        $urlRouterProvider.otherwise('/main/home');
    }]);

})(com.TRENDI.CATEGORY.modules.mainTrendiModule);
