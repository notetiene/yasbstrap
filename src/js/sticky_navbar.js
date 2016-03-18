/* sticky_navbar.js --- JavaScript utilities for making a navbar "sticky".

 Commentary:
   It doesn’t make a new navbar element but only acts on an already present one.sticky means that it has normal flow until the element is completly at the top. The element then becomes fixed.

   Code:
*/

/**
 * Make a navbar "sticky". When the navbar is on the top, it becomes fixed and return normally when its static offset is reched again (srolling up). It’s the responsability of the user to implement event listeners (onscroll and onresize).
 * @constructor
 * @param {String} sel - The navbar to use.
 * @param {String} [paddingTop=$(sel).offset().top] - Padding added to the body when the navbar quit the normal flow (is fixed).
 */
var StickyNavbar = function(sel, paddingTop) {
    this.navbar = $(sel);
    this.sticked = false;
    this.distance = this.navbar.offset().top;
    this.paddingTop = paddingTop || this.navbar.innerHeight();
    this.$window = $(window);

    this.check();
};

/**
 * Check if the navbar should be fixed or static (normal flow).
 * @method
 * @param {String} [paddingTop=this.paddingTop] - Padding added to the body when the navbar quit the normal flow.
 */

/**
 * Update the distance from top for the navbar. used when the user resize the window.
 * @method
 */

/* sticky_navbar.js ends here */
