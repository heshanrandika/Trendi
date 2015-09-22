/**
 * Created by Heshanr on 5/24/2015.
 */
(function (ns) {
    'use strict';
    ns.mainTrendiModule = angular.module('mainTrendiModule', com.TRENDI.CATEGORY.config.MODULES);

    ns.mainTrendiModule.config(['$locationProvider',function ($locationProvider) {
        $locationProvider.html5Mode(true);
    }]);

    ns.mainTrendiModule.value("rndAddToLatLon", function () {
        return Math.floor(((Math.random() < 0.5 ? -1 : 1) * 2) + 1);
    });

    ns.mainTrendiModule.config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
            GoogleMapApi.configure({
              /*  key: "AIzaSyBc0hlX12uRJKKte6Gk43GzMKZGS0sroJU",
                v: '3.21',*/
                libraries: 'weather,geometry,visualization'
            });
    }]);

    ns.mainTrendiModule.run(['$templateCache', function ($templateCache) {
            $templateCache.put('control.tpl.html', '<button class="btn btn-sm btn-primary" ng-class="{\'btn-warning\': danger}" ng-click="controlClick()">{{controlText}}</button>');
    }]);

})(com.TRENDI.CATEGORY.modules);


