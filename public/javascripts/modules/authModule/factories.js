/**
 * Created by Heshanr on 7/21/2015.
 */

(function (mod) {
    "use strict";

    mod.factory('authServiceCalls', ['AUTH_MOD_CONFIG', function (AUTH_MOD_CONFIG) {

        var serviceCalls = {};

        serviceCalls.getLoginDao = function () {
            return {functionId: AUTH_MOD_CONFIG.REQ_CONFIG.FUNC_Login};
        };

        serviceCalls.getLogoutDao = function () {
            return {functionId: AUTH_MOD_CONFIG.REQ_CONFIG.FUNC_Logout};
        };

        serviceCalls.getRegisterDao = function () {
            return {functionId: AUTH_MOD_CONFIG.REQ_CONFIG.FUNC_Register};
        };

        serviceCalls.getPwdResetDao = function () {
            return {functionId: AUTH_MOD_CONFIG.REQ_CONFIG.FUNC_PwdReset};
        };

        serviceCalls.getChangePwdDao = function () {
            return {functionId: AUTH_MOD_CONFIG.REQ_CONFIG.FUNC_ChangePwd};
        };

        serviceCalls.getForgotPwdDao = function () {
            return {functionId: AUTH_MOD_CONFIG.REQ_CONFIG.FUNC_ForgotPwd};
        };


        return serviceCalls;

    }]);

})(com.TRENDI.CATEGORY.modules.authModule);