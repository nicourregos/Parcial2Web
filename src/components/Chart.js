import React, { useEffect } from "react";
import * as d3 from "d3";
import { FormattedMessage } from "react-intl";
import "./styles.css";

function Chart(props) {
  let canvRef = React.createRef();

  const width = 410;
  const height = 410;
  const radius = 200;

  useEffect(() => {
    let data = props.data;
    let svg = d3
      .select(canvRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    let color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.powerUsage.value))
      .range(d3.schemeSet2);

    let pie = d3.pie().value((d) => d.powerUsage.value);
    let data_ready = pie(data);

    let arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

    let tooltip = d3
      .select(canvRef.current)
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px");

    function mouseOver(d) {
      tooltip.style("opacity", 1);
      d3.select(this).style("stroke", "black").style("opacity", 1);
    }

    function mouseMove(d) {
      var y = parseInt(window.scrollY) + d.clientY - 50;
      tooltip
        .html("<strong>" + 
          d.srcElement.__data__.data.name +
            ": </strong>" +
            d.srcElement.__data__.data.powerUsage.value +
            " KwH"
        )
        .style("left", d.clientX + 10 + "px")
        .style("top", y + "px")
    }

    function mouseLeave(d) {
      tooltip.style("opacity", 0);
      d3.select(this).style("stroke", "black").style("opacity", 0.7);
    }

    svg
      .selectAll("mySlices")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", arcGenerator)
      .attr("fill", function (d) {
        return color(d.value);
      })
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)
      .on("mouseover", mouseOver)
      .on("mousemove", mouseMove)
      .on("mouseleave", mouseLeave);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="row">
      <h3>
        <FormattedMessage id="TitleStats" />
      </h3>
      <div className="centered">
        <p>
          <FormattedMessage id="StatsCaption" />
        </p>
        <div
        ref={canvRef}
        viewBox="0 0 410 410"
        preserveAspectRatio="xMidYMid meet"
      ></div>
      </div>
    </div>
  );
}

export default Chart;
