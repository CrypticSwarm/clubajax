Summary:
=======================

### Declare

Creates a constructor Function from a
Function, and collection of methods, and
more Functions that are extended.
description:
Similar in look and feel to Dojo declare as
far as order and number of arguments, although
constructed a little closer to prototypical
inheritance. All arguments passed into the
constructor are passed into all sub constructors.
arguments:
Function, [Object|Function....]
The first argument is always the base
constructor. The last argument is always
an object of methods (or empty object) to
be mixed in (in the future would like to
make that object optional). Remaining
arguments are other constructors mixed in
using extend() (See below).

### Example:

	MyFunction = dojox.drawing.util.oo.declare(
		MyOtherFunction,
		YetAnotherFunction,
		function(options){
			//This is the main constructor. It will fire last.
			// The other constructors will fire before this.
		},
		{
			customType:"equation", // mixed in property
			doThing: function(){   // mixed in method
				         
			}
		} 
	);
	
	var f = new MyFunction();

