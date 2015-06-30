/**
 * Created by Heshanr on 5/28/2015.
 */
(function (mod) {
    "use strict";


    /*
     * Data Service to access the server
     * */

    mod.service('lsfDataService', ['CORE.Comm', 'lsfServiceCalls', function (CORE_Comm, lsfServiceCalls) {



        var _getDashBoardHeaderList = function(){
            return CORE_Comm.postPromise(lsfServiceCalls.getDashBoardHeaderList());
        };

        /*
         * Get List for dashboard
         * */

        var _getDashBoardApplicationList = function(){
            return CORE_Comm.postPromise(lsfServiceCalls.getDashBoardApplicationList())
        };


        return {

            getDashBoardHeaderList : _getDashBoardHeaderList,
            getDashBoardApplicationList : _getDashBoardApplicationList,



        };

    }]);

})(com.DFN.BI.modules.lsfModule);
