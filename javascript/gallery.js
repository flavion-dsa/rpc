'use strict';
// Material Imports
const { MDCSelect } = mdc.select;
const { MDCFloatingLabel } = mdc.floatingLabel;

material.gallery = {};

// Ready Event
material.gallery.ready = function() {
  var
    select = $('.mdc-select'),
    floatingLabel = $('.mdc-floating-label'),
    gallery = $('.gallery-fragment'),
    imageList,
    handler;

  handler = {
    initialize: function() {
      select = new MDCSelect(select[0]);
      floatingLabel = new MDCFloatingLabel(floatingLabel[0]);

      handler.attachEvents();
    },
    attachEvents: function() {
      select.listen('MDCSelect:change', event => {
        handler.createGallery(select.value);
      });
    },
    createImage: function(link) {
      var
        _imageCard = $('<li>').addClass('mdc-image-list__item'),
        _imageSrc = $('<img>').addClass('mdc-image-list__image mdc-elevation--z1');

        _imageSrc.attr('src', link);
        //_imageContainer.append(_imageSrc);
        _imageCard.append(_imageSrc);
        
        gallery.append(_imageCard);
    },
    createGallery: function(key) {
      gallery.empty();
      for (let x in imageList[key].links) {
        handler.createImage(imageList[key].links[x]);
      }
    },
    fetchImageList: function() {
      fetch('/assets/data/gallery.json')
        .then(response => {
          if (response.status === 200) {
            response.json()
              .then(data => {
                imageList = data;
              })
            ;
          }
        })
      ;
    }
  }

  handler.initialize();
  handler.fetchImageList();
}

// Attach Ready Event
$(document)
  .ready(function() {
    material.gallery.ready();
    material.ready();
  })
;
