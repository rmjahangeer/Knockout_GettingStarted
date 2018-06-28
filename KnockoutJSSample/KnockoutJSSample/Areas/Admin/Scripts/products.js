/// <reference path="~/Scripts/jquery-3.3.1.js" />
/// <reference path="~/Areas/Shop/Scripts/js/main.js" />
/// <reference path="~/Scripts/knockout.mapping-latest.js" />
/// <reference path="~/Scripts/knockout-3.4.2.js" />
/// <reference path="~/Scripts/underscore-min.js" />
(function ($, ko, _) {
    var ViewModel = function () {
        var self = this;
        var products = [];
        self.products = ko.observableArray([]);
        self.loadingData = ko.observable(true);
        self.selectedCategory = ko.observable(null);
        self.filter = ko.observable('');

        self.filter.subscribe(function (value) {
            if (!value) {
                self.products(products);
                return;
            }

            value = value.toLowerCase();
            var filteredList = products.filter(function (x) {
                return (x.Id.toString().toLowerCase().indexOf(value) !== -1 ||
                    x.Name.toLowerCase().indexOf(value) !== -1 ||
                    x.CategoryName.toLowerCase().indexOf(value) !== -1);
            });
            self.products(filteredList);
        });

        self.removeProduct = function (item) {
            console.log('I am in removeProduct()', item);
            var isDeleteConfirmed = confirm('Are you sure you want to remove this ?');
            if (isDeleteConfirmed) {
                $.ajax({
                    url: '/api/product/' + item.Id,
                    method: 'delete',
                    beforeSend: function () {
                        self.loadingData(true);
                    },
                    success: function () {
                        self.products.remove(item);
                    },
                    error: function (err) {
                        console.log(err);
                        alert('Error occured while deleting');
                    },
                    complete: function (data) {
                        self.loadingData(false);
                    }
                });

            }
        };

        self.sort = function (s, asc) {
            // check if the sorting is being done on same column 
            // reset the sorting dir to `asc` if column changed
            if (self.sortParams().sort() !== s) {
                asc.asc(true);
                asc.dir('asc');
            } else {
                asc.asc(!asc.asc());
                asc.dir(asc.asc() ? 'asc' : 'desc');
            }

            // update the sorting observable
            asc.sort(s);
            self.sortParams(asc);
            console.log('sort by', s, ko.toJS(asc));

            // using `lodash` sort the list based on column
            switch (s) {
                case 'id':
                    var list = _.orderBy(self.products(), 'Id', asc.dir());
                    self.products(list);
                    break;
                case 'name':
                    var list = _.orderBy(self.products(), 'Name', asc.dir());
                    self.products(list);
                    break;
                case 'price':
                    var list = _.orderBy(self.products(), 'Price', asc.dir());
                    self.products(list);
                    break;
                case 'category':
                    var list = _.orderBy(self.products(), 'CategoryName', asc.dir());
                    self.products(list);
                    break;


                default:
            }
        }

        self.sortParams = ko.observable({
            sort: ko.observable('id'),
            asc: ko.observable(true),
            dir: ko.observable('asc')
        });

        var loadProducts = function () {
            self.loadingData(true);
            $.getJSON('/api/product').done(function (data) {
                console.log('api products', data);
                data.forEach(function (x) {
                    self.products.push(x);
                    products.push(x);
                });
                self.loadingData(false);
            });
        }
        return {
            loadProducts: loadProducts
        }
    };

    switch (window.view) {
        case 'Index':
            ViewModel().loadProducts();
            break;
    }
    ko.applyBindings(new ViewModel());

})($, ko, _);


