import { requireAuth } from "@/lib/auth/server"
import Sidebar from "@/components/dashboard/sidebar"
import Header from "@/components/dashboard/header"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await requireAuth()

  return (
    <div className="flex h-screen overflow-hidden panze-bg">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header user={session.user} />

        {/* Page Content with Panze Background */}
        <main className="flex-1 overflow-y-auto panze-bg">
          {children}
        </main>
      </div>
    </div>
  )
}
