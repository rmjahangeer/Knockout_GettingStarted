/// <reference path="jquery-3.3.1.js" />
/// <reference path="../areas/shop/scripts/js/main.js" />
/// <reference path="knockout.mapping-latest.js" />
/// <reference path="knockout-3.4.2.js" />
(function ($, ko) {
    
    var ViewModel = function () {
        // save reference of `this`
        var self = this;
        // local array for filtering
        var categories = [];
        // observable list of categories to bind on list view 
        self.categories = ko.observableArray([]);
        self.allCategories = ko.observableArray([]);
        // to hide/show the spinner
        self.loadingData = ko.observable(true);

        self.selectedCategory = ko.observable();

        self.products = ko.observableArray([]);
        self.totalProducts = ko.pureComputed(function () {
            return self.products().length;
        });
        self.subTotal = ko.pureComputed(function () {
            var total = 0;
            self.products().forEach(function (p) {
                total += p.Price * p.Quantity;
            });
            return '$' + parseFloat(total).toFixed(2);
        });

        // search input field model
        self.searchQuery = ko.observable('');
        self.resultsQuery = ko.observable('');

        // handler for search box form
        self.searchProducts = function () {
            console.log('search for ', self.searchQuery());
            var url = window.searchPage + '?q=';
            if (self.searchQuery()) {
                url += (self.searchQuery());
            }
            if (self.selectedCategory()) {
                url += '&catId=' + (self.selectedCategory());
            }
            window.location.href = url;
        }

        self.removeProduct = function (item) {
            window.cart.remove(item);
        }

        self.fetchAndUpdateCartProducts = function () {
            var products = window.cart.getCartItems();
            self.products([]);
            products.forEach(function (x) {
                self.products.push(x);
            });
        }
        self.fetchAndUpdateCartProducts();
        // expose the load Method to trigger on page load
        var loadCategories = function () {
            self.loadingData(true);
            $.getJSON('/api/category/main').done(function (data) {
                console.log('api category', data);
                data.forEach(function (x) {
                    self.categories.push(x);
                    self.allCategories.push(x);
                    if (x.Children && x.Children.length) {
                        x.Children.forEach(function (y) {
                            self.allCategories.push(y);
                        });
                    }
                    categories.push(x);
                });
                self.loadingData(false);
                if (queryParams('catId')) {
                    self.selectedCategory(queryParams('catId'));
                }

            }).fail(function () {
                self.loadingData(false);
            });
        }
        loadCategories();
    };
    ko.applyBindings(new ViewModel(), $('#top-nav')[0]);

})($, ko);


