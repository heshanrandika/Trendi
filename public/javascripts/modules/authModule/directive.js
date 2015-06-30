/**
 * Created by Heshanr on 5/28/2015.
 */
(function (mod) {
    "use strict";
    mod.directive('trendiLoginBar',['ngFB','$localStorage',function (ngFB,  $localStorage) {
        function link( scope, element, attributes, controller ) {

            scope.login_open = true;
            scope.click_login = function () {
                if (scope.login_open) {
                    scope.login_open = false;
                } else {
                    scope.login_open = true;
                }
            };
            scope.fbLogin = function(){
                ngFB.login({scope: 'email,read_stream,publish_actions'}).then(
                    function (response) {
                        if (response.status === 'connected') {
                            console.log('Facebook login succeeded');
                            scope.closeLogin();
                        } else {
                            alert('Facebook login failed');
                        }
                    });
            };


            scope.trendiLogin = function(){
              //  $localStorage.user = scope.

            };

            scope.closeLogin = function(){

            };



        }
        return {
            restrict: 'E',
            require: 'ngModel',
            link: link,
            templateUrl: "/views/authModule/loginBar.html"

        };
    }]);

})(com.TRENDI.CATEGORY.modules.authModule);