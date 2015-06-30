/**
 * Created by Heshanr on 5/28/2015.
 */
(function (mod) {
    "use strict";


    /*
     * Data Service to access the server
     * */

    mod.service('coreDataService', [function () {


/*
        var _getDashBoardHeaderList = function(){
            return CORE_Comm.postPromise(coreServiceCalls.getDashBoardHeaderList());
        };

        *//*
         * Get List for dashboard
         * *//*

        var _getDashBoardApplicationList = function(){
            return CORE_Comm.postPromise(coreServiceCalls.getDashBoardApplicationList())
        };


        return {

            getDashBoardHeaderList : _getDashBoardHeaderList,
            getDashBoardApplicationList : _getDashBoardApplicationList



        };*/

    }]);

})(com.TRENDI.CATEGORY.modules.coreModule);
