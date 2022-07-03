const input = document.querySelector('input');

const fetchData = async searchTerm => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: 'ee463b02',
			s: searchTerm,
		},
	});

	return response.data.Search;
};

async function onInput(event) {
	const movies = await fetchData(event.target.value);
	console.log(movies);
}

input.addEventListener('input', debounce(onInput));
