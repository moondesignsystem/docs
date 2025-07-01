"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function OrderSummary() {
  return (
    <Card className="bg-[#ffffff] border-[#e0e1e6] w-[414px]">
      <CardHeader className="px-4 py-4 pb-0">
        <CardTitle className="text-[#1c2024] text-lg font-semibold">Order summary</CardTitle>
      </CardHeader>
      <CardContent className="px-4 py-4 pt-6">
        <div className="space-y-4">
          {/* Subtotal with border */}
          <div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-[#1c2024]">Subtotal</span>
              <span className="text-sm text-[#1c2024]">32,80 €</span>
            </div>
            <div className="h-px bg-[#e0e1e6]" />
          </div>

          {/* Tips and Total grouped together */}
          <div className="space-y-2">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-[#1c2024]">Tips</span>
              <span className="text-sm text-[#1c2024]">3,00 €</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-[#1c2024] font-semibold">Total</span>
              <span className="text-sm text-[#1c2024] font-semibold">35,80 €</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
