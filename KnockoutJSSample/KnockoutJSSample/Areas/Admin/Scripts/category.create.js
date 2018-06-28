/// <reference path="~/Scripts/jquery-3.3.1.js" />
/// <reference path="~/Areas/Shop/Scripts/js/main.js" />
/// <reference path="~/Scripts/knockout.mapping-latest.js" />
/// <reference path="~/Scripts/knockout-3.4.2.js" />
(function ($, ko) {
    var url = '/api/category/';

    var Category = function (id, name, parentId) {
        this.Id = ko.observable(id || 0);
        this.Name = ko.observable(name || '');
        this.ParentId = ko.observable(parentId);
    }

    Category.prototype.toString = function () {
        return this.Name();
    };

    Category.prototype.isValid = function () {
        return this.Name() !== '';
    };

    var ViewModel = function () {
        var self = this;
        self.loadingData = ko.observable(false);
        self.category = ko.observable(new Category());
        self.categories = ko.observableArray([]);
        self.isFormValid = ko.computed(function () {
            return self.category().isValid();
        });

        var getCategory = function (id) {
            $.ajax({
                url: url + id,
                method: 'get',
                beforeSend: function () {
                    self.loadingData(true);
                },
                success: function (x) {
                    self.category(new Category(x.Id, x.Name, x.ParentId));
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
            self.category(new Category());
        }

        var onError = function (err) {
            console.log(err);
        }

        var onBeforeSend = function () {
            self.loadingData(true);
        }

        self.save = function () {
            console.log('I am in submit() function');
            var data = ko.toJSON(self.category());
            console.log(self.category(), 'category to save');
            if (window.editMode) {
                $.ajax({
                    url: url + window.categoryId,
                    method: 'put',
                    contentType: 'application/json',
                    data: data,
                    beforeSend: onBeforeSend,
                    success: function (data) {
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

        $.getJSON('/api/category/main').done(function (data) {
            console.log('api category', data);
            self.categories.push({ Name: '', Id: null });
            data.forEach(function (x) {
                self.categories.push(x);
            });
            if (window.editMode) {
                getCategory(window.categoryId);
            }
            self.loadingData(false);

        }).fail(function () {
            self.loadingData(false);
        });
    };

    ko.applyBindings(new ViewModel());

})($, ko);


