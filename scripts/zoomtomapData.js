// API URL
const apiUrl = 'https://data.cityofnewyork.us/api/views/uip8-fykc/rows.json';

// Fetch data from the API
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the JSON data
  })
  .then(data => {
    // Process and extract the borough of arrest data
    const boroughsData = processBoroughData(data);
    console.log(boroughsData); // Log the resulting array to the console
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

// Function to process and extract the borough of arrest data
function processBoroughData(data) {
  // Find the column for ARREST_BORO using its fieldName
  const arrestBoroughColumn = data.meta.view.columns.find(column => column.fieldName === "arrest_boro");

  if (arrestBoroughColumn && arrestBoroughColumn.cachedContents) {
    // Extract the 'top' array from cachedContents which holds the borough and counts
    const topBoroughs = arrestBoroughColumn.cachedContents.top;

    // Map through the 'top' array to return an array of borough and counts
    const boroughsArray = topBoroughs.map(borough => ({
      borough: borough.item,  // The borough (B, M, K, Q, S)
      count: borough.count    // The count of arrests in that borough
    }));

    // Return the resulting array
    return boroughsArray;
  } else {
    console.log('ARREST_BORO data not found');
    return [];
  }
} 

  const width = 960, height = 600;

  // Append SVG element
  const svg = d3.select("#chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

  // Define projection and path generator
  const projection = d3.geoMercator()
      .center([-73.94, 40.70]) // Center of NYC
      .scale(55000) // Scale to zoom into NYC
      .translate([width / 2, height / 2]);

  const path = d3.geoPath().projection(projection);

  // Define zoom behavior
  const zoom = d3.zoom()
      .scaleExtent([1, 8])
      .on("zoom", zoomed);

  svg.call(zoom); // Apply zoom behavior to the SVG

  // Load GeoJSON data for NYC Boroughs
  const geoJsonUrl = 'https://raw.githubusercontent.com/dwillis/nyc-maps/master/boroughs.geojson';

  // Fetch GeoJSON Data for boroughs
  d3.json(geoJsonUrl).then(function(geoData) {
      // Load arrest data from the API
      fetch('https://data.cityofnewyork.us/api/views/uip8-fykc/rows.json')
          .then(response => response.json())
          .then(arrestData => {
              // Process arrest data
              const arrestCounts = processArrestData(arrestData);

              // Draw the map
              drawMap(geoData, arrestCounts);
          });
  }).catch(error => console.error("Error loading GeoJSON:", error));

  // Function to process arrest data
  function processArrestData(data) {
      const arrestData = data.meta.view.columns.find(column => column.fieldName === "arrest_boro");
      const topItems = arrestData.cachedContents.top;

      // Convert top items to a more usable format
      return topItems.map(item => ({
          borough: item.item === "K" ? "Brooklyn" :
                   item.item === "M" ? "Manhattan" :
                   item.item === "B" ? "Bronx" :
                   item.item === "Q" ? "Queens" :
                   item.item === "S" ? "Staten Island" : null,
          count: +item.count // Convert count to a number
      })).filter(d => d.borough !== null); // Filter out any undefined boroughs
  }

  // Function to draw the map and integrate arrest data
  function drawMap(geoData, arrestCounts) {
      // Append a group for the map
      const boroughsGroup = svg.append("g").attr("class", "map");

      // Draw the boroughs
      boroughsGroup.selectAll("path")
          .data(geoData.features)
          .enter()
          .append("path")
          .attr("d", path)
          .attr("fill", (d, i) => d3.schemeCategory10[i % 10]) // Different color for each borough
          .attr("class", "borough")
          .attr("id", d => d.properties.boro) // Set the borough ID for later use
          .on("mouseover", function(event, d) {
              const boroughName = d.properties.boro; // Get the borough name
              const countData = arrestCounts.find(b => b.borough === boroughName) || { count: 0 };
              const tooltip = d3.select("#tooltip");
              tooltip.transition().duration(200).style("opacity", .9);
              tooltip.html(`${boroughName}<br>Arrests: ${countData.count}`)
                  .style("left", (event.pageX + 5) + "px")
                  .style("top", (event.pageY - 28) + "px");
          })
          .on("mouseout", function() {
              d3.select("#tooltip").transition().duration(500).style("opacity", 0);
          })
          .on("click", function(event, d) {
              const bounds = path.bounds(d);
              const topLeft = bounds[0];
              const bottomRight = bounds[1];
              const width = bottomRight[0] - topLeft[0];
              const height = bottomRight[1] - topLeft[1];
              const x = (topLeft[0] + bottomRight[0]) / 2;
              const y = (topLeft[1] + bottomRight[1]) / 2;

              svg.transition()
                  .duration(750)
                  .call(zoom.transform, d3.zoomIdentity.translate(width / 2, height / 2).scale(4).translate(-x, -y));
          });
  }

  // Zoom function to apply transformations
  function zoomed(event) {
      svg.selectAll('path').attr('transform', event.transform);
  }