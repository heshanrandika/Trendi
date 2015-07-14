/**
 * Created by Heshanr on 5/24/2015.
 */
(function (mod) {
    "use strict";

    mod.controller('ladiesHomeController', ['$scope', '$rootScope','$state','ngFB','$timeout', function ($scope, $rootScope, $state, ngFB, $timeout) {
        $scope.topDirections = ['left', 'up'];
        $scope.bottomDirections = ['down', 'right'];
        $scope.isOpen = false;
        $scope.availableModes = ['md-fling', 'md-scale'];
        $scope.selectedMode = 'md-fling';
        $scope.availableDirections = ['up', 'down', 'left', 'right'];
        $scope.selectedDirection = 'up';



    }]);


})(com.TRENDI.CATEGORY.modules.ladiesModule);
