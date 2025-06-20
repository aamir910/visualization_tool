"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function FileUploadCard() {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    // Here you would handle the file upload
    const files = e.dataTransfer.files;
    console.log("Files dropped:", files);
    // Process files
  };
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Upload Data</CardTitle>
        <CardDescription>
          Upload CSV or Excel files to create visualizations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            isDragging 
              ? "border-primary bg-primary/5" 
              : "border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">Drag & Drop Files</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Supports CSV and Excel files up to 10MB
          </p>
          <Button variant="secondary" className="mx-auto">
            Browse Files
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              accept=".csv,.xlsx,.xls"
              onChange={(e) => {
                const files = e.target.files;
                if (files) {
                  console.log("Files selected:", files);
                  // Process files
                }
              }}
            />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}