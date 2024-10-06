/* const apiUrl = 'https://data.cityofnewyork.us/api/views/uip8-fykc/rows.json';

// Fetch the data from the API
fetch(apiUrl)
  .then(response => {
    // Check if the response is okay
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse JSON response
  })
  .then(data => {
    // Process and return the data for "OFNS_DESC"
    const crimeData = processData(data);
    console.log(crimeData); // Output the array of crime type and count
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

// Function to process the API data and extract "OFNS_DESC" crime types and counts
function processData(data) {
  // Find the "OFNS_DESC" column in the data
  const ofnsDescData = data.meta.view.columns.find(column => column.fieldName === "ofns_desc");

  if (ofnsDescData && ofnsDescData.cachedContents && ofnsDescData.cachedContents.top) {
    // Map the "top" array to extract the item and count
    const crimeArray = ofnsDescData.cachedContents.top.map(item => ({
      type: item.item,
      count: item.count
    }));
    return crimeArray; // Return the array of crime types and counts
  } else {
    console.log("No data for OFNS_DESC found.");
    return [];
  }
} */

const apiUrl = 'https://data.cityofnewyork.us/api/views/uip8-fykc/rows.json';

        // Fetch data from the API
        fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
            // Extract the relevant data (OFNS_DESC column)
            const ofnsDescData = data.meta.view.columns.find(column => column.fieldName === "ofns_desc");

            if (ofnsDescData && ofnsDescData.cachedContents && ofnsDescData.cachedContents.top) {
              // Prepare the data (array of {type, count})
              const crimeData = ofnsDescData.cachedContents.top.map(item => ({
                type: item.item,
                count: +item.count // Convert count to a number
              }));
              createBarChart(crimeData); // Pass data to the function to create the chart
            }
          });

        // Function to create a bar chart
        function createBarChart(data) {
            // Set dimensions and margins for the chart
            const margin = {top: 30, right: 30, bottom: 40, left: 150},
                  width = 800 - margin.left - margin.right,
                  height = 500 - margin.top - margin.bottom;

            // Append the svg object to the body
            const svg = d3.select("#chart")
              .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", `translate(${margin.left}, ${margin.top})`);

            // Set the X scale (for counts)
            const x = d3.scaleLinear()
              .domain([0, d3.max(data, d => d.count)]) // Range from 0 to max count
              .range([0, width]);

            // Set the Y scale (for crime types)
            const y = d3.scaleBand()
              .domain(data.map(d => d.type)) // Crime types on the Y axis
              .range([0, height])
              .padding(0.1);

            // Set up the color scale
            const color = d3.scaleOrdinal(d3.schemeCategory10);

            // Add X axis
            svg.append("g")
              .attr("transform", `translate(0, ${height})`)
              .call(d3.axisBottom(x).ticks(10))
              .append("text")
              .attr("y", margin.bottom - 10)
              .attr("x", width / 2)
              .attr("text-anchor", "middle")
              .text("Count");

            // Add Y axis (crime types)
            svg.append("g")
              .call(d3.axisLeft(y));

            // Add the bars with animation
            svg.selectAll(".bar")
              .data(data)
              .enter()
              .append("rect")
              .attr("class", "bar")
              .attr("x", 0)
              .attr("y", d => y(d.type))
              .attr("width", 0) // Start the width at 0 for animation
              .attr("height", y.bandwidth())
              .attr("fill", (d, i) => color(i)) // Different color for each bar
              .transition() // Animate the bar width
              .duration(800)
              .delay((d, i) => i * 100) // Stagger animation
              .attr("width", d => x(d.count));

            // Add text labels for counts on top of the bars
            svg.selectAll(".label")
              .data(data)
              .enter()
              .append("text")
              .attr("class", "label")
              .attr("x", d => x(d.count) + 5) // Position text a little past the bar's width
              .attr("y", d => y(d.type) + y.bandwidth() / 2) // Center text vertically
              .attr("dy", ".35em") // Adjust vertical alignment
              .text(d => d.count)
              .style("fill", "black")
              .style("font-size", "10px")
              .style("opacity", 0) // Start with hidden text for animation
              .transition() // Animate text appearance
              .duration(800)
              .delay((d, i) => i * 100) // Sync with bar animation
              .style("opacity", 1);
        }