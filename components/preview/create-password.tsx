"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Check } from "lucide-react";

export function CreatePassword() {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [repeatPasswordFocused, setRepeatPasswordFocused] = useState(false);

  const passwordRequirements = [
    { text: "At least 8 characters", met: password.length >= 8 },
    { text: "At least 1 number", met: /\d/.test(password) },
    { text: "At least 1 upper case letter", met: /[A-Z]/.test(password) },
  ];

  const isPasswordValid = passwordRequirements.every((req) => req.met);
  const isFormValid =
    isPasswordValid && repeatPassword === password && repeatPassword.length > 0;

  return (
    <Card className="bg-[#ffffff] border-[#e0e1e6] w-[414px]">
      <CardHeader className="px-4 py-4 pb-0">
        <CardTitle className="text-[#1c2024] text-lg font-semibold">
          Create a password
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 py-4 pt-6 space-y-6">
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            className="w-full pr-12 border border-[#cdced6] rounded-xl h-14 text-sm bg-[#fcfcfd] px-4 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-[#5b5bd6] focus:border-transparent"
          />
          <label
            htmlFor="password"
            className={`absolute left-4 text-[#60646c] pointer-events-none transition-all duration-200 ${
              passwordFocused || password
                ? "top-2 text-xs font-medium"
                : "top-1/2 -translate-y-1/2 text-sm"
            }`}
          >
            Password
          </label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#60646c] hover:text-[#1c2024]"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        <div className="space-y-3">
          {passwordRequirements.map((req, index) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  req.met ? "bg-[#30a46c]" : "bg-[#e0e1e6]"
                }`}
              >
                <Check
                  className={`h-3 w-3 ${req.met ? "text-white" : "text-[#9ca3af]"}`}
                  strokeWidth={2.5}
                />
              </div>
              <span
                className={`text-sm ${req.met ? "text-[#30a46c]" : "text-[#60646c]"}`}
              >
                {req.text}
              </span>
            </div>
          ))}
        </div>

        <div className="relative">
          <input
            id="repeat-password"
            type={showRepeatPassword ? "text" : "password"}
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            onFocus={() => setRepeatPasswordFocused(true)}
            onBlur={() => setRepeatPasswordFocused(false)}
            className="w-full pr-12 border border-[#cdced6] rounded-xl h-14 text-sm bg-[#fcfcfd] px-4 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-[#5b5bd6] focus:border-transparent"
          />
          <label
            htmlFor="repeat-password"
            className={`absolute left-4 text-[#60646c] pointer-events-none transition-all duration-200 ${
              repeatPasswordFocused || repeatPassword
                ? "top-2 text-xs font-medium"
                : "top-1/2 -translate-y-1/2 text-sm"
            }`}
          >
            Repeat password
          </label>
        </div>

        <Button
          disabled={!isFormValid}
          className={`w-full h-14 text-base font-medium rounded-xl transition-all duration-150 ${
            isFormValid
              ? "bg-[#5b5bd6] hover:bg-[#5753c6] text-white active:scale-95 active:bg-[#4f4bc2]"
              : "bg-[#5b5bd6] text-white opacity-60 cursor-not-allowed hover:bg-[#5b5bd6]"
          }`}
        >
          Continue
        </Button>
      </CardContent>
    </Card>
  );
}
