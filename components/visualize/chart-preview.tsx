"use client";

import { BarChart as RechartsBarChart, CartesianGrid, Legend, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer, Line, LineChart, PieChart, Pie, Cell } from "recharts";

// This would normally be fetched from the server
const mockData = [
  { name: "Jan", value: 1200 },
  { name: "Feb", value: 1900 },
  { name: "Mar", value: 1500 },
  { name: "Apr", value: 2400 },
  { name: "May", value: 1800 },
  { name: "Jun", value: 2800 },
  { name: "Jul", value: 2200 },
  { name: "Aug", value: 2000 },
];

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

interface ChartPreviewProps {
  chartType: string;
}

export function ChartPreview({ chartType }: ChartPreviewProps) {
  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsBarChart data={mockData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="hsl(var(--chart-1))" name="Value" />
            </RechartsBarChart>
          </ResponsiveContainer>
        );
      case "line":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={mockData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="hsl(var(--chart-2))" activeDot={{ r: 8 }} name="Value" />
            </LineChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={mockData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="hsl(var(--chart-1))"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {mockData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`hsl(${COLORS[index % COLORS.length]})`} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return (
          <div className="flex items-center justify-center h-80 bg-muted/20 rounded-lg">
            <p className="text-muted-foreground">Select a chart type</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-card border rounded-lg p-4 mb-4">
      <h3 className="text-lg font-medium mb-4">Chart Preview</h3>
      {renderChart()}
    </div>
  );
}