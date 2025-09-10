"use client";
import React, { useEffect, useState } from "react";
import "@/styles/globals.css";

export default function ColorControls() {
  const [selectedComboId, setSelectedComboId] = useState("default");
  const [selectedRadius, setSelectedRadius] = useState("md");

  useEffect(() => {
    // Color switching
    if (selectedComboId === "default") {
      document.documentElement.style.removeProperty("--background-primary");
      document.documentElement.style.removeProperty("--background-secondary");
      document.documentElement.style.removeProperty("--background-brand");
      document.documentElement.style.removeProperty(
        "--background-brand-subtle"
      );
      document.documentElement.style.removeProperty("--text-primary");
      document.documentElement.style.removeProperty("--text-brand");
      document.documentElement.style.removeProperty("--text-on-brand");
    } else if (selectedComboId === "green") {
      document.documentElement.style.setProperty(
        "--background-primary",
        "var(--theme-2-background-primary)"
      );
      document.documentElement.style.setProperty(
        "--background-secondary",
        "var(--theme-2-background-secondary)"
      );
      document.documentElement.style.setProperty(
        "--background-brand",
        "var(--theme-2-background-brand)"
      );
      document.documentElement.style.setProperty(
        "--background-brand-subtle",
        "var(--theme-2-background-brand-subtle)"
      );
      document.documentElement.style.setProperty(
        "--text-primary",
        "var(--theme-2-text-primary)"
      );
      document.documentElement.style.setProperty(
        "--text-brand",
        "var(--theme-2-text-brand)"
      );
      document.documentElement.style.setProperty(
        "--text-on-brand",
        "var(--theme-2-text-on-brand)"
      );
    } else if (selectedComboId === "orange") {
      document.documentElement.style.setProperty(
        "--background-primary",
        "var(--theme-3-background-primary)"
      );
      document.documentElement.style.setProperty(
        "--background-secondary",
        "var(--theme-3-background-secondary)"
      );
      document.documentElement.style.setProperty(
        "--background-brand",
        "var(--theme-3-background-brand)"
      );
      document.documentElement.style.setProperty(
        "--background-brand-subtle",
        "var(--theme-3-background-brand-subtle)"
      );
      document.documentElement.style.setProperty(
        "--text-primary",
        "var(--theme-3-text-primary)"
      );
      document.documentElement.style.setProperty(
        "--text-brand",
        "var(--theme-3-text-brand)"
      );
      document.documentElement.style.setProperty(
        "--text-on-brand",
        "var(--theme-3-text-on-brand)"
      );
    }
  }, [selectedComboId]);

  useEffect(() => {
    // Radius switching
    if (selectedRadius === "xs") {
      document.documentElement.style.setProperty("--radius-xs", "0px");
      document.documentElement.style.setProperty("--radius-md", "0px");
      document.documentElement.style.setProperty("--radius-xl", "0px");
    } else if (selectedRadius === "md") {
      document.documentElement.style.setProperty("--radius-xs", "4px");
      document.documentElement.style.setProperty("--radius-md", "12px");
      document.documentElement.style.setProperty("--radius-xl", "24px");
    } else if (selectedRadius === "xl") {
      document.documentElement.style.setProperty("--radius-xs", "12px");
      document.documentElement.style.setProperty("--radius-md", "24px");
      document.documentElement.style.setProperty("--radius-xl", "48px");
    }
  }, [selectedRadius]);

  return (
    <div
      style={{
        margin: "24px 0",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {/* Color controls */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        {/* Button 1 - Default */}
        <button
          onClick={() => setSelectedComboId("default")}
          aria-pressed={selectedComboId === "default"}
          title="Combination 1 (default)"
          style={{
            width: 40,
            height: 40,
            borderRadius: 6,
            backgroundColor: "#5b5bd6",
            cursor: "pointer",
            padding: 0,
            outline: "none",
          }}
        />

        {/* Button 2 - Green */}
        <button
          onClick={() => setSelectedComboId("green")}
          aria-pressed={selectedComboId === "green"}
          title="Combination 2 (green)"
          style={{
            width: 40,
            height: 40,
            borderRadius: 6,
            backgroundColor: "var(--theme-2-background-brand)",
            cursor: "pointer",
            padding: 0,
            outline: "none",
          }}
        />

        {/* Button 3 - Orange */}
        <button
          onClick={() => setSelectedComboId("orange")}
          aria-pressed={selectedComboId === "orange"}
          title="Combination 3 (orange)"
          style={{
            width: 40,
            height: 40,
            borderRadius: 6,
            backgroundColor: "var(--theme-3-background-brand)",
            cursor: "pointer",
            padding: 0,
            outline: "none",
          }}
        />
      </div>

      {/* Radius controls */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        {/* Radius XS */}
        <button
          onClick={() => setSelectedRadius("xs")}
          aria-pressed={selectedRadius === "xs"}
          title="Radius XS"
          style={{
            width: 80,
            height: 40,
            border:
              selectedRadius === "xs"
                ? "1px solid var(--color-border-primary)"
                : "0px solid var(--color-border-secondary)",
            borderRadius: "0px",
            background: "var(--color-background-secondary)",
            cursor: "pointer",
            padding: 0,
            outline: "none",
          }}
        />

        {/* Radius MD */}
        <button
          onClick={() => setSelectedRadius("md")}
          aria-pressed={selectedRadius === "md"}
          title="Radius MD"
          style={{
            width: 80,
            height: 40,
            border:
              selectedRadius === "md"
                ? "1px solid var(--color-border-primary)"
                : "0px solid var(--color-border-secondary)",
            borderRadius: "12px",
            background: "var(--color-background-secondary)",
            cursor: "pointer",
            padding: 0,
            outline: "none",
          }}
        />

        {/* Radius XL */}
        <button
          onClick={() => setSelectedRadius("xl")}
          aria-pressed={selectedRadius === "xl"}
          title="Radius XL"
          style={{
            width: 80,
            height: 40,
            border:
              selectedRadius === "xl"
                ? "1px solid var(--color-border-primary)"
                : "0px solid var(--color-border-secondary)",
            borderRadius: "24px",
            background: "var(--color-background-secondary)",
            cursor: "pointer",
            padding: 0,
            outline: "none",
          }}
        />
      </div>
    </div>
  );
}
