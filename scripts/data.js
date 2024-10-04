// Define the API endpoint
/* const apiUrl = 'https://data.cityofnewyork.us/api/views/uip8-fykc/rows.json';

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

  // Ensure there are at 92970 records
  const limit = Math.min(data.length, 116254);

  // Loop through the 92970 records and extract the crime types at index 13
  for (let i = 0; i < limit; i++) {
    const crimeType = data[i][13]; // Index 13 contains the crime type
    crimeTypes.push(crimeType); // Add the crime type to the array
  }

  // Return the array of crime types
  return crimeTypes;
}
*/
// Define the API endpoint
const apiUrl = 'https://data.cityofnewyork.us/api/views/uip8-fykc/rows.json';

// Fetch the data from the API
fetch(apiUrl)
  .then(response => response.json()) // Parse the JSON response
  .then(data => {
    const crimeArray = data.data; // Access the 'data' array
    const crimeCounts = countCrimeTypes(crimeArray); // Count the crime types
    createBarChart(crimeCounts); // Create the bar chart
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

// Function to count occurrences of each crime type
function countCrimeTypes(data) {
  const crimeCounts = {};

  data.forEach(row => {
    const crimeType = row[13]; // Crime type is at index 13
    if (crimeCounts[crimeType]) {
      crimeCounts[crimeType] += 1;
    } else {
      crimeCounts[crimeType] = 1;
    }
  });

  return crimeCounts;
}

// Function to create the bar chart with D3.js
function createBarChart(crimeCounts) {
  const margin = { top: 40, right: 20, bottom: 40, left: 150 };
  const width = 900 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;

  // Convert the crimeCounts object into an array of objects
  const crimeData = Object.entries(crimeCounts).map(([type, count]) => ({
    type,
    count
  }));

  // Create an SVG container
  const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Create a scale for the x-axis (crime counts)
  const x = d3.scaleLinear()
    .domain([0, d3.max(crimeData, d => d.count)]) // Domain: from 0 to max count
    .range([0, width]);

  // Create a scale for the y-axis (crime types)
  const y = d3.scaleBand()
    .domain(crimeData.map(d => d.type)) // Crime types as domain
    .range([0, height])
    .padding(0.1);

  // Create the x-axis
  svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).ticks(10))
    .append("text")
    .attr("class", "axis-label")
    .attr("x", width / 2)
    .attr("y", margin.bottom - 10)
    .attr("fill", "black")
    .attr("text-anchor", "middle")
    .text("Number of Crimes");

  // Create the y-axis
  svg.append("g")
    .call(d3.axisLeft(y));

  // Create a color scale
  const color = d3.scaleOrdinal(d3.schemeCategory10);

  // Add the bars
  svg.selectAll(".bar")
    .data(crimeData)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", 0)
    .attr("y", d => y(d.type))
    .attr("width", d => x(d.count))
    .attr("height", y.bandwidth())
    .attr("fill", d => color(d.type));

  // Add the text on top of the bars
  svg.selectAll(".label")
    .data(crimeData)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("x", d => x(d.count) - 10)
    .attr("y", d => y(d.type) + y.bandwidth() / 2)
    .attr("dy", ".35em")
    .attr("text-anchor", "end")
    .attr("fill", "white")
    .text(d => d.count);
}

/* const apiUrl = 'https://data.cityofnewyork.us/api/views/uip8-fykc/rows.json';

// Fetch the data from the API
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the JSON response
  })
  .then(data => {
    // Call the function to extract crime types and their counts
    const crimeCounts = countCrimeTypes(data.data);
    // Call the function to create the bar chart using D3.js
    createBarChart(crimeCounts);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

// Function to extract and count the occurrences of each crime type
function countCrimeTypes(data) {
  const crimeCounts = {};

  // Loop through the data and count the occurrences of each crime type
  for (let i = 0; i < data.length; i++) {
    const crimeType = data[i][13]; // Index 13 contains the crime type
    if (crimeCounts[crimeType]) {
      crimeCounts[crimeType] += 1; // Increment the count
    } else {
      crimeCounts[crimeType] = 1; // Initialize the count
    }
  }

  // Convert the object to an array of objects
  return Object.entries(crimeCounts).map(([crimeType, count]) => ({
    crimeType,
    count
  }));
}

// Function to create the bar chart using D3.js
function createBarChart(crimeData) {
  const margin = { top: 20, right: 30, bottom: 50, left: 150 };
  const width = 960 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;

  // Create the SVG container
  const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Sort the data by count in descending order
  crimeData.sort((a, b) => b.count - a.count);

  // Create the x-axis scale (crime count)
  const x = d3.scaleLinear()
    .domain([0, d3.max(crimeData, d => d.count)])
    .range([0, width])
    .nice(); // Adjust the scale to "nice" intervals

  // Create the y-axis scale (crime types)
  const y = d3.scaleBand()
    .domain(crimeData.map(d => d.crimeType))
    .range([0, height])
    .padding(0.1);

  // Add the x-axis to the chart
  svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).ticks(Math.ceil(d3.max(crimeData, d => d.count) / 5000)));

  // Add the y-axis to the chart
  svg.append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(y));

  // Add bars for each crime type
  svg.selectAll(".bar")
    .data(crimeData)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", 0)
    .attr("y", d => y(d.crimeType))
    .attr("width", d => x(d.count))
    .attr("height", y.bandwidth())
    .attr("fill", "steelblue");

  // Add labels to the bars
  svg.selectAll(".label")
    .data(crimeData)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("x", d => x(d.count) + 5)
    .attr("y", d => y(d.crimeType) + y.bandwidth() / 2)
    .attr("dy", ".35em")
    .text(d => d.count);
} */
