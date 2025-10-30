import { FileText, ImageIcon, Video, MoreHorizontal } from "lucide-react"

const recentFiles = [
  { name: "CVdesigner.docx", time: "4:57am, 10 Nov", icon: FileText, color: "bg-primary" },
  { name: "WebUI.png", time: "11:43am, 08 Nov", icon: ImageIcon, color: "bg-accent" },
  { name: "NextJS Course Transcript.cc", time: "12:30pm, 06 Nov", icon: MoreHorizontal, color: "bg-chart-4" },
  { name: "DevOverflow Intro.mp4", time: "01:55pm, 04 Nov", icon: Video, color: "bg-chart-3" },
  { name: "Project Requirements.docx", time: "10:30pm, 03 Nov", icon: FileText, color: "bg-primary" },
  { name: "Thumbnail.jpg", time: "12:30pm, 02 Nov", icon: ImageIcon, color: "bg-accent" },
  { name: "Pie Chart of Audiences.pptx", time: "06:30pm, 01 Nov", icon: MoreHorizontal, color: "bg-chart-4" },
  { name: "App Dev Pro.mp4", time: "08:30pm, 01 Nov", icon: Video, color: "bg-chart-3" },
]

export function RecentFiles() {
  return (
    <div className="bg-background rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-bold text-foreground mb-6">Recent files uploaded</h2>
      <div className="space-y-4">
        {recentFiles.map((file, index) => {
          const Icon = file.icon
          return (
            <div key={index} className="flex items-center gap-3 group">
              <div
                className={`w-10 h-10 ${file.color} rounded-full flex items-center justify-center text-white flex-shrink-0`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">{file.time}</p>
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
