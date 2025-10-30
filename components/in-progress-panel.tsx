"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useStore } from "@/lib/store"

const getFileIcon = (type: string) => {
  const icons: Record<string, string> = {
    figma: "🎨",
    sketch: "💎",
    image: "🖼️",
    document: "📄",
  }
  return icons[type] || "📄"
}

export function InProgressPanel() {
  const { uploads, removeUpload } = useStore()

  if (uploads.length === 0) {
    return null
  }

  return (
    <div className="bg-background rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-bold text-foreground mb-6">In Progress</h2>
      <div className="space-y-4">
        {uploads.map((upload) => (
          <div key={upload.id} className="flex items-start gap-3">
            <div
              className={`w-10 h-10 rounded-lg ${upload.color} flex items-center justify-center text-xl flex-shrink-0`}
            >
              {getFileIcon(upload.icon)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">{upload.name}</p>
                  <p className="text-xs text-muted-foreground">{upload.timeRemaining}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 flex-shrink-0"
                  onClick={() => removeUpload(upload.id)}
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
              <Progress value={upload.progress} className="h-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
