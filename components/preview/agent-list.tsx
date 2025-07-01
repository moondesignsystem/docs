"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"

export function AgentList() {
  const [selectedAgents, setSelectedAgents] = useState<number[]>([0]) // First agent selected by default

  const agents = [
    {
      id: 0,
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=48&width=48",
    },
    {
      id: 1,
      name: "Marcus Johnson",
      avatar: "/placeholder.svg?height=48&width=48",
    },
    {
      id: 2,
      name: "Elena Rodriguez",
      avatar: "/placeholder.svg?height=48&width=48",
    },
  ]

  const toggleAgent = (agentId: number) => {
    setSelectedAgents((prev) => (prev.includes(agentId) ? prev.filter((id) => id !== agentId) : [...prev, agentId]))
  }

  return (
    <Card className="bg-[#ffffff] border-[#e0e1e6] w-[414px]">
      <CardContent className="p-0">
        {agents.map((agent, index) => (
          <div key={agent.id}>
            <div
              onClick={() => toggleAgent(agent.id)}
              className="flex items-center justify-between px-4 py-4 cursor-pointer hover:bg-[#f8f9fa] transition-colors duration-150"
            >
              <div className="flex items-center gap-3">
                <img
                  src={agent.avatar || "/placeholder.svg"}
                  alt={agent.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span className="text-sm text-[#1c2024] font-medium">{agent.name}</span>
              </div>
              <div
                className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                  selectedAgents.includes(agent.id)
                    ? "bg-[#5b5bd6] border-[#5b5bd6]"
                    : "bg-transparent border-[#cdced6]"
                }`}
              >
                {selectedAgents.includes(agent.id) && <Check className="h-3 w-3 text-white" strokeWidth={2.5} />}
              </div>
            </div>
            {index < agents.length - 1 && <div className="h-px bg-[#e0e1e6] mx-4" />}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
