(function ($, ko) {

    var ViewModel = function () {
        var self = this;
        self.categories = ko.observableArray([]);
        self.loadingData = ko.observable(true);
        self.selectedCategory = ko.observable(null);

        self.remove = function (item) {
            console.log('I am in removecategories()', item);
            var isDeleteConfirmed = confirm('Are you sure you want to remove this ?');
            if (isDeleteConfirmed) {
                $.ajax({
                    url: '/api/category/' + item.Id,
                    method: 'delete',
                    beforeSend: function () {
                        self.loadingData(true);
                    },
                    success: function () {
                        self.categories.remove(item);
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

        var loadCategories = function () {
            self.loadingData(true);
            $.getJSON('/api/category').done(function (data) {
                console.log('api category', data);
                data.forEach(function (x) {
                    self.categories.push(x);
                });
                self.loadingData(false);
            });
        }
        return {
            loadCategories: loadCategories
        }
    };

    switch (window.view) {
        case 'Index':
            ViewModel().loadCategories();
            break;
    }
    ko.applyBindings(new ViewModel());

})($, ko);


