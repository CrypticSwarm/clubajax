declare = function(){
	// first arg - required
	//		constructor Function
	// second arg(s) - optional
	// 		mixin constructors
	// last arg - optional
	//		mixin object property bag
	
	var f, o, a = arguments;
	
	a = Array.prototype.slice.call(arguments);
	if(a.length == 1){ 
		f = a.pop();
		o = {};	
	}else{
		o = a.pop();
		f = a.pop();
	}
	
	f.prototype = o;
	// for(var n in o){ f.prototype[n] = o[n]; }
	
	if(a.length){
		a.unshift(f);
		return declare.extend.apply(this, a); // Function
	}else{
		var _f = function(){
			declare.mix.call(this, o, arguments[0], _f);
			f.prototype.constructor.apply(this, arguments);
		}
		_f.prototype = f.prototype;	
	}
	
	return _f; // Function
};

declare.mix = function(obj, props, f){
	for(var nm in props){
		if(obj[nm] !== undefined){
			obj[nm] = props[nm];
		}else if(declare.learn){
			console.error(nm + " is not a valid parameter");
		}else{
			var upper = nm.charAt(0).toUpperCase() + nm.substring(1)
			var o = f.prototype;
			
			(function(){
				var argName = nm;
				var arg = props[nm];
				o["get" + upper] = function(){
					return typeof(arg)=="function" ? arg.apply(this) : arg;
				};
				
				o["set" + upper] = function(val){
					if(typeof(arg)=="function"){
						console.error("'" + argName + "' is only a getter.");	
					}else{
						arg = val;
					}
				};
				
			})();
		}
	}
}

declare.extend = function(){
	
	var a = Array.prototype.slice.call(arguments);
	var main = a.pop();
	
	if(arguments.length<2){ console.error("oo.extend; not enough arguments"); }
	
	// f is the actual constructor that gets fired
	var f = function (){
		declare.mix.call(this, f.prototype, arguments[0], f);
		
		// loop through all subs, starting after main
		for(var i=0;i<a.length;i++){
			a[i].prototype.constructor.apply(this, arguments);
		}
		// main should fire last
		main.prototype.constructor.apply(this, arguments);
		
	}
	for(var i=0;i<a.length;i++){
		for(var n in a[i].prototype){
			f.prototype[n] = a[i].prototype[n];
		}
	}
		
	for(var n in main.prototype){
		f.prototype[n] = main.prototype[n];
	}
	return f; // Function
}