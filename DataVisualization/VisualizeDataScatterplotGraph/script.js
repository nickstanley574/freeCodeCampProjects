// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 40, left: 50 },
    width = 1200 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svgContainer = d3.select(".visHolder")
    .append("svg")
    .style('padding', 10)
    .attr('width', width + 100)
    .attr('height', height + 60)


// create a tooltip
// Define the div for the tooltip
var div = d3.select("body").append("div")
    .attr("id", "tooltip")
    .style("opacity", 0);


url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
d3.json(url, function(data) {

    data.forEach((d) => {
        var parsedTime = d.Time.split(':');
        d.Time = new Date(1776, 0, 1, 0, parsedTime[0], parsedTime[1]);
    })

    var YRS_ARR = data.map((i) => (new Date(i['Year'], 0, 1, 0, 0, 0).getFullYear()))
    var yrsMin = d3.min(YRS_ARR);
    var yrsMax = d3.max(YRS_ARR)

    // X axis Year
    var x = d3.scaleLinear().domain([yrsMin - 1, yrsMax + 1]).range([0, width])

    var tx = 80

    svgContainer.append("g")
        .call(d3.axisBottom()
            .scale(x)
            .tickFormat(d3.format("d")))
        .attr('id', 'x-axis')
        .style("font-size", "14px")
        .attr('transform', `translate(${tx}, ${height + 30})`);


    var TIME_ARR = data.map((i) => i['Time'])
    var timeMin = d3.min(TIME_ARR)
    var timeMax = d3.max(TIME_ARR)

    var y = d3.scaleTime().domain([timeMax, timeMin]).range([0, height])

    var yAxis = d3.axisLeft(y).tickFormat(d3.timeFormat("%M:%S"))

    svgContainer.append("g")
        .call(yAxis)
        .attr('id', 'y-axis')
        .attr("transform", `translate(${tx},30)`)
        .style("font-size", "14px")


    var colors = ["#271f8d", "#ed6a76"]

    svgContainer.selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .style("opacity", 0.8)
        .attr("cx", (d) => x(d.Year))
        .attr("cy", (d) => y(d.Time))
        .attr("r", 7)
        .attr("data-xvalue", (d) => d.Year)
        .attr("data-yvalue", (d) => d.Time.toISOString())
        .style("fill", (d) => d.Doping == "" ? colors[0] : colors[1])
        .attr("transform", `translate(${tx},30)`)
        .on("mouseover", function(d) {
            d3.select(this).style("stroke", "black")
            d3.select(this).style("stroke-width", 2.2) // set the stroke width
            d3.select(this).attr("r", 8)
            div.transition()
                .duration(200)
                .style("opacity", 1)
                .attr("data-year", d.Year)
            div.html("Name:  " + (d.Name) + "<br/>" + "Year: " + d.Year + "<br/>" + d.Doping)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            d3.select(this).style("stroke", "none")
            d3.select(this).attr("r", 7)
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });

    svgContainer.append('text')
        .text("Time in Minutes")
        .attr('x', -360)
        .attr('y', 14)
        .style('font-size', 16)
        .attr('transform', 'rotate(-90)')


    var legendContainer = svgContainer.append("g")
        .attr("id", "legend")

    var legend = legendContainer.selectAll("#legend")
        .data(colors)
        .enter()
        .append("g")
        .attr("class", "legend-label")
        .attr("transform", (d, i) => `translate(${tx}, ${(height / 1.5 - i * 30)} )`);

    legend.append("rect")
        .attr("x", width)
        .attr("width", 15)
        .attr("height", 15)
        .style("fill", (d) => d);


    legend.append("text")
        .attr("x", width - 4)
        .attr("y", 9)
        .attr("dy", ".25em")
        .style("text-anchor", "end")
        .text((d) => (d === colors[1]) ? "Riders with doping allegations" : "No doping allegations")
})