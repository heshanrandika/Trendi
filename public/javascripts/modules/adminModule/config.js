/**
 * Created by Heshanr on 5/25/2015.
 */
(function (mod) {
    "use strict";

    var defs = {
        URL_CONFIG: {

            'main': {
                url: '/main',
                templateUrl: '/views/adminModule/admin.master.html',
                controller: 'masterCtrl',
                access: {
                    requiresLogin: true
                }
            },
            'main.products': {
                url: '/products',
                templateUrl: '/views/adminModule/admin.items.html',
                controller: 'adminItemController',
                access: {
                    requiresLogin: true
                }

            },

            'main.users': {
                url: '/users',
                templateUrl: '/views/adminModule/admin.users.html',
                controller: 'adminUsersController',
                access: {
                    requiresLogin: true
                }
            },

            'main.branches': {
                url: '/branches',
                templateUrl: '/views/adminModule/admin.branches.html',
                controller: 'adminBranchesController',
                access: {
                    requiresLogin: true
                }
            },


            'main.promotions': {
                url: '/promotions',
                templateUrl: '/views/adminModule/admin.promotions.html',
                controller: 'adminPromotionsController',
                access: {
                    requiresLogin: true
                }
            }
            /*         'admin.shops': {
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

             },




             'admin.sysitems': {
             url: '/sysitems',
             templateUrl: 'views/adminModule/sysAdmin/sys.admin.items.html',
             controller: 'sysAdminItemController',
             access: {
             requiresLogin: true
             }
             },

             'admin.sysshops': {
             url: '/sysshops',
             templateUrl: 'views/adminModule/sysAdmin/sys.admin.shops.html',
             controller: 'sysAdminShopsController',
             access: {
             requiresLogin: true
             }
             },

             'admin.syspromotions': {
             url: '/syspromotions',
             templateUrl: 'views/adminModule/sysAdmin/sys.admin.promotions.html',
             controller: 'sysAdminPromotionsController',
             access: {
             requiresLogin: true
             }
             },

             'admin.sysusers': {
             url: '/sysusers',
             templateUrl: 'views/adminModule/sysAdmin/sys.admin.users.html',
             controller: 'sysAdminUsersController',
             access: {
             requiresLogin: true
             }
             },

             'admin.sysextras': {
             url: '/sysextras',
             templateUrl: 'views/adminModule/sysAdmin/sys.admin.extras.html',
             controller: 'sysAdminExtrasController',
             access: {
             requiresLogin: true
             }
             },

             'admin.sysextras.profile': {
             url: '/sysprofile',
             data:{
             'currentTab': 0
             },
             views :{
             'profile':{
             controller:'sysAdminExtraProfileController',
             templateUrl: 'views/adminModule/extras/admin.extras.profile.html',
             access: {
             requiresLogin: true
             }
             }
             }

             },

             'admin.sysextras.message': {
             url: '/sysmessage',
             data:{
             'currentTab': 1
             },
             views :{
             'message':{
             controller:'sysAdminExtraMessageController',
             templateUrl: 'views/adminModule/extras/admin.extras.message.html',
             access: {
             requiresLogin: true
             }
             }
             }

             },

             'admin.sysextras.tags': {
             url: '/systags',
             data:{
             'currentTab': 2
             },
             views :{
             'tag':{
             controller:'sysAdminExtraTagsController',
             templateUrl: 'views/adminModule/extras/admin.extras.tags.html',
             access: {
             requiresLogin: true
             }
             }
             }

             },

             'admin.sysextras.blog': {
             url: '/sysblog',
             data:{
             'currentTab': 3
             },
             views :{
             'blog':{
             controller:'sysAdminExtraBlogController',
             templateUrl: 'views/adminModule/extras/admin.extras.blog.html',
             access: {
             requiresLogin: true
             }
             }
             }

             }*/

        },
        REQ_CONFIG: {

            FUNC_GetSubItem:      1004,
            FUNC_AddItems:        1003,
            FUNC_UpdateItem:      1007,
            FUNC_RemoveItems:     1011,
            FUNC_GetItemList:     1010,
            FUNC_AdminGetItemList:1000,
            FUNC_GetSizes:        1017,
            FUNC_ChangeSizes:     1018,
            //++++++shop function list++++++++++++++++
            FUNC_GetShopList:     2008,
            FUNC_RegisterShop:    2009,
            FUNC_GetEntitlements: 2010,
            FUNC_GetBranchList:   2011,
            FUNC_GetUserList:     2012,
            FUNC_AdminUpdateShop: 2013,
            FUNC_GetBannerImage:  2014,
            FUNC__GetBranchListToAssign:  2019,
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
            FUNC_UpdateBlog :     6005,
            FUNC_AdminGetTagList :      7000,
            FUNC_GetTagList :     7001,
            FUNC_AddTag     :     7002,
            FUNC_RemoveTag  :     7003,
            FUNC_GetMessageList  :      5000,
            FUNC_SendMessage:     5001,
            FUNC_ReplyMessage  :  5002,
            FUNC_UpdateMessage  : 5003,
            FUNC_GetUnreadMessageList  :5004,
            FUNC_GetMessageCount  :5005



        },
        MENU_CONFIG:[
               {
                value:'Shops',
                key:'main.shops',
                authorization: 2008,
                icon:'icon-home'
            },
            {
                value:'Products',
                key:'main.products',
                authorization: 1010,
                icon:'icon-bag'
            },
            {
                value:'Users',
                key:'main.users',
                authorization: 2016,
                icon:'icon-user'
            },
            {
                value:'Branches',
                key:'main.branches',
                authorization: 2011,
                icon:'icon-share'
            },
            {
                value:'Promotions',
                key:'main.promotions',
                authorization: 3000,
                icon:'icon-badge'
            },
            {
                value:'Messages',
                key:'main.messages',
                authorization: 3000,
                icon:'icon-envelope-letter'
            },
            {
                value:'Blogs',
                key:'main.blogs',
                authorization: 3000,
                icon:'icon-feed'
            },
            {
                value:'Extras ',
                icon:'icon-cup',
                subMenu : [
                     {
                        value:'Profile ',
                        key:'main.extras.profile',
                        view:'profile',
                        authorization: 3000
                    },
                    {
                        value:'Tags ',
                        key:'main.extras.tags',
                        view:'message',
                        authorization: 3000
                    }
                ]

            }

        ],

        SYS_MENU_CONFIG:[
            {
                value:'Shops',
                key:'main.shops',
                authorization: 2008,
                icon:'icon-home'
            },
            {
                value:'Products',
                key:'main.products',
                authorization: 1010,
                icon:'icon-bag'
            },
            {
                value:'Users',
                key:'main.users',
                authorization: 2016,
                icon:'icon-user'
            },
            {
                value:'Branches',
                key:'main.branches',
                authorization: 2011,
                icon:'icon-share'
            },
            {
                value:'Promotions',
                key:'main.promotions',
                authorization: 3000,
                icon:'icon-badge'
            },
            {
                value:'Messages',
                key:'main.messages',
                authorization: 3000,
                icon:'icon-envelope-letter'
            },
            {
                value:'Blogs',
                key:'main.blogs',
                authorization: 3000,
                icon:'icon-feed'
            },
            {
                value:'Extras ',
                icon:'icon-cup',
                subMenu : [
                     {
                        value:'Profile ',
                        key:'main.extras.profile',
                        view:'profile',
                        authorization: 3000
                    },
                    {
                        value:'Tags ',
                        key:'main.extras.tags',
                        view:'message',
                        authorization: 3000
                    }
                ]

            }

        ],

        EXTRA_MENU_CONFIG:[
           
        ]


    };

    mod.config(['$provide', function ($provide) {
        $provide.constant('ADMIN_MOD_CONFIG', {
            'URL_CONFIG': defs.URL_CONFIG,
            'REQ_CONFIG': defs.REQ_CONFIG,
            'MENU_CONFIG':defs.MENU_CONFIG,
            'SYS_MENU_CONFIG':defs.SYS_MENU_CONFIG,
            'EXTRA_MENU_CONFIG':defs.EXTRA_MENU_CONFIG
        });

        $provide.constant('MESSAGE_CONFIG', {
            ERROR_REQUIRED_FIELDS : 'Please fill required fields',
            ERROR_REQUIRED_IMAGE : 'Please select image',
            ERROR_SAVE_FAIL : 'Failed to save',
            ERROR_UPDATE_FAIL : 'Failed to update',
            ERROR_REMOVE_FAIL : 'Failed to remove',

            SUCCESS_SAVED_SUCCESSFULLY : 'Successfully saved',
            SUCCESS_REMOVED_SUCCESSFULLY : 'Successfully removed',
            SUCCESS_UPDATE_SUCCESSFULLY : 'Successfully updated'
        });

    }]);

    mod.config(['$stateProvider','$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {
        _.each(defs.URL_CONFIG, function (e, k) {
            $stateProvider.state(k, e);
        });
        $urlRouterProvider.otherwise('/login');
    }]);


})(com.TRENDI.ADMIN.modules.mainAdminModule);
