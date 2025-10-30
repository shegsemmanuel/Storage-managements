import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { StorageOverview } from "@/components/storage-overview"
import { CategoryCards } from "@/components/category-cards"
import { RecentFiles } from "@/components/recent-files"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-secondary">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 lg:p-8">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <StorageOverview />
              <CategoryCards />
            </div>
            <div className="lg:col-span-1">
              <RecentFiles />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
