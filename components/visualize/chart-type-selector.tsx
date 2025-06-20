"use client";

import { useState } from "react";
import { BarChart2, LineChart, PieChart, ScatterChart, Activity, BarChart, AreaChart, Cpu } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface ChartTypeSelectorProps {
  selectedChart: string;
  onSelectChart: (chartType: string) => void;
}

const chartTypes = {
  basic: [
    { id: "bar", name: "Bar Chart", icon: BarChart },
    { id: "line", name: "Line Chart", icon: LineChart },
    { id: "area", name: "Area Chart", icon: AreaChart },
    { id: "pie", name: "Pie Chart", icon: PieChart },
    { id: "scatter", name: "Scatter Plot", icon: ScatterChart },
  ],
  statistical: [
    { id: "histogram", name: "Histogram", icon: BarChart2 },
    { id: "boxplot", name: "Box Plot", icon: Activity },
    { id: "heatmap", name: "Heat Map", icon: Cpu },
  ],
  specialized: [
    { id: "radar", name: "Radar Chart", icon: Activity },
    { id: "treemap", name: "Tree Map", icon: Cpu },
    { id: "sankey", name: "Sankey Diagram", icon: Activity },
  ],
};

export function ChartTypeSelector({ selectedChart, onSelectChart }: ChartTypeSelectorProps) {
  const [activeCategory, setActiveCategory] = useState<"basic" | "statistical" | "specialized">("basic");
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h3 className="font-medium">Chart Types</h3>
      </div>
      
      <Tabs defaultValue="basic" value={activeCategory} onValueChange={(value) => setActiveCategory(value as any)} className="flex-1 flex flex-col">
        <div className="px-2 pt-2">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="statistical">Statistical</TabsTrigger>
            <TabsTrigger value="specialized">Specialized</TabsTrigger>
          </TabsList>
        </div>
        
        <ScrollArea className="flex-1 p-4">
          {Object.entries(chartTypes).map(([category, charts]) => (
            <TabsContent key={category} value={category} className="m-0">
              <div className="grid gap-2">
                {charts.map((chart) => {
                  const Icon = chart.icon;
                  return (
                    <button
                      key={chart.id}
                      onClick={() => onSelectChart(chart.id)}
                      className={cn(
                        "flex items-center gap-2 p-2 text-sm rounded-md transition-colors",
                        selectedChart === chart.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{chart.name}</span>
                    </button>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </ScrollArea>
      </Tabs>
    </div>
  );
}