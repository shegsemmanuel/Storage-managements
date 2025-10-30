"use client"

import { FileQuestion, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useStore } from "@/lib/store"
import { useState } from "react"
import { Input } from "@/components/ui/input"

const files = [
  { id: "oth1", name: "App School.cc", size: "2 GB", timestamp: "10:09pm, 10 Oct" },
  { id: "oth2", name: "BC company.ddr", size: "2 GB", timestamp: "10:09pm, 10 Oct" },
  { id: "oth3", name: "Because i love you.dft", size: "15 MB", timestamp: "10:09pm, 10 Oct" },
  { id: "oth4", name: "CompanyANV.cc", size: "2 GB", timestamp: "10:09pm, 10 Oct" },
  { id: "oth5", name: "company ABC.cc", size: "6 MB", timestamp: "10:09pm, 10 Oct" },
  { id: "oth6", name: "My CV.dft", size: "2 GB", timestamp: "10:09pm, 10 Oct" },
  { id: "oth7", name: "My Jobs.cc", size: "2 GB", timestamp: "10:09pm, 10 Oct" },
  { id: "oth8", name: "Photoshop.cc", size: "2 GB", timestamp: "10:09pm, 10 Oct" },
  { id: "oth9", name: "Pig Pig Pig.cc", size: "2 GB", timestamp: "10:09pm, 10 Oct" },
  { id: "oth10", name: "system.sdr", size: "2 GB", timestamp: "10:09pm, 10 Oct" },
  { id: "oth11", name: "school.ddr", size: "15 MB", timestamp: "10:09pm, 10 Oct" },
  { id: "oth12", name: "Water.ddr", size: "2 GB", timestamp: "10:09pm, 10 Oct" },
]

export function OthersGrid() {
  const { searchQuery, deleteFile, downloadFile } = useStore()
  const [sortBy, setSortBy] = useState("date-newest")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState("")

  const filteredFiles = files.filter((file) => file.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const sortedFiles = [...filteredFiles].sort((a, b) => {
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
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Others</h1>
          <p className="text-muted-foreground mt-1">Total: 12GB</p>
        </div>
        <div className="flex items-center gap-3">
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
        {sortedFiles.map((file) => (
          <div key={file.id} className="bg-background rounded-2xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <div className="w-10 h-12 bg-[#6295f2] rounded-md flex items-center justify-center">
                  <FileQuestion className="w-5 h-5 text-white" />
                </div>
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
                <h3 className="font-medium text-foreground truncate">{file.name}</h3>
              )}
              <p className="text-sm text-muted-foreground">{file.timestamp}</p>
            </div>
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-sm font-medium text-foreground">{file.size}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
