/**
 * Created by Heshanr on 7/16/2015.
 */
;(function($){
    $.fn.mainOwlSlider = function () {
        var $containerw = $(".container").width(),
            $owlslider = $(".owl-slider"),
            $bannersblock = $owlslider.parent().next(".banners-block"),
            $owlsliderw = "100%",
            $owlsliderh = $bannersblock.height();
        if ($bannersblock.length > 0) $owlsliderw = "70%";
        $owlslider.parent().css({
            width: $owlsliderw
        });
        $owlslider.parent().css({
            height: $owlsliderh
        });
        $owlslider.find(".item img").css({
            width: $containerw
        });
        $owlslider.owlCarousel({
            slideSpeed: 50,
            singleItem: true,
            navigation: false,
            rewindNav: true,
            navigationText: ["", ""],
            pagination: false,
            autoPlay: true,
            cycle: true,
            //transitionStyle: "fade",
            stopOnHover: true
        })
    };
})(jQuery);/**
 * Created by heshan on 10/13/2016.
 */
