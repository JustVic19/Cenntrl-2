export default function DashboardGreeting({ userName }: { userName: string }) {
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  const getDate = () => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        {getGreeting()}, {userName} 👋
      </h1>
      <p className="text-gray-600">
        Here's your command center for {getDate()}.
      </p>
    </div>
  )
}
