// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

$(document).on('ready', function() {
  carouselClick();
  activeImage();
});
// Assumes current image layout for carousel
var roomArray = ["/western","/tokyo","/","/tomb"]
// Toggles the link of the "Reserve now" button as images are rotated on carousel using arrow buttons
var carouselClick = function() {
  $(".carousel-images").on('click', function(event){
    var clicked = this;
    var div = $(clicked).parent();
    var anchor = $(div).siblings("a.roomButton");
    var array = $(clicked).attr("class");
    array = array.split(" ");
    if (array.includes("right")){
      var currentImage = roomArray.pop();
      roomArray.unshift(currentImage);
      if (roomArray[0] === "/"){
        $(anchor).html("Coming Soon");
        $(anchor).attr("href", "javascript:void(0);");
      } else {
        $(anchor).html("Reserve Now");
        $(anchor).attr("href", roomArray[0]);
      }
    } else if (array.includes("left")){
      var removedImage = roomArray.splice(0,1);
      roomArray.push(removedImage[0]);
      if (roomArray[0] === "/"){
        // console.log("very true");
        $(anchor).html("Coming Soon");
        $(anchor).attr("href", "javascript:void(0);");
      } else {
        $(anchor).html("Reserve Now");
        $(anchor).attr("href", roomArray[0]);
      }
    }
  })
}
// Click of an image to rotate carousel
var activeImage = function(){
  $("#showcase").on('click', ".cloud9-item", function(event){
    var click = this;
    var image = $(click).children();
    image = $(image).siblings(".reflected")
    var buttonLink = $(image[0]).attr("link");
    var buttonContainer = $(click).parent().parent().siblings("em");
    var button = $(buttonContainer[0]).children("a.roomButton");
    $(button).attr("href", buttonLink);
    if (buttonLink === "/western") {
      $(button).removeClass("noselect");
      $(button).html("Reserve Now");
      roomArray = ["/western","/tokyo","/","/tomb"];
    } else if (buttonLink === "/tokyo"){
      $(button).removeClass("noselect");
      $(button).html("Reserve Now");
      roomArray = ["/tokyo","/","/tomb","/western"];
    } else if (buttonLink === "/tomb"){
      $(button).removeClass("noselect");
      $(button).html("Reserve Now");
      roomArray = ["/tomb","/western","/tokyo","/"];
    } else {
      $(button).attr("href", "javascript:void(0);")
      $(button).html("Coming Soon");
      $(button).addClass("noselect");
      roomArray = ["/","/tomb","/western","/tokyo"];
    }
  });
}
// Carousel Functionality
/*
* Cloud 9 Carousel 2.0.4
*   3D perspective carousel plugin for jQuery/Zepto with a focus on slick
*   performance, based on the original CloudCarousel by Professor Cloud.
*
* See the demo and get the latest version:
*   http://specious.github.io/cloud9carousel/
*
* Copyright (c) 2015 by Ildar Sagdejev ( http://specious.github.io )
* Copyright (c) 2011 by R. Cecco ( http://www.professorcloud.com )
*
* MIT License
*
* Please retain this copyright header in all versions of the software
*
* Requires:
*  - jQuery 1.3.0 or later -OR- Zepto 1.1.1 or later
*
* Optional (jQuery only):
*  - Reflection support via reflection.js plugin by Christophe Beyls
*     http://www.digitalia.be/software/reflectionjs-for-jquery
*  - Mousewheel support via mousewheel plugin
*     http://plugins.jquery.com/mousewheel/
*/

