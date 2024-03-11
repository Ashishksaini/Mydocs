import React, { useEffect } from 'react'
import * as d3 from 'd3'
const Test = () => {
    const data = [10, 20, 30, 40, 50, 60];
    useEffect(() => {
        const svg = d3
          .select(".div")
          .append("svg")
          .attr("height", 800)
          .attr("width", 800);
        // const scale = d3.scaleLinear().domain([d3.min(data),d3.max(data)]).range([0, 800]);
        // const axis = d3.axisBottom().scale(scale);
        // axis.ticks(20)
        
        // svg.append("g").attr("transform", "translate(50, 10)").call(axis);
        const x1 = 20; // Start x-coordinate
        const x2 = 20; // End x-coordinate
        const y1 = 100
            const y2=800;
        svg
            // .append("g")
            .append("line")
          .attr("y1", y1)
          .attr("x1", x1)
          .attr("x2", x2)
            .attr("y2", y2)
          .style("stroke", "black")
          .style("stroke-width", 1)
            .style("stroke-dasharray", "5,5")
            .call(
                d3.drag()
                    .on("drag", (e) => {
                        console.log("stared")
                        d3.select(this)
                            .attr("dx", e.dx)
                        .attr("x2",e.dx)
                        
                })
            )
    
    },[])
    return <div style={{ display:"inline"}} className="div">
  </div>;
}

export default Test