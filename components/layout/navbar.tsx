"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/mode-toggle";
import { BarChart2, Database, Home, LineChart, PieChart } from "lucide-react";

export function Navbar() {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserName() {
      try {
        const response = await fetch("/api/auth/get-user");
        if (response.ok) {
          const data = await response.json();
          setUserName(data.name || null);
        } else {
          setUserName(null);
        }
      } catch (error) {
        console.error("Failed to fetch user name:", error);
        setUserName(null);
      }
    }
    fetchUserName();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUserName(null);
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart2 className="h-6 w-6" />
          <span className="text-xl font-bold">DataViz</span>
        </div>
        
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Features</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                  <ListItem
                    title="Chart Library"
                    href="/features/charts"
                    icon={<LineChart className="h-4 w-4 mr-2" />}
                  >
                    40+ chart types for all your data visualization needs
                  </ListItem>
                  <ListItem
                    title="Data Management"
                    href="/features/data"
                    icon={<Database className="h-4 w-4 mr-2" />}
                  >
                    Import, transform and manage your datasets
                  </ListItem>
                  <ListItem
                    title="Interactive Dashboards"
                    href="/features/dashboards"
                    icon={<PieChart className="h-4 w-4 mr-2" />}
                  >
                    Create beautiful interactive dashboards
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/dashboard" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Dashboard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">
            {userName ? `Welcome, ${userName}` : "Welcome, Guest"}
          </span>
          <ModeToggle />
          {userName ? (
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button asChild variant="outline">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center text-sm font-medium leading-none">
            {icon}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";