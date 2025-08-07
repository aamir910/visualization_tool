// @ts-nocheck
"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

const sampleData = [
  [0, 5, 6, 4, 0],
  [5, 0, 10, 0, 0],
  [6, 10, 0, 2, 0],
  [4, 0, 2, 0, 7],
  [0, 0, 0, 7, 0],
]

const names = ["A", "B", "C", "D", "E"]

export function ChordDiagram() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 400
    const height = 400
    const margin = { top: 20, right: 20, bottom: 20, left: 20 }

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove()

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`)

    // Create the chord diagram
    const chord = d3
      .chord()
      .padAngle(0.05)
      .sortSubgroups(d3.descending)(sampleData)

    const arc = d3
      .arc()
      .innerRadius(100)
      .outerRadius(130)

    const ribbon = d3.ribbon().radius(100)

    const color = d3.scaleOrdinal(d3.schemeCategory10)

    // Add the chords
    svg
      .datum(chord)
      .append("g")
      .selectAll("path")
      .data((chords) => chords)
      .join("path")
      // @ts-ignore
      .attr("d", ribbon)
      .style("fill", (d) => color(d.source.index.toString()))
      // @ts-ignore
      .style("stroke", (d) => d3.rgb(color(d.source.index.toString())).darker())
      .style("opacity", 0.7)

    // Add the groups
    const group = svg
      .append("g")
      .selectAll("g")
      .data((chords) => chords.groups)
      .join("g")

    group
      .append("path")
      .attr("d", arc)
      .style("fill", (d) => color(d.index.toString()))
      .style("stroke", (d) => d3.rgb(color(d.index.toString())).darker())

    // Add the labels
    group
      .append("text")
      .each((d) => {
        d.angle = (d.startAngle + d.endAngle) / 2
      })
      .attr("dy", ".35em")
      .attr("transform", (d) => {
        const radius = 150
        const x = radius * Math.sin(d.angle)
        const y = -radius * Math.cos(d.angle)
        return `rotate(${(d.angle * 180) / Math.PI - 90}) translate(${radius},0) rotate(${x < 0 ? 180 : 0})`
      })
      .text((d) => names[d.index])
      .style("text-anchor", "middle")
      .style("font-size", "12px")
  }, [])

  return <svg ref={svgRef} className="w-full h-full" />
} 