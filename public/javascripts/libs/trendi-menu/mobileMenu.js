/**
 * Created by Heshanr on 7/15/2015.
 */
;(function($){
    $.fn.trendiMenu = function(options) {
        $("#off-canvas-menu-toggle").bind("click", function (e) {
            $("body").toggleClass("off-canvas-menu-open");
            $("header .navbar").removeClass("navbar-compact");
            $("html, body").animate({
                scrollTop: 0
            }, "300");
            e.preventDefault()
        });
        $("#off-canvas-menu-close").bind("click", function (e) {
            $("body").removeClass("off-canvas-menu-open");
            $mobileNavItems.removeClass("active")
        });
        var $mobileNavItems = $(".mobile-nav .nav-item"),
            $mobileNavItemsLink = $(".mobile-nav .nav-item > a");
        $mobileNavItemsLink.each(function () {
            var $this = $(this),timer;
            $this.on("click", function (e) {
                e.preventDefault();
                if (!$this.parent().hasClass("active")) {
                    $mobileNavItems.removeClass("active");
                    $this.parent().addClass("active")
                } else $this.parent().removeClass("active")
            })
        })
    };
})(jQuery);