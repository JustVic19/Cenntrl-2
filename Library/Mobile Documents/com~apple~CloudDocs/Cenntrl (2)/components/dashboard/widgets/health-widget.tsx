import { Activity, Flame } from "lucide-react"

export default function HealthWidget() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Health Trends</h3>
        <Activity className="w-5 h-5 text-health-orange" />
      </div>

      {/* Highlighted Workout Streak */}
      <div className="bg-orange-50 rounded-lg p-4 mb-4 border border-orange-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-medium text-gray-700">Workout Streak</span>
          </div>
          <span className="text-2xl font-bold text-health-orange">7</span>
        </div>
      </div>

      {/* Compact Stats */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Weight Progress</span>
          <span className="text-sm font-medium text-green-600">-3.2 lbs</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Avg Sleep</span>
          <span className="text-sm font-medium">7.5 hrs</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Water Intake</span>
          <span className="text-sm font-medium">64 oz</span>
        </div>
      </div>

      <button className="w-full mt-4 text-sm text-health-orange hover:underline">
        View Full History →
      </button>
    </div>
  )
}
