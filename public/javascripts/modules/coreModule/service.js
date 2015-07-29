/**
 * Created by Heshanr on 5/28/2015.
 */
(function (mod) {
    "use strict";


    /*
     * Data Service to access the server
     * */

    mod.factory('Data.Comm', ['$http', '$rootScope',function ($http, $rootScope) {

        var URL = "/";

        var _getPromise = function (p) {
            return $http.get(URL, (p) ? p : {});
        };

        var _postPromise = function (p) {
            return $http.post(URL, (p) ? p : {});
        };

        return {
            getPromise: _getPromise,
            postPromise: _postPromise
        };

    }]);

})(com.TRENDI.CATEGORY.modules.coreModule);
