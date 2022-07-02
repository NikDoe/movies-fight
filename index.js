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

let timerID;
function onInput(event) {
	if (timerID) clearTimeout(timerID);
	timerID = setTimeout(() => {
		fetchData(event.target.value);
	}, 1000);
}

input.addEventListener('input', onInput);
