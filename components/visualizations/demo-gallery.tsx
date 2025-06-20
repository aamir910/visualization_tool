// 1. GlobalTempChart: Line chart (Chart.js) - Global temperature anomaly
import { useEffect, useRef } from "react"
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, BarController, BarElement, RadarController, RadialLinearScale, BubbleController, ArcElement, PieController, DoughnutController, PolarAreaController } from "chart.js"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as RTooltip, Legend as RLegend, PieChart as RPieChart, Pie, Cell, AreaChart, Area, ScatterChart, Scatter, Treemap } from "recharts"

// Register all Chart.js controllers and elements needed for all chart types
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  BarController,
  BarElement,
  RadarController,
  RadialLinearScale,
  BubbleController,
  ArcElement,
  PieController,
  DoughnutController,
  PolarAreaController
)

// 1. GlobalTempChart
// Line chart (Chart.js) showing global temperature anomaly (°C) from 1880 to 2020
export function GlobalTempChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  const data = {
    labels: ["1880", "1900", "1920", "1940", "1960", "1980", "2000", "2020"],
    datasets: [
      {
        label: "Temp Anomaly (°C)",
        data: [-0.2, -0.1, 0.0, 0.05, 0.1, 0.2, 0.4, 1.0],
        borderColor: "#e67e22",
        backgroundColor: "rgba(230, 126, 34, 0.2)",
        fill: true,
        tension: 0.4
      }
    ]
  }
  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) chartInstance.current.destroy()
      chartInstance.current = new Chart(chartRef.current, {
        type: "line",
        data,
        options: {
          responsive: true,
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

// 2. PopulationGrowthBar: Bar chart (Recharts) - Population by continent
const popData = [
  { continent: "Asia", population: 4641 },
  { continent: "Africa", population: 1340 },
  { continent: "Europe", population: 747 },
  { continent: "North America", population: 592 },
  { continent: "South America", population: 430 },
  { continent: "Oceania", population: 43 }
]
export function PopulationGrowthBar() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={popData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <XAxis dataKey="continent" />
        <YAxis label={{ value: "Millions", angle: -90, position: "insideLeft" }} />
        <RTooltip />
        <RLegend />
        <Bar dataKey="population" fill="#3498db" />
      </BarChart>
    </ResponsiveContainer>
  )
}

// 3. CovidAreaChart: Area chart (Chart.js) - COVID-19 cases over time
export function CovidAreaChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  const data = {
    labels: ["Jan 2020", "Apr 2020", "Jul 2020", "Oct 2020", "Jan 2021", "Apr 2021", "Jul 2021", "Oct 2021"],
    datasets: [
      {
        label: "Cases (millions)",
        data: [0, 2, 12, 40, 90, 130, 180, 250],
        borderColor: "#c0392b",
        backgroundColor: "rgba(192, 57, 43, 0.2)",
        fill: true,
        tension: 0.4
      }
    ]
  }
  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) chartInstance.current.destroy()
      chartInstance.current = new Chart(chartRef.current, {
        type: "line",
        data,
        options: {
          responsive: true,
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

// 4. NobelPieChart: Pie chart (Recharts) - Nobel Prize winners by country
const nobelData = [
  { country: "USA", winners: 383 },
  { country: "UK", winners: 132 },
  { country: "Germany", winners: 108 },
  { country: "France", winners: 70 },
  { country: "Sweden", winners: 32 }
]
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD"]
export function NobelPieChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RPieChart>
        <Pie data={nobelData} dataKey="winners" nameKey="country" cx="50%" cy="50%" outerRadius={100} label>
          {nobelData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <RLegend />
        <RTooltip />
      </RPieChart>
    </ResponsiveContainer>
  )
}

// 5. RenewableStackedBar: Stacked bar chart (Chart.js) - Renewable energy production
export function RenewableStackedBar() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  const data = {
    labels: ["2015", "2016", "2017", "2018", "2019", "2020"],
    datasets: [
      {
        label: "Solar",
        data: [120, 150, 180, 210, 250, 300],
        backgroundColor: "#f1c40f"
      },
      {
        label: "Wind",
        data: [200, 220, 250, 270, 300, 350],
        backgroundColor: "#2980b9"
      },
      {
        label: "Hydro",
        data: [300, 310, 320, 330, 340, 350],
        backgroundColor: "#27ae60"
      }
    ]
  }
  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) chartInstance.current.destroy()
      chartInstance.current = new Chart(chartRef.current, {
        type: "bar",
        data,
        options: {
          responsive: true,
          plugins: {
            legend: { display: true },
            tooltip: { enabled: true }
          },
          scales: {
            x: { stacked: true },
            y: { stacked: true }
          }
        }
      })
    }
    return () => { if (chartInstance.current) chartInstance.current.destroy() }
  }, [])
  return <div className="w-full h-full min-h-[300px]"><canvas ref={chartRef} /></div>
}

