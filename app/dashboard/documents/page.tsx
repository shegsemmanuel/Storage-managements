import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { DocumentsGrid } from "@/components/documents-grid"
import { InProgressPanel } from "@/components/in-progress-panel"

export default function DocumentsPage() {
  return (
    <div className="flex min-h-screen bg-secondary">
      <Sidebar activeItem="Documents" />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 lg:p-8">
          <div className="flex gap-6">
            <div className="flex-1">
              <DocumentsGrid />
            </div>
            <div className="w-80 flex-shrink-0">
              <InProgressPanel />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
