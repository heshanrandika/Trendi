/**
 * Created by Heshanr on 5/25/2015.
 */
(function (mod) {
   "use strict";
    var defs = {
        REQ_CONFIG: {
            FUNC_Login:         4000,
            FUNC_Logout:        4001,
            FUNC_Register:      4001,
            FUNC_PwdReset:      4002,
            FUNC_ChangePwd:     4003,
            FUNC_ForgotPwd:     4004
        }

    };

    mod.config(['$provide', function ($provide) {
        $provide.constant('MESSAGE_CONFIG', {
            ERROR_REQUIRED_FIELDS : 'Please fill required fields',
            ERROR_REQUIRED_IMAGE : 'Please select image',
            ERROR_SAVE_FAIL : 'Failed to save',
            ERROR_UPDATE_FAIL : 'Failed to update',
            ERROR_REMOVE_FAIL : 'Failed to remove',

            SUCCESS_SAVED_SUCCESSFULLY : 'Successfully saved',
            SUCCESS_REMOVED_SUCCESSFULLY : 'Successfully removed',
            SUCCESS_UPDATE_SUCCESSFULLY : 'Successfully updated'
        });

    }]);

})(com.TRENDI.CATEGORY.modules.coreModule);
