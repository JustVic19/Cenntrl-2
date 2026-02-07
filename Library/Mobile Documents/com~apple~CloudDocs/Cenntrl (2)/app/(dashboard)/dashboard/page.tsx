import { requireAuth } from "@/lib/auth/server"
import DashboardGreeting from "@/components/dashboard/greeting"
import QuickStats from "@/components/dashboard/quick-stats"
import GoalsWidget from "@/components/dashboard/widgets/goals-widget"
import FinanceWidget from "@/components/dashboard/widgets/finance-widget"
import HealthWidget from "@/components/dashboard/widgets/health-widget"
import NetworkWidget from "@/components/dashboard/widgets/network-widget"
import ProgressWidget from "@/components/dashboard/widgets/progress-widget"

export default async function DashboardPage() {
  const session = await requireAuth()

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8">
      {/* Greeting */}
      <DashboardGreeting userName={session.user.name || "there"} />

      {/* Quick Stats Cards */}
      <QuickStats />

      {/* 3-Column Asymmetric Grid (3-6-3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN - Narrow (3 cols) */}
        <div className="lg:col-span-3">
          <GoalsWidget />
        </div>

        {/* CENTER COLUMN - Wide (6 cols) */}
        <div className="lg:col-span-6 space-y-8">
          <ProgressWidget />
          <FinanceWidget />
        </div>

        {/* RIGHT COLUMN - Narrow (3 cols) */}
        <div className="lg:col-span-3 space-y-8">
          <NetworkWidget />
          <HealthWidget />
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
        <h3 className="text-lg font-bold mb-3">AI Insights</h3>
        <div className="space-y-2">
          <p className="text-sm text-gray-700">
            💡 You're 20% ahead on emergency fund goal. Consider reallocating $500 toward professional development course.
          </p>
          <p className="text-sm text-gray-700">
            🏃 On workout days, you complete 2.3x more tasks. Schedule workouts before high-stakes meetings.
          </p>
        </div>
      </div>
    </div>
  )
}
