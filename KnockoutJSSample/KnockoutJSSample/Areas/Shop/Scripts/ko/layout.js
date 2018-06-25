(function ($, ko) {
    var ViewModel = function () {
        // save reference of `this`
        var self = this;
        // local array for filtering
        var categories = [];
        // observable list of categories to bind on list view 
        self.categories = ko.observableArray([]);
        // to hide/show the spinner
        self.loadingData = ko.observable(true);

        // search input field model
        self.searchQuery = ko.observable('');
        self.resultsQuery = ko.observable('');

        // handler for search box form
        self.searchProducts = function () {
            console.log('search for ', self.searchQuery());
            window.location.href = window.searchPage + '?q=' + (self.searchQuery() || queryParams('q'));
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
        loadCategories();
    };
    ko.applyBindings(new ViewModel(), $('#top-nav')[0]);

})($, ko);


