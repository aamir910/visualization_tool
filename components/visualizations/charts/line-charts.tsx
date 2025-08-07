"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

const sampleData = [
  { date: "2023-01", value: 30 },
  { date: "2023-02", value: 45 },
  { date: "2023-03", value: 25 },
  { date: "2023-04", value: 60 },
  { date: "2023-05", value: 35 },
  { date: "2023-06", value: 50 },
]

export function BasicLineChart() {
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
      .scalePoint()
      .range([0, width - margin.left - margin.right])
      .domain(sampleData.map((d) => d.date))

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

    // Add the line
    svg
      .append("path")
      .datum(sampleData)
      .attr("fill", "none")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 2)
      .attr(
        "d",
        // @ts-ignore
        d3.line()
          .x((d: any) => x(d.date) as number)
          .y((d: any) => y(d.value))
      )

    // Add dots
    svg
      .selectAll("dot")
      .data(sampleData)
      .join("circle")
      .attr("cx", (d) => x(d.date) as number)
      .attr("cy", (d) => y(d.value))
      .attr("r", 5)
      .attr("fill", "#69b3a2")
  }, [])

  return <svg ref={svgRef} className="w-full h-full" />
}

export function AreaChart() {
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
      .scalePoint()
      .range([0, width - margin.left - margin.right])
      .domain(sampleData.map((d) => d.date))

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

    // Add the area
    svg
      .append("path")
      .datum(sampleData)
      .attr("fill", "#69b3a2")
      .attr("fill-opacity", 0.3)
      .attr(
        "d",
        // @ts-ignore
        d3
          .area()
          .x((d: any) => x(d.date) as number)
          .y0(height - margin.top - margin.bottom)
          .y1((d: any) => y(d.value))
      )

    // Add the line
    svg
      .append("path")
      .datum(sampleData)
      .attr("fill", "none")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 2)
      .attr(
        "d",
        // @ts-ignore
        d3
          .line()
          .x((d: any) => x(d.date) as number)
          .y((d: any) => y(d.value))
      )
  }, [])

  return <svg ref={svgRef} className="w-full h-full" />
}

export function MultiLineChart() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 400
    const height = 300
    const margin = { top: 20, right: 20, bottom: 30, left: 40 }

    // Sample data for multiple lines
    const data = [
      { date: "2023-01", value1: 30, value2: 20, value3: 40 },
      { date: "2023-02", value1: 45, value2: 35, value3: 30 },
      { date: "2023-03", value1: 25, value2: 40, value3: 35 },
      { date: "2023-04", value1: 60, value2: 45, value3: 50 },
      { date: "2023-05", value1: 35, value2: 50, value3: 45 },
      { date: "2023-06", value1: 50, value2: 55, value3: 60 },
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
      .scalePoint()
      .range([0, width - margin.left - margin.right])
      .domain(data.map((d) => d.date))

    const y = d3
      .scaleLinear()
      .range([height - margin.top - margin.bottom, 0])
      .domain([
        0,
        d3.max(data, (d) => Math.max(d.value1, d.value2, d.value3)) as number,
      ])

    const color = d3.scaleOrdinal().range(["#69b3a2", "#9ecae1", "#deebf7"])

    // Add X axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x))

    // Add Y axis
    svg.append("g").call(d3.axisLeft(y))

    // Add the lines
    const line = d3
      .line()
      .x((d: any) => x(d.date) as number)
      .y((d: any) => y(d.value))

    // Add lines for each value
    ;["value1", "value2", "value3"].forEach((value, i) => {
      svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", color(i.toString()) as string)
        .attr("stroke-width", 2)
        .attr(
          "d",
          // @ts-ignore
          line.y((d: any) => y(d[value]))
        )
    })
  }, [])

  return <svg ref={svgRef} className="w-full h-full" />
} 