import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { OthersGrid } from "@/components/others-grid"

export default function OthersPage() {
  return (
    <div className="flex min-h-screen bg-secondary">
      <Sidebar activeItem="Others" />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 lg:p-8">
          <OthersGrid />
        </main>
      </div>
    </div>
  )
}
