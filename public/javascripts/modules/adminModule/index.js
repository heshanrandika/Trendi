/**
 * Created by Heshanr on 5/24/2015.
 */
(function (ns) {
/*
    var initrr = function() {
        console.log("+++++++++++++++++++++init GAPI");
        window.initGapi();
    };
*/

    'use strict';
    ns.mainAdminModule = angular.module('mainAdminModule', com.TRENDI.ADMIN.config.MODULES);

    ns.mainAdminModule.run(['$rootScope', 'adminDataService', '$state','$location', function ($rootScope, adminDataService, $state, $location) {

    	$rootScope.baseUrl = new window.URL($location.absUrl()).origin;
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



    ns.mainAdminModule.value("rndAddToLatLon", function () {
        return Math.floor(((Math.random() < 0.5 ? -1 : 1) * 2) + 1);
    });

    ns.mainAdminModule.value('GoogleApp', {
            apiKey: 'AIzaSyDqsZTcZjSDUQvmLbjBis0wa0I88lXhUyI',
            clientId: '387595319953-pv91tedcvc33c868kursqris777ter5e.apps.googleusercontent.com',
            scopes: [
                'https://www.googleapis.com/auth/drive',
                'https://www.googleapis.com/auth/youtube',
                'https://www.googleapis.com/auth/userinfo.profile'
            ]
    });

    ns.mainAdminModule.config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
            GoogleMapApi.configure({
                libraries: 'weather,geometry,visualization,places'
            });
    }]);

    /*

    ns.mainTrendiModule.run(['$templateCache', function ($templateCache) {
            $templateCache.put('control.tpl.html', '<button class="btn btn-sm btn-primary" ng-class="{\'btn-warning\': danger}" ng-click="controlClick()">{{controlText}}</button>');
    }]);

    ns.mainTrendiModule.run(function($FB){
        $FB.init('1594432914169826');
    });*/

})(com.TRENDI.ADMIN.modules);


