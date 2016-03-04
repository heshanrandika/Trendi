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

    mod.factory('Login.Window', ['$mdDialog','$mdMedia','authDataService','$localStorage',function ($mdDialog, $mdMedia, authDataService, $localStorage) {
        var _showLogin = function () {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: '/views/mainModule/login.modal.html',
                parent: angular.element(document.body),
                clickOutsideToClose:true,
                fullscreen: $mdMedia('sm')
            })
                .then(function(answer) {
                    return true;
                }, function() {
                    return false;
                });


            function DialogController($scope, $mdDialog, authDataService, $localStorage) {
                $scope.regUser = {};
                $scope.loginform = {};
                $scope.tab = 1;
                $scope.$storage = $localStorage;

                $scope.login = function() {
                    $scope.loginform.userType = 1;
                    authDataService.loginService($scope.loginform)
                        .then(function (response) {
                            var completeUser = response.data.responData.data;
                            $scope.$storage.loginUser = completeUser;
                            $scope.error = false;
                            $mdDialog.hide(1);
                        }, function (error) {
                            $scope.error = error.data.responData.Error;
                        });

                };
                $scope.signup = function() {
                    $scope.regUser.userType = 1;
                    authDataService.registration({regUser: $scope.regUser})
                        .then(function (response) {
                            $scope.signUpError = false;
                            $scope.tab = 1;
                        }, function (error) {
                            $scope.signUpError = error.data.responData.Error;
                        });

                };
                $scope.close = function() {
                    $mdDialog.hide();
                };

            };
        };

        var _checkUser = function(){
            var $storage = $localStorage;
            if($storage.loginUser == '' || undefined == $storage.loginUser){
                return false;
            }else{
                return $storage.loginUser;
            }

        };

        var _logoutUser = function(){
            var $storage = $localStorage;
            $storage.loginUser = undefined;
            return true;
        };

        return {
            showLogin: _showLogin,
            checkUser: _checkUser,
            logoutUser:_logoutUser
        };

    }]);


mod.factory('socket', ['$rootScope',function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
}]);

})(com.TRENDI.CATEGORY.modules.authModule);