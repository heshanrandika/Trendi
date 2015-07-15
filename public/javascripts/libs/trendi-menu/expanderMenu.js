/**
 * Created by Heshanr on 7/16/2015.
 */
;(function($){
    $.fn.trendiExpander = function(options) {
        $(".expander-list").find("ul").hide().end().find(" .expander").text("+").end().find(".active").each(function () {
            $(this).parents("li ").each(function () {
                var $this = $(this),
                    $ul = $this.find("> ul"),
                    $name = $this.find("> .name a"),
                    $expander = $this.find("> .name .expander");
                $ul.show();
                $name.css("font-weight", "bold");
                $expander.html("&minus;")
            })
        }).end().find(" .expander").each(function () {
            var $this = $(this),
                hide = $this.text() === "+",
                $ul = $this.parent(".name").next("ul"),
                $name = $this.next("a");
            $this.click(function () {
                if ($ul.css("display") ==
                    "block") $ul.slideUp("slow");
                else $ul.slideDown("slow");
                $(this).html(hide ? "&minus;" : "+");
                $name.css("font-weight", hide ? "bold" : "normal");
                hide = !hide
            })
        })

        $(".collapsed-block .expander").click(function (e) {
            var collapse_content_selector = $(this).attr("href");
            var expander = $(this);
            if (!$(collapse_content_selector).hasClass("open")) expander.addClass("open").html("&minus;");
            else expander.removeClass("open").html("+");
            if (!$(collapse_content_selector).hasClass("open")) $(collapse_content_selector).addClass("open").slideDown("normal");
            else $(collapse_content_selector).removeClass("open").slideUp("normal");
            e.preventDefault()
        })
    }
})(jQuery);