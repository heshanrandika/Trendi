/**
 * Created by Heshanr on 5/25/2015.
 */
(function (mod) {
   "use strict";
    var defs = {
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
            REQ_CONFIG: defs.REQ_CONFIG
        });

    }]);

})(com.TRENDI.CATEGORY.modules.authModule);
