"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/preview/ui/card";

export function PlaceholderWithSnackbar() {
  const [showSnackbar, setShowSnackbar] = useState(true);

  // Reappear snackbar after 1.5 seconds when dismissed
  useEffect(() => {
    if (!showSnackbar) {
      const timer = setTimeout(() => {
        setShowSnackbar(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showSnackbar]);

  return (
    <Card className="bg-[#ffffff] border-[#e0e1e6] w-[414px] relative overflow-hidden">
      <CardContent className="px-4 py-4 space-y-4">
        {/* Top row of small placeholders */}
        <div className="flex gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-16 flex-1 bg-gradient-to-r from-[#f0f0f3] via-[#e0e1e6] to-[#f0f0f3] bg-[length:200%_100%] animate-shimmer rounded-lg"
            />
          ))}
        </div>

        {/* Large placeholder */}
        <div className="h-24 bg-gradient-to-r from-[#f0f0f3] via-[#e0e1e6] to-[#f0f0f3] bg-[length:200%_100%] animate-shimmer rounded-lg" />
      </CardContent>

      {/* Snackbar overlay - positioned inside the card */}
      {showSnackbar && (
        <div className="absolute bottom-6 left-4 right-4">
          <div className="bg-[#edf2fe] border border-[#5b5bd6] rounded-xl p-4 flex items-center justify-between shadow-lg animate-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center gap-3">
              <img src="/info-filled.svg" alt="Info" className="w-5 h-5" />
              <span className="text-sm font-medium text-[#5b5bd6]">
                Saved to watchlist
              </span>
            </div>
            <button
              onClick={() => setShowSnackbar(false)}
              className="text-sm font-medium text-[#5b5bd6] hover:text-[#5753c6] transition-colors duration-150"
            >
              Undo
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}
