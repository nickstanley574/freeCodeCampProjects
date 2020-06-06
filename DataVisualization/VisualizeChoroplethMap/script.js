localStorage.setItem('example_project', 'D3: Choropleth');

// Define body
var body = d3.select("body");

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");


// Define the div for the tooltip
var tooltip = body.append("div")
    .attr("class", "tooltip")
    .attr("id", "tooltip")
    .style("opacity", 0);


var x = d3.scaleLinear()
    .domain([2.6, 75.1])
    .rangeRound([600, 860]);


var color = d3.scaleThreshold()
    .domain(d3.range(2.6, 75.1, (75.1 - 2.6) / 8))
    .range(d3.schemeBrBG[9]);


var g = svg.append("g")
    .attr("class", "key")
    .attr("id", "legend")
    .attr("transform", "translate(0,40)");

g.selectAll("rect")
    .data(color.range().map(function(d) {
        d = color.invertExtent(d);
        if (d[0] == null) d[0] = x.domain()[0];
        if (d[1] == null) d[1] = x.domain()[1];
        return d;
    }))
    .enter().append("rect")
    .attr("height", 8)
    .style("stroke", 'black')
    .style("stroke-width", 0.2)
    .attr("x", (d) => x(d[0]))
    .attr("width", (d) => x(d[1]) - x(d[0]))
    .attr("fill", (d) => color(d[0]));

g.append("text")
    .attr("class", "caption")
    .attr("x", x.range()[0])
    .attr("y", -6)

g.call(d3.axisBottom(x)
        .tickSize(15)
        .tickFormat((x) => Math.round(x) + '%')
        .tickValues(color.domain()))
    .select(".domain")
    .remove();

const EDUCATION_FILE = 'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json';
const COUNTY_FILE = 'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json';

d3.json(COUNTY_FILE, function(us) {
    d3.json(EDUCATION_FILE, function(edu) {

        var data = {}
        edu.forEach((e) => {
            data[e.fips] = {}
            data[e.fips]['bachelorsOrHigher'] = e.bachelorsOrHigher
            data[e.fips]['area_name'] = e.area_name
        })

        svg.append("g")
            .attr("class", "counties")
            .selectAll("path")
            .data(topojson.feature(us, us.objects.counties).features)
            .enter().append("path")
            .attr("class", "county")
            .attr("data-fips", (e) => e.id)
            .attr("data-education", (e) => data[e.id].bachelorsOrHigher)
            .attr("fill", (e) => color(data[e.id].bachelorsOrHigher))
            .attr("d", d3.geoPath())
            .on("mouseover", function(e) {
                d3.select(this).style("stroke", "gray")
                d3.select(this).style("stroke-width", 2)
                tooltip.attr("data-education", data[e.id].bachelorsOrHigher)
                tooltip.transition()
                    .duration(200)
                    .style("opacity", 1)
                tooltip.html(
                        data[e.id]['area_name'] + " : " + data[e.id].bachelorsOrHigher + "%")
                    .style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");

            })
            .on("mouseout", function(d) {
                d3.select(this).style("stroke", "none")

                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        svg.append("path")
            .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
            .attr("class", "states")
            .style("stroke", 'black')
            .style("stroke-width", 0.3)
            .attr("d", d3.geoPath());

        svg.append("path")
            .datum(topojson.mesh(us, us.objects.nation))
            .attr("class", "states")
            .style("stroke", 'black')
            .style("stroke-width", 0.8)
            .attr("d", d3.geoPath());

    });
});