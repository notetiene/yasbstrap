/* rewrite_anchor.js --- Change the URL when "activate.bs.scrollspy" is fired.

 Commentary:

 Code:
 */

/**
 * Add an event handler to change displayed {@linkcode  document.location} (history API) when {@linkcode activate.bs.scrollspy} is fired. The location is the name of the ID.
 * @listens activate.bs.scrollspy
 * @param {bool} removeHash - Hash won't be used for the anchor location.
 */


/**
 * Event handler for {}
 * @param {Event} event - Useful only to get second parameter.
 * @param {HTMLElement} el - Element that fired {@linkcode activate.bs.scrollspy}.
 * @param {String} topAnchor - Anchor used to clear the URL.
 * @param {bool} removeHash - If it should remove the ID hash in URL.
 */


/**
 * Adds the void container for clearing the URL after the {@linkcode .navbar component}.
 */

/*  rewrite_anchor.js */
