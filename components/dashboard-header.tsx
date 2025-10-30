"use client"

import type React from "react"

import { Search, Upload, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store"
import { useRouter } from "next/navigation"
import { useRef } from "react"

export function DashboardHeader() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { searchQuery, setSearchQuery, addUpload } = useStore()

  const handleLogout = () => {
    router.push("/login")
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        addUpload(file)
      })
    }
  }

  return (
    <header className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-secondary rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input ref={fileInputRef} type="file" multiple onChange={handleFileChange} className="hidden" />
          <Button
            onClick={handleUploadClick}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-lg"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={handleLogout}>
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
