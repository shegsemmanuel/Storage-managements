import { create } from "zustand"

export interface FileItem {
  id: string
  name: string
  size: string
  time: string
  type: "document" | "image" | "media" | "other"
  icon: string
  color: string
  url?: string
}

export interface UploadItem {
  id: string
  name: string
  icon: string
  timeRemaining: string
  progress: number
  color: string
}

interface StoreState {
  files: FileItem[]
  uploads: UploadItem[]
  searchQuery: string
  sortBy: "newest" | "oldest" | "name" | "size"
  viewMode: "grid" | "list"

  // Actions
  setSearchQuery: (query: string) => void
  setSortBy: (sort: "newest" | "oldest" | "name" | "size") => void
  setViewMode: (mode: "grid" | "list") => void
  addUpload: (file: File) => void
  updateUploadProgress: (id: string, progress: number) => void
  removeUpload: (id: string) => void
  deleteFile: (id: string) => void
  renameFile: (id: string, newName: string) => void
  downloadFile: (id: string) => void
}

export const useStore = create<StoreState>((set, get) => ({
  files: [
    {
      id: "1",
      name: "App School.fig",
      size: "2 GB",
      time: "10:09pm, 10 Oct",
      type: "document",
      icon: "figma",
      color: "bg-pink-100",
    },
    {
      id: "2",
      name: "BC company.sketch",
      size: "2 GB",
      time: "10:09pm, 10 Oct",
      type: "document",
      icon: "sketch",
      color: "bg-orange-100",
    },
    {
      id: "3",
      name: "B.UI.xd",
      size: "15 MB",
      time: "10:09pm, 10 Oct",
      type: "document",
      icon: "xd",
      color: "bg-purple-100",
    },
    {
      id: "4",
      name: "CompanyANV.fig",
      size: "2 GB",
      time: "10:09pm, 10 Oct",
      type: "document",
      icon: "figma",
      color: "bg-pink-100",
    },
    {
      id: "5",
      name: "company ABC.sketch",
      size: "6 MB",
      time: "10:09pm, 10 Oct",
      type: "document",
      icon: "sketch",
      color: "bg-orange-100",
    },
    {
      id: "6",
      name: "My CV.pdf",
      size: "2 GB",
      time: "10:09pm, 10 Oct",
      type: "document",
      icon: "pdf",
      color: "bg-red-100",
    },
    {
      id: "7",
      name: "My Jobs.fig",
      size: "2 GB",
      time: "10:09pm, 10 Oct",
      type: "document",
      icon: "figma",
      color: "bg-pink-100",
    },
    {
      id: "8",
      name: "Photoshop.xd",
      size: "2 GB",
      time: "10:09pm, 10 Oct",
      type: "document",
      icon: "xd",
      color: "bg-purple-100",
    },
  ],
  uploads: [],
  searchQuery: "",
  sortBy: "newest",
  viewMode: "grid",

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSortBy: (sort) => set({ sortBy: sort }),
  setViewMode: (mode) => set({ viewMode: mode }),

  addUpload: (file) => {
    const newUpload: UploadItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      icon: file.type.includes("image") ? "image" : "document",
      timeRemaining: "5 Mins Remaining",
      progress: 0,
      color: "bg-pink-100",
    }

    set((state) => ({ uploads: [...state.uploads, newUpload] }))

    // Simulate upload progress
    const interval = setInterval(() => {
      const current = get().uploads.find((u) => u.id === newUpload.id)
      if (!current || current.progress >= 100) {
        clearInterval(interval)
        if (current) {
          // Add to files when complete
          const newFile: FileItem = {
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
            time: new Date().toLocaleString(),
            type: "document",
            icon: "document",
            color: "bg-blue-100",
          }
          set((state) => ({
            files: [newFile, ...state.files],
            uploads: state.uploads.filter((u) => u.id !== newUpload.id),
          }))
        }
        return
      }

      set((state) => ({
        uploads: state.uploads.map((u) =>
          u.id === newUpload.id ? { ...u, progress: Math.min(u.progress + 10, 100) } : u,
        ),
      }))
    }, 500)
  },

  updateUploadProgress: (id, progress) => {
    set((state) => ({
      uploads: state.uploads.map((u) => (u.id === id ? { ...u, progress } : u)),
    }))
  },

  removeUpload: (id) => {
    set((state) => ({ uploads: state.uploads.filter((u) => u.id !== id) }))
  },

  deleteFile: (id) => {
    set((state) => ({ files: state.files.filter((f) => f.id !== id) }))
  },

  renameFile: (id, newName) => {
    set((state) => ({
      files: state.files.map((f) => (f.id === id ? { ...f, name: newName } : f)),
    }))
  },

  downloadFile: (id) => {
    const file = get().files.find((f) => f.id === id)
    if (file) {
      console.log("[v0] Downloading file:", file.name)
      // In a real app, this would trigger an actual download
      alert(`Downloading ${file.name}`)
    }
  },
}))
