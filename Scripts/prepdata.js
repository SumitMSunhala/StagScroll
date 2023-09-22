function prepData(numberOfRows){
	console.time("prep data");
	var i = 1;
	var arr = new Array(numberOfRows).fill().map(function() {
		return {
			index: i++,
			first: chance["first"](),
			last: chance["last"](),
			email: chance["email"](),
			city: chance["city"](),
			state: chance["state"](),
		};
	});
	console.timeEnd("prep data");
	return arr;
}