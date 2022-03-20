var svgWidth = 7000;
var svgHeight = 400;
var barBadding = 1;


var visualizeFunction = function (dataset) {
    var bin = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    for (i = 0; i < dataset.length; i++) {
        bin[dataset[i] % 10] += 1;
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
        .data(bin)
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", svgWidth / dataset.length + 1)
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
        .data(bin)
        .enter()
        .append("text")
        .text(function (d) {
            return d;
        })
        .attr("x", function (d, i) {
            return i * (svgWidth / dataset.length) + 20;
        })
        .attr("y", function (d) {
            return svgHeight - (d * 4) + 15;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "white")
        .attr("text-anchor", "middle")
        .attr("x", function (d, i) {
            return i * (svgWidth / dataset.length) + (svgWidth / dataset.length - barBadding) / 2;
        });
}