/**
 * Created by heshan on 10/23/2016.
 */
;(function($){
    $.fn.mainContainer = function() {
        $(window).load(function () {
            setTimeout(function(){
                var $contentcenter = $("#content-center-id"),
                    $contentaside = $("#content-aside-id");
                if ($(".visible-xs").is(":visible")) $contentcenter.insertBefore($contentaside);
                else $contentaside.insertBefore($contentcenter)
            }, 100);
        })
        $(window).on('hashchange', function(e){
            setTimeout(function(){
                var $contentcenter = $("#content-center-id"),
                    $contentaside = $("#content-aside-id");
                if ($(".visible-xs").is(":visible")) $contentcenter.insertBefore($contentaside);
                else $contentaside.insertBefore($contentcenter)
            }, 100);

        });
        $(window).resize(function () {
            var $contentcenter = $("#content-center-id"),
                $contentaside = $("#content-aside-id");
            if ($(".visible-xs").is(":visible")) $contentcenter.insertBefore($contentaside);
            else $contentaside.insertBefore($contentcenter)
        })
    };
})(jQuery);

