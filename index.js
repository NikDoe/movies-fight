const fetchData = async () => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: 'ee463b02',
			s: 'avengers',
		},
	});

	console.log(response.data);
};

fetchData();
