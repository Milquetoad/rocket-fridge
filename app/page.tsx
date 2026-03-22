"use client"

import { useApp } from "@/lib/context"
import { Card } from "@/components/ui/card"
import { meals } from "@/lib/data"

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 18) return "Good afternoon"
  return "Good evening"
}

function getSuggestion(fridgeItemNames: string[]) {
  const lower = fridgeItemNames.map(n => n.toLowerCase())

  if (lower.some(n => n.includes("salmon"))) {
    return {
      emoji: "🐟",
      headline: "Salmon tonight?",
      body: "You have salmon in the fridge — a dinner rich in omega-3 that'll leave you sharp and energised tomorrow morning.",
      activity: "Pair it with a short evening walk for the best night's sleep."
    }
  }
  if (lower.some(n => n.includes("chicken"))) {
    return {
      emoji: "🍗",
      headline: "Fuel a strong day",
      body: "Grilled chicken and broccoli is sitting in your fridge — high protein, light on your stomach, great recovery food.",
      activity: "Perfect after a workout or an active afternoon."
    }
  }
  if (lower.some(n => n.includes("oat"))) {
    return {
      emoji: "🌾",
      headline: "Start tomorrow right",
      body: "You have oats ready to go — a slow-burning breakfast that keeps your energy steady all morning.",
      activity: "Great fuel before a long day or a morning run."
    }
  }
  if (lower.some(n => n.includes("egg"))) {
    return {
      emoji: "🥚",
      headline: "Quick and nourishing",
      body: "Eggs are one of the most complete foods you can eat — fast to cook, filling, and great for focus.",
      activity: "A solid lunch before an afternoon that needs your full attention."
    }
  }
  return {
    emoji: "🥗",
    headline: "Your fridge is stocked",
    body: "You have good ingredients to work with tonight. Check the log page for meal ideas based on what you have.",
    activity: "Eating well is the easiest thing you can do for your energy levels."
  }
}

export default function Dashboard() {
  const { fridgeItems } = useApp()

  const expiringItems = fridgeItems.filter(item => item.expiryDays <= 2)
  const fridgeItemNames = fridgeItems.map(i => i.name)
  const suggestion = getSuggestion(fridgeItemNames)

  const suggestedMeal = meals.find(m =>
    m.ingredients.some(ing =>
      fridgeItemNames.some(name =>
        name.toLowerCase().includes(ing.toLowerCase())
      )
    )
  )

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-green-600">{getGreeting()}</h1>
      <p className="text-gray-400 mt-1">Here's what's going on in your kitchen</p>

      {/* Fridge-aware suggestion */}
      <Card className="mt-6 p-6 border-l-4 border-green-400">
        <div className="flex gap-3 items-start">
          <span className="text-3xl">{suggestion.emoji}</span>
          <div>
            <h2 className="font-semibold text-gray-700">{suggestion.headline}</h2>
            <p className="text-sm text-gray-500 mt-1">{suggestion.body}</p>
            <p className="text-xs text-green-500 mt-2">{suggestion.activity}</p>
          </div>
        </div>
      </Card>

      {/* Expiry warning */}
      {expiringItems.length > 0 && (
        <Card className="mt-4 p-6 border-l-4 border-amber-400">
          <div className="flex gap-3 items-start">
            <span className="text-2xl">⚠️</span>
            <div>
              <h2 className="font-semibold text-gray-700">Use these soon</h2>
              <p className="text-sm text-gray-400 mt-1">
                {expiringItems.map(i => i.name).join(", ")} — expiring in the next 2 days
              </p>
              {suggestedMeal && (
                <p className="text-xs text-green-500 mt-2">
                  Try {suggestedMeal.name} — {suggestedMeal.activitySuggestion}
                </p>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Morning notification */}
      <Card className="mt-4 p-6 border-l-4 border-indigo-300">
        <div className="flex gap-3 items-start">
          <span className="text-2xl">🌅</span>
          <div className="flex-1">
            <div className="flex justify-between">
              <h2 className="font-semibold text-gray-700">This morning</h2>
              <span className="text-xs text-gray-300">8:04 AM</span>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              Oat porridge would set you up well for the day ahead
            </p>
            <p className="text-xs text-green-500 mt-1">
              Steady energy — great before a long day
            </p>
          </div>
        </div>
      </Card>

      {/* Evening summary */}
      <Card className="mt-4 p-6 border-l-4 border-indigo-300">
        <div className="flex gap-3 items-start">
          <span className="text-2xl">🌙</span>
          <div className="flex-1">
            <div className="flex justify-between">
              <h2 className="font-semibold text-gray-700">Last night</h2>
              <span className="text-xs text-gray-300">9:21 PM</span>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              Grilled chicken — good recovery after yesterday's activity
            </p>
            <p className="text-xs text-green-500 mt-1">
              Salmon fillet expires tomorrow — great for breakfast
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