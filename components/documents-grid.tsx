"use client"

import { MoreVertical, List, Grid3x3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useStore } from "@/lib/store"
import { useState } from "react"
import { Input } from "@/components/ui/input"

const getFileIcon = (type: string) => {
  const icons: Record<string, string> = {
    doc: "📄",
    docx: "📘",
    sketch: "💎",
    xd: "🎨",
    figma: "🎨",
    pdf: "📕",
    csv: "📊",
    txt: "📝",
  }
  return icons[type] || "📄"
}

export function DocumentsGrid() {
  const { files, searchQuery, sortBy, setSortBy, viewMode, setViewMode, deleteFile, renameFile, downloadFile } =
    useStore()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState("")

  const documentFiles = files.filter(
    (f) => f.type === "document" && f.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const sortedFiles = [...documentFiles].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return b.time.localeCompare(a.time)
      case "oldest":
        return a.time.localeCompare(b.time)
      case "name":
        return a.name.localeCompare(b.name)
      case "size":
        return Number.parseFloat(b.size) - Number.parseFloat(a.size)
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
      renameFile(id, editName)
    }
    setEditingId(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Documents</h1>
          <p className="text-muted-foreground mt-1">Total: 12GB</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Date Created (newest)</SelectItem>
              <SelectItem value="oldest">Date Created (oldest)</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="size">Size</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-1 ml-2">
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              className="h-9 w-9"
              onClick={() => setViewMode("list")}
            >
              <List className="h-5 w-5" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              className="h-9 w-9"
              onClick={() => setViewMode("grid")}
            >
              <Grid3x3 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sortedFiles.map((doc) => (
          <div key={doc.id} className="bg-background rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${doc.color} flex items-center justify-center text-2xl`}>
                {getFileIcon(doc.icon)}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => downloadFile(doc.id)}>Download</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleRename(doc.id, doc.name)}>Rename</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => alert("Share functionality coming soon!")}>Share</DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => {
                      if (confirm(`Delete ${doc.name}?`)) {
                        deleteFile(doc.id)
                      }
                    }}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="space-y-1">
              {editingId === doc.id ? (
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onBlur={() => handleSaveRename(doc.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveRename(doc.id)
                    if (e.key === "Escape") setEditingId(null)
                  }}
                  className="h-7 text-sm"
                  autoFocus
                />
              ) : (
                <p className="font-medium text-sm text-foreground truncate">{doc.name}</p>
              )}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{doc.size}</span>
              </div>
              <p className="text-xs text-muted-foreground">{doc.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
