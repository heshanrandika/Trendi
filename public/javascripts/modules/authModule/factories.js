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

    mod.factory('Login.Window', ['$mdDialog','$mdMedia','authDataService','$localStorage','ngFB','googlePlusAuth','$rootScope',function ($mdDialog, $mdMedia, authDataService, $localStorage, ngFB, googlePlusAuth, $rootScope) {
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


            function DialogController($scope, $mdDialog, authDataService, $localStorage, $rootScope) {
                $scope.regUser = {};
                $scope.loginform = {};
                $scope.tab = 1;
                $scope.$storage = $localStorage;
                function onSignIn(authResult) {
                    $rootScope.$broadcast('event:trendi-signin-success', authResult);
                };

                $scope.login = function() {
                    $scope.loginform.userType = 1;
                    authDataService.loginService($scope.loginform)
                        .then(function (response) {
                            var completeUser = response.data.responData.data;
                            $scope.$storage.loginUser = completeUser;
                            $scope.error = false;
                            onSignIn('success');
                            $mdDialog.hide(1);
                        }, function (error) {
                            $scope.error = error.data.responData.Error;
                        });

                };

                $scope.fbLogin = function(){
                    ngFB.login({scope: 'email,read_stream,publish_actions'}).then(
                        function (response) {
                            if (response.status === 'connected') {
                                console.log('Facebook login succeeded');
                                ngFB.api({
                                        path: '/me',
                                        params: {fields: 'id,name,email,picture'}
                                }).then(
                                    function (user) {
                                        var User = {userType : 1, name:user.name, password:user.email ,email: user.email, image:user.picture.data.url, from:'f'};
                                        $rootScope.$broadcast('event:trendi-signin-progress', User);
                                    },
                                    function (error) {
                                        alert('Facebook error: ' + error.error_description);
                                    });
                            } else {
                                alert('Facebook login failed');
                            }
                        });
                };


                $scope.gpluslogin = function () {
                    googlePlusAuth.login();
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



                var logingOther = function(user){
                     authDataService.loginService(user)
                        .then(function (response) {
                            var completeUser = response.data.responData.data;
                            $scope.$storage.loginUser = completeUser;
                            $scope.error = false;
                            onSignIn('success');
                            $mdDialog.hide(1);
                        }, function (error) {
                            $scope.error = error.data.responData.Error;
                        });
                }

                $scope.$on('event:trendi-signin-progress', function (event,user) {
                    authDataService.registration({regUser: user})
                        .then(function (response) {
                            $scope.signUpError = false; 
                            logingOther(user);
                        }, function (error) {
                            logingOther(user);
                        });

                });

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
            $rootScope.$broadcast('event:trendi-signin-success', 'logout-success');
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