"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Plus } from "lucide-react"

export function PaymentMethod() {
  const [selectedMethod, setSelectedMethod] = useState("visa")

  const paymentMethods = [
    {
      id: "visa",
      name: "•••• 5143",
      icon: <img src="/visa-icon.svg" alt="Visa" className="w-8 h-6" />,
    },
    {
      id: "apple-pay",
      name: "Apple Pay",
      icon: <img src="/apple-pay-icon.svg" alt="Apple Pay" className="w-8 h-6" />,
    },
  ]

  return (
    <Card className="bg-[#ffffff] border-[#e0e1e6] w-[414px]">
      <CardHeader className="px-4 py-4 pb-0">
        <CardTitle className="text-[#1c2024] text-lg font-semibold">Payment method</CardTitle>
      </CardHeader>
      <CardContent className="p-0 mt-4">
        {paymentMethods.map((method, index) => (
          <div key={method.id}>
            <div
              onClick={() => setSelectedMethod(method.id)}
              className="flex items-center justify-between px-4 py-4 cursor-pointer hover:bg-[#f8f9fa] transition-colors duration-150"
            >
              <div className="flex items-center gap-3">
                {method.icon}
                <span className="text-sm text-[#1c2024] font-medium">{method.name}</span>
              </div>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  selectedMethod === method.id ? "bg-[#30a46c]" : "bg-transparent"
                }`}
              >
                {selectedMethod === method.id && <Check className="h-3 w-3 text-white" strokeWidth={2.5} />}
              </div>
            </div>
            {index < paymentMethods.length - 1 && <div className="h-px bg-[#e0e1e6] mx-4" />}
          </div>
        ))}

        <div className="h-px bg-[#e0e1e6] mx-4" />

        <button className="flex items-center gap-3 px-4 py-4 w-full text-left hover:bg-[#f8f9fa] transition-colors duration-150">
          <Plus className="h-5 w-5 text-[#1c2024]" />
          <span className="text-sm text-[#1c2024] font-medium">Add new card</span>
        </button>
      </CardContent>
    </Card>
  )
}
