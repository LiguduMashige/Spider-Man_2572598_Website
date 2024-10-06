/* const url = 'https://data.cityofnewyork.us/api/views/uip8-fykc/rows.json';

        // NYC Borough GeoJSON
        const geojsonUrl = 'https://raw.githubusercontent.com/dwillis/nyc-maps/master/boroughs.geojson';

        const width = 800;
        const height = 600;

        // Create a projection to center the map on NYC
        const projection = d3.geoMercator()
            .center([-74, 40.7])  // Center on NYC
            .scale(45000)         // Zoom level
            .translate([width / 2, height / 2]);

        const path = d3.geoPath().projection(projection);

        // Create an SVG element for the map
        const svg = d3.select("#map").append("svg")
            .attr("width", width)
            .attr("height", height);

        // Create a tooltip
        const tooltip = d3.select(".tooltip");

        // Zoom functionality
        const zoom = d3.zoom()
            .scaleExtent([1, 8])
            .on("zoom", (event) => {
                svg.selectAll("path").attr("transform", event.transform);
            });

        svg.call(zoom);

        // Borough code to name mapping for the arrest data
        const boroughMap = {
            "Brooklyn": "K",
            "Manhattan": "M",
            "Bronx": "B",
            "Queens": "Q",
            "Staten Island": "S"
        };

        // Fetch the arrest data from the API
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Extract the arrest borough data from the fetched JSON
                const arrestBoroField = data.meta.view.columns.find(column => column.fieldName === 'arrest_boro');
                const boroughData = arrestBoroField.cachedContents.top.reduce((acc, item) => {
                    acc[item.item] = item.count;
                    return acc;
                }, {});

                // Fetch the GeoJSON data for NYC boroughs
                d3.json(geojsonUrl).then(geoData => {
                    // Draw the boroughs on the map
                    svg.selectAll("path")
                        .data(geoData.features)
                        .enter()
                        .append("path")
                        .attr("d", path)
                        .attr("fill", "#ccc")
                        .attr("stroke", "#333")
                        .on("mouseover", function(event, d) {
                            const boroughName = d.properties.boro_name;  // Get borough name from GeoJSON
                            const boroughCode = boroughMap[boroughName];  // Map borough name to arrest_boro code
                            const arrestCount = boroughData[boroughCode] || 0;  // Get the count from the API

                            // Highlight the borough
                            d3.select(this).attr("fill", "red");

                            // Show the tooltip
                            tooltip.transition().duration(200).style("opacity", 0.9);
                            tooltip.html(`Borough: ${boroughCode}<br>Arrests: ${arrestCount}`)
                                .style("left", (event.pageX + 5) + "px")
                                .style("top", (event.pageY - 28) + "px");
                        })
                        .on("mouseout", function(d) {
                            // Remove highlight
                            d3.select(this).attr("fill", "#ccc");

                            // Hide the tooltip
                            tooltip.transition().duration(500).style("opacity", 0);
                        })
                        .on("click", function(event, d) {
                            // Zoom in on the borough
                            const [[x0, y0], [x1, y1]] = path.bounds(d);
                            svg.transition().duration(750).call(
                                zoom.transform,
                                d3.zoomIdentity
                                    .translate(width / 2, height / 2)
                                    .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
                                    .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
                            );
                        });
                });
            })
            .catch(error => console.error('Error fetching data:', error)); */
const url = 'https://data.cityofnewyork.us/api/views/uip8-fykc/rows.json';

// NYC Borough GeoJSON
            const geojsonUrl = 'https://raw.githubusercontent.com/dwillis/nyc-maps/master/boroughs.geojson';
    
            const width = 800;
            const height = 600;
    
            // Create a projection to center the map on NYC
            const projection = d3.geoMercator()
                .center([-74, 40.7])  // Center on NYC
                .scale(45000)         // Zoom level
                .translate([width / 2, height / 2]);
    
            const path = d3.geoPath().projection(projection);
    
            // Create an SVG element for the map
            const svg = d3.select("#map").append("svg")
                .attr("width", width)
                .attr("height", height);
    
            // Create a tooltip
            const tooltip = d3.select(".tooltip");
    
            // Zoom functionality
            const zoom = d3.zoom()
                .scaleExtent([1, 8])
                .on("zoom", (event) => {
                    svg.selectAll("path").attr("transform", event.transform);
                });
    
            svg.call(zoom);
    
            // Define the boroughs and corresponding counts from the API
            const boroughNames = {
                "K": "Brooklyn",
                "M": "Manhattan",
                "B": "Bronx",
                "Q": "Queens",
                "S": "Staten Island"
            };
    
            // Fetch the arrest data from the API
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    // Extract the arrest borough data from the fetched JSON
                    const arrestBoroField = data.meta.view.columns.find(column => column.fieldName === 'arrest_boro');
                    const boroughData = arrestBoroField.cachedContents.top.reduce((acc, item) => {
                        acc[item.item] = item.count;
                        return acc;
                    }, {});
    
                    // Fetch the GeoJSON data for NYC boroughs
                    d3.json(geojsonUrl).then(geoData => {
                        // Draw the boroughs on the map
                        svg.selectAll("path")
                            .data(geoData.features)
                            .enter()
                            .append("path")
                            .attr("d", path)
                            .attr("fill", "#ccc")
                            .attr("stroke", "#333")
                            .on("mouseover", function(event, d) {
                                const boroughCode = d.properties.boro_code;
                                const boroughName = boroughNames[boroughCode];
                                const arrestCount = boroughData[boroughCode] || 0;
    
                                // Highlight the borough
                                d3.select(this).attr("fill", "red");
    
                                // Show the tooltip
                                tooltip.transition().duration(200).style("opacity", 0.9);
                                tooltip.html(`Borough: ${boroughName} (${boroughCode})<br>Arrests: ${arrestCount}`)
                                    .style("left", (event.pageX + 5) + "px")
                                    .style("top", (event.pageY - 28) + "px");
                            })
                            .on("mouseout", function() {
                                // Remove highlight
                                d3.select(this).attr("fill", "#ccc");
    
                                // Hide the tooltip
                                tooltip.transition().duration(500).style("opacity", 0);
                            })
                            .on("click", function(event, d) {
                                const [[x0, y0], [x1, y1]] = path.bounds(d);
                                const isZoomedIn = d3.select(this).attr("data-zoomed") === "true";
                                
                                if (isZoomedIn) {
                                    svg.transition().duration(750).call(
                                        zoom.transform, 
                                        d3.zoomIdentity
                                    );
                                    d3.select(this).attr("data-zoomed", "false");
                                } else {
                                    svg.transition().duration(750).call(
                                        zoom.transform,
                                        d3.zoomIdentity.translate(width / 2, height / 2).scale(4).translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
                                    );
                                    d3.select(this).attr("data-zoomed", "true");
                                }
                            });
                    });
                })
                .catch(error => console.error('Error fetching data:', error));