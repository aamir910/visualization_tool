import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChartDemo } from "@/components/charts/chart-demo";

export function DemoSection() {
  return (
    <section className="py-16">
      <div className="w-full px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              See DataViz in Action
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore interactive demos with sample datasets.
            </p>
          </div>
        </div>
        
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="group relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="p-4">
              <h3 className="text-xl font-bold">Bar Chart</h3>
              <p className="text-sm text-muted-foreground">
                Compare values across different categories.
              </p>
            </div>
            <div className="aspect-video overflow-hidden rounded-md">
              <ChartDemo type="bar" />
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="p-4">
              <h3 className="text-xl font-bold">Line Chart</h3>
              <p className="text-sm text-muted-foreground">
                Show trends over continuous intervals.
              </p>
            </div>
            <div className="aspect-video overflow-hidden rounded-md">
              <ChartDemo type="line" />
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="p-4">
              <h3 className="text-xl font-bold">Pie Chart</h3>
              <p className="text-sm text-muted-foreground">
                Display proportional data as slices of a whole.
              </p>
            </div>
            <div className="aspect-video overflow-hidden rounded-md">
              <ChartDemo type="pie" />
            </div>
          </div>
        </div>
        
        <div className="mt-12 flex justify-center">
          <Button asChild size="lg">
            <Link href="/dashboard">Try With Your Data</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}