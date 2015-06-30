/**
 * Created by Heshanr on 5/25/2015.
 */
(function (mod) {
    "use strict";

    var defs = {
        URL_CONFIG: {
            'shop.view': {
                url: '/shop',
                templateUrl: 'views/shopModule/shopHome.html',
                controller: 'shopHomeController'
            }

        }
    };

    mod.config(['$provide', function ($provide) {
        $provide.constant('SHOP_MOD_CONFIG', {
            'URL_CONFIG': defs.URL_CONFIG
        });

    }]);

    mod.config(['$stateProvider','$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {
        _.each(defs.URL_CONFIG, function (e, k) {
            $stateProvider.state(k, e);
        });

    }]);

})(com.TRENDI.CATEGORY.modules.shopModule);
