import Link from "next/link";
import { ArrowRight, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="w-full px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Powerful Data Visualization for Scientists
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Create beautiful visualizations from your data. Upload CSV or Excel files and generate 40+ different types of graphs with ease.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/dashboard">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="/demo">Try Demo</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <BarChart2 className="h-32 w-32 text-primary" />
              </div>
              <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                <p className="text-sm font-medium">Data at your fingertips</p>
                <p className="text-xs text-muted-foreground">40+ chart types</p>
              </div>
              <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                <p className="text-sm font-medium">Easy Data Import</p>
                <p className="text-xs text-muted-foreground">CSV & Excel Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}