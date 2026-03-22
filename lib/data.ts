export type FridgeItem = {
  id: string
  name: string
  quantity: number
  unit: string
  expiryDays: number
  calories: number
}

export type Receipt = {
  id: string
  store: string
  date: string
  items: FridgeItem[]
}

export type Meal = {
  id: string
  name: string
  ingredients: string[]
  calories: number
  protein: number
  carbs: number
  fat: number
  instructions: string
  lifestyleTag: string
  activitySuggestion: string
}

export const fridgeItems: FridgeItem[] = [
  { id: "1", name: "Eggs", quantity: 6, unit: "pcs", expiryDays: 14, calories: 70 },
  { id: "2", name: "Milk", quantity: 1, unit: "litre", expiryDays: 5, calories: 60 },
  { id: "3", name: "Chicken breast", quantity: 400, unit: "g", expiryDays: 2, calories: 165 },
  { id: "4", name: "Broccoli", quantity: 300, unit: "g", expiryDays: 4, calories: 34 },
  { id: "5", name: "Cheddar", quantity: 200, unit: "g", expiryDays: 21, calories: 402 },
  { id: "6", name: "Butter", quantity: 100, unit: "g", expiryDays: 30, calories: 717 },
  { id: "7", name: "Oats", quantity: 500, unit: "g", expiryDays: 180, calories: 389 },
]

export const meals: Meal[] = [
  {
    id: "1",
    name: "Scrambled Eggs & Broccoli",
    ingredients: ["Eggs", "Broccoli", "Butter", "Cheddar"],
    calories: 420,
    protein: 28,
    carbs: 12,
    fat: 31,
    instructions: "Melt butter in a pan. Whisk 3 eggs and pour in. Add steamed broccoli and top with cheddar.",
    lifestyleTag: "🌿 Light and nourishing",
    activitySuggestion: "perfect before an evening walk"
  },
  {
    id: "2",
    name: "Grilled Chicken & Broccoli",
    ingredients: ["Chicken breast", "Broccoli", "Butter"],
    calories: 380,
    protein: 48,
    carbs: 8,
    fat: 14,
    instructions: "Season chicken breast and grill for 6 minutes each side. Steam broccoli and serve with a knob of butter.",
    lifestyleTag: "💪 Great post-workout",
    activitySuggestion: "ideal after a run or gym session"
  },
  {
    id: "3",
    name: "Oat Porridge",
    ingredients: ["Oats", "Milk"],
    calories: 310,
    protein: 12,
    carbs: 54,
    fat: 6,
    instructions: "Bring milk to a simmer, stir in oats and cook for 5 minutes. Add toppings of your choice.",
    lifestyleTag: "☀️ Steady morning energy",
    activitySuggestion: "great fuel before a long day"
  },
]

export const scannedReceiptItems: FridgeItem[] = [
  { id: "8", name: "Salmon fillet", quantity: 300, unit: "g", expiryDays: 2, calories: 208 },
  { id: "9", name: "Lemon", quantity: 2, unit: "pcs", expiryDays: 14, calories: 17 },
  { id: "10", name: "Greek yogurt", quantity: 400, unit: "g", expiryDays: 7, calories: 97 },
]

export type DayLog = {
  date: string
  meals: string[]
  totalCalories: number
}

export const pastDays: DayLog[] = [
  {
    date: "Yesterday",
    meals: ["Oat Porridge", "Grilled Chicken & Broccoli"],
    totalCalories: 690,
  },
  {
    date: "Friday",
    meals: ["Scrambled Eggs & Broccoli", "Oat Porridge"],
    totalCalories: 730,
  },
  {
    date: "Thursday",
    meals: ["Grilled Chicken & Broccoli"],
    totalCalories: 380,
  },
]