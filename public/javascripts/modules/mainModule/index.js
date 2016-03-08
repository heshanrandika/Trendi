/**
 * Created by Heshanr on 5/24/2015.
 */
(function (ns) {
    'use strict';
    ns.mainTrendiModule = angular.module('mainTrendiModule', com.TRENDI.CATEGORY.config.MODULES);

    ns.mainTrendiModule.config(['$locationProvider',function ($locationProvider) {
        $locationProvider.html5Mode(false);
    }]);

    ns.mainTrendiModule.value("rndAddToLatLon", function () {
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

})(com.TRENDI.CATEGORY.modules);


