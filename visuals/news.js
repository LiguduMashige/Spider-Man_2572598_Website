const url = 'https://serie-a-league.p.rapidapi.com/news?limit=10';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'a875dc5cbemsha6bf1fc010ff196p1844cdjsncadb96e441d7',
		'x-rapidapi-host': 'serie-a-league.p.rapidapi.com'
	}
};

async function fetchData() {
	try {
		const response = await fetch(url, options);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const result = await response.json(); // Use .json() if you expect JSON response
		console.log(result);
	} catch (error) {
		console.error('Error fetching data:', error);
	}
}

// Call the async function
fetchData();