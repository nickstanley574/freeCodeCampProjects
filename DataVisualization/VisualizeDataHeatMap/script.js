// Base off: https://www.d3-graph-gallery.com/graph/heatmap_basic.html

// set the dimensions and margins of the graph
var margin = { top: 80, right: 80, bottom: 150, left: 80 },
    width = 1250 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select(".visHolder")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


var div = d3.select("body").append("div")
    .attr("id", "tooltip")
    .style("opacity", 0);


url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json'

//Read the data
d3.json(url, function(data) {

    var yearsArr = []
    var VariArr = []

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    data.monthlyVariance.map((e) => {
        e.temperature = Math.round((data.baseTemperature + e.variance) * 100) / 100
        e.monthString = months[e.month - 1]
        yearsArr.push(e.year)
        VariArr.push(e.variance)
    })

    var colors = ["#313695", "#4575B4", "#74ADD1", "#ABD9E9", "#E0F3F8", "#FFFFBF", "#FEE090", "#FDAE61", "#F46D43", "#D73027", "#A50026"]

    var colorScale = d3.scaleQuantile()
        .domain([d3.min(VariArr), d3.max(VariArr)])
        .range(colors);


    // Build Y scales and axis:
    var y = d3.scaleBand()
        .range([height, 0])
        .domain([12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1])

    svg.append("g")
        .call(d3.axisLeft(y)
            .tickFormat((d) => {
                return months[d - 1];
            }))
        .attr("id", "y-axis");


    // Build X scales and axis:
    var x = d3.scaleBand()
        .range([0, width])
        .domain(yearsArr)
    svg.append("g")
        .attr("id", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
            .tickValues(x.domain().filter((year) => year % 10 === 0))
        )

    svg.selectAll()
        .data(data.monthlyVariance, function(d) { return d.year + ':' + d.month; })
        .enter()
        .append("rect")
        .attr('class', 'cell')
        .attr('data-month', (d) => d.month - 1)
        .attr('data-year', (d) => d.year)
        .attr('data-temp', (d) => d.variance)
        .attr('data-temp', (d, i) => d.variance)
        .attr("x", function(d) { return x(d.year) })
        .attr("y", function(d) { return y(d.month) })
        .attr("width", x.bandwidth() + 0.2)
        .attr("height", y.bandwidth() + 0.1)
        .style("fill", function(d, i) {
            return colorScale(d.variance)
        })
        .on("mouseover", function(d) {
            d3.select(this).style("stroke", "gray")
            d3.select(this).style("stroke-width", 2)
            div.transition()
                .duration(200)
                .style("opacity", 1)
                .attr("data-year", d.year)

            div.html(d.year + " - " + months[d.month - 1] +
                    "<br/>" + "Variance: " + d.variance +
                    "<br/>" + "Temp: " + d.temperature + "℃"
                )
                .style("left", (d3.event.pageX - 50) + "px")
                .style("top", (d3.event.pageY - 90) + "px");
        })
        .on("mouseout", function(d) {
            d3.select(this).style("stroke", "none")

            div.transition()
                .duration(500)
                .style("opacity", 0);
        });



    var legendContainer = svg.append("g")
        .attr("id", "legend")
        .attr("x", 520)


    var h = 525
    var w = -500
    for (i in colors) {

        var tempText = Math.round((data.baseTemperature + (colorScale.invertExtent(colors[i])[0])) * 10) / 10

        legendContainer.append("rect", ".tick")
            .attr("x", width)
            .attr("width", 40)
            .attr("height", 30)
            .style("fill", colors[i])
            .style("stroke", 'black')
            .style("stroke-width", 1.5)
            .attr("id", "legendColor")
            .attr("transform", `translate(${w} ,${h})`)

        legendContainer.append("text")
            .attr("x", width)
            .text(tempText)
            .attr("transform", `translate(${w} ,${h+50})`)

        w += 40

    }


})