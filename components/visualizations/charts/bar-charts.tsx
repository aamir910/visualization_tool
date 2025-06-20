"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

const sampleData = [
  { category: "A", value: 30 },
  { category: "B", value: 45 },
  { category: "C", value: 25 },
  { category: "D", value: 60 },
  { category: "E", value: 35 },
]

export function VerticalBarChart() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 400
    const height = 300
    const margin = { top: 20, right: 20, bottom: 30, left: 40 }

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove()

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    const x = d3
      .scaleBand()
      .range([0, width - margin.left - margin.right])
      .domain(sampleData.map((d) => d.category))
      .padding(0.1)

    const y = d3
      .scaleLinear()
      .range([height - margin.top - margin.bottom, 0])
      .domain([0, d3.max(sampleData, (d) => d.value) as number])

    // Add X axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x))

    // Add Y axis
    svg.append("g").call(d3.axisLeft(y))

    // Add bars
    svg
      .selectAll("rect")
      .data(sampleData)
      .join("rect")
      .attr("x", (d) => x(d.category) as number)
      .attr("y", (d) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - margin.top - margin.bottom - y(d.value))
      .attr("fill", "#69b3a2")
  }, [])

  return <svg ref={svgRef} className="w-full h-full" />
}

export function HorizontalBarChart() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 400
    const height = 300
    const margin = { top: 20, right: 20, bottom: 30, left: 60 }

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove()

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    const y = d3
      .scaleBand()
      .range([0, height - margin.top - margin.bottom])
      .domain(sampleData.map((d) => d.category))
      .padding(0.1)

    const x = d3
      .scaleLinear()
      .range([0, width - margin.left - margin.right])
      .domain([0, d3.max(sampleData, (d) => d.value) as number])

    // Add X axis
    svg.append("g").call(d3.axisTop(x))

    // Add Y axis
    svg.append("g").call(d3.axisLeft(y))

    // Add bars
    svg
      .selectAll("rect")
      .data(sampleData)
      .join("rect")
      .attr("x", 0)
      .attr("y", (d) => y(d.category) as number)
      .attr("width", (d) => x(d.value))
      .attr("height", y.bandwidth())
      .attr("fill", "#69b3a2")
  }, [])

  return <svg ref={svgRef} className="w-full h-full" />
}

export function StackedBarChart() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 400
    const height = 300
    const margin = { top: 20, right: 20, bottom: 30, left: 40 }

    // Sample data for stacked bars
    const data = [
      { category: "A", group1: 20, group2: 10, group3: 15 },
      { category: "B", group1: 15, group2: 25, group3: 5 },
      { category: "C", group1: 10, group2: 15, group3: 20 },
      { category: "D", group1: 25, group2: 10, group3: 15 },
      { category: "E", group1: 15, group2: 20, group3: 10 },
    ]

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove()

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    const x = d3
      .scaleBand()
      .range([0, width - margin.left - margin.right])
      .domain(data.map((d) => d.category))
      .padding(0.1)

    const y = d3
      .scaleLinear()
      .range([height - margin.top - margin.bottom, 0])
      .domain([
        0,
        d3.max(data, (d) => d.group1 + d.group2 + d.group3) as number,
      ])

    const color = d3.scaleOrdinal().range(["#69b3a2", "#9ecae1", "#deebf7"])

    // Stack the data
    const stackedData = d3.stack().keys(["group1", "group2", "group3"])(data)

    // Add X axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x))

    // Add Y axis
    svg.append("g").call(d3.axisLeft(y))

    // Add bars
    svg
      .append("g")
      .selectAll("g")
      .data(stackedData)
      .join("g")
      .attr("fill", (d) => color(d.key) as string)
      .selectAll("rect")
      .data((d) => d)
      .join("rect")
      .attr("x", (d) => x(d.data.category) as number)
      .attr("y", (d) => y(d[1]))
      .attr("height", (d) => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth())
  }, [])

  return <svg ref={svgRef} className="w-full h-full" />
} 