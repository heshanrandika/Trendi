/**
 * Created by Heshanr on 5/24/2015.
 */
(function (mod) {
    "use strict";

    mod.controller('shopHomeController', ['$scope', '$rootScope','$state', function ($scope, $rootScope, $state) {
        $scope.click = function () {
            $scope.data = "";
           // $state.go("admin");
        }

    }]);


})(com.TRENDI.CATEGORY.modules.shopModule);