;(function($) {
//
// Detect CSS transform support
//
var transform = (function() {
  var vendors = ['webkit', 'moz', 'ms'];
  var style   = document.createElement( "div" ).style;
  var trans   = 'transform' in style ? 'transform' : undefined;

  for( var i = 0, count = vendors.length; i < count; i++ ) {
    var prop = vendors[i] + 'Transform';
    if( prop in style ) {
      trans = prop;
      break;
    }
  }

  return trans;
})();

var Item = function( element, options ) {
  element.item = this;
  this.element = element;

  if( element.tagName === 'IMG' ) {
    this.fullWidth = element.width;
    this.fullHeight = element.height;
  } else {
    element.style.display = "inline-block";
    this.fullWidth = element.offsetWidth;
    this.fullHeight = element.offsetHeight;
  }

  element.style.position = 'absolute';

  if( options.mirror && this.element.tagName === 'IMG' ) {
    // Wrap image in a div together with its generated reflection
    this.reflection = $(element).reflect( options.mirror ).next()[0];

    var $reflection = $(this.reflection);
    this.reflection.fullHeight = $reflection.height();
    $reflection.css( 'margin-top', options.mirror.gap + 'px' );
    $reflection.css( 'width', '100%' );
    element.style.width = "100%";

    // The item element now contains the image and reflection
    this.element = this.element.parentNode;
    this.element.item  = this;
    this.element.alt   = element.alt;
    this.element.title = element.title;
  }

  if( transform && options.transforms )
    this.element.style[transform + "Origin"] = "0 0";

  this.moveTo = function( x, y, scale ) {
    this.width = this.fullWidth * scale;
    this.height = this.fullHeight * scale;
    this.x = x;
    this.y = y;
    this.scale = scale;

    var style = this.element.style;
    style.zIndex = "" + (scale * 100) | 0;

    if( transform && options.transforms ) {
      style[transform] = "translate(" + x + "px, " + y + "px) scale(" + scale + ")";
    } else {
      // The gap between the image and its reflection doesn't resize automatically
      if( options.mirror && this.element.tagName === 'IMG' )
        this.reflection.style.marginTop = (options.mirror.gap * scale) + "px";

      style.width = this.width + "px";
      style.left = x + "px";
      style.top = y + "px";
    }
  }
}

var time = !window.performance || !window.performance.now ?
  function() { return +new Date() } :
  function() { return performance.now() };

//
// Detect requestAnimationFrame() support
//
// Support legacy browsers:
//   http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
//
var cancelFrame = window.cancelAnimationFrame || window.cancelRequestAnimationFrame;
var requestFrame = window.requestAnimationFrame;

(function() {
  var vendors = ['webkit', 'moz', 'ms'];

  for( var i = 0, count = vendors.length; i < count && !cancelFrame; i++ ) {
    cancelFrame = window[vendors[i]+'CancelAnimationFrame'] || window[vendors[i]+'CancelRequestAnimationFrame'];
    requestFrame = requestFrame && window[vendors[i]+'RequestAnimationFrame'];
  }
}());

var Carousel = function( element, options ) {
  var self = this;
  var $container = $(element);
  this.items = [];
  this.xOrigin = (options.xOrigin === null) ? $container.width()  * 0.5 : options.xOrigin;
  this.yOrigin = (options.yOrigin === null) ? $container.height() * 0.1 : options.yOrigin;
  this.xRadius = (options.xRadius === null) ? $container.width()  / 2.3 : options.xRadius;
  this.yRadius = (options.yRadius === null) ? $container.height() / 6   : options.yRadius;
  this.farScale = options.farScale;
  this.rotation = this.destRotation = Math.PI/2; // start with the first item positioned in front
  this.speed = options.speed;
  this.smooth = options.smooth;
  this.fps = options.fps;
  this.timer = 0;
  this.autoPlayAmount = options.autoPlay;
  this.autoPlayDelay = options.autoPlayDelay;
  this.autoPlayTimer = 0;
  this.onLoaded = options.onLoaded;
  this.onRendered = options.onRendered;

  this.itemOptions = {
    transforms: options.transforms
  }

  if( options.mirror ) {
    this.itemOptions.mirror = $.extend( { gap: 2 }, options.mirror );
  }

  $container.css( { position: 'relative', overflow: 'hidden' } );

  // Rotation:
  //  *      0 : right
  //  *   Pi/2 : front
  //  *   Pi   : left
  //  * 3 Pi/2 : back
  this.renderItem = function( itemIndex, rotation ) {
    var item = this.items[itemIndex];
    var sin = Math.sin(rotation);
    var farScale = this.farScale;
    var scale = farScale + ((1-farScale) * (sin+1) * 0.5);

    item.moveTo(
      this.xOrigin + (scale * ((Math.cos(rotation) * this.xRadius) - (item.fullWidth * 0.5))),
      this.yOrigin + (scale * sin * this.yRadius),
      scale
    );
  }

  this.render = function() {
    var count = this.items.length;
    var spacing = 2 * Math.PI / count;
    var radians = this.rotation;

    for( var i = 0; i < count; i++ ) {
      this.renderItem( i, radians );
      radians += spacing;
    }

    if( typeof this.onRendered === 'function' )
      this.onRendered( this );
  }

  this.playFrame = function() {
    var rem = self.destRotation - self.rotation;
    var now = time();
    var dt = (now - self.lastTime) * 0.002;
    self.lastTime = now;

    if( Math.abs(rem) < 0.003 ) {
      self.rotation = self.destRotation;
      self.pause();
    } else {
      // Rotate asymptotically closer to the destination
      self.rotation = self.destRotation - rem / (1 + (self.speed * dt));
      self.scheduleNextFrame();
    }

    self.render();
  }

  this.scheduleNextFrame = function() {
    this.lastTime = time();

    this.timer = this.smooth && cancelFrame ?
      requestFrame( self.playFrame ) :
      setTimeout( self.playFrame, 1000 / this.fps );
  }

  this.itemsRotated = function() {
    return this.items.length * ((Math.PI/2) - this.rotation) / (2*Math.PI);
  }

  this.floatIndex = function() {
    var count = this.items.length;
    var floatIndex = this.itemsRotated() % count;

    // Make sure float-index is positive
    return (floatIndex < 0) ? floatIndex + count : floatIndex;
  }

  this.nearestIndex = function() {
    return Math.round( this.floatIndex() ) % this.items.length;
  }

  this.nearestItem = function() {
    return this.items[this.nearestIndex()];
  }

  this.play = function() {
    if( this.timer === 0 )
      this.scheduleNextFrame();
  }

  this.pause = function() {
    this.smooth && cancelFrame ? cancelFrame( this.timer ) : clearTimeout( this.timer );
    this.timer = 0;
  }

  //
  // Spin the carousel.  Count is the number (+-) of carousel items to rotate
  //
  this.go = function( count ) {
    this.destRotation += (2 * Math.PI / this.items.length) * count;
    this.play();
  }

  this.deactivate = function() {
    this.pause();
    clearInterval( this.autoPlayTimer );
    if( options.buttonLeft ) options.buttonLeft.unbind( 'click' );
    if( options.buttonRight ) options.buttonRight.unbind( 'click' );
    $container.unbind( '.cloud9' );
  }

  this.autoPlay = function() {
    this.autoPlayTimer = setInterval(
      function() { self.go( self.autoPlayAmount ) },
      this.autoPlayDelay
    );
  }

  this.enableAutoPlay = function() {
    // Stop auto-play on mouse over
    $container.bind( 'mouseover.cloud9', function() {
      clearInterval( self.autoPlayTimer );
    } );

    // Resume auto-play when mouse leaves the container
    $container.bind( 'mouseout.cloud9', function() {
      self.autoPlay();
    } );

    this.autoPlay();
  }

  this.bindControls = function() {
    if( options.buttonLeft ) {
      options.buttonLeft.bind( 'click', function() {
        self.go( -1 );
        return false;
      } );
    }

    if( options.buttonRight ) {
      options.buttonRight.bind( 'click', function() {
        self.go( 1 );
        return false;
      } );
    }

    if( options.mouseWheel ) {
      $container.bind( 'mousewheel.cloud9', function( event, delta ) {
        self.go( (delta > 0) ? 1 : -1 );
        return false;
      } );
    }

    if( options.bringToFront ) {
      $container.bind( 'click.cloud9', function( event ) {
        var hits = $(event.target).closest( '.' + options.itemClass );

        if( hits.length !== 0 ) {
          var idx = self.items.indexOf( hits[0].item );
          var count = self.items.length;
          var diff = idx - (self.floatIndex() % count);

          // Normalise "diff" to represent the shortest way to rotate item to front
          if( 2 * Math.abs(diff) > count )
            diff += (diff > 0) ? -count : count;

          // Suppress default browser action if the item isn't roughly in front
          if( Math.abs(diff) > 0.5 )
            event.preventDefault();

          // Halt any rotation already in progress
          self.destRotation = self.rotation;

          self.go( -diff );
        }
      } );
    }
  }

  var items = $container.find( '.' + options.itemClass );

  this.finishInit = function() {
    //
    // Wait until all images have completely loaded
    //
    for( var i = 0; i < items.length; i++ ) {
      var item = items[i];
      if( (item.tagName === 'IMG') &&
          ((item.width === undefined) || ((item.complete !== undefined) && !item.complete)) )
        return;
    }

    clearInterval( this.initTimer );

    // Init items
    for( i = 0; i < items.length; i++ )
      this.items.push( new Item( items[i], this.itemOptions ) );

    // Disable click-dragging of items
    $container.bind( 'mousedown onselectstart', function() { return false } );

    if( this.autoPlayAmount !== 0 ) this.enableAutoPlay();
    this.bindControls();
    this.render();

    if( typeof this.onLoaded === 'function' )
      this.onLoaded( this );
  };

  this.initTimer = setInterval( function() { self.finishInit() }, 50 );
}

//
// The jQuery plugin
//
$.fn.Cloud9Carousel = function( options ) {
  return this.each( function() {
    /* For full list of options see the README */
    options = $.extend( {
      xOrigin: null,        // null: calculated automatically
      yOrigin: null,
      xRadius: null,
      yRadius: null,
      farScale: 0.5,        // scale of the farthest item
      transforms: true,     // enable CSS transforms
      smooth: true,         // enable smooth animation via requestAnimationFrame()
      fps: 30,              // fixed frames per second (if smooth animation is off)
      speed: 4,             // positive number
      autoPlay: 0,          // [ 0: off | number of items (integer recommended, positive is clockwise) ]
      autoPlayDelay: 4000,
      bringToFront: false,
      itemClass: 'cloud9-item',
      handle: 'carousel'
    }, options );

    $(this).data( options.handle, new Carousel( this, options ) );
  } );
}
})( window.jQuery || window.Zepto );

