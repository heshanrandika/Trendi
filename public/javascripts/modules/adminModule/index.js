/**
 * Created by Heshanr on 5/24/2015.
 */
(function (ns) {
    'use strict';
    ns.mainAdminModule = angular.module('mainAdminModule', com.TRENDI.ADMIN.config.MODULES);

    ns.mainAdminModule.run(['$rootScope', 'adminDataService', '$state', function ($rootScope, adminDataService, $state) {

        $rootScope.$on('$stateChangeStart', function (e, n) {
            if (n.access) {
                if (n.access.requiresLogin) {
                    if (!adminDataService.isAuthenticated()) {
                        e.preventDefault();
                        $state.go('login');
                    }
                }
            }
        });

    }]);
    ns.mainAdminModule.config(['$locationProvider',function ($locationProvider) {
        $locationProvider.html5Mode(false);
    }]);



    /*ns.mainTrendiModule.value("rndAddToLatLon", function () {
        return Math.floor(((Math.random() < 0.5 ? -1 : 1) * 2) + 1);
    });

    ns.mainTrendiModule.config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
            GoogleMapApi.configure({
                libraries: 'weather,geometry,visualization'
            });
    }]);

  

    ns.mainTrendiModule.run(['$templateCache', function ($templateCache) {
            $templateCache.put('control.tpl.html', '<button class="btn btn-sm btn-primary" ng-class="{\'btn-warning\': danger}" ng-click="controlClick()">{{controlText}}</button>');
    }]);

    ns.mainTrendiModule.run(function($FB){
        $FB.init('1594432914169826');
    });*/

})(com.TRENDI.ADMIN.modules);


