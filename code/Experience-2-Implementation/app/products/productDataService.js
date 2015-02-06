'use strict';

angular.module('app').service("productDataService",
    function($resource) {
        var self = this;
        var resource = $resource('api/products');

        self.getProducts = function() {
            return resource.query();
        };
    }
);

