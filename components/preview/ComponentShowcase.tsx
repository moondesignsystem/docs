"use client";

import { useState, useEffect } from "react";
import "@/styles/component-showcase.css";
import { Button } from "@heathmont/moon-core-tw";

// Create Password Component
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
    <div className="component-card">
      <div className="component-header">
        <h2 className="component-title">Create a password</h2>
      </div>
      <div
        className="component-content-with-header"
        style={{ display: "flex", flexDirection: "column", gap: "24px" }}
      >
        <div style={{ position: "relative" }}>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            className="form-input form-input-with-icon"
          />
          <label
            htmlFor="password"
            className={`form-label ${passwordFocused || password ? "form-label-focused" : ""}`}
          >
            Password
          </label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#60646c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={showPassword ? "/eye-off-02.svg" : "/eye.svg"}
              alt={showPassword ? "Hide password" : "Show password"}
              style={{ width: "20px", height: "20px" }}
            />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {passwordRequirements.map((req, index) => (
            <div
              key={index}
              style={{ display: "flex", alignItems: "center", gap: "12px" }}
            >
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "var(--radius-md)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: req.met
                    ? "var(--background-brand)"
                    : "var(--background-secondary)",
                }}
              >
                <span
                  style={{
                    color: req.met ? "var(--text-on-brand)" : "#9ca3af",
                    fontSize: "12px",
                  }}
                >
                  ✓
                </span>
              </div>
              <span
                style={{
                  fontSize: "14px",
                  color: req.met ? "var(--text-brand)" : "#60646c",
                }}
              >
                {req.text}
              </span>
            </div>
          ))}
        </div>

        <div style={{ position: "relative" }}>
          <input
            id="repeat-password"
            type={showRepeatPassword ? "text" : "password"}
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            onFocus={() => setRepeatPasswordFocused(true)}
            onBlur={() => setRepeatPasswordFocused(false)}
            className="form-input form-input-with-icon"
          />
          <label
            htmlFor="repeat-password"
            className={`form-label ${repeatPasswordFocused || repeatPassword ? "form-label-focused" : ""}`}
          >
            Repeat password
          </label>
          <button
            type="button"
            onClick={() => setShowRepeatPassword(!showRepeatPassword)}
            style={{
              position: "absolute",
              right: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-secondary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={showRepeatPassword ? "/eye-off-02.svg" : "/eye.svg"}
              alt={showRepeatPassword ? "Hide password" : "Show password"}
              style={{ width: "20px", height: "20px" }}
            />
          </button>
        </div>
        <Button
          style={{
            background: "var(--background-brand)",
            color: "var(--text-on-brand)",
            borderRadius: "var(--radius-md)",
          }}
          size="xl"
          disabled={!isFormValid}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

// Notification Preferences Component
export function NotificationPreferences() {
  const [systemNotifications, setSystemNotifications] = useState(true);
  const [newMessages, setNewMessages] = useState(false);
  const [newPosts, setNewPosts] = useState(false);

  const toggles = [
    {
      label: "System notifications",
      enabled: systemNotifications,
      onChange: setSystemNotifications,
    },
    {
      label: "New messages",
      enabled: newMessages,
      onChange: setNewMessages,
    },
    {
      label: "New posts",
      enabled: newPosts,
      onChange: setNewPosts,
    },
  ];

  return (
    <div className="component-card">
      <div className="component-header">
        <h2 className="component-title">Notification preferences</h2>
      </div>
      <div
        className="component-content-with-header"
        style={{ display: "flex", flexDirection: "column", gap: "24px" }}
      >
        {toggles.map((toggle, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span className="text-primary" style={{ fontSize: "14px" }}>
              {toggle.label}
            </span>
            <button
              onClick={() => toggle.onChange(!toggle.enabled)}
              className={`toggle-switch ${toggle.enabled ? "toggle-switch-enabled" : "toggle-switch-disabled"}`}
            >
              <span
                className={`toggle-handle ${toggle.enabled ? "toggle-handle-enabled" : "toggle-handle-disabled"}`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Agent List Component
export function AgentList() {
  const [selectedAgents, setSelectedAgents] = useState<number[]>([0]);

  const agents = [
    {
      id: 0,
      name: "Sarah Chen",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fHww",
    },
    {
      id: 1,
      name: "Marcus Johnson",
      avatar:
        "https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "Elena Rodriguez",
      avatar:
        "https://plus.unsplash.com/premium_photo-1658527049634-15142565537a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww",
    },
  ];

  const toggleAgent = (agentId: number) => {
    setSelectedAgents((prev) =>
      prev.includes(agentId)
        ? prev.filter((id) => id !== agentId)
        : [...prev, agentId],
    );
  };

  return (
    <div className="component-card">
      <div style={{ padding: "0" }}>
        {agents.map((agent, index) => (
          <div key={agent.id}>
            <div
              onClick={() => toggleAgent(agent.id)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px",
                cursor: "pointer",
                transition: "background-color 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "var(--background-secondary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <img
                  src={agent.avatar || "/placeholder.svg"}
                  alt={agent.name}
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "var(--radius-md)",
                    objectFit: "cover",
                  }}
                />
                <span
                  className="text-primary"
                  style={{ fontSize: "14px", fontWeight: "500" }}
                >
                  {agent.name}
                </span>
              </div>
              <div
                className={`checkbox ${selectedAgents.includes(agent.id) ? "checkbox-checked" : "checkbox-unchecked"}`}
              >
                {selectedAgents.includes(agent.id) && (
                  <span style={{ color: "white", fontSize: "12px" }}>✓</span>
                )}
              </div>
            </div>
            {index < agents.length - 1 && (
              <div className="divider" style={{ margin: "0 16px" }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Placeholder with Snackbar Component
export function PlaceholderWithSnackbar() {
  const [showSnackbar, setShowSnackbar] = useState(true);

  useEffect(() => {
    if (!showSnackbar) {
      const timer = setTimeout(() => {
        setShowSnackbar(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showSnackbar]);

  return (
    <div
      className="component-card"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <div
        className="component-content"
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <div style={{ display: "flex", gap: "12px" }}>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="placeholder-shimmer animate-shimmer"
              style={{ height: "64px", flex: 1 }}
            />
          ))}
        </div>
        <div
          className="placeholder-shimmer animate-shimmer"
          style={{ height: "96px" }}
        />
      </div>

      {showSnackbar && (
        <div
          style={{
            position: "absolute",
            bottom: "24px",
            left: "16px",
            right: "16px",
          }}
        >
          <div className="snackbar">
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  WebkitMask: "url('/info-filled.svg') no-repeat center",
                  mask: "url('/info-filled.svg') no-repeat center",
                  backgroundColor: "var(--text-primary)",
                }}
                aria-label="Info"
              />
              <span className="snackbar-text">Saved to watchlist</span>
            </div>
            <button
              onClick={() => setShowSnackbar(false)}
              className="snackbar-button"
            >
              Undo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Payment Method Component
export function PaymentMethod() {
  const [selectedMethod, setSelectedMethod] = useState("visa");

  const paymentMethods = [
    { id: "visa", name: "•••• 5143", icon: "/visa-icon.svg" },
    { id: "apple-pay", name: "Apple Pay", icon: "/apple-pay-icon.svg" },
  ];

  return (
    <div className="component-card">
      <div className="component-header">
        <h2 className="component-title">Payment method</h2>
      </div>
      <div style={{ padding: "0", marginTop: "16px" }}>
        {paymentMethods.map((method, index) => (
          <div key={method.id}>
            <div
              onClick={() => setSelectedMethod(method.id)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px",
                cursor: "pointer",
                transition: "background-color 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "var(--background-secondary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <img
                  src={method.icon || "/placeholder.svg"}
                  alt={method.name}
                  style={{ width: "32px", height: "22px" }}
                />
                <span
                  className="text-primary"
                  style={{ fontSize: "14px", fontWeight: "500" }}
                >
                  {method.name}
                </span>
              </div>
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "var(--radius-md)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor:
                    selectedMethod === method.id
                      ? "var(--background-brand)"
                      : "transparent",
                }}
              >
                {selectedMethod === method.id && (
                  <span style={{ color: "white", fontSize: "12px" }}>✓</span>
                )}
              </div>
            </div>
            {index < paymentMethods.length - 1 && (
              <div className="divider" style={{ margin: "0 16px" }} />
            )}
          </div>
        ))}

        <div className="divider" style={{ margin: "0 16px" }} />

        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "16px",
            width: "100%",
            textAlign: "left",
            background: "none",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.15s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor =
              "var(--background-secondary)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          <span style={{ fontSize: "20px" }}>➕</span>
          <span
            className="text-primary"
            style={{ fontSize: "14px", fontWeight: "500" }}
          >
            Add new card
          </span>
        </button>
      </div>
    </div>
  );
}

// Transaction List Component
export function TransactionList() {
  const transactions = [
    {
      id: 1,
      type: "transfer",
      title: "Cash → Savings",
      time: "Today, 12:38PM",
      amount: "€50.00",
      icon: "/arrow-up-right.svg",
    },
    {
      id: 2,
      type: "deposit",
      title: "Deposit",
      time: "Today, 12:36PM",
      amount: "€50.00",
      icon: "/plus.svg",
    },
  ];

  return (
    <div className="component-card">
      <div style={{ padding: "0" }}>
        {transactions.map((transaction, index) => (
          <div key={transaction.id}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px",
                cursor: "pointer",
                transition: "background-color 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "var(--background-secondary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "var(--background-secondary)",
                    borderRadius: "var(--radius-md)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    role="img"
                    aria-label={
                      transaction.type === "transfer" ? "Transfer" : "Deposit"
                    }
                    style={{
                      display: "inline-block",
                      width: "16px",
                      height: "16px",
                      backgroundColor: "var(--text-primary)",
                      mask: `url(${transaction.icon || "/placeholder.svg"}) no-repeat center / contain`,
                      WebkitMask: `url(${transaction.icon || "/placeholder.svg"}) no-repeat center / contain`,
                    }}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    className="text-primary"
                    style={{ fontSize: "14px", fontWeight: "500" }}
                  >
                    {transaction.title}
                  </span>
                  <span className="text-secondary" style={{ fontSize: "12px" }}>
                    {transaction.time}
                  </span>
                </div>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span
                  className="text-primary"
                  style={{ fontSize: "14px", fontWeight: "500" }}
                >
                  {transaction.amount}
                </span>
              </div>
            </div>
            {index < transactions.length - 1 && (
              <div className="divider" style={{ margin: "0 16px" }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Order Summary Component
export function OrderSummary() {
  return (
    <div className="component-card">
      <div className="component-header">
        <h2 className="component-title">Order summary</h2>
      </div>
      <div
        className="component-content-with-header"
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 0",
            }}
          >
            <span className="text-primary" style={{ fontSize: "14px" }}>
              Subtotal
            </span>
            <span className="text-primary" style={{ fontSize: "14px" }}>
              32,80 €
            </span>
          </div>
          <div className="divider" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 0",
            }}
          >
            <span className="text-primary" style={{ fontSize: "14px" }}>
              Tips
            </span>
            <span className="text-primary" style={{ fontSize: "14px" }}>
              3,00 €
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 0",
            }}
          >
            <span
              className="text-primary"
              style={{ fontSize: "14px", fontWeight: "600" }}
            >
              Total
            </span>
            <span
              className="text-primary"
              style={{ fontSize: "14px", fontWeight: "600" }}
            >
              35,80 €
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Checkout Details Component
export function CheckoutDetails() {
  return (
    <div className="component-card">
      <div
        className="component-content"
        style={{ display: "flex", flexDirection: "column", gap: "24px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span className="text-secondary" style={{ fontSize: "12px" }}>
                Deliver to
              </span>
              <span
                className="text-primary"
                style={{ fontSize: "14px", fontWeight: "500" }}
              >
                14 Church Road, London
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            style={{
              color: "var(--text-primary)",
              background: "var(--background-secondary)",
              boxShadow: "none",
              borderRadius: "var(--radius-md)",
            }}
            size="sm"
          >
            Change
          </Button>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <img
              src="/apple-pay-icon.svg"
              alt="Apple Pay"
              style={{ width: "32px", height: "22px" }}
            />
            <span
              className="text-primary"
              style={{ fontSize: "14px", fontWeight: "500" }}
            >
              Apple Pay
            </span>
          </div>
          <Button
            variant="outline"
            style={{
              color: "var(--text-primary)",
              background: "var(--background-secondary)",
              boxShadow: "none",
              borderRadius: "var(--radius-md)",
            }}
            size="sm"
          >
            Change
          </Button>
        </div>

        <Button
          style={{
            background: "var(--background-brand)",
            color: "var(--text-on-brand)",
            borderRadius: "var(--radius-md)",
          }}
          size="xl"
        >
          Checkout
        </Button>
      </div>
    </div>
  );
}

// Sign Up Form Component
export function SignUpForm() {
  const [fullName, setFullName] = useState("Jennifer Green");
  const [alias, setAlias] = useState("Jen");
  const [bio, setBio] = useState("");

  return (
    <div className="component-card">
      <div className="component-header">
        <h2 className="component-title">Sign up</h2>
      </div>
      <div
        className="component-content-with-header"
        style={{ display: "flex", flexDirection: "column", gap: "24px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label
              className="text-primary"
              style={{ fontSize: "14px", fontWeight: "500" }}
            >
              Full name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={{
                width: "100%",
                borderRadius: "var(--radius-md)",
                height: "48px",
                fontSize: "14px",
                padding: "0 16px",
                outline: "none",
                background: "var(--background-secondary)",
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label
              className="text-primary"
              style={{ fontSize: "14px", fontWeight: "500" }}
            >
              Alias
            </label>
            <input
              type="text"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              style={{
                width: "100%",
                borderRadius: "var(--radius-md)",
                height: "48px",
                fontSize: "14px",
                padding: "0 16px",
                outline: "none",
                background: "var(--background-secondary)",
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label
            className="text-primary"
            style={{ fontSize: "14px", fontWeight: "500" }}
          >
            Bio
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            style={{
              width: "100%",
              borderRadius: "var(--radius-md)",
              height: "80px",
              fontSize: "14px",
              padding: "12px 16px",
              resize: "none",
              outline: "none",
              background: "var(--background-secondary)",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "16px", paddingTop: "16px" }}>
          <Button
            variant="outline"
            size="xl"
            style={{
              background: "var(--background-secondary)",
              color: "var(--text-primary)",
              flex: 1,
              borderRadius: "var(--radius-md)",
              boxShadow: "none",
            }}
          >
            Previous
          </Button>
          <Button
            size="xl"
            style={{
              background: "var(--background-brand)",
              color: "var(--text-on-brand)",
              flex: 1,
              borderRadius: "var(--radius-md)",
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

// Sort Chips Component
export function SortChips() {
  const [selectedChips, setSelectedChips] = useState<string[]>([
    "best-value",
    "popularity",
  ]);

  const chips = [
    { id: "best-value", label: "Best value" },
    { id: "popularity", label: "Popularity" },
    { id: "price", label: "Price" },
    { id: "rating", label: "Rating" },
    { id: "recently-added", label: "Recently added" },
  ];

  const toggleChip = (chipId: string) => {
    setSelectedChips((prev) =>
      prev.includes(chipId)
        ? prev.filter((id) => id !== chipId)
        : [...prev, chipId],
    );
  };

  return (
    <div className="component-card">
      <div className="component-header">
        <h2 className="component-title">Sort by</h2>
      </div>
      <div className="component-content-with-header">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
          {chips.map((chip) => (
            <button
              key={chip.id}
              onClick={() => toggleChip(chip.id)}
              className={`chip ${selectedChips.includes(chip.id) ? "chip-selected" : "chip-unselected"}`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Main Component Showcase
export default function ComponentShowcase() {
  return (
    <div className="showcase-container">
      <div className="showcase-columns">
        <div className="showcase-column">
          <CreatePassword />
          <NotificationPreferences />
          <AgentList />
        </div>

        <div className="showcase-column">
          <PlaceholderWithSnackbar />
          <PaymentMethod />
          <TransactionList />
        </div>

        <div className="showcase-column">
          <OrderSummary />
          <CheckoutDetails />
        </div>

        <div className="showcase-column">
          <SignUpForm />
          <SortChips />
        </div>
      </div>
    </div>
  );
}
