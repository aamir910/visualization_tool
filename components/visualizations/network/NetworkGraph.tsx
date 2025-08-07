"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

const sampleData = {
  nodes: [
    { id: 1, name: "Node 1", group: 1 },
    { id: 2, name: "Node 2", group: 1 },
    { id: 3, name: "Node 3", group: 2 },
    { id: 4, name: "Node 4", group: 2 },
    { id: 5, name: "Node 5", group: 3 },
    { id: 6, name: "Node 6", group: 3 },
  ],
  links: [
    { source: 1, target: 2, value: 1 },
    { source: 2, target: 3, value: 2 },
    { source: 3, target: 4, value: 1 },
    { source: 4, target: 5, value: 2 },
    { source: 5, target: 6, value: 1 },
    { source: 1, target: 4, value: 3 },
    { source: 2, target: 5, value: 2 },
  ],
}

export function NetworkGraph() {
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

    // Create simulation
    const simulation = d3
      // @ts-ignore
      .forceSimulation(sampleData.nodes)
      .force(
        "link",
        d3.forceLink(sampleData.links).id((d: any) => d.id)
      )
      .force("charge", d3.forceManyBody().strength(-100))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(30))

    // Create links
    const link = svg
      .append("g")
      .selectAll("line")
      .data(sampleData.links)
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", (d: any) => Math.sqrt(d.value))

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
      .attr("r", 15)
      .attr("fill", (d: any) => {
        const colors = ["#69b3a2", "#9ecae1", "#deebf7"]
        return colors[d.group - 1]
      })
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

    // Add tooltips
    node
      .append("title")
      .text((d: any) => `${d.name} (Group ${d.group})`)

    // Update positions on each tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y)

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