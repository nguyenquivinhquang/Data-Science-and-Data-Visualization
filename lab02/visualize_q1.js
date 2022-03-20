var svgWidth = 500;
var svgHeight = 500;
var barBadding = 1;
var dataset = [];
for (var i = 0; i < 25; i++) { //Loop 25 times
    var newNumber = Math.floor(Math.random() * 30 + 5);
    dataset.push(newNumber);
}
var visFunc = function (d) {
    var barHeight = d * 5;
    return barHeight + "px";
}
var colorFunction = function (d) {
    return "rgb(0, 0, " + Math.round(d * 10) + ")";
}

var svgBarChart = d3.select("body")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);


svgBarChart.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", svgWidth / dataset.length - barBadding)
    .attr("height", function (d) {
        return d * 4;
    })
    .attr("y", function (d) {
        return svgHeight - d * 4;
    })
    .attr("x", function (d, i) {
        return i * (svgWidth / dataset.length) + 1;
    })
    .attr("fill", colorFunction);

svgBarChart.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function (d) {
        return d;
    })
    .attr("x", function (d, i) {
        return i * (svgWidth / dataset.length) + 10;
    })
    .attr("y", function (d) {
        return svgHeight - (d * 4) + 15;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white")
    .attr("text-anchor", "middle")
    .attr("x", function (d, i) {
        return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
    });