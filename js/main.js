

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

          

        } else {

          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/62f3864b37898912e9623acc/1ga3k977f';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
          })();

        }

        window.dataLayer = window.dataLayer || [];
        function gtag(){
          dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', 'G-6ESN0GCM0R');


    });

})(jQuery);
