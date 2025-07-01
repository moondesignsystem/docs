"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SortChips() {
  const [selectedChips, setSelectedChips] = useState<string[]>(["best-value", "popularity"])

  const chips = [
    { id: "best-value", label: "Best value" },
    { id: "popularity", label: "Popularity" },
    { id: "price", label: "Price (low to high)" },
    { id: "rating", label: "Rating" },
    { id: "recently-added", label: "Recently added" },
  ]

  const toggleChip = (chipId: string) => {
    setSelectedChips((prev) => (prev.includes(chipId) ? prev.filter((id) => id !== chipId) : [...prev, chipId]))
  }

  return (
    <Card className="bg-[#ffffff] border-[#e0e1e6] w-[414px]">
      <CardHeader className="px-4 py-4 pb-0">
        <CardTitle className="text-[#1c2024] text-lg font-semibold">Sort by</CardTitle>
      </CardHeader>
      <CardContent className="px-4 py-4 pt-6">
        <div className="flex flex-wrap gap-3">
          {chips.map((chip) => (
            <button
              key={chip.id}
              onClick={() => toggleChip(chip.id)}
              className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-150 ${
                selectedChips.includes(chip.id)
                  ? "bg-[#5b5bd6] text-white hover:bg-[#5753c6] active:scale-95"
                  : "bg-[#f0f0f3] text-[#1c2024] hover:bg-[#e0e1e6] active:scale-95"
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
