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

            'admin.extras': {
                url: '/extras',
                templateUrl: 'views/adminModule/admin.extras.html',
                controller: 'adminExtrasController',
                access: {
                    requiresLogin: true
                }
            },

            'admin.extras.profile': {
                url: '/profile',
                data:{
                    'currentTab': 0
                },
                views :{
                    'profile':{
                        controller:'adminExtraProfileController',
                        templateUrl: 'views/adminModule/extras/admin.extras.profile.html',
                        access: {
                            requiresLogin: true
                        }
                    }
                }

            },

            'admin.extras.message': {
                url: '/message',
                data:{
                    'currentTab': 1
                },
                views :{
                    'message':{
                        controller:'adminExtraMessageController',
                        templateUrl: 'views/adminModule/extras/admin.extras.message.html',
                        access: {
                            requiresLogin: true
                        }
                    }
                }

            },

            'admin.extras.tags': {
                url: '/tags',
                data:{
                    'currentTab': 2
                },
                views :{
                    'tag':{
                        controller:'adminExtraTagsController',
                        templateUrl: 'views/adminModule/extras/admin.extras.tags.html',
                        access: {
                            requiresLogin: true
                        }
                    }
                }

            },

            'admin.extras.blog': {
                url: '/blog',
                data:{
                    'currentTab': 3
                },
                views :{
                    'blog':{
                        controller:'adminExtraBlogController',
                        templateUrl: 'views/adminModule/extras/admin.extras.blog.html',
                        access: {
                            requiresLogin: true
                        }
                    }
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
            FUNC_AddBranch:       2003,
            FUNC_UpdateBranch:    2006,
            FUNC_RemoveBranch:    2005,
            //+++++++shop user function list +++++++++
            FUNC_AdminGetUserList:2016,
            FUNC_AddShopUser:     2007,
            FUNC_RemoveShopUser:  2018,
            FUNC_UpdateShopUser:  2017,
            //+++++++promotion function list++++++++++
            FUNC_AdminGetPromotionList:  3000,
            FUNC_AddPromotion:    3003,
            FUNC_UpdatePromotion: 3004,
            FUNC_RemovePromotion: 3005,
            //++++++Extra function list+++++++++++++++
            FUNC_AdminGetUser :   2015,
            FUNC_AdminResetPwd :  4002,
            FUNC_AdminGetBlogList :     6000,
            FUNC_insertBlog :     6002,
            FUNC_RemoveBlog :     6003,
            FUNC_UpdateBlog :     6005


        },
        MENU_CONFIG:[
            {
                value:'Shops ',
                key:'admin.shops',
                authorization: 2008
            },
            {
                value:'Items ',
                key:'admin.items',
                authorization: 1010
            },
            {
                value:'Users ',
                key:'admin.users',
                authorization: 2016
            },
            {
                value:'Branches ',
                key:'admin.branches',
                authorization: 2011
            },
            {
                value:'Promotions ',
                key:'admin.promotions',
                authorization: 3000
            },
            {
                value:'Extras ',
                key:'admin.extras.profile',
                authorization: 3000
            }

        ],

        EXTRA_MENU_CONFIG:[
            {
                value:'Profile ',
                key:'admin.extras.profile',
                view:'profile',
                authorization: 3000
            },
            {
                value:'Messages ',
                key:'admin.extras.message',
                view:'message',
                authorization: 3000
            },
            {
                value:'Tags ',
                key:'admin.extras.tags',
                view:'message',
                authorization: 3000
            },
            {
                value:'Blog ',
                key:'admin.extras.blog',
                view:'message',
                authorization: 3000
            }
        ]


    };

    mod.config(['$provide', function ($provide) {
        $provide.constant('ADMIN_MOD_CONFIG', {
            'URL_CONFIG': defs.URL_CONFIG,
            'REQ_CONFIG': defs.REQ_CONFIG,
            'MENU_CONFIG':defs.MENU_CONFIG,
            'EXTRA_MENU_CONFIG':defs.EXTRA_MENU_CONFIG
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
