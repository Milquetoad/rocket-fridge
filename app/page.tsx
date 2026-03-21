"use client"

import { useApp } from "@/lib/context"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const DAILY_CALORIE_GOAL = 2000

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 18) return "Good afternoon"
  return "Good evening"
}

export default function Dashboard() {
  const { fridgeItems, totalCalories } = useApp()

  const expiringItems = fridgeItems.filter(item => item.expiryDays <= 2)
  const caloriePercentage = Math.min((totalCalories / DAILY_CALORIE_GOAL) * 100, 100)

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-green-600">{getGreeting()}</h1>
      <p className="text-gray-400 mt-1">Here's what's going on in your kitchen</p>

      {/* Calorie Progress */}
      <Card className="mt-6 p-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-gray-700">Today's calories</h2>
          <span className="text-sm text-gray-400">{totalCalories} / {DAILY_CALORIE_GOAL} kcal</span>
        </div>
        <Progress value={caloriePercentage} className="h-2" />
        {totalCalories === 0 && (
          <p className="text-xs text-gray-300 mt-2">No meals logged yet today</p>
        )}
      </Card>

      {/* Expiry Warning */}
      {expiringItems.length > 0 && (
        <Card className="mt-4 p-6 border-l-4 border-amber-400">
          <div className="flex gap-3 items-start">
            <span className="text-2xl">⚠️</span>
            <div>
              <h2 className="font-semibold text-gray-700">Expiring soon</h2>
              <p className="text-sm text-gray-400 mt-1">
                {expiringItems.map(i => i.name).join(", ")} — use these first
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Morning Notification */}
      <Card className="mt-4 p-6 border-l-4 border-green-400">
        <div className="flex gap-3 items-start">
          <span className="text-2xl">🌅</span>
          <div className="flex-1">
            <div className="flex justify-between">
              <h2 className="font-semibold text-gray-700">Today's suggestion</h2>
              <span className="text-xs text-gray-300">8:04 AM</span>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              Grilled Chicken & Broccoli — 380 kcal
            </p>
            <p className="text-xs text-gray-300 mt-1">
              Uses chicken breast and broccoli before they expire
            </p>
          </div>
        </div>
      </Card>

      {/* Evening Summary */}
      <Card className="mt-4 p-6 border-l-4 border-indigo-300">
        <div className="flex gap-3 items-start">
          <span className="text-2xl">🌙</span>
          <div className="flex-1">
            <div className="flex justify-between">
              <h2 className="font-semibold text-gray-700">Last night</h2>
              <span className="text-xs text-gray-300">9:21 PM</span>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              You had an estimated 1,240 kcal yesterday
            </p>
            <p className="text-xs text-gray-300 mt-1">
              Salmon fillet expires tomorrow — we'll suggest it for breakfast
            </p>
          </div>
        </div>
      </Card>

      {/* Navigation */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <a href="/log" className="bg-white rounded-2xl p-6 shadow hover:shadow-md transition text-center">
          <p className="text-2xl">📋</p>
          <p className="text-sm font-medium mt-2 text-gray-700">Log</p>
        </a>
        <a href="/scan" className="bg-white rounded-2xl p-6 shadow hover:shadow-md transition text-center">
          <p className="text-2xl">📷</p>
          <p className="text-sm font-medium mt-2 text-gray-700">Scan</p>
        </a>
        <a href="/fridge" className="bg-white rounded-2xl p-6 shadow hover:shadow-md transition text-center">
          <p className="text-2xl">🧊</p>
          <p className="text-sm font-medium mt-2 text-gray-700">Fridge</p>
        </a>
      </div>
    </main>
  )
}