function prepareData(numberOfRows){
	console.time("prep data");
	let i = 1,
		arr = new Array(numberOfRows).fill().map(function() {
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

function prepareDataPromise(numberOfRows){
	return new Promise(function (resolve, reject) {
		setTimeout(function(){
			try {
					let arr = prepareData(numberOfRows);
					resolve(arr);
			}
			catch (e) {
				reject(e);	
			}
		}, 100);
	});
}