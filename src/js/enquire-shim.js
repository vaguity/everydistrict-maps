/*global Modernizr, jQuery*/
// Enquire shim

var mediaQueryCheck = Modernizr.mq('only all')
if (!mediaQueryCheck) {
    jQuery('html').addClass('no-mediaqueries')
    window.matchMedia = window.matchMedia || function () {
        return {
            matches: false,
            addListener: function () {},
            removeListener: function () {},
        }
    }
}
