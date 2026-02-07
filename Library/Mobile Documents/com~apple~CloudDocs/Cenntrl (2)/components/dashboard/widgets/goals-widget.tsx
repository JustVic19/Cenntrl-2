import { Target, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GoalsWidget() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow h-full min-h-[600px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">My Goals</h3>
        <Button size="icon" variant="ghost">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Today/Tomorrow Toggle */}
      <div className="flex gap-2 mb-6">
        <button className="px-4 py-2 bg-navy text-white rounded-xl text-sm font-medium">
          Today
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-200">
          Tomorrow
        </button>
      </div>

      {/* Goals List - More items for tall layout */}
      <div className="space-y-3 flex-1">
        <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 transition">
          <input type="checkbox" className="mt-1" />
          <div className="flex-1">
            <p className="text-sm font-medium">Complete Q1 budget review</p>
            <p className="text-xs text-gray-500">Career Goal</p>
          </div>
        </div>

        <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 transition">
          <input type="checkbox" className="mt-1" />
          <div className="flex-1">
            <p className="text-sm font-medium">Morning workout - 30 min</p>
            <p className="text-xs text-gray-500">Health Goal</p>
          </div>
        </div>

        <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 transition">
          <input type="checkbox" className="mt-1" />
          <div className="flex-1">
            <p className="text-sm font-medium">Follow up: Sarah Chen</p>
            <p className="text-xs text-gray-500">Network Goal</p>
          </div>
        </div>

        <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 transition">
          <input type="checkbox" className="mt-1" />
          <div className="flex-1">
            <p className="text-sm font-medium">Review investment portfolio</p>
            <p className="text-xs text-gray-500">Financial Goal</p>
          </div>
        </div>

        <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 transition">
          <input type="checkbox" className="mt-1" />
          <div className="flex-1">
            <p className="text-sm font-medium">Book dentist appointment</p>
            <p className="text-xs text-gray-500">Health Goal</p>
          </div>
        </div>

        <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 transition">
          <input type="checkbox" className="mt-1" />
          <div className="flex-1">
            <p className="text-sm font-medium">Reach out to mentor</p>
            <p className="text-xs text-gray-500">Network Goal</p>
          </div>
        </div>
      </div>

      <Button variant="link" className="mt-4 w-full text-goals-purple">
        View All Goals →
      </Button>
    </div>
  )
}