// HorizontalBarChart (Chart.js)
// Type: Horizontal Bar Chart | Library: Chart.js | Use: Compare values across categories
export function HorizontalBarChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) chartInstance.current.destroy()
      chartInstance.current = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: ['A', 'B', 'C', 'D'],
          datasets: [{
            label: 'Value',
            data: [12, 19, 3, 5],
            backgroundColor: '#8e44ad'
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          plugins: { legend: { display: false } }
        }
      })
    }
    return () => { if (chartInstance.current) chartInstance.current.destroy() }
  }, [])
  return <div className="w-full h-full min-h-[200px]"><canvas ref={chartRef} /></div>
}

// GroupedBarChart (Recharts)
// Type: Grouped Bar Chart | Library: Recharts | Use: Compare multiple series
const groupedBarData = [
  { name: '2019', uv: 4000, pv: 2400 },
  { name: '2020', uv: 3000, pv: 1398 },
  { name: '2021', uv: 2000, pv: 9800 },
  { name: '2022', uv: 2780, pv: 3908 }
]
export function GroupedBarChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={groupedBarData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <RTooltip />
        <RLegend />
        <Bar dataKey="uv" fill="#8884d8" />
        <Bar dataKey="pv" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  )
}

// RadarChart (Chart.js)
// Type: Radar Chart | Library: Chart.js | Use: Show multivariate data
export function RadarChartDemo() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) chartInstance.current.destroy()
      chartInstance.current = new Chart(chartRef.current, {
        type: 'radar',
        data: {
          labels: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency'],
          datasets: [{
            label: 'Car A',
            data: [65, 59, 90, 81, 56],
            backgroundColor: 'rgba(46, 204, 113, 0.2)',
            borderColor: '#27ae60'
          }]
        },
        options: { responsive: true }
      })
    }
    return () => { if (chartInstance.current) chartInstance.current.destroy() }
  }, [])
  return <div className="w-full h-full min-h-[200px]"><canvas ref={chartRef} /></div>
}

// BubbleChart (Chart.js)
// Type: Bubble Chart | Library: Chart.js | Use: Show 3D data (x, y, size)
export function BubbleChartDemo() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) chartInstance.current.destroy()
      chartInstance.current = new Chart(chartRef.current, {
        type: 'bubble',
        data: {
          datasets: [{
            label: 'Bubbles',
            data: [
              { x: 20, y: 30, r: 15 },
              { x: 40, y: 10, r: 10 },
              { x: 25, y: 20, r: 8 }
            ],
            backgroundColor: '#e74c3c'
          }]
        },
        options: { responsive: true }
      })
    }
    return () => { if (chartInstance.current) chartInstance.current.destroy() }
  }, [])
  return <div className="w-full h-full min-h-[200px]"><canvas ref={chartRef} /></div>
}

// BoxPlot (D3)
// Type: Box Plot | Library: D3 | Use: Show distribution of data
export function BoxPlotDemo() {
  // Placeholder: Box plot with D3 would be implemented here
  return <div className="w-full h-full min-h-[200px] flex items-center justify-center text-gray-500">Box Plot (D3) - Placeholder</div>
}

// ViolinPlot (D3)
// Type: Violin Plot | Library: D3 | Use: Show distribution shape
export function ViolinPlotDemo() {
  // Placeholder: Violin plot with D3 would be implemented here
  return <div className="w-full h-full min-h-[200px] flex items-center justify-center text-gray-500">Violin Plot (D3) - Placeholder</div>
}

// ScatterPlot (Recharts)
// Type: Scatter Plot | Library: Recharts | Use: Show correlation between variables
const scatterData = [
  { x: 10, y: 30 },
  { x: 20, y: 20 },
  { x: 30, y: 50 },
  { x: 40, y: 40 }
]
export function ScatterPlotDemo() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <ScatterChart>
        <XAxis dataKey="x" type="number" />
        <YAxis dataKey="y" type="number" />
        <Scatter data={scatterData} fill="#ff7300" />
        <RTooltip />
      </ScatterChart>
    </ResponsiveContainer>
  )
}

// FunnelChart (Recharts)
// Type: Funnel Chart | Library: Recharts | Use: Show stages in a process
export function FunnelChartDemo() {
  // Placeholder: Funnel chart with Recharts would be implemented here
  return <div className="w-full h-full min-h-[200px] flex items-center justify-center text-gray-500">Funnel Chart (Recharts) - Placeholder</div>
}

// GaugeChart (D3)
// Type: Gauge Chart | Library: D3 | Use: Show progress or performance
export function GaugeChartDemo() {
  // Placeholder: Gauge chart with D3 would be implemented here
  return <div className="w-full h-full min-h-[200px] flex items-center justify-center text-gray-500">Gauge Chart (D3) - Placeholder</div>
}

// TreeMap (Recharts)
// Type: TreeMap | Library: Recharts | Use: Show hierarchical data
const treeMapData = [
  { name: 'A', size: 400 },
  { name: 'B', size: 300 },
  { name: 'C', size: 300 },
  { name: 'D', size: 200 }
]
export function TreeMapDemo() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <Treemap data={treeMapData} dataKey="size" stroke="#fff" fill="#8884d8" />
    </ResponsiveContainer>
  )
} 