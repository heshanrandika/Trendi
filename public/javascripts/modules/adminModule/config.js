/**
 * Created by Heshanr on 5/25/2015.
 */
(function (mod) {
    "use strict";

    var defs = {
        URL_CONFIG: {
            'admin.view': {
                url: '/admin',
                templateUrl: 'views/adminModule/adminHome.html',
                controller: 'adminController'
            }

        },REQ_CONFIG: {
            FUNC_GetItem:         1001,
            FUNC_AddItems:        1002,
            FUNC_UpdateItem:      1004,
            FUNC_RemoveItems:     1005,
            FUNC_GetItemList:     1008
        }
    };

    mod.config(['$provide', function ($provide) {
        $provide.constant('ADMIN_MOD_CONFIG', {
            'URL_CONFIG': defs.URL_CONFIG,
            'REQ_CONFIG': defs.REQ_CONFIG
        });

    }]);

    mod.config(['$stateProvider','$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {
        _.each(defs.URL_CONFIG, function (e, k) {
            $stateProvider.state(k, e);
        });

    }]);

})(com.TRENDI.CATEGORY.modules.adminModule);
