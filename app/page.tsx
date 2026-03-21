export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-green-600">Good morning</h1>
      <p className="text-gray-400 mt-2">Here's what's going on in your kitchen</p>

      <div className="mt-8 grid grid-cols-3 gap-4">
        <a href="/log" className="bg-white rounded-2xl p-6 shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold">📋 Log</h2>
          <p className="text-gray-400 mt-1 text-sm">Meals and calories</p>
        </a>
        <a href="/scan" className="bg-white rounded-2xl p-6 shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold">📷 Scan</h2>
          <p className="text-gray-400 mt-1 text-sm">Add items from receipt</p>
        </a>
        <a href="/fridge" className="bg-white rounded-2xl p-6 shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold">🧊 Fridge</h2>
          <p className="text-gray-400 mt-1 text-sm">See what you have</p>
        </a>
      </div>
    </main>
  )
}