// reflection
(function($) {

$.fn.reflect = function(options) {
  options = $.extend({
    height: 1/3,
    opacity: 0.5
  }, options);

  return this.unreflect().each(function() {
    var img = this;
    if (/^img$/i.test(img.tagName)) {
      function doReflect() {
        var imageWidth = img.width, imageHeight = img.height, reflection, reflectionHeight, wrapper, context, gradient;
        reflectionHeight = Math.floor((options.height > 1) ? Math.min(imageHeight, options.height) : imageHeight * options.height);

        reflection = $("<canvas />")[0];
        if (reflection.getContext) {
          context = reflection.getContext("2d");
          try {
            $(reflection).attr({width: imageWidth, height: reflectionHeight});
            context.save();
            context.translate(0, imageHeight-1);
            context.scale(1, -1);
            context.drawImage(img, 0, 0, imageWidth, imageHeight);
            context.restore();
            context.globalCompositeOperation = "destination-out";

            gradient = context.createLinearGradient(0, 0, 0, reflectionHeight);
            gradient.addColorStop(0, "rgba(255, 255, 255, " + (1 - options.opacity) + ")");
            gradient.addColorStop(1, "rgba(255, 255, 255, 1.0)");
            context.fillStyle = gradient;
            context.rect(0, 0, imageWidth, reflectionHeight);
            context.fill();
          } catch(e) {
            return;
          }
        } else {
          if (!window.ActiveXObject) return;
          reflection = $("<img />").attr("src", img.src).css({
            width: imageWidth,
            height: imageHeight,
            marginBottom: reflectionHeight - imageHeight,
            filter: "FlipV progid:DXImageTransform.Microsoft.Alpha(Opacity=" + (options.opacity * 100) + ", FinishOpacity=0, Style=1, StartX=0, StartY=0, FinishX=0, FinishY=" + (reflectionHeight / imageHeight * 100) + ")"
          })[0];
        }
        $(reflection).css({display: "block", border: 0});

        wrapper = $(/^a$/i.test(img.parentNode.tagName) ? "<span />" : "<div />").insertAfter(img).append([img, reflection])[0];
        wrapper.className = img.className;
        $(img).data("reflected", wrapper.style.cssText = img.style.cssText);
        $(wrapper).css({width: imageWidth, height: imageHeight + reflectionHeight, overflow: "hidden"});
        img.style.cssText = "display: block; border: 0px";
        img.className = "reflected";
      }

      if (img.complete) doReflect();
      else $(img).load(doReflect);
    }
  });
}

$.fn.unreflect = function() {
  return this.unbind("load").each(function() {
    var img = this, reflected = $(this).data("reflected"), wrapper;

    if (reflected !== undefined) {
      wrapper = img.parentNode;
      img.className = wrapper.className;
      img.style.cssText = reflected;
      $(img).data("reflected", null);
      wrapper.parentNode.replaceChild(img, wrapper);
    }
  });
}

})(window.jQuery || window.Zepto);
