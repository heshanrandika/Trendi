/**
 * Created by Heshanr on 5/24/2015.
 */
(function (mod) {
    "use strict";
    mod.controller('adminAuthController', ['$scope', 'authDataService', 'AuthService',' $localStorage', function ( $scope, authDataService, AuthService,  $localStorage) {

        $scope.alerts = [];
        $scope.$storage = $localStorage;

       /* $scope.showLink = function () {
            return AuthService.isAuthenticated();
        };

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.first_call = function (sess, name) {

            CORE_Comm.reconnect();

            try {
                console.log("calling register : " + "SESS : " + sess + "NAME :" + name);
                CORE_Socket.emit('register',
                    {
                        sessionId: sess,
                        userName: name
                    }, function (d) {
                        console.log("on emiting register meesage callback >> " + d);
                    });
            } catch (e) {
                console.log("exception on register : " + e);
            }
        };

        var processErrorMsg = function (err) {
            var errMsg = "";

            if (err) {

                try {
                    var erCode = err.responData.Error.split(":")[1].trim();
                    switch (erCode) {
                        case "1":
                            errMsg = "Invalid Parameters";
                            break;
                        case "2":
                            errMsg = "Invalid Username or Password";
                            break;
                        case "3":
                            errMsg = "Unauthorized";
                            break;
                        case "4":
                            errMsg = "Internal System Error";
                            break;
                        case "5":
                            errMsg = "User Already Exist";
                            break;
                        case "6":
                            errMsg = "No Data Found";
                            break;
                        case "7":
                            errMsg = "Search Not Resolved";
                            break;
                        case "8":
                            errMsg = "Invoked Non Paralled Function";
                            break;
                        default:
                            errMsg = "Unknown Error";
                            break;
                    }
                } catch (e) {
                    errMsg = "Invalid Error Code Sent From Server";
                }

            } else {
                errMsg = "No Error Code Sent From Server";
            }

            return errMsg;
        };
*/
        $scope.login_user = function (credentials) {

           /* authDataService.login(credentials)
                .then(function (response) {

                    var completeUser = response.data.responData.metaData.completeUser;

                    $scope.first_call(completeUser.sessionId, completeUser.userName);


                    Session.create(completeUser.sessionId, completeUser.firstName, completeUser.userName);
                    $rootScope.$broadcast(AUTH_MOD_CONFIG.AUTH_EVENTS.loginSuccess, {
                        sessionId: completeUser.sessionId,
                        username: completeUser.userName,
                        firstName: completeUser.firstName,
                        usertype: completeUser.userGroups[0],
                        userObj: completeUser
                    });
                }, function (error) {
                    $scope.alerts = [];
                    $scope.alerts.push({type: 'danger', msg: processErrorMsg(error.data)});
                    $rootScope.$emit(AUTH_MOD_CONFIG.AUTH_EVENTS.loginFailed);
                });*/

        };

    }]);



})(com.TRENDI.CATEGORY.modules.authModule);
