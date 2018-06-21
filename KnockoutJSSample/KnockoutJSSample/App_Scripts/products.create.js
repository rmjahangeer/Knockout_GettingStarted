﻿(function ($, ko) {
    var url = '/api/product/';
    ko.bindingHandlers.select2 = {
        init: function (el, valueAccessor, allBindingsAccessor, viewModel) {
            ko.utils.domNodeDisposal.addDisposeCallback(el, function () {
                $(el).select2('destroy');
            });

            var allBindings = allBindingsAccessor(),
                select2 = ko.utils.unwrapObservable(allBindings.select2);

            $(el).select2(select2);

            //viewModel.categoriesList.subscribe(function(value) {
            //    console.log(value, 'in subscribe');
            //});
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

    var Product = function (id, name, categoryId) {
        this.Id = ko.observable(id || 0);
        this.Name = ko.observable(name || '');
        this.CategoryId = ko.observable(categoryId || 0);
    }

    var Category = function (id, name, disabled, children) {
        this.id = id;
        this.text = name;
        this.disabled = disabled || false;
        this.children = children || [];
    }

    Category.prototype.toString = function () {
        return this.text + "(" + this.id + ")";
    };
    
    Product.prototype.isValid = function () {
        return this.Name() !== '' && this.CategoryId();
    };

    var ProductViewModel = function () {
        var self = this;
        self.loadingData = ko.observable(true);
        self.productName = ko.observable('');
        self.categoriesList = ko.observableArray([/*new Category(5, "asd"), new Category(6, "iuyiuh")*/]);
        self.selectedCategory = ko.observable(null);
        self.product = ko.observable(new Product());

        self.isFormValid = ko.computed(function () {
            return self.product().isValid();
        });

        var loadCategories = function () {
            $.ajax({
                url: '/api/category',
                method: 'get',
                beforeSend: function () {
                    self.loadingData(true);
                },
                success: function (data) {
                    data.forEach(function (x) {
                        self.categoriesList.push(new Category(x.Id, x.Name));
                    });
                    if (window.productId)
                        getProduct(window.productId);
                },
                complete: function () {
                    self.loadingData(false);
                },
                error: function (err) {
                    console.log(err);
                }
            });
        }

        var getProduct = function (id) {
            $.ajax({
                url: url + id,
                method: 'get',
                beforeSend: function () {
                    self.loadingData(true);
                },
                success: function (x) {
                    self.product(new Product(x.Id, x.Name, x.CategoryId));
                },
                complete: function () {
                    self.loadingData(false);
                },
                error: function (err) {
                    console.log(err);
                }
            });
        }

        var onComplete = function () {
            self.loadingData(false);
        }
        
        var onSuccess = function (data) {
            alert('Saved !');
            self.product(new Product());
        }
        
        var onError = function (err) {
            console.log(err);
        }
        
        var onBeforeSend = function () {
            self.loadingData(true);
        }

        self.save = function () {
            console.log('I am in submit() function');
            var data = ko.toJSON(self.product());
            console.log(self.product(), 'product to save');
            if (window.editMode) {
                $.ajax({
                    url: url + window.productId,
                    method: 'put',
                    contentType: 'application/json',
                    data: data,
                    beforeSend: onBeforeSend,
                    success: function (data) {
                        alert('Saved !');
                        window.location.href = window.redirectUrl;
                    },
                    complete: onComplete,
                    error: onError

                });
            } else {
                $.ajax({
                    url: url,
                    method: 'post',
                    contentType: 'application/json',
                    data: data,
                    beforeSend: onBeforeSend,
                    success: onSuccess,
                    complete: onComplete,
                    error: onError
                });
            }

        }

        loadCategories();
    };

    ko.applyBindings(new ProductViewModel());

})($, ko);


