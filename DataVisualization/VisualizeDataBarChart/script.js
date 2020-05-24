var width = 1250
height = 600
barWidth = width / 285;

var div = d3.select(".visHolder").append("div")
    .attr("id", "tooltip")
    .style("opacity", 0)
    .style("text-align", "center")
    .style("font-size", "15px")

.html("--")

var svgContainer = d3.select('.visHolder')
    .append('svg')
    .attr('width', width + 100)
    .attr('height', height + 30)

var url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
d3.json(url, function(json) {
    data = json['data']
    var GDP_ARR = data.map((item) => item[1])
    var YRS_ARR = data.map((item) => item[0])
    var gdpMax = d3.max(GDP_ARR)
    var yrsMin = d3.min(YRS_ARR)
    var yrsMax = d3.max(YRS_ARR)

    var yScale = d3.scaleLinear()
        .domain([0, gdpMax])
        .range([height, 0])

    svgContainer.append("g")
        .call(d3.axisLeft().scale(yScale))
        .attr('id', 'y-axis')
        .style("font-size", "15px")
        .attr("transform", "translate(60,10)")

    var xScale = d3.scaleTime()
        .domain([new Date(yrsMin), new Date(yrsMax)])
        .range([0, width])

    svgContainer.append("g")
        .call(d3.axisBottom().scale(xScale))
        .attr('id', 'x-axis')
        .style("font-size", "15px")
        .attr('transform', `translate(60, ${height + 10})`);

    var linearScale = d3.scaleLinear()
        .domain([0, gdpMax])
        .range([0, height]);


    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var barColor = "#66cc91"
    d3.select('svg').selectAll('rect')
        .data(GDP_ARR.map((item) => linearScale(item)))
        .enter()
        .append('rect')
        .attr('data-date', (d, i) => YRS_ARR[i])
        .attr('data-gdp', (d, i) => GDP_ARR[i])
        .attr('class', 'bar')
        .attr('transform', 'translate(60, 10)')
        .attr('x', (d, i) => xScale(new Date(YRS_ARR[i])))
        .attr('y', (d, i) => height - d)
        .style("fill", barColor)
        .attr('width', barWidth)
        .attr('height', (d) => d)
        .on("mouseover", function(d, i) {
            d3.select(this).style("fill", "darkblue");
            div.transition()
                .duration(200)
                .style("fill", 'red')
                .style("opacity", .9);
            div.attr("id", "tooltip")
            div.style("font-family", "monospace")
            div.html(() => {
                var date = YRS_ARR[i].split('-')
                var m = months[Number(date[1])]
                var y = date[0]
                return `${m} ${y} : $${GDP_ARR[i].toLocaleString('en')} Billion`
            })
            div.attr('data-date', YRS_ARR[i])
        })
        .on("mouseout", function(d) {
            d3.select(this).style("fill", barColor);
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });

});