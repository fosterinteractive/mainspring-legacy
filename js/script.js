"use strict";

$( document ).ready(function() {
  // Initializes svg4everybody
  svg4everybody();

  // Accordion Component (Expandable Boxes)
  var speed = 200;
  var $accordions = $('[data-accordion=enabled]');
  // Set is-closed data attribute by default.
  $accordions.attr('data-accordion-state', 'is-closed');

  $accordions.once('ccpaAccordion').each(function(index) {
    //setup accordion functionality + aria roles
    var $wrapper      = $(this);
    var $label        = $wrapper.find('[data-accordion-component=label]');
    var $content      = $wrapper.find('[data-accordion-component=content]');
    var $index        = index + 1;

    //Added aria roles to the accordion components
    $label.attr({'aria-expanded': false, 'aria-controls': 'collapsible-'+$index, 'tabindex':'0', 'role':'button'});
    $content.attr({'id':'collapsible-'+$index, 'role':'region', 'aria-hidden':true, 'data-accordion-state':'is-closed'});

    //Accordion click to open
    $label.click(function(e) {
      e.preventDefault();

      var $this = $(this);
      var $wrapper_attr = $wrapper.attr('data-accordion-state');

      // If item is closed
      if ($wrapper_attr == 'is-closed') {

        //Slidedown - and before animation is done refresh eqjs
        $content.velocity('slideDown', {
          duration: speed,
          progress: function() {
            eqjs.refreshNodes();
            eqjs.query(undefined, true);
          }
        });
        $content.attr('aria-hidden', 'false');
        $label.attr({'aria-expanded': true});
        $wrapper.attr('data-accordion-state', 'is-open');
      // If item is open
      } else {
        $content.velocity('slideUp', {duration: speed});
        $content.attr('aria-hidden', 'true');
        $label.attr({'aria-expanded': false});
        $wrapper.attr('data-accordion-state', 'is-closed');
      }
    });
  });
});
