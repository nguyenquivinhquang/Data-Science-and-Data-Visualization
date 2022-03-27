function scatterPlotWithScale() {
    var rowConverter = function (d) {
        return {
            GRDP_VND: parseFloat(d["GRDP-VND"]),
            Population: parseFloat(d.population),
            Density: parseFloat(d.density),
            Area: parseFloat(d.area)
        };
    }

    d3.csv("https://tungth.github.io/data/vn-provinces-data.csv", rowConverter, function (data) {
        makeScatter(data)
    });
}

function makeScatter(dataset) {
    let width = 720;
    let height = 420;
    let padding = 60;

    var xScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function (d) {
            return d.Population;
        })])
        .range([padding, width - padding * 2]).nice();

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function (d) {
            return d.GRDP_VND;
        })])
        .range([height - padding, padding]).nice();

    var rScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function (d) {
            return d.Area;
        })])
        .range([3, 10]);

    console.log(dataset);
    var svg = d3.select("#answer").selectAll('svg').remove();

    svg = d3.select("#answer")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", function (d) {
            return xScale(d.Population);
        })
        .attr("cy", function (d) {
            return yScale(d.GRDP_VND);
        })
        .attr("r", function (d) {
            return rScale(d.Area);
        })
        .attr('fill', function (item) {
            if (item.Density > 2000)
                return 'red';
            if (item.Density > 1000)
                return 'blue';
            return 'orange';

        })
        .on("mouseover", function (d) {
            d3.select(this)
                .attr("r", rScale(d.Area) + 3)
                .attr("fill", "black");

            svg.append("text")
                .attr("class", "dataInfo")
                .text(function () {
                    return "Population " + d.Population + ", " + "Area " + d.Area;
                })
                .attr("x", function () {
                    return xScale(d.Population) - 15;
                })
                .attr("y", function () {
                    return yScale(d.GRDP_VND) - 30;
                })

            svg.append("text")
                .attr("class", "dataInfo")
                .text(function () {
                    return "GRDP-VND " + d.GRDP_VND + ", " + "Density " + d.Density;
                })
                .attr("x", function () {
                    return xScale(d.Population) - 15;
                })
                .attr("y", function () {
                    return yScale(d.GRDP_VND) - 15;
                })
        })
        .on("mouseout", function (d) {
            d3.select(this)
                .attr("r", rScale(d.Area))
                .attr('fill', function () {
                    if (d.Density > 2000)
                        return 'red';
                    if (d.Density > 1000)
                        return 'blue';
                    return 'yellow';

                });

            svg.selectAll(".dataInfo").remove();
        });

    // Create Axis
    let xAxis = d3.axisBottom()
        .scale(xScale);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (height - padding) + ")") // Translate the xAxis to bottom
        .call(xAxis);   // Call the xAxis above

    // Create label for the axis
    svg.append("text")
        .attr("class", "label")
        .attr("transform",
            "translate(" + (width / 2) + " ," + (height - padding / 4) + ")")
        .style("text-anchor", "middle")
        .text("Population");


    let yAxis = d3.axisLeft()
        .scale(yScale);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis);

    svg.append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 0)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("GRPD-VND");
}