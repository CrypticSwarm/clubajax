var deepNew = function(obj) {
	return assemble(compile(obj));
};

var basicDeclare = function(obj) {
	var compiled = compile(obj);
	return function(){
		return assemble(compiled);
	};
};

var compile = function(obj) {

	var climber = {};
	var f = function(subObj, cur) {
		var prop;
		cur.fn = function(){};
		cur.fn.prototype = subObj;
		cur.sub = {};
		for (prop in subObj) {
			if (typeof subObj[prop] === 'object') {
				cur.sub[prop] = {};
				f(subObj[prop], cur.sub[prop]);
			}
		}
	};
	f(obj, climber);
	return climber;

};

var assemble = function(compiled) {

	var obj = new compiled.fn();
	var f = function(subject, descriptor) {
		var prop;
		for (prop in descriptor.sub) {
			subject[prop] = new descriptor.sub[prop].fn();
			f(subject[prop], descriptor.sub[prop]);
		}
	};
	f(obj, compiled);
	return obj;

};
