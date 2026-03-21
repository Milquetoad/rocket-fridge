"use client"

import { createContext, useContext, useState } from "react"
import { FridgeItem, Meal, fridgeItems as initialFridgeItems, meals as allMeals } from "./data"

type AppState = {
  fridgeItems: FridgeItem[]
  loggedMeals: Meal[]
  totalCalories: number
  addFridgeItems: (items: FridgeItem[]) => void
  logMeal: (meal: Meal) => void
}

const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [fridgeItems, setFridgeItems] = useState<FridgeItem[]>(initialFridgeItems)
  const [loggedMeals, setLoggedMeals] = useState<Meal[]>([])
  const [totalCalories, setTotalCalories] = useState(0)

  function addFridgeItems(items: FridgeItem[]) {
    setFridgeItems(prev => [...prev, ...items])
  }

  function logMeal(meal: Meal) {
    setLoggedMeals(prev => [...prev, meal])
    setTotalCalories(prev => prev + meal.calories)
  }

  return (
    <AppContext.Provider value={{ fridgeItems, loggedMeals, totalCalories, addFridgeItems, logMeal }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error("useApp must be used within AppProvider")
  return context
}