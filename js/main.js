/*

[MAIN SCRIPT]

*/

;(function ($) {
    "use strict";

    /* ------------------------------------
        COMMON VARIABLES
    ------------------------------------ */
    var $wn = $(window),
        $body = $('body');

    /* ------------------------------------
        CHECK DATA
    ------------------------------------ */
    var checkData = function (data, value) {
        return typeof data === 'undefined' ? value : data;
    };

    $(function () {
        /* ------------------------------------
            BACKGROUND IMAGE
        ------------------------------------ */
        var $bgImg = $('[data-bg-img]');

        $bgImg.each(function () {
            var $t = $(this);

            $t.css('background-image', 'url(' + $t.data('bg-img') + ')').addClass('bg--img').removeAttr('data-bg-img');
        });

        /* ------------------------------------
            BACKGROUND PARALLAX
        ------------------------------------ */
        var $bgParallax = $('[data-bg-parallax]');

        $bgParallax.each(function () {
            var $t = $(this);

            $t.parallax({
                imageSrc: $t.data('bg-parallax')
            }).addClass('bg--overlay').removeAttr('data-bg-parallax');
        });

        $wn.on('resize', function() {
            $wn.trigger('resize.px.parallax');
        });

        /* ------------------------------------
            STICKY JS
        ------------------------------------ */
        var $sticky = $('[data-sticky]');

        $sticky.each(function () {
            var $t = $(this);

            $t.sticky({
                zIndex: $t.data('sticky')
            });
        });

        /* ------------------------------------
            MAGNIFIC POPUP
        ------------------------------------ */
        var $popupImg = $('[data-popup="img"]');

        if ( $popupImg.length ) {
            $popupImg.magnificPopup({
                type: 'image',
                zoom: {
                    enabled: true,
                    opener: function( $el ) {
                        return $el.parent('.info').siblings('img');
                    }
                }
            });
        }

        var $popupDelegateImg = $('[data-popup-delegate="img"]');

        if ( $popupDelegateImg.length ) {
            $popupDelegateImg.magnificPopup({
                delegate: 'a[data-popup="delegate"]',
                type: 'image'
            });
        }

        var $popupVideo = $('[data-popup="video"]');

        if ( $popupVideo.length ) {
            $popupVideo.magnificPopup({
                type: 'iframe'
            });
        }

        /* ------------------------------------
            COUNTER
        ------------------------------------ */
        var $counterUp = $('[data-counter-up="number"]');

        if ( $counterUp.length ) {
            $counterUp.counterUp({
                delay: 10,
                time: 1000
            });
        }



		/* ------------------------------------
            CONTACT FORM
        ------------------------------------ */

		function isValidEmail(emailAddress) {
			var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
			return pattern.test(emailAddress);
		};



        /* ------------------------------------
            ANIMATE SCROLL
        ------------------------------------ */
        var $animateScrollParent = $('[data-animate-scroll="a"]'),
            animateScrolling = function (e) {
                e.href = $(this).attr('href');

                if ( e.href.charAt(0) === '#' && e.href.length > 1 ) {
                    $( e.href ).animatescroll({
                        easing: 'easeInOutExpo',
                        scrollSpeed: 1000
                    });

                    return false;
                }
            };

        $animateScrollParent.on('click', 'a', animateScrolling);

        /* ------------------------------------
            HEADER SECTION
        ------------------------------------ */
        var $header = $('.header--section');

        /* ------------------------------------
            BANNER SECTION
        ------------------------------------ */
        var $banner = $('.banner--section'),
            $bannerSlider = $banner.find('.banner--slider'),
            $bannerItem = $('.banner--item');

        $bannerSlider.on('initialized.owl.carousel', function (e) {
            $banner.css({
                'height': function () {
                    var height = $wn.outerHeight() - $header.outerHeight(),
                        minHeight = $( e.target ).outerHeight();

                    return height < minHeight ? minHeight : height;
                }
            });
        });

        /* ------------------------------------
            SKILLS SECTION
        ------------------------------------ */
        var $skills = $('.skills--section'),
            $skillProgressBars = $skills.find('.progress-bars');

        $skillProgressBars.find('.progress-bar').each(function (e) {
            var $t = $(this);
            console.log(e)
            $t.css('width', 0);


              $t.waypoint(function () {

                  $t.css('width', $t.data('value') + '%');

              }, {
                  triggerOnce: true,
                  offset: 'bottom-in-view'
              });


        });

        /* ------------------------------------
            TESTIMONIAL SECTION
        ------------------------------------ */
        var $testimonial = $('.testimonial--section'),
            $testimonialClients = $testimonial.find('.testimonial--clients'),
            testimonialClientsI = $testimonialClients.data('increment');

        $testimonialClients.on('changed.owl.carousel', function (e) {
            var item = $(e.currentTarget).find('.owl-item')[ e.item.index + testimonialClientsI ],
                target = $( item ).children().data('target');

            $( item ).children('.item').tab('show');
        });

        $testimonialClients.on('click', '[data-toggle="tab"]', function () {
            var i = $(this).data('owl-item') + 1;

            $testimonialClients.trigger( 'to.owl.carousel', i );
        });

        /* ------------------------------------
            OWL CAROUSEL
        ------------------------------------ */
        var $owlCarousel = $('.owl-carousel');

        $owlCarousel.each(function () {
            var $t = $(this);

            $t.owlCarousel({
                items: checkData( $t.data('owl-items'), 1 ),
                margin: checkData( $t.data('owl-margin'), 0 ),
                loop: checkData( $t.data('owl-loop'), true ),
                smartSpeed: checkData( $t.data('owl-speed'), 2000 ),
                autoplay: checkData( $t.data('owl-autoplay'), true ),
                autoplaySpeed: checkData( $t.data('owl-speed'), 2000 ),
                autoplayTimeout: checkData( $t.data('owl-interval'), 5000 ),
                nav: checkData( $t.data('owl-nav'), false ),
                navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                dots: checkData( $t.data('owl-dots'), false ),
                mouseDrag: checkData( $t.data('owl-drag'), true ),
                animateIn: checkData( $t.data('owl-animate-in'), false ),
                animateOut: checkData( $t.data('owl-animate-out'), false ),
                responsive: checkData( $t.data('owl-responsive'), {} )
            });
        });


    });

    $wn.on('load', function () {
        /* ------------------------------------
            BODY SCROLLING
        ------------------------------------ */
      

        /* ------------------------------------
            ADJUST ROW
        ------------------------------------ */
        var $adjustRow = $('.AdjustRow');

        if ( $adjustRow.length ) {
            $adjustRow.isotope({ layoutMode: 'fitRows' });
        }

        /* ------------------------------------
            gallery SECTION
        ------------------------------------ */
        var $gallery = $('.gallery--section'),
            $galleryFilter = $gallery.find('.gallery--filter-menu'),
            $galleryItems = $gallery.find('.gallery--items'),
            $galleryItem = $galleryItems.children('.gallery--item');

        $galleryItem.each(function () {
            var $el = $(this).children('.img');

            $el.children('.popup-btn').css( 'height', $el.children('.info').outerHeight() );
        });

        if ( $galleryItems.length ) {
            $galleryItems.isotope({
                animationEngine: 'best-available',
                itemSelector: '.gallery--item'
            });

            $galleryFilter.on('click', 'li', function () {
                var $t = $(this),
                    target = $t.data('target'),
                    cat = (target !== '*') ? '[data-cat~="'+ target +'"]' : target;

                $galleryItems.isotope({
                    filter: cat
                });

                $t.addClass('active').siblings().removeClass('active');
            });
        }

        /* ------------------------------------
            PRELOADER
        ------------------------------------ */
        var $preloader = $('#preloader');

        if ( $preloader.length ) {
            $preloader.fadeOut('slow');
            setTimeout(function(){
              $preloader.remove();
            },1000)
        }


        let loc = location.pathname.split('/').pop();

        if(loc === 'contact.html' || loc === 'contact'){
          console.log('loading contact page...');

          setTimeout(function(){
            var ifr = document.getElementById("JotFormIFrame-222146668326055"),
            iframe;

            if (ifr) {
              var src = ifr.src;
              var iframeParams = [];
              if (window.location.href && window.location.href.indexOf("?") > -1) {
                iframeParams = iframeParams.concat(window.location.href.substr(window.location.href.indexOf("?") + 1).split('&'));
              }
              if (src && src.indexOf("?") > -1) {
                iframeParams = iframeParams.concat(src.substr(src.indexOf("?") + 1).split("&"));
                src = src.substr(0, src.indexOf("?"))
              }
              iframeParams.push("isIframeEmbed=1");
              ifr.src = src + "?" + iframeParams.join('&');
            }
            window.handleIFrameMessage = function(e) {
              if (typeof e.data === 'object') { return; }
              var args = e.data.split(":");
              if (args.length > 2) { iframe = document.getElementById("JotFormIFrame-" + args[(args.length - 1)]); } else { iframe = document.getElementById("JotFormIFrame"); }
              if (!iframe) { return; }
              switch (args[0]) {
                case "scrollIntoView":
                  iframe.scrollIntoView();
                  break;
                case "setHeight":
                  iframe.style.height = args[1] + "px";
                  break;
                case "collapseErrorPage":
                  if (iframe.clientHeight > window.innerHeight) {
                    iframe.style.height = window.innerHeight + "px";
                  }
                  break;
                case "reloadPage":
                  window.location.reload();
                  break;
                case "loadScript":
                  if( !window.isPermitted(e.origin, ['jotform.com', 'jotform.pro']) ) { break; }
                  var src = args[1];
                  if (args.length > 3) {
                      src = args[1] + ':' + args[2];
                  }
                  var script = document.createElement('script');
                  script.src = src;
                  script.type = 'text/javascript';
                  document.body.appendChild(script);
                  break;
                case "exitFullscreen":
                  if      (window.document.exitFullscreen)        window.document.exitFullscreen();
                  else if (window.document.mozCancelFullScreen)   window.document.mozCancelFullScreen();
                  else if (window.document.mozCancelFullscreen)   window.document.mozCancelFullScreen();
                  else if (window.document.webkitExitFullscreen)  window.document.webkitExitFullscreen();
                  else if (window.document.msExitFullscreen)      window.document.msExitFullscreen();
                  break;
              }
              var isJotForm = (e.origin.indexOf("jotform") > -1) ? true : false;
              if(isJotForm && "contentWindow" in iframe && "postMessage" in iframe.contentWindow) {
                var urls = {"docurl":encodeURIComponent(document.URL),"referrer":encodeURIComponent(document.referrer)};
                iframe.contentWindow.postMessage(JSON.stringify({"type":"urls","value":urls}), "*");
              }
            };
            window.isPermitted = function(originUrl, whitelisted_domains) {
              var url = document.createElement('a');
              url.href = originUrl;
              var hostname = url.hostname;
              var result = false;
              if( typeof hostname !== 'undefined' ) {
                whitelisted_domains.forEach(function(element) {
                    if( hostname.slice((-1 * element.length - 1)) === '.'.concat(element) ||  hostname === element ) {
                        result = true;
                    }
                });
                return result;
              }
            };
            if (window.addEventListener) {
              window.addEventListener("message", handleIFrameMessage, false);
            } else if (window.attachEvent) {
              window.attachEvent("onmessage", handleIFrameMessage);
            }

          },500)

        }


    });

})(jQuery);
