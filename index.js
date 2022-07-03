const root = document.querySelector('.autocomplete');

root.innerHTML = `
  <label><b>Search For a Movie</b></label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

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

	dropdown.classList.add('is-active');
	for (const movie of movies) {
		const option = document.createElement('a');

		option.classList.add('dropdown-item');
		option.innerHTML = `
			<img src="${movie.Poster}" alt="poster" />
			${movie.Title}
		`;
		resultsWrapper.appendChild(option);
	}
}

input.addEventListener('input', debounce(onInput));
