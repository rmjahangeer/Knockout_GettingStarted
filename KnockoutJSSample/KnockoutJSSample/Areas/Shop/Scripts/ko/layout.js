(function ($, ko) {
    var ViewModel = function () {
        // save reference of `this`
        var self = this;
        // local array for filtering
        var categories = [];

        // observable list of categories to bind on list view 
        self.categories = ko.observableArray([]);
        self.products = ko.observableArray([]);
        // to hide/show the spinner
        self.loadingData = ko.observable(true);

        // search input field model
        self.searchQuery = ko.observable('');

        // handler for search box form
        self.searchProducts = function () {
            console.log('search for ', self.searchQuery());
            if (window.location.pathname !== window.searchPage)
                window.location.href = window.searchPage + '?q=' + (queryParams('q') || self.searchQuery());
            else {
                searchProductsApi(self.searchQuery());
            }
        }

        // expose the load Method to trigger on page load
        var loadCategories = function () {
            self.loadingData(true);
            $.getJSON('/api/category/main').done(function (data) {
                console.log('api category', data);
                data.forEach(function (x) {
                    self.categories.push(x);
                    categories.push(x);
                });
                self.loadingData(false);
            }).fail(function () {
                self.loadingData(false);
            });
        }
        var searchProductsApi = function (q, catid, id) {
            self.loadingData(true);
            self.searchQuery(q);
            $.getJSON('/api/product/search', { Name: q }).done(function (data) {
                console.log('api category', data);
                self.products([]);
                data.data.forEach(function (x) {
                    self.products.push(x);
                });
                self.loadingData(false);
            }).fail(function () {
                self.loadingData(false);
            });
        }

        return {
            loadCategories: loadCategories,
            searchProductsApi: searchProductsApi
        }
    };
    if (window.location.href.indexOf(window.searchPage) !== -1)
        ViewModel().searchProductsApi(queryParams('q'));
    // call this method to load the data on page laod from the API
    ViewModel().loadCategories();
    ko.applyBindings(new ViewModel());

})($, ko);


