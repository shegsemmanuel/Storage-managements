"use client"

import { Play, Mic, Music, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useStore } from "@/lib/store"
import { useState } from "react"
import { Input } from "@/components/ui/input"

interface MediaFile {
  id: string
  name: string
  size: string
  timestamp: string
  type: "video" | "audio" | "music"
}

const mediaFiles: MediaFile[] = [
  { id: "med1", name: "App School.vid", size: "2 GB", timestamp: "10:09pm, 10 Oct", type: "video" },
  { id: "med2", name: "BC company.audi", size: "2 GB", timestamp: "10:09pm, 10 Oct", type: "audio" },
  { id: "med3", name: "Because i love you.mp3", size: "15 MB", timestamp: "10:09pm, 10 Oct", type: "music" },
  { id: "med4", name: "CompanyANV.audi", size: "2 GB", timestamp: "10:09pm, 10 Oct", type: "audio" },
  { id: "med5", name: "company ABC.audi", size: "6 MB", timestamp: "10:09pm, 10 Oct", type: "audio" },
  { id: "med6", name: "My CV.vid", size: "2 GB", timestamp: "10:09pm, 10 Oct", type: "video" },
  { id: "med7", name: "My Jobs.flg", size: "2 GB", timestamp: "10:09pm, 10 Oct", type: "music" },
  { id: "med8", name: "Photoshop.audi", size: "2 GB", timestamp: "10:09pm, 10 Oct", type: "audio" },
]

export function MediaGrid() {
  const { searchQuery, deleteFile, downloadFile } = useStore()
  const [sortBy, setSortBy] = useState("date-newest")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState("")

  const getMediaIcon = (type: MediaFile["type"]) => {
    switch (type) {
      case "video":
        return <Play className="w-8 h-8 text-primary fill-primary" />
      case "audio":
        return <Mic className="w-8 h-8 text-[#56b8ff]" />
      case "music":
        return <Music className="w-8 h-8 text-[#3dd9b3]" />
    }
  }

  const filteredMedia = mediaFiles.filter((file) => file.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const sortedMedia = [...filteredMedia].sort((a, b) => {
    switch (sortBy) {
      case "date-newest":
        return b.timestamp.localeCompare(a.timestamp)
      case "date-oldest":
        return a.timestamp.localeCompare(b.timestamp)
      case "name-asc":
        return a.name.localeCompare(b.name)
      case "name-desc":
        return b.name.localeCompare(a.name)
      case "size-largest":
        return Number.parseFloat(b.size) - Number.parseFloat(a.size)
      case "size-smallest":
        return Number.parseFloat(a.size) - Number.parseFloat(b.size)
      default:
        return 0
    }
  })

  const handleRename = (id: string, currentName: string) => {
    setEditingId(id)
    setEditName(currentName)
  }

  const handleSaveRename = (id: string) => {
    if (editName.trim()) {
      console.log("[v0] Renaming file:", id, "to", editName)
    }
    setEditingId(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Media</h1>
          <p className="text-muted-foreground mt-1">Total: 12GB</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-newest">Date Created (newest)</SelectItem>
              <SelectItem value="date-oldest">Date Created (oldest)</SelectItem>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              <SelectItem value="size-largest">Size (largest)</SelectItem>
              <SelectItem value="size-smallest">Size (smallest)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sortedMedia.map((file) => (
          <div key={file.id} className="bg-background rounded-2xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                {getMediaIcon(file.type)}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => downloadFile(file.id)}>Download</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleRename(file.id, file.name)}>Rename</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => alert("Share functionality coming soon!")}>Share</DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => {
                      if (confirm(`Delete ${file.name}?`)) {
                        deleteFile(file.id)
                      }
                    }}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="space-y-1">
              {editingId === file.id ? (
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onBlur={() => handleSaveRename(file.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveRename(file.id)
                    if (e.key === "Escape") setEditingId(null)
                  }}
                  className="h-7 text-sm"
                  autoFocus
                />
              ) : (
                <p className="font-medium text-foreground truncate">{file.name}</p>
              )}
              <p className="text-sm text-muted-foreground">{file.timestamp}</p>
              <p className="text-sm font-medium text-foreground">{file.size}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
