/**
 * Created by Heshanr on 5/25/2015.
 */
(function (mod) {
    "use strict";

    var defs = {
        URL_CONFIG: {
            'main': {
                url: '/main',
                templateUrl: 'views/mainModule/mainTemplate.html',
                controller: 'trendiMainController'
            },
            'ladies': {
                url: '/ladies',
                templateUrl: 'views/ladiesModule/ladiesHome.html',
                controller: 'ladiesHomeController'
            },
            'gents': {
                url: '/gents',
                templateUrl: 'views/gentsModule/gentsHome.html',
                controller: 'gentsHomeController'
            },
            'babies': {
                url: '/babies',
                templateUrl: 'views/babiesModule/babiesHome.html',
                controller: 'babiesHomeController'
            },
            'shop': {
                url: '/shop',
                templateUrl: 'views/shopModule/shopHome.html',
                controller: 'shopHomeController'
            }

        },REQ_CONFIG: {
            FUNC_1000: 1000,
            FUNC_1001: 1001
        }

    };

    mod.config(['$provide', function ($provide) {
        $provide.constant('MAIN_MOD_CONFIG', {
            'URL_CONFIG': defs.URL_CONFIG
        });

    }]);

    mod.config(['$stateProvider','$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {
        _.each(defs.URL_CONFIG, function (e, k) {
            $stateProvider.state(k, e);
        });

    }]);

})(com.TRENDI.CATEGORY.modules.mainTrendiModule);
