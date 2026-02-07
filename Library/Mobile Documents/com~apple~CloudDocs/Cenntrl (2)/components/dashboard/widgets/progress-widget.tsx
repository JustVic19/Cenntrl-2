import { Target, TrendingUp } from "lucide-react"

export default function ProgressWidget() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold">Progress Overview</h3>
        <Target className="w-5 h-5 text-goals-purple" />
      </div>

      {/* Goals Completion Donut - Placeholder */}
      <div className="flex items-center justify-center mb-8">
        <div className="relative w-48 h-48">
          {/* Outer circle */}
          <svg className="w-48 h-48 transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="#E5E7EB"
              strokeWidth="16"
              fill="none"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="#8B5CF6"
              strokeWidth="16"
              fill="none"
              strokeDasharray={`${(75 / 100) * 553} 553`}
              strokeLinecap="round"
            />
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-gray-900">75%</span>
            <span className="text-sm text-gray-500">Goals Complete</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <p className="text-2xl font-bold text-goals-purple">3</p>
          <p className="text-xs text-gray-600">Active Goals</p>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <p className="text-2xl font-bold text-finance-green">2</p>
          <p className="text-xs text-gray-600">Completed</p>
        </div>
        <div className="text-center p-3 bg-orange-50 rounded-lg">
          <p className="text-2xl font-bold text-health-orange">7</p>
          <p className="text-xs text-gray-600">Day Streak</p>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <p className="text-2xl font-bold text-network-sky">12</p>
          <p className="text-xs text-gray-600">Follow-ups</p>
        </div>
      </div>
    </div>
  )
}
