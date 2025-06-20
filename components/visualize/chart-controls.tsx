"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ColorPicker } from "@/components/visualize/color-picker";

interface ChartControlsProps {
  chartType: string;
}

export function ChartControls({ chartType }: ChartControlsProps) {
  const [chartTitle, setChartTitle] = useState("Sales Data");
  const [showLegend, setShowLegend] = useState(true);
  const [chartHeight, setChartHeight] = useState(400);
  
  return (
    <div className="bg-card border rounded-lg p-4">
      <h3 className="text-lg font-medium mb-4">Chart Controls</h3>
      
      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="axes">Axes & Labels</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="chart-title">Chart Title</Label>
            <Input
              id="chart-title"
              value={chartTitle}
              onChange={(e) => setChartTitle(e.target.value)}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="data-source">Data Source</Label>
            <Select defaultValue="all">
              <SelectTrigger id="data-source">
                <SelectValue placeholder="Select columns" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All columns</SelectItem>
                <SelectItem value="sales">Sales only</SelectItem>
                <SelectItem value="custom">Custom selection</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="show-legend">Show Legend</Label>
            <Switch
              id="show-legend"
              checked={showLegend}
              onCheckedChange={setShowLegend}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="axes" className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="x-axis">X-Axis</Label>
            <Select defaultValue="name">
              <SelectTrigger id="x-axis">
                <SelectValue placeholder="Select X-Axis" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="category">Category</SelectItem>
                <SelectItem value="date">Date</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="y-axis">Y-Axis</Label>
            <Select defaultValue="value">
              <SelectTrigger id="y-axis">
                <SelectValue placeholder="Select Y-Axis" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="value">Value</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="quantity">Quantity</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="x-axis-label">X-Axis Label</Label>
            <Input id="x-axis-label" placeholder="X-Axis Label" />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="y-axis-label">Y-Axis Label</Label>
            <Input id="y-axis-label" placeholder="Y-Axis Label" />
          </div>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4">
          <div className="grid gap-2">
            <Label>Chart Height</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[chartHeight]}
                min={200}
                max={800}
                step={10}
                onValueChange={(values) => setChartHeight(values[0])}
              />
              <span className="text-sm text-muted-foreground w-12">{chartHeight}px</span>
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label>Color Scheme</Label>
            <div className="flex flex-wrap gap-2">
              <ColorPicker className="bg-chart-1" />
              <ColorPicker className="bg-chart-2" />
              <ColorPicker className="bg-chart-3" />
              <ColorPicker className="bg-chart-4" />
              <ColorPicker className="bg-chart-5" />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="animation">Animation Duration (ms)</Label>
            <Input
              id="animation"
              type="number"
              defaultValue="1000"
              min="0"
              max="2000"
              step="100"
            />
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 flex justify-end gap-2">
        <Button variant="outline">Reset</Button>
        <Button>Apply Changes</Button>
      </div>
    </div>
  );
}