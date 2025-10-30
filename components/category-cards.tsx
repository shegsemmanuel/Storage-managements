import { FileText, ImageIcon, Video, MoreHorizontal } from "lucide-react"

const categories = [
  { icon: FileText, label: "Documents", size: "12 GB", color: "bg-primary", lastUpdate: "10:15am, 10 Oct" },
  { icon: ImageIcon, label: "Images", size: "20 GB", color: "bg-accent", lastUpdate: "10:15am, 10 Oct" },
  { icon: Video, label: "Video, Audio", size: "20 GB", color: "bg-chart-3", lastUpdate: "10:15am, 10 Oct" },
  { icon: MoreHorizontal, label: "Others", size: "38 GB", color: "bg-chart-4", lastUpdate: "10:15am, 10 Oct" },
]

export function CategoryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {categories.map((category) => {
        const Icon = category.icon
        return (
          <div key={category.label} className="bg-background rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center text-white`}>
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-foreground">{category.size}</span>
            </div>
            <h3 className="font-semibold text-foreground mb-2">{category.label}</h3>
            <p className="text-sm text-muted-foreground">Last update</p>
            <p className="text-sm font-medium text-foreground">{category.lastUpdate}</p>
          </div>
        )
      })}
    </div>
  )
}
