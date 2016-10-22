/**
 * Created by heshan on 10/23/2016.
 */
;(function($){
    $.fn.mainContainer = function() {
        $("#content-aside-id").click(function (e) {
            console.log("ffffffff");
        });
        $(window).resize(function () {
            var $contentcenter = $("#content-center-id"),
                $contentaside = $("#content-aside-id");
            if ($(".visible-xs").is(":visible")) $contentcenter.insertBefore($contentaside);
            else $contentaside.insertBefore($contentcenter)
        })
    };
})(jQuery);

