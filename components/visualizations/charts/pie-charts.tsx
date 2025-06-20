"use client"

import { useEffect, useRef } from "react"
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  PieController,
  DoughnutController,
  PolarAreaController,
  CategoryScale,
  LinearScale,
  RadialLinearScale
} from "chart.js"
import ChartDataLabels from "chartjs-plugin-datalabels"

// Register Chart.js components
Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  ChartDataLabels,
  PieController,
  DoughnutController,
  PolarAreaController,
  CategoryScale,
  LinearScale,
  RadialLinearScale
)

const sampleData = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.8)",
        "rgba(54, 162, 235, 0.8)",
        "rgba(255, 206, 86, 0.8)",
        "rgba(75, 192, 192, 0.8)",
        "rgba(153, 102, 255, 0.8)",
        "rgba(255, 159, 64, 0.8)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
}

export function PieChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      // Create new chart
      chartInstance.current = new Chart(chartRef.current, {
        type: "pie",
        data: sampleData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
            },
            datalabels: {
              color: "#fff",
              font: {
                weight: "bold",
              },
              formatter: (value: number) => {
                return value > 0 ? value : ""
              },
            },
          },
        },
      })
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <div className="w-full h-full min-h-[300px]">
      <canvas ref={chartRef} />
    </div>
  )
}

export function DoughnutChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      chartInstance.current = new Chart(chartRef.current, {
        type: "doughnut",
        data: sampleData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "60%",
          plugins: {
            legend: {
              position: "right",
            },
            datalabels: {
              color: "#fff",
              font: {
                weight: "bold",
              },
              formatter: (value: number) => {
                return value > 0 ? value : ""
              },
            },
          },
        },
      })
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <div className="w-full h-full min-h-[300px]">
      <canvas ref={chartRef} />
    </div>
  )
}

export function PolarAreaChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      chartInstance.current = new Chart(chartRef.current, {
        type: "polarArea",
        data: sampleData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              beginAtZero: true,
              ticks: {
                display: false
              }
            }
          },
          plugins: {
            legend: {
              position: "right",
            },
            datalabels: {
              color: "#fff",
              font: {
                weight: "bold",
              },
              formatter: (value: number) => {
                return value > 0 ? value : ""
              },
            },
          },
        },
      })
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <div className="w-full h-full min-h-[300px]">
      <canvas ref={chartRef} />
    </div>
  )
}

// 1. Animated Pie Chart (bounce effect)
export function AnimatedPieChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) chartInstance.current.destroy()
      chartInstance.current = new Chart(chartRef.current, {
        type: "pie",
        data: sampleData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            animateRotate: true,
            animateScale: true,
            duration: 1500,
            easing: "easeOutBounce"
          },
          plugins: {
            legend: { position: "right" },
            datalabels: {
              color: "#fff",
              font: { weight: "bold" },
              formatter: (value: number) => (value > 0 ? value : "")
            }
          }
        }
      })
    }
    return () => { if (chartInstance.current) chartInstance.current.destroy() }
  }, [])

  return <div className="w-full h-full min-h-[300px]"><canvas ref={chartRef} /></div>
}

// 2. Custom Data Pie Chart
const customData = {
  labels: ["Apple", "Banana", "Cherry", "Date"],
  datasets: [
    {
      data: [8, 15, 6, 11],
      backgroundColor: [
        "#ff6384",
        "#36a2eb",
        "#ffce56",
        "#4bc0c0"
      ],
      borderColor: [
        "#fff",
        "#fff",
        "#fff",
        "#fff"
      ],
      borderWidth: 2
    }
  ]
}

export function CustomDataPieChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) chartInstance.current.destroy()
      chartInstance.current = new Chart(chartRef.current, {
        type: "pie",
        data: customData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "bottom" },
            datalabels: {
              color: "#222",
              font: { weight: "bold" },
              formatter: (value: number, ctx: any) => {
                const label = ctx.chart.data.labels[ctx.dataIndex]
                return `${label}: ${value}`
              }
            }
          }
        }
      })
    }
    return () => { if (chartInstance.current) chartInstance.current.destroy() }
  }, [])

  return <div className="w-full h-full min-h-[300px]"><canvas ref={chartRef} /></div>
}

// 3. Labeled Pie Chart (labels inside slices)
export function LabeledPieChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) chartInstance.current.destroy()
      chartInstance.current = new Chart(chartRef.current, {
        type: "pie",
        data: sampleData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "right" },
            datalabels: {
              color: "#fff",
              font: { weight: "bold", size: 16 },
              align: "center",
              anchor: "center",
              formatter: (value: number, ctx: any) => {
                const label = ctx.chart.data.labels[ctx.dataIndex]
                return `${label}`
              }
            }
          }
        }
      })
    }
    return () => { if (chartInstance.current) chartInstance.current.destroy() }
  }, [])

  return <div className="w-full h-full min-h-[300px]"><canvas ref={chartRef} /></div>
} 