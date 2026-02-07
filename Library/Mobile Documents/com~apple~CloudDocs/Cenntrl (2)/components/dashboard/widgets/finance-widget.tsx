import { DollarSign, TrendingUp, TrendingDown } from "lucide-react"

export default function FinanceWidget() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold">Budget Overview</h3>
        <DollarSign className="w-5 h-5 text-finance-green" />
      </div>

      {/* Spending Chart Placeholder */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-600">Monthly Spending</span>
          <div className="flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-green-600" />
            <span className="text-sm font-semibold text-green-600">-12% vs last month</span>
          </div>
        </div>

        {/* Simple bar chart visualization */}
        <div className="flex items-end justify-between h-32 gap-2">
          <div className="flex-1 bg-finance-green/20 rounded-t-lg" style={{ height: '60%' }}>
            <div className="bg-finance-green w-full rounded-t-lg" style={{ height: '100%' }}></div>
          </div>
          <div className="flex-1 bg-finance-green/20 rounded-t-lg" style={{ height: '75%' }}>
            <div className="bg-finance-green w-full rounded-t-lg" style={{ height: '100%' }}></div>
          </div>
          <div className="flex-1 bg-finance-green/20 rounded-t-lg" style={{ height: '50%' }}>
            <div className="bg-finance-green w-full rounded-t-lg" style={{ height: '100%' }}></div>
          </div>
          <div className="flex-1 bg-finance-green/20 rounded-t-lg" style={{ height: '85%' }}>
            <div className="bg-finance-green w-full rounded-t-lg" style={{ height: '100%' }}></div>
          </div>
          <div className="flex-1 bg-finance-green/20 rounded-t-lg" style={{ height: '70%' }}>
            <div className="bg-finance-green w-full rounded-t-lg" style={{ height: '100%' }}></div>
          </div>
          <div className="flex-1 bg-finance-green/20 rounded-t-lg" style={{ height: '90%' }}>
            <div className="bg-finance-green w-full rounded-t-lg" style={{ height: '100%' }}></div>
          </div>
          <div className="flex-1 bg-orange-500/20 rounded-t-lg" style={{ height: '100%' }}>
            <div className="bg-orange-500 w-full rounded-t-lg" style={{ height: '100%' }}></div>
          </div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>Jan</span>
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
          <span>May</span>
          <span>Jun</span>
          <span>Jul</span>
        </div>
      </div>

      {/* Budget Categories */}
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Dining</span>
            <span className="font-medium">$340 / $500</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-finance-green h-2 rounded-full" style={{ width: '68%' }}></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Shopping</span>
            <span className="font-medium text-orange-600">$450 / $400</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-orange-500 h-2 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Transport</span>
            <span className="font-medium">$120 / $300</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-finance-green h-2 rounded-full" style={{ width: '40%' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
