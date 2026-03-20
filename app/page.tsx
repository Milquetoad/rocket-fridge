export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-green-600">Rocket-Fridge</h1>
      <p className="text-gray-500 mt-2">Your smart kitchen assistant</p>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <a href="/scan" className="bg-white rounded-2xl p-6 shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold">Scan Receipt</h2>
          <p className="text-gray-400 mt-1 text-sm">Add items to your fridge</p>
        </a>
        <a href="/fridge" className="bg-white rounded-2xl p-6 shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold">My Fridge</h2>
          <p className="text-gray-400 mt-1 text-sm">See what you have</p>
        </a>
        <a href="/meals" className="bg-white rounded-2xl p-6 shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold">Meal Planner</h2>
          <p className="text-gray-400 mt-1 text-sm">Suggestions based on your fridge</p>
        </a>
        <a href="/dashboard" className="bg-white rounded-2xl p-6 shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <p className="text-gray-400 mt-1 text-sm">Your daily overview</p>
        </a>
      </div>
    </main>
  )
}