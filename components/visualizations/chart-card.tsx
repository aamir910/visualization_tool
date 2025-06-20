"use client"

import { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface ChartCardProps {
  title: string
  description: string
  preview: ReactNode
  fullView: ReactNode
  onTryDemo?: () => void
  requiresAuth?: boolean
}

export function ChartCard({
  title,
  description,
  preview,
  fullView,
  onTryDemo,
  requiresAuth = false,
}: ChartCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
          {preview}
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex-1">
                View Demo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl h-[80vh]">
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
              </DialogHeader>
              <div className="flex-1 overflow-auto">
                {fullView}
              </div>
            </DialogContent>
          </Dialog>
          <Button 
            className="flex-1"
            onClick={onTryDemo}
          >
            Try Demo
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 