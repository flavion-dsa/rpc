'use strict';
// Material Imports
const { MDCTabBar } = mdc.tabBar;
const { MDCTabScroller } = mdc.tabScroller;
const { MDCTabIndicator } = mdc.tabIndicator;
const { MDCTab } = mdc.tab;

material.home = {};

// Ready Event
material.home.ready = function() {
  var
    tabBar = $('.mdc-tab-bar'),
    tabIndicator = $('.mdc-tab-indicator'),
    tabScroller = $('.mdc-tab-scroller'),
    handler;

  handler = {
    initialize: function() {
      tabBar = new MDCTabBar(tabBar[0]);
      tabIndicator = new MDCTabIndicator(tabIndicator[0]);
      tabScroller = new MDCTabScroller(tabScroller[0]);
      
      const tabs = [].map.call(document.querySelectorAll('.mdc-tab'), tab => {
        return new MDCTab(tab);
      });

      handler.attachEvents();
    },
    attachEvents: function() {
      tabBar.listen('MDCTabBar:activated', event => {
        document.querySelectorAll('.tab-fragment')
          .forEach((element, index) => {
            if(index === event.detail.index) {
              element.classList.remove('tab-fragment--hidden');
            } else {
              element.classList.add('tab-fragment--hidden');
            }
          })
        ;
      });
    },
  }

  handler.initialize();
}

// Attach Ready Event
$(document)
  .ready(function() {
    material.home.ready();
    material.ready();
  })
;
