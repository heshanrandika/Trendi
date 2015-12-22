/**
 * Created by heshan on 12/21/2015.
 */
(function (mod) {
    "use strict";
    mod.filter('htmlToPlaintext', function() {
            return function(text) {
                return  text ? String(text).replace(/<[^>]+>/gm, ' ') : ' ';
            };
        }
    );
})(com.TRENDI.CATEGORY.modules.adminModule);