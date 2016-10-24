/**
 * Created by heshan on 10/23/2016.
 */
;(function($){
    $.fn.mainContainer = function() {
        $(window).on('hashchange', function(e){
            setTimeout(function(){
                console.log("eeeeeeeeeeeeeeeeee")
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

