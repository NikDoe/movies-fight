const root = document.querySelector('.autocomplete');
const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

root.innerHTML = `
  <label><b>Search For a Movie</b></label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;

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
