/**
 * Created by Heshanr on 5/24/2015.
 */
(function (ns) {
    'use strict';
    ns.authModule = angular.module('authModule', []);

   /* ns.mainModule.config(['$locationProvider',function ($locationProvider) {
        $locationProvider.html5Mode(true);
    }]);*/

    ns.authModule.run(['$rootScope','ngFB', function ($rootScope, ngFB) {
        ngFB.init({appId: '1594432914169826'});
    }]);

})(com.TRENDI.CATEGORY.modules);


