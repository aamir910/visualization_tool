"use client"

import { useEffect, useRef } from "react"
import * as echarts from "echarts"

const hours = ["12a", "1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a",
  "12p", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p"]
const days = ["Saturday", "Friday", "Thursday", "Wednesday", "Tuesday", "Monday", "Sunday"]

const data = [
  [0, 0, 5], [0, 1, 7], [0, 2, 3], [0, 3, 5], [0, 4, 2], [0, 5, 6], [0, 6, 5],
  [1, 0, 7], [1, 1, 8], [1, 2, 4], [1, 3, 6], [1, 4, 3], [1, 5, 7], [1, 6, 4],
  [2, 0, 3], [2, 1, 5], [2, 2, 2], [2, 3, 4], [2, 4, 1], [2, 5, 3], [2, 6, 2],
  [3, 0, 5], [3, 1, 6], [3, 2, 3], [3, 3, 5], [3, 4, 2], [3, 5, 4], [3, 6, 3],
  [4, 0, 2], [4, 1, 4], [4, 2, 1], [4, 3, 3], [4, 4, 0], [4, 5, 2], [4, 6, 1],
  [5, 0, 6], [5, 1, 7], [5, 2, 4], [5, 3, 6], [5, 4, 3], [5, 5, 5], [5, 6, 4],
  [6, 0, 5], [6, 1, 6], [6, 2, 3], [6, 3, 5], [6, 4, 2], [6, 5, 4], [6, 6, 3],
  [7, 0, 7], [7, 1, 8], [7, 2, 5], [7, 3, 7], [7, 4, 4], [7, 5, 6], [7, 6, 5],
  [8, 0, 8], [8, 1, 9], [8, 2, 6], [8, 3, 8], [8, 4, 5], [8, 5, 7], [8, 6, 6],
  [9, 0, 6], [9, 1, 7], [9, 2, 4], [9, 3, 6], [9, 4, 3], [9, 5, 5], [9, 6, 4],
  [10, 0, 4], [10, 1, 5], [10, 2, 2], [10, 3, 4], [10, 4, 1], [10, 5, 3], [10, 6, 2],
  [11, 0, 3], [11, 1, 4], [11, 2, 1], [11, 3, 3], [11, 4, 0], [11, 5, 2], [11, 6, 1],
  [12, 0, 5], [12, 1, 6], [12, 2, 3], [12, 3, 5], [12, 4, 2], [12, 5, 4], [12, 6, 3],
  [13, 0, 7], [13, 1, 8], [13, 2, 5], [13, 3, 7], [13, 4, 4], [13, 5, 6], [13, 6, 5],
  [14, 0, 8], [14, 1, 9], [14, 2, 6], [14, 3, 8], [14, 4, 5], [14, 5, 7], [14, 6, 6],
  [15, 0, 6], [15, 1, 7], [15, 2, 4], [15, 3, 6], [15, 4, 3], [15, 5, 5], [15, 6, 4],
  [16, 0, 4], [16, 1, 5], [16, 2, 2], [16, 3, 4], [16, 4, 1], [16, 5, 3], [16, 6, 2],
  [17, 0, 3], [17, 1, 4], [17, 2, 1], [17, 3, 3], [17, 4, 0], [17, 5, 2], [17, 6, 1],
  [18, 0, 5], [18, 1, 6], [18, 2, 3], [18, 3, 5], [18, 4, 2], [18, 5, 4], [18, 6, 3],
  [19, 0, 7], [19, 1, 8], [19, 2, 5], [19, 3, 7], [19, 4, 4], [19, 5, 6], [19, 6, 5],
  [20, 0, 8], [20, 1, 9], [20, 2, 6], [20, 3, 8], [20, 4, 5], [20, 5, 7], [20, 6, 6],
  [21, 0, 6], [21, 1, 7], [21, 2, 4], [21, 3, 6], [21, 4, 3], [21, 5, 5], [21, 6, 4],
  [22, 0, 4], [22, 1, 5], [22, 2, 2], [22, 3, 4], [22, 4, 1], [22, 5, 3], [22, 6, 2],
  [23, 0, 3], [23, 1, 4], [23, 2, 1], [23, 3, 3], [23, 4, 0], [23, 5, 2], [23, 6, 1]
]

export function HeatMap() {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.dispose()
      }

      chartInstance.current = echarts.init(chartRef.current)

      const option = {
        tooltip: {
          position: "top",
          formatter: (params: any) => {
            return `${days[params.data[1]]} ${hours[params.data[0]]}: ${params.data[2]}`
          }
        },
        grid: {
          top: "10%",
          bottom: "10%",
          left: "15%",
          right: "5%"
        },
        xAxis: {
          type: "category",
          data: days,
          splitArea: {
            show: true
          }
        },
        yAxis: {
          type: "category",
          data: hours,
          splitArea: {
            show: true
          }
        },
        visualMap: {
          min: 0,
          max: 10,
          calculable: true,
          orient: "horizontal",
          left: "center",
          bottom: "0%",
          inRange: {
            color: ["#ebedf0", "#c6e48b", "#7bc96f", "#239a3b", "#196127"]
          }
        },
        series: [{
          name: "Activity",
          type: "heatmap",
          data: data,
          label: {
            show: true
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }]
      }

      chartInstance.current.setOption(option)
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose()
      }
    }
  }, [])

  return (
    <div className="w-full h-full min-h-[400px]" ref={chartRef} />
  )
}

export function CalendarHeatMap() {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.dispose()
      }

      chartInstance.current = echarts.init(chartRef.current)

      const option = {
        tooltip: {
          position: "top",
          formatter: (params: any) => {
            return `${params.data[0]}: ${params.data[1]}`
          }
        },
        visualMap: {
          min: 0,
          max: 10,
          calculable: true,
          orient: "horizontal",
          left: "center",
          bottom: "0%",
          inRange: {
            color: ["#ebedf0", "#c6e48b", "#7bc96f", "#239a3b", "#196127"]
          }
        },
        calendar: [{
          top: "middle",
          left: "center",
          range: "2024",
          cellSize: ["auto", 13],
          itemStyle: {
            borderWidth: 0.5
          },
          yearLabel: { show: false }
        }],
        series: {
          type: "heatmap",
          coordinateSystem: "calendar",
          data: Array.from({ length: 365 }, (_, i) => {
            const date = new Date(2024, 0, i + 1)
            return [
              date.toISOString().split("T")[0],
              Math.floor(Math.random() * 10)
            ]
          })
        }
      }

      chartInstance.current.setOption(option)
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose()
      }
    }
  }, [])

  return (
    <div className="w-full h-full min-h-[400px]" ref={chartRef} />
  )
} 