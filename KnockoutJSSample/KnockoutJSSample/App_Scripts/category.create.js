(function ($, ko) {
    var url = '/api/category/';

    var Category = function (id, name) {
        this.Id = ko.observable(id || 0);
        this.Name = ko.observable(name || '');
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
                    self.category(new Category(0, x.Name));
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

        if (window.editMode) {
            getCategory(window.categoryId);
        }
    };

    ko.applyBindings(new ViewModel());

})($, ko);


