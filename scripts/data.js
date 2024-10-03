// Define the API endpoint
const apiUrl = 'https://data.cityofnewyork.us/api/views/uip8-fykc/rows.json';

// Fetch the data from the API
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the JSON response
  })
  .then(data => {
    // Call the function to extract crime types and store them in an array
    const crimeTypesArray = extractCrimeTypes(data.data);
    console.log(crimeTypesArray); // Log the array to the console
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

// Function to extract and return crime types as an array from the first 100 entries
function extractCrimeTypes(data) {
  // Create an empty array to store the crime types
  const crimeTypes = [];

  // Ensure there are at least 100 records
  const limit = Math.min(data.length, 200);

  // Loop through the first 100 records and extract the crime types at index 13
  for (let i = 0; i < limit; i++) {
    const crimeType = data[i][13]; // Index 13 contains the crime type
    crimeTypes.push(crimeType); // Add the crime type to the array
  }

  // Return the array of crime types
  return crimeTypes;
}
