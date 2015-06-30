/**
 * Created by Heshanr on 6/17/2015.
 */
(function (mod) {
    "use strict";

    mod.animation('.fade-in-animation', function ($window) {
        return {
            enter: function (element, done) {
                TweenMax.fromTo(element, 1, { opacity: 0}, {opacity: 1, onComplete: done});
            },

            leave: function (element, done) {
                TweenMax.to(element, 1, {opacity: 0, onComplete: done});
            }
        };
    });

    mod.animation('.slide-down-animation', function ($window) {
        return {
            enter: function (element, done) {
                TweenMax.fromTo(element, 1, { top: -$window.innerHeight}, {top: 0, onComplete: done});
            },

            leave: function (element, done) {
                TweenMax.to(element, 1, {top: $window.innerHeight, onComplete: done});
            }
        };
    });

    mod.animation('.slide-left-animation', function ($window) {
        return {
            enter: function (element, done) {
                TweenMax.fromTo(element, 1, { left: $window.innerWidth}, {left: 0, onComplete: done});
            },

            leave: function (element, done) {
                TweenMax.to(element, 1, {left: -$window.innerWidth, onComplete: done});
            }
        };
    });
})(com.TRENDI.CATEGORY.modules.coreModule);
