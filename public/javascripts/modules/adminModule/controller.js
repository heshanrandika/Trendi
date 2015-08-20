/**
 * Created by Heshanr on 5/24/2015.
 */
(function (mod) {
    "use strict";

    mod.controller('adminController', ['$scope', '$rootScope','$state','adminDataService','$mdDialog', function ($scope, $rootScope, $state, adminDataService, $mdDialog) {
        $scope.mainImage = [];

        $scope.initData = function(){
            adminDataService.getItemList().then(function(response){
                $scope.mainImage = response.data.responData.data
            },function(){
                $scope.mainImage = [];
            });
        };
        $scope.initData();


        $scope.search = {
            one: [{
                key: "All",
                value: 0
            }, {
                key: "Name",
                value: 1
            }, {
                key: "Application ID",
                value: 2
            }, {
                key: "Mobile Number",
                value: 3
            }, {
                key: "Loan Amount",
                value: 4
            }],
            two: [{
                keyc: "--",
                value: "--"
            }],
            searchDataFromServer: function (d) {
                adminDataService.getItemList({
                    params: d
                }).then(function (response) {



                }, function (error) {
                    console.log(error.data);
                    $scope.applicationList = [];

                })
            }
        };


        function DialogController($scope, $mdDialog) {
            $scope.hide = function() {
                $mdDialog.hide();
            };
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };
        };

        $scope.goToPerson = function(person, event) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: '/views/adminModule/admin.item.modal.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose:false
            })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

    }]);


    mod.controller('adminLoginController',['$scope','$state',function($scope, $state){
        $scope.login = function(){
            $state.go('admin.home');
        };
    }]);


})(com.TRENDI.CATEGORY.modules.adminModule);
