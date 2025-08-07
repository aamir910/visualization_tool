"use client"

import { useEffect, useRef } from "react"
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  BarController,
  BarElement,
  Tooltip,
  Legend
} from "chart.js"

// Register Chart.js components
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  BarController,
  BarElement,
  Tooltip,
  Legend
)

const lineData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Sales",
      data: [12, 19, 3, 5, 2, 3],
      borderColor: "rgba(75,192,192,1)",
      backgroundColor: "rgba(75,192,192,0.2)",
      fill: true,
      tension: 0.4
    }
  ]
}

// Delay Animation
export function DelayAnimationChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) chartInstance.current.destroy()
      chartInstance.current = new Chart(chartRef.current, {
        type: "line",
        data: lineData,
        options: {
          responsive: true,
          animation: {
            delay: (ctx) => ctx.dataIndex * 300
          },
          plugins: {
            legend: { display: true },
            tooltip: { enabled: true }
          }
        }
      })
    }
    return () => { if (chartInstance.current) chartInstance.current.destroy() }
  }, [])

  return <div className="w-full h-full min-h-[300px]"><canvas ref={chartRef} /></div>
}

// Drop Animation (simulate by animating y property)
export function DropAnimationChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) chartInstance.current.destroy()
      chartInstance.current = new Chart(chartRef.current, {
        type: "bar",
        data: lineData,
        options: {
          responsive: true,
          animation: {
            y: {
              duration: 1200,
              easing: "easeOutBounce"
            }
          } as any, // Type assertion to bypass TypeScript error
          plugins: {
            legend: { display: false },
            tooltip: { enabled: true }
          }
        }
      })
    }
    return () => { if (chartInstance.current) chartInstance.current.destroy() }
  }, [])

  return <div className="w-full h-full min-h-[300px]"><canvas ref={chartRef} /></div>
}

// Loop Animation
export function LoopAnimationChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) chartInstance.current.destroy()
      chartInstance.current = new Chart(chartRef.current, {
        type: "line",
        data: lineData,
        options: {
          responsive: true,
          animation: {
            duration: 2000,
            loop: true
          },
          plugins: {
            legend: { display: true },
            tooltip: { enabled: true }
          }
        }
      })
    }
    return () => { if (chartInstance.current) chartInstance.current.destroy() }
  }, [])

  return <div className="w-full h-full min-h-[300px]"><canvas ref={chartRef} /></div>
}

// Progressive Line Animation
export function ProgressiveLineChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) chartInstance.current.destroy()
      chartInstance.current = new Chart(chartRef.current, {
        type: "line",
        data: lineData,
        options: {
          responsive: true,
          animation: {
            x: {
              type: "number",
              easing: "linear",
              duration: 1000,
              from: NaN, // the point is initially skipped
              delay(ctx: any) {
                if (ctx.type !== 'data' || ctx.xStarted) return 0
                ctx.xStarted = true
                return ctx.index * 300
              }
            },
            y: {
              type: "number",
              easing: "linear",
              duration: 1000,
              from: NaN,
              delay(ctx: any) {
                if (ctx.type !== 'data' || ctx.yStarted) return 0
                ctx.yStarted = true
                return ctx.index * 300
              }
            }
          } as any, // Type assertion to bypass TypeScript error
          plugins: {
            legend: { display: true },
            tooltip: { enabled: true }
          }
        }
      })
    }
    return () => { if (chartInstance.current) chartInstance.current.destroy() }
  }, [])

  return <div className="w-full h-full min-h-[300px]"><canvas ref={chartRef} /></div>
}

// Progressive Line With Easing
export function ProgressiveLineEasingChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) chartInstance.current.destroy()
      chartInstance.current = new Chart(chartRef.current, {
        type: "line",
        data: lineData,
        options: {
          responsive: true,
          animation: {
            x: {
              type: "number",
              easing: "easeInOutElastic",
              duration: 1200,
              from: NaN,
              delay(ctx: any) {
                if (ctx.type !== 'data' || ctx.xStarted) return 0
                ctx.xStarted = true
                return ctx.index * 350
              }
            },
            y: {
              type: "number",
              easing: "easeInOutElastic",
              duration: 1200,
              from: NaN,
              delay(ctx: any) {
                if (ctx.type !== 'data' || ctx.yStarted) return 0
                ctx.yStarted = true
                return ctx.index * 350
              }
            }
          } as any, // Type assertion to bypass TypeScript error
          plugins: {
            legend: { display: true },
            tooltip: { enabled: true }
          }
        }
      })
    }
    return () => { if (chartInstance.current) chartInstance.current.destroy() }
  }, [])

  return <div className="w-full h-full min-h-[300px]"><canvas ref={chartRef} /></div>
}