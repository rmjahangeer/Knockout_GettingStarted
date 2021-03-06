﻿/// <reference path="~/Scripts/jquery-3.3.1.js" />
/// <reference path="~/Areas/Shop/Scripts/js/main.js" />
/// <reference path="~/Scripts/knockout.mapping-latest.js" />
/// <reference path="~/Scripts/knockout-3.4.2.js" />
(function ($, ko) {
    var url = '/api/product/';
    
    var Product = function (id, name, categoryId, price, image, productImages) {
        this.Id = ko.observable(id || 0);
        this.Name = ko.observable(name || '');
        this.CategoryId = ko.observable(categoryId || 0);
        this.Price = ko.observable(price || 0);
        this.Image = ko.observable(image || '');
        this.ProductImages = ko.observableArray(productImages);
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
        return this.Name() !== '' && this.CategoryId() && this.Price();
    };

    var ProductViewModel = function () {
        var self = this;
        self.loadingData = ko.observable(true);
        self.imageFiles = ko.observable([]);
        self.productName = ko.observable('');
        self.categoriesList = ko.observableArray([/*new Category(5, "asd"), new Category(6, "iuyiuh")*/]);
        self.selectedCategory = ko.observable(null);
        self.product = ko.observable(new Product());

        self.isFormValid = ko.computed(function () {
            return self.product().isValid();
        });

        self.featureImage = ko.observable({
            dataURL: ko.observable(),
            file: ko.observable()
        });
        self.productImages = ko.observable({
            fileArray: ko.observableArray(),
            binaryStringArray: ko.observableArray(),
            textArray: ko.observableArray(),
            dataURLArray: ko.observableArray(),
            arrayBufferArray: ko.observableArray(),
            base64StringArray: ko.observableArray(),
        });
        self.onClear = function (fileData) {
            if (confirm('Are you sure?')) {
                fileData.clear && fileData.clear();
            }
        };

        self.removeImage = function (img) {
            self.productImages().dataURLArray.remove(img);
            self.productImages().fileArray.remove(img);
            var image = self.product().ProductImages().find(function (x) {
                return x.Image.indexOf(img) !== -1;
            });
            if (image) {
                self.product().ProductImages().splice(self.product().ProductImages().indexOf(image), 1);
                $.ajax({
                    url: '/api/productImage/' + image.Id,
                    method: 'delete',
                    beforeSend: function () {
                        self.loadingData(true);
                    },
                    success: function (data) {
                        console.log('image deleted', image);
                    },
                    complete: function () {
                        self.loadingData(false);
                    },
                    error: function (err) {
                        console.log(err);
                    }
                });
            }
        }

        var loadCategories = function () {
            $.ajax({
                url: '/api/category',
                method: 'get',
                beforeSend: function () {
                    self.loadingData(true);
                },
                success: function (data) {
                    self.categoriesList.push(new Category(null, ''));
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
                    self.product(new Product(x.Id, x.Name, x.CategoryId, x.Price, x.Image, x.ProductImages));
                    self.featureImage().dataURL(x.Image);
                    x.ProductImages.forEach(function (i) {
                        self.productImages().dataURLArray.push(i.Image);
                    });
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
            //alert('Saved !');
            self.product(new Product());
            self.productImages().clear();
            self.featureImage().clear();
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
            var formData = new FormData();
            formData.append('data', data);
            formData.append('featureImage', self.featureImage().file());
            self.productImages().fileArray().forEach(function (file) {
                formData.append('files', file);
            });
            console.log(self.product(), 'product to save');
            if (window.editMode) {
                $.ajax({
                    url: url + window.productId,
                    method: 'put',
                    data: formData,
                    contentType: false,       // The content type used when sending data to the server.
                    cache: false,             // To unable request pages to be cached
                    processData: false,        // To send DOMDocument or non processed data file it is set to false
                    beforeSend: onBeforeSend,
                    success: function (data) {
                        //alert('Saved !');
                        window.location.href = window.redirectUrl;
                    },
                    complete: onComplete,
                    error: onError

                });
            } else {
                $.ajax({
                    url: url,
                    method: 'post',
                    data: formData,
                    contentType: false,       // The content type used when sending data to the server.
                    cache: false,             // To unable request pages to be cached
                    processData: false,        // To send DOMDocument or non processed data file it is set to false
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
