"use client";

import { cn } from "@/lib/utils";

interface ColorPickerProps {
  className?: string;
}

export function ColorPicker({ className }: ColorPickerProps) {
  return (
    <button
      type="button"
      className={cn(
        "h-6 w-6 rounded-full border border-border hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        className
      )}
    />
  );
}