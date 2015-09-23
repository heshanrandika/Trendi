/**
 * Created by Heshanr on 5/24/2015.
 */
(function (ns) {
    'use strict';
    ns.adminModule = angular.module('adminModule', ['color.picker']);

    ns.adminModule.run(['$rootScope', 'adminDataService', '$state', function ($rootScope, adminDataService, $state) {

        $rootScope.$on('$stateChangeStart', function (e, n) {
            if (n.access) {
                if (n.access.requiresLogin) {
                    if (!adminDataService.isAuthenticated()) {
                        e.preventDefault();
                        $state.go('admin.login');
                    }
                }
            }
        });

    }]);

    /* ns.mainModule.config(['$locationProvider',function ($locationProvider) {
         $locationProvider.html5Mode(true);
     }]);*/

})(com.TRENDI.CATEGORY.modules);


