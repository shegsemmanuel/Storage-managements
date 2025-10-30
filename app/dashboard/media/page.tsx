import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { MediaGrid } from "@/components/media-grid"

export default function MediaPage() {
  return (
    <div className="flex min-h-screen bg-secondary">
      <Sidebar activeItem="Media" />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 lg:p-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Media</h1>
              <p className="text-muted-foreground mt-1">Total: 20GB</p>
            </div>
            <div className="bg-background rounded-2xl p-12 text-center">
              <MediaGrid />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
