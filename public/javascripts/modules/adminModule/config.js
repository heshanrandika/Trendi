/**
 * Created by Heshanr on 5/25/2015.
 */
(function (mod) {
    "use strict";

    var defs = {
        URL_CONFIG: {
            'admin': {
                url: '/admin',
                templateUrl: 'views/adminModule/admin.master.html',
                controller: 'adminMasterController'

            },
          /*  'admin.login': {
                url: '/login',
                templateUrl: 'views/adminModule/admin.login.html',
                controller: 'adminAuthController'
            },*/

            'admin.items': {
                url: '/items',
                templateUrl: 'views/adminModule/admin.items.html',
                controller: 'adminItemController',
                access: {
                    requiresLogin: true
                }
            },

            'admin.shops': {
                url: '/shops',
                templateUrl: 'views/adminModule/admin.shops.html',
                controller: 'adminShopsController',
                access: {
                    requiresLogin: true
                }
            },

            'admin.promotions': {
                url: '/promotions',
                templateUrl: 'views/adminModule/admin.promotions.html',
                controller: 'adminPromotionsController',
                access: {
                    requiresLogin: true
                }
            },

            'admin.users': {
                url: '/users',
                templateUrl: 'views/adminModule/admin.users.html',
                controller: 'adminUsersController',
                access: {
                    requiresLogin: true
                }
            },

            'admin.branches': {
                url: '/branches',
                templateUrl: 'views/adminModule/admin.branches.html',
                controller: 'adminBranchesController',
                access: {
                    requiresLogin: true
                }
            },

            'admin.blogs': {
                url: '/blogs',
                templateUrl: 'views/adminModule/admin.blogs.html',
                controller: 'adminBlogsController',
                access: {
                    requiresLogin: true
                }
            }

        },
        REQ_CONFIG: {

            FUNC_GetSubItem:      1004,
            FUNC_AddItems:        1003,
            FUNC_UpdateItem:      1007,
            FUNC_RemoveItems:     1000,
            FUNC_GetItemList:     1010,
            //++++++shop function list++++++++++++++++
            FUNC_GetShopList:     2008,
            FUNC_RegisterShop:    2009,
            FUNC_GetEntitlements: 2010,
            FUNC_GetBranchList:   2011,
            FUNC_GetUserList:     2012,
            FUNC_AdminUpdateShop: 2013,
            FUNC_GetBannerImage:  2014,
            //++++++++branch function list++++++++++++
            FUNC_AddBranch:       2003
        },
        MENU_CONFIG:[
            {
                value:'Shop Configurations',
                key:'admin.shops',
                authorization: 2008
            },
            {
                value:'Item Configurations',
                key:'admin.items',
                authorization: 1010
            },
            {
                value:'User Configurations',
                key:'admin.users',
                authorization: 3000
            },
            {
                value:'Branch Configurations',
                key:'admin.branches',
                authorization: 2011
            }
        ]


    };

    mod.config(['$provide', function ($provide) {
        $provide.constant('ADMIN_MOD_CONFIG', {
            'URL_CONFIG': defs.URL_CONFIG,
            'REQ_CONFIG': defs.REQ_CONFIG,
            'MENU_CONFIG':defs.MENU_CONFIG
        });

    }]);

    mod.config(['$stateProvider','$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {
        _.each(defs.URL_CONFIG, function (e, k) {
            $stateProvider.state(k, e);
        });
        $urlRouterProvider.otherwise('/admin/login');
    }]);

    mod.config(['$mdIconProvider', function($mdIconProvider) {
        $mdIconProvider
            .iconSet('social', 'images/svg/social-icons.svg', 24)
            .iconSet('communication', 'images/svg/test.svg', 24)
            .defaultIconSet('images/svg/core-icons.svg', 24);
    }])

})(com.TRENDI.CATEGORY.modules.adminModule);
