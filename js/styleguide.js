;(function($) {

  'use strict';

  // Need to bind on styleguide rendered event instead of document ready.
  // Styleguide is rendered after document ready event.
  $(window).bind('styleguide:onRendered', function(e) {

    // initialize accordions.
    $('[data-style-guide="accordions"] [data-accordion-component="accordion"]').accordion();

    eqjs.refreshNodes();
    eqjs.query(undefined, true);

  });

})(jQuery);
