"use client"

import { useState } from "react"
import { useApp } from "@/lib/context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { scannedReceiptItems } from "@/lib/data"

type ScanState = "idle" | "checking" | "found" | "processing" | "done"

export default function Scan() {
  const { addFridgeItems, addReceipt, receipts } = useApp()
  const [state, setState] = useState<ScanState>("idle")

  async function handleScan() {
    setState("checking")
    await delay(2000)
    setState("found")
    await delay(1500)
    setState("processing")
    await delay(2500)
    addFridgeItems(scannedReceiptItems)
    addReceipt({
      id: Date.now().toString(),
      store: "Rema 1000",
      date: new Date().toLocaleDateString("en-GB", {
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit"
      }),
      items: scannedReceiptItems
    })
    setState("done")
  }

  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <a href="/" className="text-sm text-gray-400 hover:text-gray-600">← Back</a>
      <h1 className="text-3xl font-bold text-green-600 mt-2">Scan Receipt</h1>
      <p className="text-gray-400 mt-1">We'll check your email for new receipts</p>

      <div className="mt-8">
        {state === "idle" && (
          <div className="space-y-4">
            <Button onClick={handleScan} className="w-full py-8 text-lg rounded-2xl">
              Check email for receipts
            </Button>
            <p className="text-center text-sm text-gray-400">or</p>
            <label className="block w-full cursor-pointer">
              <div className="w-full py-6 text-center border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 hover:border-green-400 hover:text-green-500 transition">
                <p className="text-2xl mb-1">📎</p>
                <p className="text-sm font-medium">Upload a receipt PDF</p>
                <p className="text-xs mt-1">Tap to browse files</p>
              </div>
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={() => handleScan()}
              />
            </label>
          </div>
        )}

        {state === "checking" && (
          <StatusCard
            emoji="📬"
            title="Checking your inbox..."
            subtitle="Looking for new receipts"
            loading
          />
        )}

        {state === "found" && (
          <StatusCard
            emoji="📄"
            title="Receipt found!"
            subtitle="From Rema 1000 · Just now"
            loading
          />
        )}

        {state === "processing" && (
          <StatusCard
            emoji="🤖"
            title="Reading your receipt..."
            subtitle="AI is identifying your items"
            loading
          />
        )}

        {state === "done" && (
          <div className="space-y-4">
            <StatusCard
              emoji="✅"
              title="Fridge updated!"
              subtitle="4 new items added"
            />
            <p className="text-sm font-medium text-gray-500 px-1">Added to your fridge:</p>
            {scannedReceiptItems.map(item => (
              <Card key={item.id} className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-400">{item.quantity} {item.unit}</p>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  New
                </span>
              </Card>
            ))}
            <a href="/fridge">
              <Button variant="outline" className="w-full mt-2 rounded-2xl">
                View my fridge →
              </Button>
            </a>
          </div>
        )}
      </div>

      {receipts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Receipt history</h2>
          <div className="space-y-3">
            {receipts.map(receipt => (
              <a key={receipt.id} href={`/review?id=${receipt.id}`}>
                <Card className="p-4 flex justify-between items-center hover:shadow-md transition cursor-pointer">
                  <div>
                    <p className="font-semibold text-gray-800">{receipt.store}</p>
                    <p className="text-sm text-gray-400 mt-1">{receipt.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{receipt.items.length} items</p>
                    <p className="text-xs text-gray-300 mt-1">Tap to review →</p>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}

function StatusCard({ emoji, title, subtitle, loading = false }: {
  emoji: string
  title: string
  subtitle: string
  loading?: boolean
}) {
  return (
    <Card className="p-6 flex items-center gap-4">
      <span className="text-3xl">{emoji}</span>
      <div className="flex-1">
        <p className="font-semibold text-gray-800">{title}</p>
        <p className="text-sm text-gray-400">{subtitle}</p>
      </div>
      {loading && (
        <div className="w-5 h-5 rounded-full border-2 border-green-400 border-t-transparent animate-spin" />
      )}
    </Card>
  )
}