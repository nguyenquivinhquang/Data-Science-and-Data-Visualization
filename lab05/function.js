function scatterPlot() {
    var rowConverter = function (d) {
        return {
            Province: d['Province/State'],
            Country: d['Country/Region'],
            Latitude: parseFloat(d['Lat']),
            Longtitude: parseFloat(d['Long']),
            case: parseFloat(d['5/4/20'])
        };
    }

    d3.csv("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv", rowConverter, function (data) {
        console.log(data);
        let temp = 0, count = 0;
        let cleanData = []
        for (let i = 0; i < data.length; i++) {
            if (isNaN(data[i].Latitude) || isNaN(data[i].Longtitude)) {
                continue;
            }
            if (isNaN(data[i].Province)) {
                data[i].Province = "None";
            }
            console.log(data[i].Province);
            cleanData.push(data[i])
            if (data[i].Country == "China") count += 1
        }
        // console.log(data.sort((a, b) => a.case - b.case)[data.length - 1]);
        visualize(cleanData)
    });
}
function visualize(dataset) {
    var scatterMargin = {
        top: 40,
        right: 100,
        bottom: 20,
        left: 50,
    }
    var MaxCase = d3.deviation(dataset, function (d) { return d.case; });
    var scatterWidth = 1100 - scatterMargin.left - scatterMargin.right;
    var scatterHeight = 600 - scatterMargin.top - scatterMargin.bottom;




    var xScale = d3.scaleLinear()
        .domain([
            d3.min(dataset, function (d) { return d.Longtitude }),
            d3.max(dataset, function (d) { return d.Longtitude; }
            )])
        .range([0, scatterWidth]).nice();

    var yScale = d3
        .scaleLinear()
        .domain([
            d3.min(dataset, function (d) { return d.Latitude; }),
            d3.max(dataset, function (d) { return d.Latitude; })
        ])
        .range([scatterHeight, 0]).nice();
    var colorScale = d3
        .scaleLinear()
        .domain([
            d3.min(dataset, function (d) { return d.case; }),
            d3.max(dataset, function (d) { return d.case; }),
        ])
        .range([0, 255]).nice();
    // for (let i = 0; i < dataset.length; i++) {
    //     console.log(colorScale(dataset[i].case))
    // }
    // console.log(colorScale(dataset[200].case));
    
    var scatterSvg = d3
        .select("#visualize")
        .append("svg")
        .attr(
            "width",
            scatterWidth + scatterMargin.left + scatterMargin.right + 100
        )
        .attr(
            "height",
            scatterHeight + scatterMargin.top + scatterMargin.bottom
        )
        .append("g")
        .attr(
            "transform",
            "translate(" +
            scatterMargin.left +
            "," +
            scatterMargin.top +
            ")"
        );
    scatterSvg
        .append("g")
        .attr(
            "transform",
            "translate(0," + scatterHeight + ")"
        )
        .call(d3.axisBottom(xScale))
        .append("text")
        // .attr("dy", "1.5em")
        // .attr("dx", scatterWidth)
        .attr("fill", "#000000");
    // .text("Longitude");
    scatterSvg
        .append("g")
        .call(d3.axisLeft(yScale))
        .append("text")
        // .attr("dy", "-1em")
        // .attr("dx", "1em")
        .attr("fill", "#000000");
    // .text("Latitude");



    scatterSvg
        .selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("fill", function (d) {                          // Change color of bar based on its value
            // console.log(d.case);
            return "rgb(" + Math.round(colorScale(d.case) * 100000) + ",0, 0)" ;
        })
        .attr("cx", function (d) {
            return xScale(d.Longtitude);
        })
        .attr("cy", function (d) {
            return yScale(d.Latitude);
        })
        .attr("r", 5)
        .on("mouseover", function (d) {
            d3.select(this)
                .attr("r", 8)
                .attr("fill", "yellow");

            scatterSvg.append("text")
                .attr("class", "dataInfo")
                .text(function () {
                    return "Province:" + d.Province  +  " Country: " + d.Country + ", " + "Cases: " + d.case;
                })
                .attr("x", function () {
                    return xScale(d.Longtitude) - 15;
                })
                .attr("y", function () {
                    return yScale(d.Latitude) - 15;
                })
        })
        .on("mouseout", function (d) {
            d3.select(this)
                .attr("r", 5)
                .attr("fill", function (d) {                          
                    return "rgb(" + Math.round(colorScale(d.case) * 100000) + ",0, 0)" ;
                });

            scatterSvg.selectAll(".dataInfo").remove();
        });
}
