var arg = null, 
    sort = false, 
    counter = 0;

var w = 500,
    h = 800;

var margin = { top: 40, right: 60, bottom: 40, left: 80 },
    height = h - margin.top - margin.bottom,
    width = w - margin.left - margin.right;

var svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr(
        "transform",
        "translate(" + margin.left + "," + margin.top + ")"
    );

function update(sort = false, arg = null) {
    counter = Math.min(Math.max(0, counter), 63);
    console.log('1')
    d3.csv(
        "https://tungth.github.io/data/vn-provinces-data.csv",
        function (data) {
            function remove_cache() {
                d3.selectAll("rect").remove();
                d3.selectAll("text").remove();
                d3.select("#xaxis").remove();
                d3.select("#yaxis").remove();
            }

            data = data.slice(0, counter);
            if (sort) {
                data.sort(function (a, b) {
                    return (
                        parseFloat(a[arg].replace(",", ".")) - parseFloat(b[arg].replace(",", "."))
                    );
                });
                remove_cache();
            } else remove_cache();
            var x = d3
                .scaleLinear()
                .domain([
                    0,
                    Math.ceil(
                        parseFloat(
                            data.reduce((a, b) =>
                                parseFloat(a["GRDP-VND"].replace(",", ".")) >
                                    parseFloat(b["GRDP-VND"].replace(",", ".")) ? a : b
                            )
                            ["GRDP-VND"].replace(",", ".")
                        )
                    ),
                ])
                .range([0, width]);

            xaxis = svg.append("g");
            xaxis
                .attr("id", "xaxis")
                .attr(
                    "transform",
                    "translate(0," + height + ")"
                )
                .transition()
                .duration(1000)
                .call(d3.axisBottom(x));
            var y = d3
                .scaleBand()
                .range([0, height])
                .domain(
                    data.map(function (data) {
                        return data.province;
                    })
                )
                .padding(0.1);

            yaxis = svg.append("g");
            yaxis
                .attr("id", "yaxis")
                .transition()
                .duration(1000)
                .call(d3.axisLeft(y));

            svg.selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .transition()
                .on("start", function () {
                    d3.selectAll("rect").style("fill", "red");
                })
                .on("end", function () {
                    d3.selectAll("rect").style(
                        "fill",
                        "violet"
                    );
                })
                .duration(1000)
                .attr("x", x(0.7))
                .attr("y", function (data) {
                    return y(data.province);
                })
                .attr("width", function (data) {
                    return x(
                        parseFloat(
                            data["GRDP-VND"].replace(",", ".")
                        )
                    );
                })
                .attr("height", y.bandwidth())
                .style("fill", "purple");

            svg.append("text")
                .call(d3.axisLeft(y))
                .transition()
                .duration(1000)
                .attr("dy", -8)
                .attr("dx", -8)
                .attr("fill", "#000000")
                .text("Province");

            svg.append("text")
                .call(d3.axisBottom(x))
                .transition()
                .duration(1000)
                .attr("dy", height + 16)
                .attr("dx", width + 16)
                .attr("fill", "#000000")
                .text("GRDP-VND");

            svg.append("g")
                .selectAll(".textlabel")
                .data(data)
                .enter()
                .append("text")
                .transition()
                .duration(1000)
                .attr("font-size", 10)
                .text(function (d) {
                    return parseFloat(
                        d["GRDP-VND"].replace(",", ".")
                    );
                })

                .attr("x", function (d) {
                    return ( x( parseFloat( d["GRDP-VND"].replace(",", "."))) + 5
                    );
                })

                .attr("y", function (d) {
                    return y(d.province) + y.bandwidth() / 1.5;
                });

            svg.exit().remove();
        }
    );
}

update(sort, arg);

function changeProvince(num) {
    console.log('okokk')
    counter += num;
    update(sort, arg);
}

function sortProvince(combobox) {
    if (combobox.value == "Default") {
        sort = false;
        arg = combobox.value;
        update(sort, arg);
    } else {
        sort = true;
        arg = combobox.value;
        update(sort, arg);
    }
}