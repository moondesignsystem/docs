"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function SignUpForm() {
  const [fullName, setFullName] = useState("Jennifer Green")
  const [alias, setAlias] = useState("Jen")
  const [bio, setBio] = useState("")

  return (
    <Card className="bg-[#ffffff] border-[#e0e1e6] w-[414px]">
      <CardHeader className="px-4 py-4 pb-0">
        <CardTitle className="text-[#1c2024] text-lg font-semibold">Sign up</CardTitle>
      </CardHeader>
      <CardContent className="px-4 py-4 pt-6 space-y-6">
        {/* Progress Bar */}
        <div className="w-full h-2 bg-[#e0e1e6] rounded-full overflow-hidden">
          <div className="w-3/5 h-full bg-[#5b5bd6] rounded-full"></div>
        </div>

        {/* Name Fields Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-[#1c2024] font-medium">Full name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-[#cdced6] rounded-xl h-12 text-sm bg-[#fcfcfd] px-4 focus:outline-none focus:ring-2 focus:ring-[#5b5bd6] focus:border-transparent"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-[#1c2024] font-medium">Alias</label>
            <input
              type="text"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              className="w-full border border-[#cdced6] rounded-xl h-12 text-sm bg-[#fcfcfd] px-4 focus:outline-none focus:ring-2 focus:ring-[#5b5bd6] focus:border-transparent"
            />
          </div>
        </div>

        {/* Bio Field */}
        <div className="space-y-2">
          <label className="text-sm text-[#1c2024] font-medium">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full border border-[#cdced6] rounded-xl h-20 text-sm bg-[#fcfcfd] px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#5b5bd6] focus:border-transparent"
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            variant="outline"
            className="flex-1 h-12 text-sm font-medium rounded-xl border-[#cdced6] text-[#1c2024] hover:bg-[#f8f9fa] active:scale-95 bg-transparent"
          >
            Previous
          </Button>
          <Button className="flex-1 h-12 text-sm font-medium rounded-xl bg-[#5b5bd6] hover:bg-[#5753c6] text-white active:scale-95 active:bg-[#4f4bc2] transition-all duration-150">
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
