"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { NetworkGraph } from "@/components/visualizations/network-graph"
import { ForceDirectedGraph } from "@/components/visualizations/force-directed-graph"
import { HierarchicalGraph } from "@/components/visualizations/hierarchical-graph"
import { ChartCard } from "@/components/visualizations/chart-card"
import { VerticalBarChart } from "@/components/visualizations/charts/bar-charts"
import { BasicLineChart } from "@/components/visualizations/charts/line-charts"
import { ChordDiagram } from "@/components/visualizations/charts/chord-diagram"
import { PieChart } from "@/components/visualizations/charts/pie-charts"
import { DoughnutChart } from "@/components/visualizations/charts/pie-charts"
import { PolarAreaChart } from "@/components/visualizations/charts/pie-charts"
import { HeatMap } from "@/components/visualizations/charts/heat-map"
import {
  DelayAnimationChart,
  DropAnimationChart,
  LoopAnimationChart,
  ProgressiveLineChart,
  ProgressiveLineEasingChart
} from "@/components/visualizations/charts/animated-charts"
import { AnimatedPieChart, CustomDataPieChart, LabeledPieChart } from "@/components/visualizations/charts/pie-charts"
import {
  GlobalTempChart,
  PopulationGrowthBar,
  CovidAreaChart,
  NobelPieChart,
  RenewableStackedBar,
  HorizontalBarChart,
  GroupedBarChart,
  RadarChartDemo,
  BubbleChartDemo,
  BoxPlotDemo,
  ViolinPlotDemo,
  ScatterPlotDemo,
  FunnelChartDemo,
  GaugeChartDemo,
  TreeMapDemo
} from "@/components/visualizations/demo-gallery"

