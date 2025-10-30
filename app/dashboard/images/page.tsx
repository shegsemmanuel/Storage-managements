import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { ImagesGrid } from "@/components/images-grid"

export default function ImagesPage() {
  return (
    <div className="flex min-h-screen bg-secondary">
      <Sidebar activeItem="Images" />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 lg:p-8">
          <ImagesGrid />
        </main>
      </div>
    </div>
  )
}
