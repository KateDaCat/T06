// Build the screen-technology buttons and connect them to histogram filtering.
const populateFilters = (data) => {

    d3.select("#filters_screen")
        .selectAll(".filter")
        .data(filters_screen)
        .join("button")
        .attr("class", d => d.isActive ? "filter active" : "filter")
        .text(d => d.label)
        .on("click", (event, d) => {

            // Update the active filter
            filters_screen.forEach(filter => {
                filter.isActive = filter.id === d.id;
            });

            // Update the button appearance
            d3.selectAll("#filters_screen .filter")
                .classed("active", filter => filter.id === d.id);

            // Update histogram
            updateHistogram(d.id, data);
        });
};

const updateHistogram = (filterId, data) => {

    // Filter the data based on screen technology
    const updatedData = filterId === "all"
        ? data
        : data.filter(tv => tv.screenTech === filterId);

    // Generate new bins
    const updatedBins = binGenerator(updatedData);

    // Update histogram bars
    d3.selectAll("#histogram rect")
        .data(updatedBins)
        .transition()
        .duration(500)
        .ease(d3.easeCubicInOut)
        .attr("y", d => yScale(d.length))
        .attr("height", d => innerHeight - yScale(d.length));
};

// T06-2 Step 3: Creating a tooltip and adding function call to load-data.js
const createTooltip = () => {
    // Step 3.2 Append (a hidden) tooltip to innerChart

    // Step 3.3 Append tooltip background rectangle

    // Step 3.4 Apped tooltip text

};

// T06-2 Step 3.5 Add functions to react to mouse events
const handleMouseEvents = () => {
    const tooltip = innerChartS.select(".tooltip");

    // Step 3.6 Select all circles in scatter plot
    // Step 3.7 Attach event listeners to mouseenter and mouseleave events
    innerChartS.selectAll("circle")
        .on("mouseenter", (e, d) => {
            tooltip.select("text")
                .text(`${d.screenSize} inches`);

            // Get the hovered circle's position
            const cx = +e.target.getAttribute("cx");
            const cy = +e.target.getAttribute("cy");

            // Centre the tooltip above the circle
            tooltip
                .interrupt()
                .attr(
                    "transform",
                    `translate(${cx - 0.5 * tooltipWidth},
                               ${cy - 1.5 * tooltipHeight})`
                )
                .transition()
                .duration(200)
                .style("opacity", 1);
        })
        .on("mouseleave", () => {
            tooltip
                .interrupt()
                .style("opacity", 0)
                .attr("transform", "translate(0, 500)");
        });
};