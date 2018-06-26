/// <reference path="jquery-3.3.1.js" />
/// <reference path="../areas/shop/scripts/js/main.js" />
/// <reference path="knockout.mapping-latest.js" />
/// <reference path="knockout-3.4.2.js" />
(function ($, ko) {
    var ViewModel = function () {
        // save reference of `this`
        var self = this;
        // observable list of products to bind on list view 
        self.products = ko.observableArray([]);

        self.changeQuanity = ko.observable();
        self.productTotal = function(p) {
            return '$' + (p.Price() * p.Quantity());
        };
        self.subTotal = ko.pureComputed(function () {
            var subTotal = 0;
            self.products().forEach(function(p) {
                subTotal += p.Price() * p.Quantity();
            });

            return '$' + subTotal;
        });

        self.placeOrder = function() {
            if (confirm('Are you sure to checkout with these details?')) {
                window.cart.clear();
                self.fetchAndUpdateCartProducts();
                alert('Thank you for shopping with us.');
            }
        }

        self.removeProduct = function (item) {
            window.cart.remove(ko.mapping.toJS(item));
            self.fetchAndUpdateCartProducts();
        }

        self.fetchAndUpdateCartProducts = function () {
            var products = window.cart.getCartItems();
            var p = ko.mapping.fromJS(products);
            self.products(p());
        }
        self.fetchAndUpdateCartProducts();
    };

    ko.applyBindings(new ViewModel(), $('#cart-page')[0]);

})($, ko);


