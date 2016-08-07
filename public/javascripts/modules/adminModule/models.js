/**
 * Created by heshan on 8/7/2016.
 */
(function (mod) {
    "use strict";

    mod.controller('productModel',['$scope', '$modalInstance',function ($scope, uiModalInstance) {
        $scope.ok = function () {
            uiModalInstance.close($scope.selected.item);
        };

        $scope.cancel = function () {
            uiModalInstance.dismiss('cancel');
        };
    }]);



})(com.TRENDI.ADMIN.modules.mainAdminModule);