export default function DashboardPage() {
  const [selectedGraph, setSelectedGraph] = useState<string | null>(null)

  const handleGraphClick = (graphId: string) => {
    setSelectedGraph(graphId)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Interactive Dashboard</h1>
        
        {/* Network Visualization Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Network Visualizations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ChartCard
              title="Basic Network Graph"
              description="A simple network graph showing connections between nodes"
              preview={<NetworkGraph />}
              fullView={<NetworkGraph />}
            />
            <ChartCard
              title="Force-Directed Graph"
              description="Interactive force-directed graph with physics simulation"
              preview={<ForceDirectedGraph />}
              fullView={<ForceDirectedGraph />}
            />
            <ChartCard
              title="Hierarchical Graph"
              description="Tree-like structure showing hierarchical relationships"
              preview={<HierarchicalGraph />}
              fullView={<HierarchicalGraph />}
            />
          </div>
        </section>

        {/* Popular Charts Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Popular Charts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ChartCard
              title="Vertical Bar Chart"
              description="Basic vertical bar chart for comparing values"
              preview={<VerticalBarChart />}
              fullView={<VerticalBarChart />}
            />
            <ChartCard
              title="Line Chart"
              description="Time series data visualization"
              preview={<BasicLineChart />}
              fullView={<BasicLineChart />}
            />
            <ChartCard
              title="Chord Diagram"
              description="Circular visualization of relationships"
              preview={<ChordDiagram />}
              fullView={<ChordDiagram />}
            />
          </div>
        </section>

        {/* Animated Charts Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Animated Charts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ChartCard
              title="Delay Animation"
              description="Line chart with delayed point animation"
              preview={<DelayAnimationChart />}
              fullView={<DelayAnimationChart />}
            />
            <ChartCard
              title="Drop Animation"
              description="Bar chart with drop (bounce) animation"
              preview={<DropAnimationChart />}
              fullView={<DropAnimationChart />}
            />
            <ChartCard
              title="Loop Animation"
              description="Line chart with looping animation"
              preview={<LoopAnimationChart />}
              fullView={<LoopAnimationChart />}
            />
            <ChartCard
              title="Progressive Line"
              description="Line chart with progressive drawing animation"
              preview={<ProgressiveLineChart />}
              fullView={<ProgressiveLineChart />}
            />
            <ChartCard
              title="Progressive Line With Easing"
              description="Line chart with progressive and easing animation"
              preview={<ProgressiveLineEasingChart />}
              fullView={<ProgressiveLineEasingChart />}
            />
          </div>
        </section>

        {/* Circular Charts Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Circular Charts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ChartCard
              title="Pie Chart"
              description="Basic pie chart for showing proportions"
              preview={<PieChart />}
              fullView={<PieChart />}
            />
            <ChartCard
              title="Animated Pie Chart"
              description="Pie chart with bounce animation (Chart.js)"
              preview={<AnimatedPieChart />}
              fullView={<AnimatedPieChart />}
            />
            <ChartCard
              title="Custom Data Pie Chart"
              description="Pie chart with custom data and colors (Chart.js)"
              preview={<CustomDataPieChart />}
              fullView={<CustomDataPieChart />}
            />
            <ChartCard
              title="Labeled Pie Chart"
              description="Pie chart with labels inside slices (Chart.js)"
              preview={<LabeledPieChart />}
              fullView={<LabeledPieChart />}
            />
            <ChartCard
              title="Doughnut Chart"
              description="Ring chart with center cutout"
              preview={<DoughnutChart />}
              fullView={<DoughnutChart />}
            />
            <ChartCard
              title="Polar Area Chart"
              description="Circular chart with varying radii"
              preview={<PolarAreaChart />}
              fullView={<PolarAreaChart />}
            />
          </div>
        </section>

        {/* Heat Map Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Heat Maps</h2>
          <div className="grid grid-cols-1 gap-6">
            <ChartCard
              title="Basic Heat Map"
              description="Color-coded matrix showing data density"
              preview={<HeatMap />}
              fullView={<HeatMap />}
            />
          </div>
        </section>

        {/* Demo Gallery Section: Scientific/Research Data Visualizations */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Demo Gallery: Scientific & Research Charts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ChartCard
              title="Global Temperature Change"
              description="Line chart (Chart.js) showing global temperature anomaly over time."
              preview={<GlobalTempChart />}
              fullView={<GlobalTempChart />}
            />
            <ChartCard
              title="Population Growth by Continent"
              description="Bar chart (Recharts) showing population growth by continent."
              preview={<PopulationGrowthBar />}
              fullView={<PopulationGrowthBar />}
            />
            <ChartCard
              title="COVID-19 Case Trends"
              description="Area chart (Chart.js) showing COVID-19 cases over time."
              preview={<CovidAreaChart />}
              fullView={<CovidAreaChart />}
            />
            <ChartCard
              title="Nobel Prize Winners by Country"
              description="Pie chart (Recharts) showing Nobel Prize winners by country."
              preview={<NobelPieChart />}
              fullView={<NobelPieChart />}
            />
            <ChartCard
              title="Renewable Energy Production"
              description="Stacked bar chart (Chart.js) showing renewable energy production by source."
              preview={<RenewableStackedBar />}
              fullView={<RenewableStackedBar />}
            />
            <ChartCard
              title="Horizontal Bar Chart"
              description="Horizontal bar chart (Chart.js) for comparing values across categories."
              preview={<HorizontalBarChart />}
              fullView={<HorizontalBarChart />}
            />
            <ChartCard
              title="Grouped Bar Chart"
              description="Grouped bar chart (Recharts) for comparing multiple series."
              preview={<GroupedBarChart />}
              fullView={<GroupedBarChart />}
            />
            <ChartCard
              title="Radar Chart"
              description="Radar chart (Chart.js) for multivariate data."
              preview={<RadarChartDemo />}
              fullView={<RadarChartDemo />}
            />
            <ChartCard
              title="Bubble Chart"
              description="Bubble chart (Chart.js) for 3D data visualization."
              preview={<BubbleChartDemo />}
              fullView={<BubbleChartDemo />}
            />
            <ChartCard
              title="Box Plot"
              description="Box plot (D3) for data distribution."
              preview={<BoxPlotDemo />}
              fullView={<BoxPlotDemo />}
            />
            <ChartCard
              title="Violin Plot"
              description="Violin plot (D3) for distribution shape."
              preview={<ViolinPlotDemo />}
              fullView={<ViolinPlotDemo />}
            />
            <ChartCard
              title="Scatter Plot"
              description="Scatter plot (Recharts) for correlation analysis."
              preview={<ScatterPlotDemo />}
              fullView={<ScatterPlotDemo />}
            />
            <ChartCard
              title="Funnel Chart"
              description="Funnel chart (Recharts) for process stages."
              preview={<FunnelChartDemo />}
              fullView={<FunnelChartDemo />}
            />
            <ChartCard
              title="Gauge Chart"
              description="Gauge chart (D3) for progress/performance."
              preview={<GaugeChartDemo />}
              fullView={<GaugeChartDemo />}
            />
            <ChartCard
              title="TreeMap"
              description="TreeMap (Recharts) for hierarchical data."
              preview={<TreeMapDemo />}
              fullView={<TreeMapDemo />}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}