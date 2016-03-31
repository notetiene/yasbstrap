/* rewrite_anchor.js --- Change the URL when "activate.bs.scrollspy" is fired.

 Commentary:
   Change document.location URL when a scrollspy ID is reached. It should be used in conjunction with StickyNavbar since the clearing anchor is placed just after the navbar.
 Code:
 */

/**
 * Add an event handler to change displayed {@linkcode  document.location} (history API) when {@linkcode activate.bs.scrollspy} is fired. The location is the name of the ID.
 * @listens activate.bs.scrollspy
 * @param {bool} removeHash - Hash won't be used for the anchor location.
 */
var AnchorListener = function(removeHash) {
    /**
     * Removes ID hashes.
     * @private
     */
    this._removeHash  = removeHash || true;
    /**
     * Anchor used to remove any ID to the URL.
     * @private
     */
    this._topAnchor   = 'ysbstop';
    /**
     * Container for the clearing anchor. It clears the URL when reached.
     * @private
     */
    this.topReference = '<div id="' + this._topAnchor + '" style="height: 1px"></div>';
    /**
     * Hidden .nav-item to register a scrollspy ID. Needed for being complient to Bootstrap default behavior.
     * @private
     */
    this._voidNavItem    = '<li class="nav-item"><a class="nav-link" href="#' + this._topAnchor +
        '" class="nav-link" style="display: none"></a>';

    this._makeClearAnchor();

    // Since there’s a nested function context, store member variables locally
    var fn        = this.fired,
        topAnchor = this._topAnchor;

    $(window).on('activate.bs.scrollspy', function(event, el) {
        fn(event, el, topAnchor, removeHash);
    });
};

/**
 * Event handler for {}
 * @param {Event} event - Useful only to get second parameter.
 * @param {HTMLElement} el - Element that fired {@linkcode activate.bs.scrollspy}.
 * @param {String} topAnchor - Anchor used to clear the URL.
 * @param {bool} removeHash - If it should remove the ID hash in URL.
 */
AnchorListener.prototype.fired = function(event, el, topAnchor, removeHash) {
    var anchor = el.relatedTarget;

    if(anchor === '#' + topAnchor) {
        // Remove anchor from URL
        window.history.pushState(null, null, './');
        // Quit since the job is done!
        return;
    }
    if(removeHash) {
        anchor = anchor.substr(1);
    }

    window.history.pushState(null, null, anchor);
};

/**
 * Adds the void container for clearing the URL after the {@linkcode .navbar component}.
 */
AnchorListener.prototype._makeClearAnchor = function() {
    var body = $('body');

    // To my knowlege, body can only contain data-target for scroll-spy
    var target = body.attr('data-target');

    $(target).after(this.topReference);
    $(target + ' .nav').append(this._voidNavItem);
};

/*  rewrite_anchor.js */
