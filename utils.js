const debounce = (f, delay = 1000) => {
	let timerID;
	return (...args) => {
		if (timerID) clearTimeout(timerID);
		timerID = setTimeout(() => {
			f.apply(null, args);
		}, delay);
	};
};
