/**
 * Created by Heshanr on 5/24/2015.
 */
(function (mod) {
    "use strict";

    mod.controller('trendiMainController', ['$scope', '$rootScope','$state', function ($scope, $rootScope, $state) {

        $scope.windowType = "Tarnsaction";
        $scope.largeIcon = "row";
        $scope.tabicon = "row";
        $scope.slider ;
        $scope.showSlider = true;

/*        $scope.images = [{imageSource : "/images/splash.png" , visible : false },
            {imageSource : "/images/icon-trendi1.png" , visible : false },
            {imageSource : "/images/icon-trenditest.png" , visible : false },
            {imageSource : "/images/passenger.jpg" , visible : false },
            {imageSource : "/images/taxi.png" , visible : false },
            {imageSource : "/images/taxidi.png" , visible : false }];*/

        $scope.base = 'http://bxslider.com';
        $scope.images = [
            {src:'/images/icon-trendi1.png',price:'1000', shop:'Nolimit' },
            {src:'/images/taxidi.png',price:'1500', shop:'Fashion Bug'  },
            {src:'/images/taxi.png',price:'450', shop:'Odel'  },
            {src:'/images/icon-trenditest.png',price:'5000', shop:'Odel'  },
            {src:'/images/passenger.jpg',price:'990', shop:'CIB'  },
            {src:'/images/splash.png' ,price:'1000', shop:'Prasad' }
        ];
        $scope.clickTab = function (tab) {
            if(tab == 1)
                $state.go('ladies');

            if(tab == 2)
                $state.go('gents');

            if(tab == 3)
                $state.go('babies');

            if(tab == 4)
                $state.go('shop');
        }

    }]);

    mod.controller('authController', ['CORE.Socket', 'CORE.Comm', '$scope', '$rootScope', 'authDataService', 'AUTH_MOD_CONFIG', 'Session', 'AuthService', function (CORE_Socket, CORE_Comm, $scope, $rootScope, authDataService, AUTH_MOD_CONFIG, Session, AuthService) {

        $scope.alerts = [];

        $scope.showLink = function () {
            return AuthService.isAuthenticated();
        };

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.first_call = function (sess, name) {

            CORE_Comm.reconnect();

            /*            try {
             console.log("calling register : "+ "SESS : "+sess + "NAME :"+name);
             CORE_Comm.emit('register',
             {
             sessionId: sess,
             userName: name
             }, function (d) {
             console.log("on emiting register meesage callback >> " + d);
             });
             } catch (e) {
             console.log("exception on register : " + e);
             }
             */
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

            /*     module.exports.INVALID_PARAMETERS = 1;
             module.exports.INVALID_USER_NAME_PASSWORD = 2;
             module.exports.UNAUTHORIZED_ERROR = 3;
             module.exports.INTERNAL_SYSYTEM_ERROR = 4;
             module.exports.USER_ALREADY_EXIST_ERROR = 5;
             module.exports.NO_DATA_FOUND = 6;
             module.exports.SEARCH_NOT_RESOLVED = 7;
             module.exports.INVOKED_NON_PARALLEL_FUNCTION = 8;*/

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

        $scope.login_user = function (credentials) {
            authDataService.login(credentials)
                .then(function (response) {

                    var completeUser = response.data.responData.metaData.completeUser;


                    //CORE_Comm.connect(function (data) {
                    //    console.log(data);
                    $scope.first_call(completeUser.sessionId, completeUser.userName);
                    //});


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
                });
        };

    }]);



})(com.TRENDI.CATEGORY.modules.mainTrendiModule);
