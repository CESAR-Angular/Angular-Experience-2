'use strict';

angular.module('app').service("cartService",
    function() {
        var self = this;
        self.cartItems = [];

        //Public
        self.addItem = function (product) {
            var productIndex = getProductIndex(product);
            if (productIndex === -1) {
                pushItem(product);
            } else {
                updateItem(productIndex, 1);
            }
        };
        self.getNumberOfItems = function() {
            var numberOfItems = 0;
            angular.forEach(self.cartItems, function(item) {
                numberOfItems += item.quantity;
            });
            return numberOfItems;
        };
        self.getTotal = function () {
            var total = 0;
            angular.forEach(self.cartItems, function(item) {
                total += item.getSubTotal();
            });
            return total;
        };


        //Privates
        function getProductIndex(product) {
           return self.cartItems.map(function (item) {
               return item.product;
           }).indexOf(product);
        }

        function pushItem(product) {
            self.cartItems.push(new CartItem(product));
        }

        function updateItem(productIndex, value) {
            self.cartItems[productIndex].quantity += value;
        }

        function CartItem(product) {
           this.product = product;
           this.quantity = 1;
           this.getSubTotal = function() {
               return this.quantity * this.product.price;
           };
        }
    }
);