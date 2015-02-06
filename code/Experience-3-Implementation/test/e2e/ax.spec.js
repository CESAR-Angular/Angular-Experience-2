// example-spec.js
describe('ax cart app', function() {

	var repeater = by.repeater('product in productVM.products | axFilter:categoryFilter:textFilter | orderBy: predicate:reverse');
	var addItemSelector = by.css('[ng-click="cart.addItem(product)"]');
	
	var priceToNumber = function( price ){
		price = price.replace('R$', '').replace(',', '.');
		return parseFloat( price );
	};

	it('should add first and last product', function() {

		browser.get('http://localhost:8080/');

		element.all( repeater ).first().findElement( addItemSelector ).click();
		element.all( repeater ).last().findElement( addItemSelector ).click();

		var firstPrice = element.all( repeater.column('product.price') ).first().getText().then(function( val ){
			
			var firstPriceNumb = priceToNumber( val );
			console.log("first product:", firstPriceNumb);
			
			var lastPrice = element.all( repeater.column('product.price') ).last().getText().then(function( val){
		    	var lastPriceNumb = priceToNumber( val );
		    	console.log("last product:", lastPriceNumb);

		    	var sumPrices  = firstPriceNumb + lastPriceNumb;
		    	sumPrices = sumPrices.toString().replace('.', ',');
		    	console.log("sum = ", sumPrices);

		    	var cartSummary = element.all( by.binding('cart.getNumberOfItems()') ).get(0).getText();
				expect( cartSummary ).toContain( sumPrices );
				expect( cartSummary ).toContain( 'Items: 2' );
		    });
		});
	});

	it('should open the cart summary', function() {
		element.all( by.binding('cart.getNumberOfItems()') ).get(0).click();
		element.all( by.repeater('cartItem in cart.cartItems') ).then(function(rows) {
		    expect( rows.length ).toBe(2);
		});
	});

	it('should reset the cart', function() {
		element.all( by.repeater('cartItem in cart.cartItems') ).each(function(element) {
	      element.findElement( by.model('cartItem.quantity') ).clear();
	    });
		expect( element.all( by.binding('cart.getTotal()') ).get(0).getText() ).toContain( 'R$0,00' );
	});

	it('should go back to home', function() {
		element.all( by.css('[href="/"]') ).get(0).click();
		expect( element( repeater ).isPresent() ).toBeTruthy();
	});

});