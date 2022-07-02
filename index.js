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

function onInput(event) {
	fetchData(event.target.value);
}

input.addEventListener('input', debounce(onInput));
