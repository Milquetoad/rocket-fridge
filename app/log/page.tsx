"use client"

import { useApp } from "@/lib/context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { meals, pastDays } from "@/lib/data"
import { useState } from "react"

export default function Log() {
  const { logMeal, loggedMeals, totalCalories } = useApp()
  const [justLogged, setJustLogged] = useState<string | null>(null)

  async function handleLogMeal(meal: typeof meals[0]) {
    logMeal(meal)
    setJustLogged(meal.id)
    setTimeout(() => setJustLogged(null), 2000)
  }

  const loggedIds = loggedMeals.map(m => m.id)

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <a href="/" className="text-sm text-gray-400 hover:text-gray-600">← Back</a>
      <h1 className="text-3xl font-bold text-green-600 mt-2">Meal Log</h1>
      <p className="text-gray-400 mt-1">Today's calories: {totalCalories} kcal</p>

      <h2 className="text-lg font-semibold text-gray-700 mt-8 mb-4">Suggested for you</h2>
      <div className="space-y-4">
        {meals.map(meal => {
          const isLogged = loggedIds.includes(meal.id)
          const isJustLogged = justLogged === meal.id

          return (
            <Card key={meal.id} className={`p-5 transition ${isLogged ? "opacity-50" : ""}`}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{meal.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{meal.calories} kcal · {meal.protein}g protein · {meal.carbs}g carbs · {meal.fat}g fat</p>
                  <p className="text-xs text-gray-300 mt-2">{meal.ingredients.join(", ")}</p>
                </div>
              </div>

              <details className="mt-3">
                <summary className="text-xs text-green-500 cursor-pointer">View recipe</summary>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">{meal.instructions}</p>
              </details>

              <Button
                onClick={() => handleLogMeal(meal)}
                disabled={isLogged}
                variant={isLogged ? "outline" : "default"}
                className="w-full mt-4 rounded-xl"
              >
                {isJustLogged ? "✅ Logged!" : isLogged ? "Already logged" : "I made this tonight"}
              </Button>
            </Card>
          )
        })}
      </div>
      <h2 className="text-lg font-semibold text-gray-700 mt-10 mb-4">Previous days</h2>
        <div className="space-y-3">
        {pastDays.map((day, index) => (
            <Card key={index} className="p-5">
            <div className="flex justify-between items-center">
                <div>
                <p className="font-semibold text-gray-700">{day.date}</p>
                <p className="text-sm text-gray-400 mt-1">{day.meals.join(", ")}</p>
                </div>
                <div className="text-right">
                <p className="font-semibold text-green-600">{day.totalCalories}</p>
                <p className="text-xs text-gray-300">kcal</p>
                </div>
            </div>
            </Card>
        ))}
        </div>
    </main>
  )
}