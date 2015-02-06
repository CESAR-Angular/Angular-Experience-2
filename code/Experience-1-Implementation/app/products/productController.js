'use strict';

angular.module('app').controller('productController', function() {
    var vm = this;
    vm.getProducts = function() {
        return products;
    };
});