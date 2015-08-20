/**
 * Created by Heshanr on 5/28/2015.
 */
(function (mod) {
    "use strict";


    /*
     * Data Service to access the server
     * */

    mod.service('authDataService', ['Data.Comm', 'authServiceCalls', function (Data_Comm, authServiceCalls) {



        var _loginService = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},authServiceCalls.getLoginDao()));
        };

        var _registration = function(d){
            return Data_Comm.postPromise(angular.extend({params:d},authServiceCalls.getRegisterDao()))
        };

        var _pwdReset = function(){
            return Data_Comm.postPromise(authServiceCalls.getPwdResetDao())
        };

        var _changePwd = function(){
            return Data_Comm.postPromise(authServiceCalls.getChangePwdDao())
        };

        var _forgotPwd = function(){
            return Data_Comm.postPromise(authServiceCalls.getRegisterDao())
        };

        return {

            loginService : _loginService,
            registration : _registration,
            pwdReset : _pwdReset,
            changePwd : _changePwd,
            forgotPwd : _forgotPwd



        };

    }]);

})(com.TRENDI.CATEGORY.modules.authModule);
