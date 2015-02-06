'use strict';

angular.module('app').controller('productController',
    function productController(productDataService) {
        var vm = this;
        vm.products = productDataService.getProducts();

    }
);