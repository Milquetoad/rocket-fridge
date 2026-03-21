"use client"

import { useState, useRef } from "react"
import { useApp } from "@/lib/context"
import { useSearchParams, useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FridgeItem } from "@/lib/data"
import { Suspense } from "react"

type Decision = "keep" | "remove" | null

function ReviewContent() {
  const { receipts, removeFridgeItems, addFridgeItems } = useApp()
  const searchParams = useSearchParams()
  const router = useRouter()
  const id = searchParams.get("id")
  const receipt = receipts.find(r => r.id === id)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [decisions, setDecisions] = useState<Record<string, Decision>>({})
  const [dragX, setDragX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [done, setDone] = useState(false)
  const dragStartX = useRef(0)

  if (!receipt) {
    return (
      <main className="min-h-screen bg-gray-50 p-8">
        <a href="/scan" className="text-sm text-gray-400">← Back</a>
        <p className="mt-8 text-gray-400">Receipt not found.</p>
      </main>
    )
  }

  const items = receipt.items
  const currentItem = items[currentIndex]
  const isLast = currentIndex === items.length - 1

  function decide(item: FridgeItem, decision: Decision) {
    setDecisions(prev => ({ ...prev, [item.id]: decision }))
    setDragX(0)
    if (isLast) {
      setDone(true)
    } else {
      setCurrentIndex(prev => prev + 1)
    }
  }

  function handleDragStart(clientX: number) {
    dragStartX.current = clientX
    setIsDragging(true)
  }

  function handleDragMove(clientX: number) {
    if (!isDragging) return
    setDragX(clientX - dragStartX.current)
  }

  function handleDragEnd() {
    setIsDragging(false)
    if (dragX > 80) decide(currentItem, "keep")
    else if (dragX < -80) decide(currentItem, "remove")
    else setDragX(0)
  }

function handleConfirm() {
  const toRemove = Object.entries(decisions)
    .filter(([, decision]) => decision === "remove")
    .map(([id]) => id)
  
  const toAdd = items.filter(i => decisions[i.id] === "keep")
  
  removeFridgeItems(toRemove)
  addFridgeItems(toAdd)
  router.push("/scan")
}

  const rotation = dragX / 15
  const opacity = Math.max(0.5, 1 - Math.abs(dragX) / 300)
  const isGoingRight = dragX > 30
  const isGoingLeft = dragX < -30

  if (done) {
    const kept = items.filter(i => decisions[i.id] === "keep")
    const removed = items.filter(i => decisions[i.id] === "remove")

    return (
      <main className="min-h-screen bg-gray-50 p-8">
        <a href="/scan" className="text-sm text-gray-400">← Back</a>
        <h1 className="text-3xl font-bold text-green-600 mt-2">Review complete</h1>
        <p className="text-gray-400 mt-1">Here's what we'll update</p>

        {kept.length > 0 && (
          <div className="mt-6">
            <h2 className="text-sm font-semibold text-green-600 mb-3">✅ Keeping in fridge</h2>
            <div className="space-y-2">
              {kept.map(item => (
                <Card key={item.id} className="p-4 flex justify-between items-center">
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-400">{item.quantity} {item.unit}</p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {removed.length > 0 && (
          <div className="mt-6">
            <h2 className="text-sm font-semibold text-red-400 mb-3">🗑️ Removing from fridge</h2>
            <div className="space-y-2">
              {removed.map(item => (
                <Card key={item.id} className="p-4 flex justify-between items-center opacity-50">
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-400">{item.quantity} {item.unit}</p>
                </Card>
              ))}
            </div>
          </div>
        )}

        <Button onClick={handleConfirm} className="w-full mt-8 rounded-2xl py-6 text-lg">
          Confirm changes
        </Button>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <a href="/scan" className="text-sm text-gray-400">← Back</a>
      <h1 className="text-3xl font-bold text-green-600 mt-2">{receipt.store}</h1>
      <p className="text-gray-400 mt-1">{currentIndex + 1} of {items.length} items</p>

      <div className="mt-4 flex justify-between text-sm px-2">
        <span className={`font-medium transition ${isGoingLeft ? "text-red-400" : "text-gray-200"}`}>
          ← Remove
        </span>
        <span className={`font-medium transition ${isGoingRight ? "text-green-500" : "text-gray-200"}`}>
          Keep →
        </span>
      </div>

      {/* Card stack */}
      <div className="mt-4 relative h-64 flex items-center justify-center">

        {/* Background card hint */}
        {!isLast && (
          <div className="absolute w-full">
            <Card className="p-8 opacity-30 scale-95 w-full h-48" />
          </div>
        )}

        {/* Swipeable card */}
        <div
          className="absolute w-full cursor-grab active:cursor-grabbing"
          style={{
            transform: `translateX(${dragX}px) rotate(${rotation}deg)`,
            opacity,
            transition: isDragging ? "none" : "transform 0.3s ease, opacity 0.3s ease"
          }}
          onMouseDown={e => handleDragStart(e.clientX)}
          onMouseMove={e => handleDragMove(e.clientX)}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={e => handleDragStart(e.touches[0].clientX)}
          onTouchMove={e => handleDragMove(e.touches[0].clientX)}
          onTouchEnd={handleDragEnd}
        >
          <Card className={`p-8 w-full border-2 transition-colors ${
            isGoingRight ? "border-green-400 bg-green-50" :
            isGoingLeft ? "border-red-300 bg-red-50" :
            "border-transparent"
          }`}>
            <h2 className="text-2xl font-bold text-gray-800">{currentItem.name}</h2>
            <p className="text-gray-400 mt-2">{currentItem.quantity} {currentItem.unit}</p>
            <p className="text-sm text-gray-300 mt-1">{currentItem.calories} kcal per unit</p>
          </Card>
        </div>
      </div>

      {/* Manual buttons as fallback */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="py-6 rounded-2xl border-red-200 text-red-400 hover:bg-red-50"
          onClick={() => decide(currentItem, "remove")}
        >
          🗑️ Remove
        </Button>
        <Button
          className="py-6 rounded-2xl bg-green-500 hover:bg-green-600"
          onClick={() => decide(currentItem, "keep")}
        >
          ✅ Keep
        </Button>
      </div>

      <p className="text-center text-xs text-gray-300 mt-4">swipe or tap to decide</p>
    </main>
  )
}

export default function Review() {
  return (
    <Suspense>
      <ReviewContent />
    </Suspense>
  )
}