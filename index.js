const input = document.querySelector('input');

const fetchData = async searchTerm => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: 'ee463b02',
			s: searchTerm,
		},
	});

	if (response.data.Error) return [];

	return response.data.Search;
};

async function onInput(event) {
	const movies = await fetchData(event.target.value);
	for (const movie of movies) {
		const div = document.createElement('div');

		div.innerHTML = `
			<img src="${movie.Poster}" alt="poster" />
			<h1>${movie.Title}</h1>
		`;
		document.querySelector('#target').appendChild(div);
	}
}

input.addEventListener('input', debounce(onInput));
