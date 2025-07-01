"use client"

import { CreatePassword } from "./create-password"
import { NotificationPreferences } from "./notification-preferences"
import { AgentList } from "./agent-list"
import { PlaceholderWithSnackbar } from "./placeholder-with-snackbar"
import { PaymentMethod } from "./payment-method"
import { TransactionList } from "./transaction-list"
import { OrderSummary } from "./order-summary"
import { CheckoutDetails } from "./checkout-details"
import { SignUpForm } from "./sign-up-form"
import { SortChips } from "./sort-chips"

export function ComponentShowcase() {
  return (
    <div className="min-h-screen w-full bg-[#f2f2f2] p-6">
      <div className="flex justify-center gap-6">
        {/* Column 1 */}
        <div className="flex flex-col gap-6">
          <CreatePassword />
          <NotificationPreferences />
          <AgentList />
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-6">
          <PlaceholderWithSnackbar />
          <PaymentMethod />
          <TransactionList />
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-6">
          <OrderSummary />
          <CheckoutDetails />
        </div>

        {/* Column 4 */}
        <div className="flex flex-col gap-6">
          <SignUpForm />
          <SortChips />
        </div>
      </div>
    </div>
  )
}
