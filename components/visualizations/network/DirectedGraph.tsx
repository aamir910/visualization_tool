"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

const sampleData = {
  nodes: [
    { id: 1, name: "Start" },
    { id: 2, name: "Process A" },
    { id: 3, name: "Process B" },
    { id: 4, name: "Process C" },
    { id: 5, name: "End" },
  ],
  links: [
    { source: 1, target: 2, value: "Step 1" },
    { source: 2, target: 3, value: "Step 2" },
    { source: 3, target: 4, value: "Step 3" },
    { source: 4, target: 5, value: "Step 4" },
    { source: 2, target: 4, value: "Alternative" },
  ],
}

export function DirectedGraph() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove()

    const width = 800
    const height = 600

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])

    // Create a hierarchical layout
    const simulation = d3
      .forceSimulation(sampleData.nodes)
      .force(
        "link",
        d3.forceLink(sampleData.links).id((d: any) => d.id).distance(100)
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("x", d3.forceX(width / 2).strength(0.1))
      .force("y", d3.forceY(height / 2).strength(0.1))

    // Create arrow marker
    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 20)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#999")

    // Create links
    const link = svg
      .append("g")
      .selectAll("g")
      .data(sampleData.links)
      .join("g")

    // Add lines
    link
      .append("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 2)
      .attr("marker-end", "url(#arrowhead)")

    // Add labels
    link
      .append("text")
      .attr("dy", -3)
      .attr("text-anchor", "middle")
      .text((d: any) => d.value)
      .attr("font-size", 12)
      .attr("fill", "#666")

    // Create nodes
    const node = svg
      .append("g")
      .selectAll("g")
      .data(sampleData.nodes)
      .join("g")
      .call(drag(simulation) as any)

    // Add circles
    node
      .append("circle")
      .attr("r", 20)
      .attr("fill", "#69b3a2")
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)

    // Add labels
    node
      .append("text")
      .text((d: any) => d.name)
      .attr("text-anchor", "middle")
      .attr("dy", 4)
      .attr("font-size", 12)
      .attr("fill", "#fff")

    // Update positions on each tick
    simulation.on("tick", () => {
      link
        .selectAll("line")
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y)

      link
        .selectAll("text")
        .attr("x", (d: any) => (d.source.x + d.target.x) / 2)
        .attr("y", (d: any) => (d.source.y + d.target.y) / 2)

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`)
    })

    // Drag functions
    function drag(simulation: d3.Simulation<any, undefined>) {
      function dragstarted(event: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart()
        event.subject.fx = event.subject.x
        event.subject.fy = event.subject.y
      }

      function dragged(event: any) {
        event.subject.fx = event.x
        event.subject.fy = event.y
      }

      function dragended(event: any) {
        if (!event.active) simulation.alphaTarget(0)
        event.subject.fx = null
        event.subject.fy = null
      }

      return d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    }

    return () => {
      simulation.stop()
    }
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  )
} 