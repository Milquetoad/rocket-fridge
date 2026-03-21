"use client"

import { useApp } from "@/lib/context"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

function getFreshnessColor(expiryDays: number) {
  if (expiryDays <= 2) return "bg-red-100 text-red-700"
  if (expiryDays <= 5) return "bg-amber-100 text-amber-700"
  return "bg-green-100 text-green-700"
}

function getFreshnessLabel(expiryDays: number) {
  if (expiryDays <= 2) return "Expires soon"
  if (expiryDays <= 5) return "Use this week"
  return "Fresh"
}

export default function Fridge() {
  const { fridgeItems } = useApp()

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <a href="/" className="text-sm text-gray-400 hover:text-gray-600">← Back</a>
      <h1 className="text-3xl font-bold text-green-600 mt-2">My Fridge</h1>
      <p className="text-gray-400 mt-1">{fridgeItems.length} items</p>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {fridgeItems.map(item => (
          <Card key={item.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-semibold text-gray-800">{item.name}</h2>
                <p className="text-sm text-gray-400 mt-1">{item.quantity} {item.unit}</p>
                <p className="text-xs text-gray-300 mt-1">{item.calories} kcal per unit</p>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${getFreshnessColor(item.expiryDays)}`}>
                {getFreshnessLabel(item.expiryDays)}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </main>
  )
}