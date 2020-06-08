const DATA_SETS = {
    videogame: {
        title: 'Videogame Sales',
        description: 'Top 100 Most Sold Video Games Grouped by Platform',
        url: 'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json'
    },
    movies: {
        title: 'Movies Sales',
        description: 'Top 100 Highest Grossing Movies Grouped By Genre',
        url: 'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/movie-data.json'
    },
    kickstarter: {
        title: 'Kickstarter Pledges',
        description: 'Top 100 Most Pledged Kickstarter Campaigns Grouped By Category',
        url: 'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/kickstarter-funding-data.json'
    }
};

document.querySelectorAll('#nav span')
    .forEach(el => {
        el.addEventListener('click', () => clickHandler(el.id));
    });

function clickHandler(id) {
    setDataSet(id)
}

function setDataSet(id) {
    document.getElementById('title').textContent = DATA_SETS[id].title;
    document.getElementById('description').textContent = DATA_SETS[id].description;
    createGraph(DATA_SETS[id].url);
}

setDataSet('videogame')


var body = d3.select("body");

var svg = d3.select("#tree-map"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var tooltip = body.append("div")
    .attr("class", "tooltip")
    .attr("id", "tooltip")
    .style("opacity", 0);

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
    .paddingInner(3.5);

function createGraph(url) {

    d3.selectAll("svg > *").remove();

    console.log(url)
    d3.json(url, function(error, data) {
        if (error) throw error;

        var root = d3.hierarchy(data)
            .sum((d) => d.value)
            .sort((a, b) => b.height - a.height || b.value - a.value);


        treemap(root);

        var tile = svg.selectAll("g")
            .data(root.leaves())
            .enter().append("g")
            .attr("class", "group")
            .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

        tile.append("rect")
            .attr("id", (d) => d.data.id)
            .attr("data-name", (d) => d.data.name)
            .attr("data-category", (d) => d.data.category)
            .attr("data-value", (d) => d.data.value)
            .attr("class", "tile")
            .attr("width", (d) => d.x1 - d.x0)
            .attr("height", (d) => d.y1 - d.y0)
            .attr("fill", (d) => color(d.data.category))
            .on("mousemove", function(d) {
                tooltip.style("opacity", .9);
                tooltip.html(
                        'Name: ' + d.data.name +
                        '<br>Category: ' + d.data.category +
                        '<br>Value: ' + d.data.value
                    )
                    .attr("data-value", d.data.value)
                    .style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                tooltip.style("opacity", 0);
            })
        tile.append("text")
            .attr('class', 'tile-text')
            .selectAll("tspan")
            .data(function(d) { return d.data.name.split(/(?=[A-Z][^A-Z])/g); })
            .enter().append("tspan")
            .attr("x", 2)
            .attr("y", function(d, i) { return 13 + i * 10; })
            .text(function(d) { return d; });


        var categories = root.leaves()
            .map((nodes) => nodes.data.category)
            .filter((cat, i, self) => self.indexOf(cat) === i);


        var legend = d3.select("#legend")
        var legendWidth = +legend.attr("width");

        const LEGEND_OFFSET = 5;
        const LEGEND_RECT_SIZE = 25;
        const LEGEND_H_SPACING = 150;
        const LEGEND_V_SPACING = 10;
        const LEGEND_TEXT_X_OFFSET = 10;
        const LEGEND_TEXT_Y_OFFSET = -8;

        var legendElemsPerRow = Math.floor(legendWidth / LEGEND_H_SPACING);

        var legendElem = legend
            .append("g")
            .attr("transform", "translate(60," + LEGEND_OFFSET + ")")
            .selectAll("g")
            .data(categories)
            .enter().append("g")
            .attr("transform", function(d, i) {
                return `translate(${((i % legendElemsPerRow) * LEGEND_H_SPACING)},${ ((Math.floor(i / legendElemsPerRow)) * LEGEND_RECT_SIZE + (LEGEND_V_SPACING * (Math.floor(i / legendElemsPerRow))))})`;
            })

        legendElem.append("rect")
            .attr('width', LEGEND_RECT_SIZE)
            .attr('height', LEGEND_RECT_SIZE)
            .attr('class', 'legend-item')
            .attr('fill', function(d) {
                return color(d);
            })
            .on('mouseover', function(d, i) {
                d3.select(this)
                    .transition().duration(300)
                    .attr("stroke", "black")
                    .attr("stroke-width", 1.8);

                d3.selectAll(`[data-category="${d}"]`)
                    .transition().duration(300)
                    .attr("stroke", "black")
                    .attr("stroke-width", 1.8)
            })
            .on('mouseout', function(d, i) {
                d3.select(this)
                    .transition().duration(300)
                    .attr("stroke-width", 0)

                d3.selectAll(`[data-category="${d}"]`)
                    .transition().duration(300)
                    .attr("stroke-width", 0)

            })

        legendElem.append("text")
            .attr('x', LEGEND_RECT_SIZE + LEGEND_TEXT_X_OFFSET)
            .attr('y', LEGEND_RECT_SIZE + LEGEND_TEXT_Y_OFFSET)
            .text(function(d) { return d; });
    });
}