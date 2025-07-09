"use client";

import { Card, CardContent } from "@/components/preview/ui/card";
import { Button } from "@/components/ui/button";

export function CheckoutDetails() {
  return (
    <Card className="bg-[#ffffff] border-[#e0e1e6] w-[414px]">
      <CardContent className="px-4 py-4 space-y-6">
        {/* Delivery Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/location.svg" alt="Location" className="w-6 h-6" />
            <div className="flex flex-col">
              <span className="text-xs text-[#60646c]">Deliver to</span>
              <span className="text-sm text-[#1c2024] font-medium">
                14 Church Road, London
              </span>
            </div>
          </div>
          <button className="px-2 h-8 bg-[#f0f0f3] hover:bg-[#e0e1e6] text-sm text-[#1c2024] font-medium rounded-lg transition-colors duration-150 active:scale-95">
            Change
          </button>
        </div>

        {/* Payment Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/apple-pay-icon.svg"
              alt="Apple Pay"
              className="w-8 h-6"
            />
            <span className="text-sm text-[#1c2024] font-medium">
              Apple Pay
            </span>
          </div>
          <button className="px-2 h-8 bg-[#f0f0f3] hover:bg-[#e0e1e6] text-sm text-[#1c2024] font-medium rounded-lg transition-colors duration-150 active:scale-95">
            Change
          </button>
        </div>

        {/* Checkout Button */}
        <Button className="w-full h-14 text-base font-medium rounded-xl bg-[#5b5bd6] hover:bg-[#5753c6] text-white active:scale-95 active:bg-[#4f4bc2] transition-all duration-150">
          Checkout
        </Button>
      </CardContent>
    </Card>
  );
}
