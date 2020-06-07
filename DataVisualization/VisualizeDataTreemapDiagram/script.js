var TITLE = "Video Game Sales"
var DESCRIPTION = "Top 100 Most Sold Video Games Grouped by Platform"
var FILE_PATH = "https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json"

document.getElementById("title").innerHTML = TITLE;
document.getElementById("description").innerHTML = DESCRIPTION;

// Define body
var body = d3.select("body");

var svg = d3.select("#tree-map"),
    width = +svg.attr("width"),
    height = +svg.attr("height");


color = d3.scaleOrdinal([
    "#8dd3c7",
    "#ffffb3",
    "#bebada",
    "#fb8072",
    "#80b1d3",
    "#fdb462",
    "#b3de69",
    "#fccde5",
    "#d9d9d9",
    "#bc80bd",
    "#ccebc5",
    "#ffed6f",
    "#66c2a5",
    "#fc8d62",
    "#8da0cb",
    "#e78ac3",
    "#a6d854",
    "#ffd92f",
    "#e5c494",
    "#b3b3b3",
]);


var treemap = d3.treemap()
    .size([width, height])
    .paddingInner(8);

d3.json(FILE_PATH, function(error, data) {

    if (error) throw error;

    var root = d3.hierarchy(data)
        .sum((d) => d.value)
        .sort((a, b) => b.value - a.value);


    treemap(root);

    var cell = svg.selectAll("g")
        .data(root.leaves())
        .enter().append("g")
        .attr("class", "group")
        .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

    cell.append("rect")
        .attr("id", (d) => d.data.id)
        .attr("class", "tile")
        .attr("width", (d) => d.x1 - d.x0)
        .attr("height", (d) => d.y1 - d.y0)
        .attr("fill", (d) => color(d.data.category))



});