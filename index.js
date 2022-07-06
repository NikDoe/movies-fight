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

const movieTemplate = movieDetail => {
	return `
    <article class="media">
      <figure class="media-left">
        <p class="image">
          <img src="${movieDetail.Poster}" alt="" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>${movieDetail.Title}</h1>
          <h4>${movieDetail.Genre}</h4>
          <p>${movieDetail.Plot}</p>
        </div>
      </div>
    </article>
  `;
};

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

async function onMovieSelect(id) {
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: 'ee463b02',
			i: id,
		},
	});

	document.querySelector('#target').innerHTML = movieTemplate(response.data);
}

async function onInput(event) {
	const movies = await fetchData(event.target.value.trim());

	if (!movies.length) {
		dropdown.classList.remove('is-active');
		return;
	}

	resultsWrapper.innerHTML = '';
	dropdown.classList.add('is-active');
	for (const movie of movies) {
		const option = document.createElement('a');
		const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;

		option.classList.add('dropdown-item');
		option.innerHTML = `
			<img src="${imgSrc}" alt="" />
			${movie.Title}
		`;

		option.addEventListener('click', () => {
			dropdown.classList.remove('is-active');
			input.value = movie.Title;
			onMovieSelect(movie.imdbID);
		});

		resultsWrapper.appendChild(option);
	}
}

input.addEventListener('input', debounce(onInput));

document.addEventListener('click', event => {
	if (!root.contains(event.target)) dropdown.classList.remove('is-active');
});
