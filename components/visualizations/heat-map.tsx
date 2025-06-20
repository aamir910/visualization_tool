"use client"

import { useEffect, useRef } from "react"
import * as echarts from "echarts"

// Define types for our data
interface HeatMapData {
  value: [number, number, number]
  itemStyle?: {
    color: string
  }
}

// Sample data for the heat map
const sampleData: HeatMapData[] = [
  { value: [0, 0, 5], itemStyle: { color: "#ff0000" } },
  { value: [0, 1, 7], itemStyle: { color: "#ff3333" } },
  { value: [0, 2, 3], itemStyle: { color: "#ff6666" } },
  { value: [1, 0, 2], itemStyle: { color: "#ff9999" } },
  { value: [1, 1, 8], itemStyle: { color: "#ffcccc" } },
  { value: [1, 2, 4], itemStyle: { color: "#ffdddd" } },
  { value: [2, 0, 6], itemStyle: { color: "#ffeeee" } },
  { value: [2, 1, 1], itemStyle: { color: "#ffffff" } },
  { value: [2, 2, 9], itemStyle: { color: "#ffffff" } },
]

export function HeatMap() {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Initialize the chart
    chartInstance.current = echarts.init(chartRef.current)

    // Set up the chart options
    const options: echarts.EChartsOption = {
      tooltip: {
        position: "top",
      },
      grid: {
        height: "50%",
        top: "10%",
      },
      xAxis: {
        type: "category",
        data: ["A", "B", "C"],
        splitArea: {
          show: true,
        },
      },
      yAxis: {
        type: "category",
        data: ["X", "Y", "Z"],
        splitArea: {
          show: true,
        },
      },
      visualMap: {
        min: 0,
        max: 10,
        calculable: true,
        orient: "horizontal",
        left: "center",
        bottom: "15%",
      },
      series: [
        {
          name: "Heat Map",
          type: "heatmap",
          data: sampleData,
          label: {
            show: true,
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    }

    // Set the options
    chartInstance.current.setOption(options)

    // Handle window resize
    const handleResize = () => {
      chartInstance.current?.resize()
    }
    window.addEventListener("resize", handleResize)

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize)
      chartInstance.current?.dispose()
    }
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div ref={chartRef} className="w-full h-full" />
    </div>
  )
} 