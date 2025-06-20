"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

// This would normally be fetched from the server
const mockData = [
  { id: 1, product: "Laptop", category: "Electronics", sales: 1245, month: "January" },
  { id: 2, product: "Smartphone", category: "Electronics", sales: 2150, month: "January" },
  { id: 3, product: "Headphones", category: "Electronics", sales: 820, month: "January" },
  { id: 4, product: "Monitor", category: "Electronics", sales: 450, month: "January" },
  { id: 5, product: "Keyboard", category: "Electronics", sales: 320, month: "January" },
  { id: 6, product: "Laptop", category: "Electronics", sales: 1300, month: "February" },
  { id: 7, product: "Smartphone", category: "Electronics", sales: 2300, month: "February" },
  { id: 8, product: "Headphones", category: "Electronics", sales: 900, month: "February" },
  { id: 9, product: "Monitor", category: "Electronics", sales: 520, month: "February" },
  { id: 10, product: "Keyboard", category: "Electronics", sales: 380, month: "February" },
];

export function DataPreview() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center mb-4 gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search data..."
            className="pl-8"
          />
        </div>
        <Button variant="outline" size="sm">
          Filter
        </Button>
        <Button variant="outline" size="sm">
          Sort
        </Button>
      </div>
      
      <ScrollArea className="border rounded-md h-[500px]">
        <Table>
          <TableHeader className="sticky top-0 bg-background">
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Month</TableHead>
              <TableHead className="text-right">Sales</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockData.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.id}</TableCell>
                <TableCell>{row.product}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.month}</TableCell>
                <TableCell className="text-right">{row.sales}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}