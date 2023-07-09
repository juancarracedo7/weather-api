import { useEffect, useRef } from "react";
import * as d3 from "d3";

const ForecastChart = ({ forecast }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const createChart = () => {
      const chartData = forecast.map((hour) => ({
        dt: hour.dt.split(" ")[0],
        temp: hour.temp,
      }));

      const margin = { top: 20, right: 20, bottom: 30, left: 50 };
      const width = window.innerWidth >= 768 ? 800 : window.innerWidth - margin.left - margin.right;
      const height = 235 - margin.top - margin.bottom;

      d3.select(chartRef.current).selectAll("svg").remove();

      const svg = d3
        .select(chartRef.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      const xScale = d3
        .scaleBand()
        .domain(chartData.map((d) => d.dt))
        .range([0, width])
        .padding(0.2);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(chartData, (d) => d.temp)])
        .range([height, 0]);

      svg
        .selectAll("rect")
        .data(chartData)
        .enter()
        .append("rect")
        .attr("x", (d) => xScale(d.dt))
        .attr("y", (d) => yScale(d.temp))
        .attr("width", xScale.bandwidth())
        .attr("height", (d) => height - yScale(d.temp))
        .attr("fill", "steelblue");

      svg.append("g").attr("transform", `translate(0, ${height})`).call(d3.axisBottom(xScale));

      svg.append("g").call(d3.axisLeft(yScale));

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", -5)
        .attr("text-anchor", "middle")
        .text("Temperature by Day");
    };

    if (forecast && forecast.length > 0) {
      createChart();
    }
  }, [forecast]);

  return <div ref={chartRef}></div>;
};

export default ForecastChart;