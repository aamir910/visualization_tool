"use client";

import Link from "next/link";
import { Database, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// This would normally come from your database or API
const demoDatasets = [
  {
    id: "demo-1",
    title: "Sales Data (2020-2023)",
    records: "2,450 rows",
  },
  {
    id: "demo-2",
    title: "Global Temperature Changes",
    records: "1,280 rows",
  },
  {
    id: "demo-3",
    title: "Population Demographics",
    records: "950 rows",
  },
];

export function DemoDataCard() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Demo Datasets</CardTitle>
        <CardDescription>
          Explore sample datasets to test visualizations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {demoDatasets.map((dataset) => (
            <div
              key={dataset.id}
              className="flex items-center justify-between rounded-lg border p-3 text-sm transition-colors hover:bg-accent"
            >
              <div className="flex items-center gap-3">
                <Database className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{dataset.title}</p>
                  <p className="text-xs text-muted-foreground">{dataset.records}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" asChild>
                <Link href={`/visualize/demo/${dataset.id}`}>
                  <ExternalLink className="h-4 w-4" />
                  <span className="sr-only">Explore dataset</span>
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}