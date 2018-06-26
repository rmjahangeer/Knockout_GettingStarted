/// <reference path="jquery-3.3.1.js" />
/// <reference path="knockout.mapping-latest.js" />
/// <reference path="knockout-3.4.2.js" />

(function (ko) {
    window.queryParams = function (variable) {
        var query = window.location.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            if (decodeURIComponent(pair[0]) === variable) {
                return decodeURIComponent(pair[1]);
            }
        }
        console.log('Query variable %s not found', variable);
    }

    window.cart = {
        getCartItems: function () {
            var products = localStorage.getItem('cart_products') ? JSON.parse(localStorage.getItem('cart_products')) : [];
            return products;
        },

        addToCart: function (item) {
            var products = localStorage.getItem('cart_products') ? JSON.parse(localStorage.getItem('cart_products')) : [];
            var existingProduct = products.find(function (x) { return x.Id === item.Id });
            if (existingProduct) {
                existingProduct.Quantity += 1;
            } else {
                item.Quantity = 1;
                products.push(item);
            }

            localStorage.setItem('cart_products', JSON.stringify(products));
            // update cart widget
            ko.contextFor($('#top-nav')[0]).$data.fetchAndUpdateCartProducts();
            return products;
        },

        remove: function (item) {
            var products = localStorage.getItem('cart_products') ? JSON.parse(localStorage.getItem('cart_products')) : [];
            var existingProduct = products.find(function (x) { return x.Id === item.Id });
            if (existingProduct) {
                products.splice(products.indexOf(existingProduct), 1);
                localStorage.setItem('cart_products', JSON.stringify(products));
                // update cart widget
                ko.contextFor($('#top-nav')[0]).$data.fetchAndUpdateCartProducts();
            }
            return products;
        },

        clear: function () {
            var products = [];
            localStorage.setItem('cart_products', JSON.stringify(products));
            // update cart widget
            ko.contextFor($('#top-nav')[0]).$data.fetchAndUpdateCartProducts();
            return products;
        }


    }
})(ko);

(function ($) {
    "use strict";

    // NAVIGATION
    var responsiveNav = $('#responsive-nav'),
      catToggle = $('#responsive-nav .category-nav .category-header'),
      catList = $('#responsive-nav .category-nav .category-list'),
      menuToggle = $('#responsive-nav .menu-nav .menu-header'),
      menuList = $('#responsive-nav .menu-nav .menu-list');

    catToggle.on('click', function () {
        menuList.removeClass('open');
        catList.toggleClass('open');
    });

    menuToggle.on('click', function () {
        catList.removeClass('open');
        menuList.toggleClass('open');
    });

    $(document).click(function (event) {
        if (!$(event.target).closest(responsiveNav).length) {
            if (responsiveNav.hasClass('open')) {
                responsiveNav.removeClass('open');
                $('#navigation').removeClass('shadow');
            } else {
                if ($(event.target).closest('.nav-toggle > button').length) {
                    if (!menuList.hasClass('open') && !catList.hasClass('open')) {
                        menuList.addClass('open');
                    }
                    $('#navigation').addClass('shadow');
                    responsiveNav.addClass('open');
                }
            }
        }
    });

    // HOME SLICK
    $('#home-slick').slick({
        autoplay: true,
        infinite: true,
        speed: 300,
        arrows: true,
    });

    // PRODUCTS SLICK
    $('#product-slick-1').slick({
        slidesToShow: 3,
        slidesToScroll: 2,
        autoplay: true,
        infinite: true,
        speed: 300,
        dots: true,
        arrows: false,
        appendDots: '.product-slick-dots-1',
        responsive: [{
            breakpoint: 991,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        },
          {
              breakpoint: 480,
              settings: {
                  dots: false,
                  arrows: true,
                  slidesToShow: 1,
                  slidesToScroll: 1,
              }
          },
        ]
    });

    $('#product-slick-2').slick({
        slidesToShow: 3,
        slidesToScroll: 2,
        autoplay: true,
        infinite: true,
        speed: 300,
        dots: true,
        arrows: false,
        appendDots: '.product-slick-dots-2',
        responsive: [{
            breakpoint: 991,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        },
          {
              breakpoint: 480,
              settings: {
                  dots: false,
                  arrows: true,
                  slidesToShow: 1,
                  slidesToScroll: 1,
              }
          },
        ]
    });

    // PRODUCT DETAILS SLICK
    $('#product-main-view').slick({
        infinite: true,
        speed: 300,
        dots: false,
        arrows: true,
        fade: true,
        asNavFor: '#product-view',
    });

    $('#product-view').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        centerMode: true,
        focusOnSelect: true,
        asNavFor: '#product-main-view',
    });

    // PRODUCT ZOOM
    $('#product-main-view .product-view').zoom();

    // PRICE SLIDER
    var slider = document.getElementById('price-slider');
    if (slider) {
        noUiSlider.create(slider, {
            start: [1, 999],
            connect: true,
            tooltips: [true, true],
            format: {
                to: function (value) {
                    return value.toFixed(2) + '$';
                },
                from: function (value) {
                    return value
                }
            },
            range: {
                'min': 1,
                'max': 999
            }
        });
    }

})(jQuery);
