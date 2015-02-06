'use strict';

angular.module('app').controller('cartController',
    function (cartService) {
        var vm = this;

        vm.cartItems = cartService.cartItems;

        vm.addItem = function(product) {
            cartService.addItem(product);
        };

        vm.getNumberOfItems = function() {
            return cartService.getNumberOfItems();
        };

        vm.getTotal = function() {
            return cartService.getTotal();
        };
    }
);


