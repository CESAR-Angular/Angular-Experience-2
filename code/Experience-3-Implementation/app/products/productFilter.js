angular.module('app')
  .filter('axFilter', function( $filter ) {
  
  return function( list, category, textSearch ) {
    var textSearch = textSearch || "";
    var outputList = [];


    if (typeof category !== 'undefined' && category.category !== 'undefined') {
      angular.forEach(list, function(value, key){
        var obj = value;
        if(obj.category == category.category){
           this.push(obj);
        }
      }, outputList);
    } else {
      outputList = list;
    }
    
    if( textSearch.length > 2 ){
      outputList = $filter('filter')(outputList, textSearch);
    } 

    return outputList;
  
  };

});