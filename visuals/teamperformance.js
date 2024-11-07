const url = 'https://serie-a-league.p.rapidapi.com/team/perfomance?teamId=110';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'a875dc5cbemsha6bf1fc010ff196p1844cdjsncadb96e441d7',
        'x-rapidapi-host': 'serie-a-league.p.rapidapi.com'
    }
};

// Define an async function to fetch data
async function fetchTeamPerformance() {
    try {
        const response = await fetch(url, options);
        
        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json(); // Parse the response as JSON
        console.log(result); // Log the result to the console
    } catch (error) {
        console.error('Error fetching data:', error); // Log any errors to the console
    }
}

// Call the async function to execute the fetch
fetchTeamPerformance();