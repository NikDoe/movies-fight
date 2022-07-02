const input = document.querySelector('input');

const fetchData = async searchTerm => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: 'ee463b02',
			s: searchTerm,
		},
	});

	console.log(response.data);
};

const debounce = (f, delay = 1000) => {
	let timerID;
	return (...args) => {
		if (timerID) clearTimeout(timerID);
		timerID = setTimeout(() => {
			f.apply(null, args);
		}, delay);
	};
};

function onInput(event) {
	fetchData(event.target.value);
}

input.addEventListener('input', debounce(onInput));
