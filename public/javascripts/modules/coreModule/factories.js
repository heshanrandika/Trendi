/**
 * Created by Heshanr on 9/22/2015.
 */

(function (mod) {
    "use strict";


    /*
     * Data Service to access the server
     * */

    mod.factory('Data.Toast', ['$mdToast','$document',function ($mdToast,$document) {

        var _error = function (p,err) {
            $mdToast.show({
                controller: function($scope, $mdToast) {
                    $scope.msg = p;
                    $scope.err = err;
                    $scope.closeToast = function() {
                        $mdToast.hide();
                    };
                },
                templateUrl: '/views/coreModule/toast/toast.error.html',
                parent : $document[0].querySelector('#toastBounds'),
                hideDelay: 3000,
                position: 'bottom right'
            });
        };

        var _success = function (p) {
            $mdToast.show({
                controller: function($scope, $mdToast) {
                    $scope.msg = p;
                    $scope.closeToast = function() {
                        $mdToast.hide();
                    };
                },
                templateUrl: '/views/coreModule/toast/toast.success.html',
                parent : $document[0].querySelector('#toastBounds'),
                hideDelay: 3000,
                position: 'bottom right'
            });
        };


        var _warning = function (p) {
            $mdToast.show({
                controller: function($scope, $mdToast) {
                    $scope.msg = p;
                    $scope.closeToast = function() {
                        $mdToast.hide();
                    };
                },
                templateUrl: '/views/coreModule/toast/toast.warning.html',
                parent : $document[0].querySelector('#toastBounds'),
                hideDelay: 3000,
                position: 'bottom right'
            });
        };

        return {
            error: _error,
            success: _success,
            warning:_warning
        };

    }]);

})(com.TRENDI.CATEGORY.modules.coreModule);
