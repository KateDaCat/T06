const drawHistogram = (data) => {
    // T06-1 Step 6.1: Set up the chart area

    // Create the SVG chart
    const svg = d3.select("#histogram")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`);

    // Create an inner chart group with margins
    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
        // Step 6.2 Set up bins
        // First, in shared-constants.js, create a bin generator using d3.bin
        // Second, Generate the bins
    const bins = binGenerator(data); // Save the bins into an array

    console.log(bins); // Log the bins to the console for debugging

    // Step 6.3 Get the lower and upper bounds of bins
// T06-1 Step 6.3: Define the scales

    const minEng = bins[0].x0;
    const maxEng = bins[bins.length - 1].x1;
    const binsMaxLength = d3.max(bins, d => d.length);

    // X-axis: Energy consumption
    xScale
        .domain([minEng, maxEng])
        .range([0, innerWidth]);

    // Y-axis: Number of TVs
    yScale
        .domain([0, binsMaxLength])
        .range([innerHeight, 0])
        .nice();
    // Define scales (from shared constants)

    // Step 6.4 Draw the bars of the histogram
    // T06-1 Step 6.4: Draw the histogram bars

    innerChart
        .selectAll("rect")
        .data(bins)
        .join("rect")
        .attr("x", d => xScale(d.x0))
        .attr("y", d => yScale(d.length))
        .attr("width", d => xScale(d.x1) - xScale(d.x0))
        .attr("height", d => innerHeight - yScale(d.length))
        .attr("fill", barColor)
        .attr("stroke", bodyBackgroundColor)
        .attr("stroke-width", 2);
    // Step 6.5 Add axes
    // Create the bottom x-axis
    const bottomAxis = d3.axisBottom(xScale);

    // Add the x-axis to the bottom of the chart
    innerChart.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    // Add the x-axis label
    svg.append("text")
        .text("Labelled Energy Consumption (kWh/year)")
        .attr("text-anchor", "end")
        .attr("x", width - 20)
        .attr("y", height - 5)
        .attr("class", "axis-label");

    // Step 6.6 Add left axis
    // Create the left y-axis
    const leftAxis = d3.axisLeft(yScale);

    // Add the y-axis to the chart
    innerChart.append("g")
        .call(leftAxis);

    // Add the y-axis label
    svg.append("text")
        .text("Frequency")
        .attr("x", 30)
        .attr("y", 20)
        .attr("class", "axis-label");
    // Add the y-axis to the bottom of the chart relative to the inner chart
};