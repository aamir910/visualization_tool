"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

// Define types for our data
interface Node extends d3.SimulationNodeDatum {
  id: number
  name: string
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: Node
  target: Node
}

interface RawLink {
  source: number
  target: number
}

// Sample data for the network graph
const sampleData = {
  nodes: [
    { id: 1, name: "Node 1" },
    { id: 2, name: "Node 2" },
    { id: 3, name: "Node 3" },
    { id: 4, name: "Node 4" },
    { id: 5, name: "Node 5" },
  ] as Node[],
  links: [
    { source: 1, target: 2 },
    { source: 2, target: 3 },
    { source: 3, target: 4 },
    { source: 4, target: 5 },
    { source: 5, target: 1 },
    { source: 1, target: 3 },
    { source: 2, target: 4 },
  ] as RawLink[],
}

export function NetworkGraph() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove()

    // Set up the SVG dimensions
    const width = 400
    const height = 300
    const margin = { top: 20, right: 20, bottom: 20, left: 20 }

    // Create the SVG container
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    // Create the simulation
    const simulation = d3
      .forceSimulation<Node>(sampleData.nodes)
      .force(
        "link",
        d3
          .forceLink<Node, Link>()
          .id((d) => d.id)
          .links(sampleData.links as unknown as Link[])
          .distance(100)
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))

    // Create the links
    const link = svg
      .append("g")
      .selectAll("line")
      .data(sampleData.links as unknown as Link[])
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 2)

    // Create the nodes
    const node = svg
      .append("g")
      .selectAll("circle")
      .data(sampleData.nodes)
      .join("circle")
      .attr("r", 10)
      .attr("fill", "#69b3a2")
      .call(drag(simulation) as any)

    // Add labels to nodes
    const label = svg
      .append("g")
      .selectAll("text")
      .data(sampleData.nodes)
      .join("text")
      .text((d) => d.name)
      .attr("font-size", 12)
      .attr("dx", 15)
      .attr("dy", 4)

    // Update positions on each tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as Node).x!)
        .attr("y1", (d) => (d.source as Node).y!)
        .attr("x2", (d) => (d.target as Node).x!)
        .attr("y2", (d) => (d.target as Node).y!)

      node.attr("cx", (d) => d.x!).attr("cy", (d) => d.y!)

      label.attr("x", (d) => d.x!).attr("y", (d) => d.y!)
    })

    // Drag functions
    function drag(simulation: d3.Simulation<Node, undefined>) {
      function dragstarted(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
        if (!event.active) simulation.alphaTarget(0.3).restart()
        event.subject.fx = event.subject.x
        event.subject.fy = event.subject.y
      }

      function dragged(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
        event.subject.fx = event.x
        event.subject.fy = event.y
      }

      function dragended(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
        if (!event.active) simulation.alphaTarget(0)
        event.subject.fx = null
        event.subject.fy = null
      }

      return d3
        .drag<SVGCircleElement, Node>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    }

    // Cleanup function
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