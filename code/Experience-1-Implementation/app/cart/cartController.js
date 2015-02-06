'use strict';

angular.module('app').controller('cartController', function() {
    var vm = this;
    vm.cartItems = [];
    vm.addItem = addItem;
    vm.getNumberOfItems = getNumberOfItems;
    vm.getTotal = getTotal;

    function addItem(product) {
        var productIndex = getProductIndex(product);
        if (productIndex === -1) {
            pushItem(product);
        } else {
            updateItem(productIndex, 1);
        }
    }

    function getProductIndex(product) {
        return vm.cartItems.map(function (item) {
            return item.product;
        }).indexOf(product);
    }

    function pushItem(product) {
        vm.cartItems.push(new CartItem(product));
    }

    function CartItem(product) {
        this.product = product;
        this.quantity = 1;
        this.getSubTotal = function() {
            return this.quantity * this.product.price;
        };
    }

    function updateItem(productIndex, value) {
        vm.cartItems[productIndex].quantity += value;
    }

    function getNumberOfItems() {
        var numberOfItems = 0;
        angular.forEach(vm.cartItems, function(item) {
            numberOfItems += item.quantity;
        });
        return numberOfItems;
    }

    function getTotal() {
        var total = 0;
        angular.forEach(vm.cartItems, function(item) {
            total += item.getSubTotal();
        });
        return total;
    }
});


