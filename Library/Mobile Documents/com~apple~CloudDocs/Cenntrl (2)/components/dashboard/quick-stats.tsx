import { Target, DollarSign, Activity, Users } from "lucide-react"

export default function QuickStats() {
  const stats = [
    {
      label: "Active Goals",
      value: "3",
      icon: Target,
      bgColor: "bg-purple-50",
      iconColor: "text-goals-purple",
    },
    {
      label: "Budget Left",
      value: "$2,340",
      icon: DollarSign,
      bgColor: "bg-green-50",
      iconColor: "text-finance-green",
    },
    {
      label: "Day Streak",
      value: "7 🔥",
      icon: Activity,
      bgColor: "bg-orange-50",
      iconColor: "text-health-orange",
    },
    {
      label: "Follow-ups",
      value: "12",
      icon: Users,
      bgColor: "bg-blue-50",
      iconColor: "text-network-sky",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.label}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
              <span className="text-xs text-gray-500">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        )
      })}
    </div>
  )
}
