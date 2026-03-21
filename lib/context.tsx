"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { FridgeItem, Meal, Receipt, fridgeItems as initialFridgeItems } from "./data"

type AppState = {
  fridgeItems: FridgeItem[]
  loggedMeals: Meal[]
  totalCalories: number
  receipts: Receipt[]
  addFridgeItems: (items: FridgeItem[]) => void
  logMeal: (meal: Meal) => void
  addReceipt: (receipt: Receipt) => void
  removeFridgeItems: (ids: string[]) => void
}

const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [fridgeItems, setFridgeItems] = useState<FridgeItem[]>([])
  const [loggedMeals, setLoggedMeals] = useState<Meal[]>([])
  const [totalCalories, setTotalCalories] = useState(0)
  const [receipts, setReceipts] = useState<Receipt[]>([])

  useEffect(() => {
    const storedFridge = localStorage.getItem("fridgeItems")
    if (storedFridge) {
      setFridgeItems(JSON.parse(storedFridge))
    } else {
      setFridgeItems(initialFridgeItems)
    }

    const storedMeals = localStorage.getItem("loggedMeals")
    if (storedMeals) setLoggedMeals(JSON.parse(storedMeals))

    const storedCalories = localStorage.getItem("totalCalories")
    if (storedCalories) setTotalCalories(JSON.parse(storedCalories))

    const storedReceipts = localStorage.getItem("receipts")
    if (storedReceipts) setReceipts(JSON.parse(storedReceipts))
  }, [])

    function addFridgeItems(items: FridgeItem[]) {
    setFridgeItems(prev => {
        const existingIds = new Set(prev.map(i => i.id))
        const newItems = items.filter(i => !existingIds.has(i.id))
        const updated = [...prev, ...newItems]
        localStorage.setItem("fridgeItems", JSON.stringify(updated))
        return updated
    })
    }

  function removeFridgeItems(ids: string[]) {
    setFridgeItems(prev => {
      const updated = prev.filter(item => !ids.includes(item.id))
      localStorage.setItem("fridgeItems", JSON.stringify(updated))
      return updated
    })
  }

  function logMeal(meal: Meal) {
    setLoggedMeals(prev => {
      const updated = [...prev, meal]
      localStorage.setItem("loggedMeals", JSON.stringify(updated))
      return updated
    })
    setTotalCalories(prev => {
      const updated = prev + meal.calories
      localStorage.setItem("totalCalories", JSON.stringify(updated))
      return updated
    })
  }

  function addReceipt(receipt: Receipt) {
    setReceipts(prev => {
      const updated = [receipt, ...prev]
      localStorage.setItem("receipts", JSON.stringify(updated))
      return updated
    })
  }

  return (
    <AppContext.Provider value={{
      fridgeItems,
      loggedMeals,
      totalCalories,
      receipts,
      addFridgeItems,
      removeFridgeItems,
      logMeal,
      addReceipt,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error("useApp must be used within AppProvider")
  return context
}