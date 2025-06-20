import { Navbar } from "@/components/layout/navbar";

interface VisualizationShellProps {
  children: React.ReactNode;
}

export function VisualizationShell({ children }: VisualizationShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-6 md:py-10">{children}</main>
    </div>
  );
}