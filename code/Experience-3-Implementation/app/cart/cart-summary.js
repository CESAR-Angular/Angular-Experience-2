'use strict';

angular.module('app').directive('cartSummary', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/cart/cart-summary.html',
        replace: true
    };
});

