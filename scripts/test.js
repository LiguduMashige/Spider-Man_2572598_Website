const width = 800;
const height = 600;

// Margin and container
const margin = {top: 20, right: 20, bottom: 20, left: 20};
const svgWidth = width - margin.left - margin.right;
const svgHeight = height - margin.top - margin.bottom;

// Append the SVG to the #map div
const svg = d3.select("#map")
    .append("svg")
    .attr("width", svgWidth + margin.left + margin.right)
    .attr("height", svgHeight + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// GeoJSON NYC boroughs
const geojsonUrl = 'https://raw.githubusercontent.com/dwillis/nyc-maps/master/boroughs.geojson';

// Create a projection and path for the map
const projection = d3.geoMercator()
    .center([-73.94, 40.70])  // Center map around NYC
    .scale(50000)             // Zoom level
    .translate([svgWidth / 2, svgHeight / 2]);

const path = d3.geoPath().projection(projection);

// Function to fetch and process the Perpetrator sex data
async function fetchPerpSexData() {
    const apiUrl = 'https://data.cityofnewyork.us/api/views/uip8-fykc/rows.json';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const columns = data.meta.view.columns;
        const perpSexColumn = columns.find(column => column.name === 'PERP_SEX');

        if (perpSexColumn) {
            return perpSexColumn.cachedContents.top.map(item => ({
                sex: item.item,
                count: parseInt(item.count)
            }));
        } else {
            console.log("PERP_SEX column not found");
            return [];
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Function to randomly scatter dots on the map based on sex (male, female)
function scatterDots(data) {
    const colors = { M: "blue", F: "pink" };
    let alternate = 0;

    // Timer-based scatter animation
    d3.timer(function (elapsed) {
        // Clear previous dots if the timer reaches 1000ms (animation reset)
        if (elapsed > 128778) {
            svg.selectAll(".dot").remove();
        }

        // For each sex data point
        data.forEach((d, i) => {
            const scatterCount = Math.min(d.count, 50);  // Limit the scatter count per item for visibility

            for (let j = 0; j < scatterCount; j++) {
                svg.append("circle")
                    .attr("class", "dot")
                    .attr("cx", Math.random() * svgWidth)  // Random X position
                    .attr("cy", Math.random() * svgHeight) // Random Y position
                    .attr("r", 3)
                    .attr("fill", colors[d.sex])
                    .attr("opacity", 0)
                    .transition()
                    .duration(1000)
                    .delay(j * 50)
                    .attr("opacity", 1)
                    .attr("r", 5);
            }
        });
    });
}

// Draw the boroughs map
function drawBoroughs(geojsonData) {
    svg.selectAll("path")
        .data(geojsonData.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("stroke", "black")
        .attr("fill", "lightgray")
        .attr("opacity", 0.6);
}

// Fetch borough boundaries and perp sex data, then plot
async function initializeMap() {
    const boroughData = await d3.json(geojsonUrl);
    const perpSexData = await fetchPerpSexData();

    drawBoroughs(boroughData);
    scatterDots(perpSexData);
}

// Initialize everything
initializeMap(); 


