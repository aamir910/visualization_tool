"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

// Sample data for the heat map
const sampleData = {
  xLabels: ["A", "B", "C", "D", "E"],
  yLabels: ["1", "2", "3", "4", "5"],
  values: [
    [10, 20, 30, 40, 50],
    [15, 25, 35, 45, 55],
    [20, 30, 40, 50, 60],
    [25, 35, 45, 55, 65],
    [30, 40, 50, 60, 70],
  ],
}

export function HeatMap() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove()

    // Set up the SVG dimensions
    const width = 400
    const height = 300
    const margin = { top: 40, right: 40, bottom: 40, left: 40 }

    // Create the SVG container
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    // Calculate cell dimensions
    const cellWidth = (width - margin.left - margin.right) / sampleData.xLabels.length
    const cellHeight = (height - margin.top - margin.bottom) / sampleData.yLabels.length

    // Create color scale
    const colorScale = d3
      .scaleSequential()
      .interpolator(d3.interpolateViridis)
      .domain([0, 100])

    // Create the heat map cells
    const cells = svg
      .selectAll("rect")
      .data(sampleData.values.flatMap((row, i) =>
        row.map((value, j) => ({
          value,
          x: j,
          y: i,
        }))
      ))
      .join("rect")
      .attr("x", (d) => d.x * cellWidth)
      .attr("y", (d) => d.y * cellHeight)
      .attr("width", cellWidth)
      .attr("height", cellHeight)
      .attr("fill", (d) => colorScale(d.value))
      .attr("stroke", "#fff")
      .attr("stroke-width", 1)

    // Add x-axis labels
    svg
      .selectAll(".x-label")
      .data(sampleData.xLabels)
      .join("text")
      .attr("class", "x-label")
      .attr("x", (d, i) => i * cellWidth + cellWidth / 2)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .attr("font-size", 12)
      .text((d) => d)

    // Add y-axis labels
    svg
      .selectAll(".y-label")
      .data(sampleData.yLabels)
      .join("text")
      .attr("class", "y-label")
      .attr("x", -10)
      .attr("y", (d, i) => i * cellHeight + cellHeight / 2)
      .attr("text-anchor", "end")
      .attr("dominant-baseline", "middle")
      .attr("font-size", 12)
      .text((d) => d)

    // Add value labels
    svg
      .selectAll(".value-label")
      .data(sampleData.values.flatMap((row, i) =>
        row.map((value, j) => ({
          value,
          x: j,
          y: i,
        }))
      ))
      .join("text")
      .attr("class", "value-label")
      .attr("x", (d) => d.x * cellWidth + cellWidth / 2)
      .attr("y", (d) => d.y * cellHeight + cellHeight / 2)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-size", 10)
      .attr("fill", (d) => d.value > 50 ? "#fff" : "#000")
      .text((d) => d.value)

  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  )
} 