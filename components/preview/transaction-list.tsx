"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRight, Plus } from "lucide-react"

export function TransactionList() {
  const transactions = [
    {
      id: 1,
      type: "transfer",
      title: "Cash → Savings",
      time: "Today, 12:38PM",
      amount: "€50.00",
      icon: <ArrowUpRight className="h-4 w-4 text-[#60646c]" />,
    },
    {
      id: 2,
      type: "deposit",
      title: "Deposit",
      time: "Today, 12:36PM",
      amount: "€50.00",
      icon: <Plus className="h-4 w-4 text-[#60646c]" />,
    },
  ]

  return (
    <Card className="bg-[#ffffff] border-[#e0e1e6] w-[414px]">
      <CardContent className="p-0">
        {transactions.map((transaction, index) => (
          <div key={transaction.id}>
            <div className="flex items-center justify-between px-4 py-4 hover:bg-[#f8f9fa] transition-colors duration-150 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#f0f0f3] rounded-full flex items-center justify-center">
                  {transaction.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-[#1c2024] font-medium">{transaction.title}</span>
                  <span className="text-xs text-[#60646c]">{transaction.time}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#1c2024] font-medium">{transaction.amount}</span>
                <div className="w-2 h-2 bg-[#30a46c] rounded-full"></div>
              </div>
            </div>
            {index < transactions.length - 1 && <div className="h-px bg-[#e0e1e6] mx-4" />}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
