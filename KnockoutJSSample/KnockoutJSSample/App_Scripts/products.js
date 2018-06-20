(function ($, ko) {

    ko.bindingHandlers.select2 = {
        init: function (el, valueAccessor, allBindingsAccessor, viewModel) {
            ko.utils.domNodeDisposal.addDisposeCallback(el, function () {
                $(el).select2('destroy');
            });

            var allBindings = allBindingsAccessor(),
                select2 = ko.utils.unwrapObservable(allBindings.select2);

            $(el).select2(select2);
        },
        update: function (el, valueAccessor, allBindingsAccessor, viewModel) {
            var allBindings = allBindingsAccessor();

            if ("value" in allBindings) {
                if ((allBindings.select2.multiple || el.multiple) && allBindings.value().constructor != Array) {
                    $(el).val(allBindings.value().split(',')).trigger('change');
                }
                else {
                    $(el).val(allBindings.value()).trigger('change');
                }
            } else if ("selectedOptions" in allBindings) {
                var converted = [];
                var textAccessor = function (value) { return value; };
                if ("optionsText" in allBindings) {
                    textAccessor = function (value) {
                        var valueAccessor = function (item) { return item; }
                        if ("optionsValue" in allBindings) {
                            valueAccessor = function (item) { return item[allBindings.optionsValue]; }
                        }
                        var items = $.grep(allBindings.options(), function (e) { return valueAccessor(e) == value });
                        if (items.length == 0 || items.length > 1) {
                            return "UNKNOWN";
                        }
                        return items[0][allBindings.optionsText];
                    }
                }
                $.each(allBindings.selectedOptions(), function (key, value) {
                    converted.push({ id: value, text: textAccessor(value) });
                });
                $(el).select2("data", converted);
            }
            $(el).trigger("change");
        }
    };

    var ViewModel = function () {
        var self = this;
        self.products = ko.observableArray([]);
        self.loadingData = ko.observable(true);
        self.selectedCategory = ko.observable(null);

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

        var loadProducts = function () {
            self.loadingData(true);
            $.getJSON('/api/product').done(function (data) {
                console.log('api products', data);
                data.forEach(function (x) {
                    self.products.push(x);
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

})($, ko);


