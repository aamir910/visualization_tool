interface DashboardShellProps {
  children: React.ReactNode;
}

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 w-full px-4 md:px-6 py-6 md:py-10">{children}</main>
      <Footer />
    </div>
  );
}