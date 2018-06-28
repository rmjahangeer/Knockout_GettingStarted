/// <reference path="~/Scripts/jquery-3.3.1.js" />
/// <reference path="~/Areas/Shop/Scripts/js/main.js" />
/// <reference path="~/Scripts/knockout.mapping-latest.js" />
/// <reference path="~/Scripts/knockout-3.4.2.js" />
(function ($, ko) {
    var ViewModel = function () {
        // save reference of `this`
        var self = this;
        // observable of products to bind on view 
        self.product = ko.observable();


        self.addToCart = function (item) {
            window.cart.addToCart(ko.mapping.toJS(item));
        }

        // expose the load Method to trigger on page load
        self.getProduct = function () {
            $.getJSON('/api/product/' + window.productId).done(function (data) {
                console.log('api category', data);
                data.Quantity = 1;
                self.product(ko.mapping.fromJS(data));
                window.spinner.hide();
                setTimeout(function () {
                    // PRODUCT DETAILS SLICK
                    $('#product-main-view').slick({
                        infinite: true,
                        speed: 300,
                        dots: false,
                        arrows: true,
                        fade: true,
                        asNavFor: '#product-view',
                    });
                    if (data.ProductImages.length > 1)
                        $('#product-view').slick({
                            slidesToShow: data.ProductImages.length <= 1 ? 1 : 3,
                            slidesToScroll: 1,
                            arrows: true,
                            centerMode: true,
                            focusOnSelect: true,
                            asNavFor: '#product-main-view',
                        });
                }, 100);
            }).fail(function () {
                window.spinner.hide();
            });

        }
        self.getProduct();
    };

    ko.applyBindings(new ViewModel(), $('#product-page')[0]);

})($, ko);


