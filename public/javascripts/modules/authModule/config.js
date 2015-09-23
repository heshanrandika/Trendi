/**
 * Created by Heshanr on 5/25/2015.
 */
(function (mod) {
   "use strict";
    var defs = {
        URL_CONFIG: {
            'login': {
                url: '/login',
                templateUrl: 'views/authModule/admin.login.html',
                controller: 'adminAuthController'
            }/*,
             'admin': {
             url: '/admin',
             templateUrl: 'views/adminModule/admin.master.html',
             controller: 'trendiAdminMasterController'

             }*/

        },

        REQ_CONFIG: {
            FUNC_Login:         4000,
            FUNC_Logout:        4001,
            FUNC_Register:      4001,
            FUNC_PwdReset:      4002,
            FUNC_ChangePwd:     4003,
            FUNC_ForgotPwd:     4004
        }

    };

    mod.config(['$provide', function ($provide) {
        $provide.constant('AUTH_MOD_CONFIG', {
            REQ_CONFIG: defs.REQ_CONFIG,
            URL_CONFIG: defs.URL_CONFIG
        });

    }]);

    mod.config(['$stateProvider','$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {
        _.each(defs.URL_CONFIG, function (e, k) {
            $stateProvider.state(k, e);
        });
        $urlRouterProvider.otherwise('/login');
    }]);

})(com.TRENDI.CATEGORY.modules.authModule);
