"use client";

import Link from "next/link";
import { BarChart3, ExternalLink, LineChart, PieChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// This would normally come from your database
const mockVisualizations = [
  {
    id: "viz-1",
    title: "Monthly Sales Analysis",
    date: "2 days ago",
    type: "bar",
  },
  {
    id: "viz-2",
    title: "Customer Growth Trends",
    date: "1 week ago",
    type: "line",
  },
  {
    id: "viz-3",
    title: "Product Category Distribution",
    date: "2 weeks ago",
    type: "pie",
  },
];

export function RecentVisualizationsCard() {
  const getChartIcon = (type: string) => {
    switch (type) {
      case "bar":
        return <BarChart3 className="h-4 w-4 text-muted-foreground" />;
      case "line":
        return <LineChart className="h-4 w-4 text-muted-foreground" />;
      case "pie":
        return <PieChart className="h-4 w-4 text-muted-foreground" />;
      default:
        return <BarChart3 className="h-4 w-4 text-muted-foreground" />;
    }
  };
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Visualizations</CardTitle>
        <CardDescription>
          Your recently created visualizations
        </CardDescription>
      </CardHeader>
      <CardContent>
        {mockVisualizations.length > 0 ? (
          <div className="space-y-4">
            {mockVisualizations.map((viz) => (
              <div
                key={viz.id}
                className="flex items-center justify-between rounded-lg border p-3 text-sm transition-colors hover:bg-accent"
              >
                <div className="flex items-center gap-3">
                  {getChartIcon(viz.type)}
                  <div>
                    <p className="font-medium">{viz.title}</p>
                    <p className="text-xs text-muted-foreground">{viz.date}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/visualize/${viz.id}`}>
                    <ExternalLink className="h-4 w-4" />
                    <span className="sr-only">Open visualization</span>
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <p className="text-muted-foreground mb-4">
              You haven't created any visualizations yet.
            </p>
            <Button asChild>
              <Link href="/dashboard/upload">Create Your First Visualization</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}