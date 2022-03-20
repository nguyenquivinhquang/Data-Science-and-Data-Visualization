var svgWidth = 1500;
var svgHeight = 5000;
var barBadding = 1;
var dataset;
var scaleX = 6;
var scaleY = 6;
var colorFunction = function (d) {
    // fail
    if (0.4 * d[0] + 0.6 * d[1] < 50) return "red";
    return "blue";
}
var visualizeFunction = function (dataset) {
    console.log(dataset)
    var svgScatter = d3.select("body")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);
    svgScatter.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return d[0] + scaleX;
        })
        .attr("cy", function (d) {
            if (d[1] < 10) return d[1] + 10;
            return d[1] + scaleY;
        })
        .attr("r", function (d) {
            return 5;
        })
        .attr("fill", colorFunction);

    svgScatter.selectAll("text") 
        .data(dataset)
        .enter()
        .append("text")
        .text(function (d) {
            return (0.4 * d[0] + 0.6 * d[1]).toFixed(1);
        })
        .attr("x", function (d) {
            return d[0] + scaleX;
        })
        .attr("y", function (d) {
            if (d[1] < 10) return d[1] + 10;
            return d[1] + scaleY;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "3x")
        .attr("fill", "dark");
}