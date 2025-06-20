"use client";

import { useState } from "react";
import { VisualizationHeader } from "@/components/visualize/visualization-header";
import { VisualizationShell } from "@/components/visualize/visualization-shell";
import { ChartTypeSelector } from "@/components/visualize/chart-type-selector";
import { DataPreview } from "@/components/visualize/data-preview";
import { ChartPreview } from "@/components/visualize/chart-preview";
import { ChartControls } from "@/components/visualize/chart-controls";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function VisualizePage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("chart");
  const [selectedChartType, setSelectedChartType] = useState("bar");

  return (
    <VisualizationShell>
      <VisualizationHeader
        heading="Visualization"
        text="Customize your visualization and explore your data."
        id={params.id}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[calc(100vh-12rem)]">
        <div className="lg:col-span-1 bg-card rounded-lg shadow">
          <ChartTypeSelector 
            selectedChart={selectedChartType} 
            onSelectChart={setSelectedChartType} 
          />
        </div>
        
        <div className="lg:col-span-3 bg-card rounded-lg shadow overflow-hidden">
          <Tabs defaultValue="chart" value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <div className="px-4 pt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="chart">Chart</TabsTrigger>
                <TabsTrigger value="data">Data</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="chart" className="flex-grow p-4 overflow-auto">
              <ChartPreview chartType={selectedChartType} />
              <ChartControls chartType={selectedChartType} />
            </TabsContent>
            
            <TabsContent value="data" className="flex-grow p-4 overflow-auto">
              <DataPreview />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </VisualizationShell>
  );
}