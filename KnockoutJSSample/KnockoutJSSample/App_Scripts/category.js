(function ($, ko) {
    var url = '/api/category';
    var ViewModel = function () {
        // save reference of `this`
        var self = this;
        // local array for filtering
        var categories = [];
        // observable list of categories to bind on list view 
        self.categories = ko.observableArray([]);
        // to hide/show the spinner
        self.loadingData = ko.observable(true);

        // bind filter query to this
        self.filter = ko.observable('');

        // watch the changes and trigger the filter
        self.filter.subscribe(function (value) {
            if (!value) {
                self.categories(categories);
                return;
            }

            value = value.toLowerCase();
            var filteredList = categories.filter(function (x) {
                return (x.Id.toString().toLowerCase().indexOf(value) !== -1 ||
                    x.Name.toLowerCase().indexOf(value) !== -1);
            });
            self.categories(filteredList);
        });

        // init default sorting parameters
        self.sortParams = ko.observable({
            sort: ko.observable('id'),
            asc: ko.observable(true),
            dir: ko.observable('asc')
        });

        // handler for sorting the list observale on list view
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
                var list = _.orderBy(self.categories(), 'Id', asc.dir());
                self.categories(list);
                break;
            case 'name':
                var list = _.orderBy(self.categories(), 'Name', asc.dir());
                self.categories(list);
                break;

            default:
            }
        }

        // click handler for remove button
        self.remove = function (item) {
            console.log('I am in removecategories()', item);
            var isDeleteConfirmed = confirm('Are you sure you want to remove this ?');
            if (isDeleteConfirmed) {
                $.ajax({
                    url: url + '/' + item.Id,
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

        // expose the load Method to trigger on page load
        var loadCategories = function () {
            self.loadingData(true);
            $.getJSON(url).done(function (data) {
                console.log('api category', data);
                data.forEach(function (x) {
                    self.categories.push(x);
                    categories.push(x);
                });
                self.loadingData(false);
            }).fail(function() {
                self.loadingData(false);
            });
        }
        return {
            loadCategories: loadCategories
        }
    };

    // call this method to load the data on page laod from the API
    ViewModel().loadCategories();
    ko.applyBindings(new ViewModel());

})($, ko);


