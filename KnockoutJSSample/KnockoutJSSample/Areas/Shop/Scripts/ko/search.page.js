(function ($, ko) {
    var ViewModel = function () {
        // save reference of `this`
        var self = this;
        var fireChangeCurrentPage = false;
        // observable list of products to bind on list view 
        self.products = ko.observableArray([]);
        // to hide/show the spinner
        self.loadingData = ko.observable(true);

        // search input field model
        self.resultsQuery = ko.observable('');

        self.sortDirection = ko.observable(true);
        self.changeSortDirection = function () {
            self.sortDirection(!self.sortDirection());
            self.searchProducts();
        };
        self.sortBy = ko.observable(0);
        self.sortBy.subscribe(function () {
            self.searchProducts();
        });
        self.sortingOptions = ko.observableArray([
            { key: 'Name', value: 0 },
            { key: 'Category', value: 1 },
            { key: 'Price', value: 2 },
            { key: 'New In', value: 3 }
        ]);

        self.pageSize = ko.observable(10);
        self.pageSize.subscribe(function () {
            self.searchProducts();
            self.currentPage(1);
        });
        self.showOptions = ko.observableArray([
            { key: '10', value: 10 },
            { key: '20', value: 20 },
            { key: '30', value: 30 }
        ]);

        self.currentPage = ko.observable(1);
        self.currentPage.subscribe(function () {
            if (fireChangeCurrentPage)
                self.searchProducts();
        });
        self.pages = ko.observableArray([
            { key: ' 1', value: 1 }
        ]);

        self.addToCart = function(item) {
            window.cart.addToCart(item);
        }
        
        // expose the load Method to trigger on page load
        self.searchProducts = function () {
            ko.contextFor($('#top-nav')[0]).$data.loadingData(true);
            var q = queryParams('q');
            var categoryId = queryParams('catId');
            ko.contextFor($('#top-nav')[0]).$data.searchQuery(q);
            self.resultsQuery(q);
            var searchParams = {
                Name: q,
                CategoryId: categoryId,
                SortBy: self.sortBy(),
                PageSize: self.pageSize(),
                IsAsc: self.sortDirection(),
                PageNo: self.currentPage()
            };

            $.getJSON('/api/product/search', searchParams).done(function (data) {
                console.log('api category', data);
                self.products([]);
                data.data.forEach(function (x) {
                    self.products.push(x);
                });
                fireChangeCurrentPage = false;
                self.pages([]);
                var pages = Math.floor((data.recordsFiltered + self.pageSize() - 1) / self.pageSize());
                for (var i = 1; i <= pages; i++) {
                    self.pages.push({
                        key: i.toString(),
                        value: i
                    });
                }
                self.currentPage(searchParams.PageNo);
                fireChangeCurrentPage = true;
                ko.contextFor($('#top-nav')[0]).$data.loadingData(false);
            }).fail(function () {
                ko.contextFor($('#top-nav')[0]).$data.loadingData(false);
            });

        }

        if (window.location.href.indexOf(window.searchPage) !== -1)
            self.searchProducts();
    };

    ko.applyBindings(new ViewModel(), $('#search-page')[0]);

})($, ko);


