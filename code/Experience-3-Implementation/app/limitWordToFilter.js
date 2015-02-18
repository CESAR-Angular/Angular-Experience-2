'use strict';

angular.module('app').filter('limitWordTo', function () {
  return function(value, numberOfWords) {
    var valueWords = value.split(' ');
    if (valueWords.length > numberOfWords) {
      return valueWords.slice(0, numberOfWords).join(" ") + "...";
    }
    else
      return value;
  }
});