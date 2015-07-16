/**
 * Created by Heshanr on 7/16/2015.
 */
;(function($){
    $.fn.trendiHideMenu = function(options) {
        "use strict";

        function calculateMenuItemsInRow(row) {
            $(row).children(".item").each(function () {
                if ($(this).prev().prev().length > 0) {
                    if ($(this).position().top != $(this).prev().prev().position().top) {
                        if ($("body").hasClass("rtl")) {
                            var rightMargin = $('.navbar-main-menu').width() - $('.navbar-main-menu .item:first').position().left - $('.navbar-main-menu .item:first').width();
                            $(this).css({
                                'marginRight': rightMargin
                            });
                        } else {
                            var leftMargin = $('.navbar-main-menu .item:first').position().left;
                            $(this).css({
                                'marginLeft': leftMargin
                            });
                        }
                        $(this).before('<div class="navbar-main-menu-divider clearfix"></div>');
                        return false;
                    };
                }
            });
        };


        function checkMenuOverlay() {

            var overlaps = (function () {
                function getPositions(elem) {
                    var pos, width, height;
                    pos = $(elem).offset();
                    width = $(elem).width();
                    height = $(elem).height();
                    return [
                        [pos.left, pos.left + width],
                        [pos.top, pos.top + height]
                    ];
                }

                function comparePositions(p1, p2) {
                    var r1, r2;
                    r1 = p1[0] < p2[0] ? p1 : p2;
                    r2 = p1[0] < p2[0] ? p2 : p1;
                    return r1[1] > r2[0] || r1[0] === r2[0];
                }

                return function (a, b) {
                    var pos1 = getPositions(a),
                        pos2 = getPositions(b);
                    return comparePositions(pos1[0], pos2[0]) && comparePositions(pos1[1], pos2[1]);

                };
            })();

            $(".navbar-main-menu-divider").each(function () {
                $(this).remove()
            });

            var menu = $('.navbar-main-menu');
            var menu_item = $('.navbar-main-menu .item');

            var checkBoxOverlay = $('.navbar-search');

            var overlay = false;

            checkBoxOverlay.addClass('noTransition');
            menu_item.each(function () {
                var box = $(this),
                    box1 = checkBoxOverlay;
                box.css({
                    'background': 'none',
                    'marginLeft': 0,
                    'marginRight': 0
                });

                if (overlaps(box, box1)) {

                    overlay = true;
                    if ($("body").hasClass("rtl")) {
                        var rightMargin = $('.navbar-main-menu').width() - $('.navbar-main-menu .item:first').position().left - $('.navbar-main-menu .item:first').width();
                        box.css({
                            'marginRight': rightMargin
                        });
                    } else {
                        var leftMargin = $('.navbar-main-menu .item:first').position().left;
                        box.css({
                            'marginLeft': leftMargin
                        });
                    }
                    $(this).before('<div class="navbar-main-menu-divider clearfix"></div>');
                }
            });
            if (overlay == false) {
                calculateMenuItemsInRow(menu)
            }
            var header = $("header .navbar"),
                menuHeightInner = $("header .navbar-height-inner");

            menuHeightInner.css({
                'height': $(".background", header).outerHeight(true)
            });
            checkBoxOverlay.removeClass('noTransition');

        };

        var duration = {
                menuShow: 500,
                menuSlide: 500,
                headerTransform: 500,
                switcherFade: 500
            },
            $header = $("header .navbar"),
            $window = $(window),
            $backToTop = $("header .back-to-top"),
            $body = $("body"),
            $switcher = $(".navbar-switcher", $header),
            $menu = $(".navbar-main-menu", $header),
            $menuItems = $(".item", $menu),
            $menuContainer = $("<dd class='item-content' id='menuScrollerWrapper'></dd>"),
            $menuScroller = $("<div style='overflow: hidden;' id='menuScroller'></div>"),
            $menuHeight = $("header .navbar-compact"),
            menuHeightInner = $("header .navbar-height-inner"),
            menuInner = $("header .navbar-height-inner").length,
            $menuForSlide =
                $menuContainer.add($menuHeight),
            menuWidth = 0,
            menuActive = false,
            headerHeight = $header.outerHeight(),
            latent = $window.scrollTop() >= headerHeight,
            positionHeader = false,
            active = false;

        var reculcPosHeader = function () {
            var headerCompact = false,
                menuShow = false;
            if (menuActive) {
                // $menuForSlide.hide();
                menuShow = true
            }
            if (!$header.hasClass("navbar-compact")) {
                headerCompact = true;
                $header.addClass("navbar-compact");
            }
            headerHeight = $header.outerHeight();
            positionHeader = -$header.height() + 3;
            if (headerCompact) $header.removeClass("navbar-compact");
            if (menuShow) $menuForSlide.show();
            if (parseInt($header.css("top")) < -1) $header.css("top", positionHeader + "px");
        };
        if (latent) {
            $switcher.show();
            $header.addClass("navbar-compact").css("top", positionHeader + "px")
        }

        $(window).load(function () {

            checkMenuOverlay();
            reculcPosHeader();
        })
        $backToTop.click(function () {
            $("html, body").animate({
                scrollTop: 0
            }, 400)
        });
        $(window).resize(function () {
            checkMenuOverlay();
            reculcPosHeader();
//         menuHeightInner.css({'height': $(".background", $header).height()});
//        $menuHeight.css({
//            height: $menuContainer.height() + (menuInner ? 0 : headerHeight - 14) + "px"
//        })
        });
        var menuTimer;
        $menuItems.each(function () {
            var $this = $(this),
                $dropdown = $this.next("dd.item-content");
            if ($dropdown.length) {
                var pos =
                    menuWidth;
                menuWidth += 100;
                $dropdown = $("<div style='width: 50%; float: left;'></div>").append($dropdown.html());
                $menuScroller.append($dropdown);
                $this.addClass("with-sub").mouseenter(function (e) {
                    e.preventDefault();
                    if (menuTimer) {
                        clearTimeout(menuTimer);
                    }
                    if (menuActive || menuActive === 0) {
                        if (menuActive !== pos) {

                            var posN = pos / 100;


                            menuActive = pos;
                            $menuItems.removeClass("active");
                            $this.addClass("active");
                            $menuScroller.stop().animate({
                                marginLeft: -pos + "%"
                            }, {
                                duration: duration.menuSlide
                            }, function () {
                                reculcPosHeader();
                            })
                        }
                    } else {
                        $menuScroller.css({
                            marginLeft: -pos + "%"
                        });
                        menuActive = pos;
                        $menuItems.removeClass("active");
                        $this.addClass("active");
                        $switcher.hide();
                        var posN = pos / 100;
                        $("#menuScrollerWrapper").css({
                            display: 'block'
                        });

                        $("#menuScrollerWrapper").css({
                            display: 'none'
                        });

                        $menuForSlide.stop().slideDown(duration.menuShow, function () {
                            reculcPosHeader();
                        });
                    }
                }).mouseleave(function (e) {
                    menuTimer = setTimeout(function () {
                        $menuItems.removeClass("active");
                        $menuForSlide.slideUp(duration.menuShow, function () {
                            if (latent) $switcher.fadeIn(duration.switcherFade);
                            reculcPosHeader();
                        });
                        menuActive = false;
                    }, 200);
                });
                ;

            }
        });
        $menuScroller.mouseenter(function (e) {
            if (menuTimer) {
                clearTimeout(menuTimer);
            }
        })
            .mouseleave(function (e) {
                menuTimer = setTimeout(function () {
                    $menuItems.removeClass("active");
                    $menuForSlide.slideUp(duration.menuShow, function () {
                        if (latent) $switcher.fadeIn(duration.switcherFade);
                        reculcPosHeader();
                    });
                    menuActive = false;
                }, 200);
            });
        $menuScroller.css("width",
                menuWidth + "%");
        $menuScroller.children("div").css("width", 100 / (menuWidth / 100) + "%");
        $menu.append($menuContainer.append($menuScroller));
        $menuHeight.css({
            height: $menuContainer.height() + (menuInner ? 0 : headerHeight - 14) + "px",
            display: "none"
        });
        $window.scroll(function () {
            if (!latent && $window.scrollTop() >= headerHeight) {
                //$menuItems.removeClass("active");
                $menuForSlide.slideUp(duration.menuShow, function () {
                    if (latent) $switcher.fadeIn(duration.switcherFade)
                });
                menuActive = false;
                $switcher.show();
                $backToTop.stop().fadeIn(300);
                $header.addClass("navbar-compact");
                checkMenuOverlay();
                reculcPosHeader();
                $header.css("top", positionHeader + "px");
                latent = true;
                $body.click()
            } else if (latent && $window.scrollTop() < headerHeight) {
                $switcher.hide();
                $header.stop().css("top", "").removeClass("navbar-compact").css("top", "0px");
                checkMenuOverlay();
                $backToTop.stop().fadeOut(300);
                $switcher.removeClass("active");
                active = false;
                latent = false;
                $body.click()
            }
        });
        $switcher.click(function () {
            active = !active;
            $switcher.toggleClass("active");
            $header.animate({
                top: active ? "0" : positionHeader
            }, {
                duration: duration.headerTransform
            })
        })
    };
})(jQuery);

