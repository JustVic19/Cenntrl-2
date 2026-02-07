import { Users, Clock } from "lucide-react"

export default function NetworkWidget() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Follow-ups</h3>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-network-sky" />
          <span className="text-sm font-semibold text-orange-600">12 due</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition cursor-pointer">
          <p className="text-sm font-medium">Sarah Chen</p>
          <div className="flex items-center gap-1 mt-1 text-xs text-gray-600">
            <Clock className="w-3 h-3" />
            <span>3 months ago</span>
          </div>
        </div>

        <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition cursor-pointer">
          <p className="text-sm font-medium">Marcus Williams</p>
          <div className="flex items-center gap-1 mt-1 text-xs text-gray-600">
            <Clock className="w-3 h-3" />
            <span>2 months ago</span>
          </div>
        </div>

        <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition cursor-pointer">
          <p className="text-sm font-medium">Emily Watson</p>
          <div className="flex items-center gap-1 mt-1 text-xs text-gray-600">
            <Clock className="w-3 h-3" />
            <span>1 month ago</span>
          </div>
        </div>

        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition cursor-pointer">
          <p className="text-sm font-medium">David Park</p>
          <div className="flex items-center gap-1 mt-1 text-xs text-gray-600">
            <Clock className="w-3 h-3" />
            <span>3 weeks ago</span>
          </div>
        </div>
      </div>

      <button className="w-full mt-4 text-sm text-network-sky hover:underline">
        View All Contacts →
      </button>
    </div>
  )
}
