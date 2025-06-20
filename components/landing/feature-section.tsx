import { BarChart3, LineChart, PieChart, UploadCloud, Database, Download, Palette, Smartphone } from "lucide-react";

export function FeatureSection() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="w-full px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Powerful Features for Data Scientists
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Everything you need to visualize and understand your research data.
            </p>
          </div>
        </div>
        <div className="mx-auto grid w-full grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center space-y-2 rounded-lg p-4 transition-all hover:bg-accent">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <UploadCloud className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Easy Upload</h3>
            <p className="text-center text-muted-foreground">
              Drag & drop CSV or Excel files to start visualizing immediately.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg p-4 transition-all hover:bg-accent">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">40+ Chart Types</h3>
            <p className="text-center text-muted-foreground">
              Bar, line, scatter, pie, and many more specialized chart types.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg p-4 transition-all hover:bg-accent">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Database className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Save Projects</h3>
            <p className="text-center text-muted-foreground">
              Store your visualizations and access them from anywhere.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg p-4 transition-all hover:bg-accent">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Download className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Export Options</h3>
            <p className="text-center text-muted-foreground">
              Download as PNG, SVG, or PDF for publications and presentations.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg p-4 transition-all hover:bg-accent">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Palette className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Customizable</h3>
            <p className="text-center text-muted-foreground">
              Adjust colors, labels, and styles to match your needs.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg p-4 transition-all hover:bg-accent">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <PieChart className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Demo Datasets</h3>
            <p className="text-center text-muted-foreground">
              Explore sample datasets to learn visualization techniques.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg p-4 transition-all hover:bg-accent">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <LineChart className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Interactive</h3>
            <p className="text-center text-muted-foreground">
              Zoom, pan, and explore your data with interactive charts.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg p-4 transition-all hover:bg-accent">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Smartphone className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Responsive</h3>
            <p className="text-center text-muted-foreground">
              Works perfectly on any device, from desktop to mobile.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}