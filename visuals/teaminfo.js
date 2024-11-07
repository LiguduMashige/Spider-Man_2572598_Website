const url = 'https://serie-a-league.p.rapidapi.com/team/info?teamId=110';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'a875dc5cbemsha6bf1fc010ff196p1844cdjsncadb96e441d7',
		'x-rapidapi-host': 'serie-a-league.p.rapidapi.com'
	}
};

async function fetchTeamInfo() {
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
fetchTeamInfo(); 

/* const teamInfoUrl = 'https://serie-a-league.p.rapidapi.com/team/info?teamId='; // Base URL for team info
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'a875dc5cbemsha6bf1fc010ff196p1844cdjsncadb96e441d7',
		'x-rapidapi-host': 'serie-a-league.p.rapidapi.com'
	}
};

// Example list of team IDs (replace with actual IDs you have)
const teamIds = [103, 104, 105, 107, 109, 110, 111, 112, 113, 114, 115, 118, 119, 239, 2925, 2572, 2574, 3263, 4007, 17530]; // Replace with actual team IDs

async function fetchTeamInfo(teamId) {
	try {
		const response = await fetch(`${teamInfoUrl}${teamId}`, options);
		if (!response.ok) {
			const errorBody = await response.text(); // Get the response body as text
			throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
		}
		const result = await response.json();  // Parse response as JSON
		console.log(`Team ID: ${teamId}`, result);  // Log team info to the console
	} catch (error) {
		console.error(error);  // Log any errors
	}
}

async function fetchAllTeamsInfo() {
	for (const teamId of teamIds) {
		await fetchTeamInfo(teamId); // Fetch info for each team ID
	}
}

// Call the async function to fetch all teams' info
fetchAllTeamsInfo(); */