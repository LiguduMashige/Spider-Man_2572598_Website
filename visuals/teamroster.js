const url = 'https://serie-a-league.p.rapidapi.com/team/roster?teamId=110';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'a875dc5cbemsha6bf1fc010ff196p1844cdjsncadb96e441d7',
		'x-rapidapi-host': 'serie-a-league.p.rapidapi.com'
	}
};

async function fetchTeamRoster() {
	try {
		const response = await fetch(url, options);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const result = await response.json();  // Parse response as JSON
		console.log(result);  // Log data to the console
	} catch (error) {
		console.error(error);  // Log any errors
	}
}

// Call the async function
fetchTeamRoster();



 /* const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '5b8c8f92ffmshe4755a2017a2a97p1a428djsn2fd521015450',
		'x-rapidapi-host': 'serie-a-league.p.rapidapi.com'
	}
};

const teamIds = [103, 104, 105, 107, 109, 110, 111, 112, 113, 114, 115, 118, 119, 239, 2925, 2572, 2574, 3263, 4007, 17530];

async function fetchTeamRoster(teamId) {
	const url = `https://serie-a-league.p.rapidapi.com/team/roster?teamId=${teamId}`;
	try {
		const response = await fetch(url, options);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const result = await response.json(); // Use .json() to parse the response
		console.log(`Roster for Team ID ${teamId}:`, result);
	} catch (error) {
		console.error(`Error fetching roster for Team ID ${teamId}:`, error);
	}
}

async function fetchAllTeamRosters() {
	for (const teamId of teamIds) {
		await fetchTeamRoster(teamId);
	}
}

// Call the function to fetch rosters for all teams
fetchAllTeamRosters(); */