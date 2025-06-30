"use client";
import React, { useState, useEffect } from "react";

const BG_KEY = "colorcontrols-backgroundBrand";
const TXT_KEY = "colorcontrols-textOnBrand";

export default function ColorControls() {
  const [backgroundBrand, setBackgroundBrand] = useState("#5B3DF6");
  const [textOnBrand, setTextOnBrand] = useState("#FFFFFF");

  useEffect(() => {
    // Only run in browser
    if (typeof window !== "undefined" && document?.documentElement) {
      // Try to load from localStorage first
      const storedBg = localStorage.getItem(BG_KEY);
      const storedTxt = localStorage.getItem(TXT_KEY);

      if (storedBg && /^#[0-9A-Fa-f]{6}$/.test(storedBg)) {
        setBackgroundBrand(storedBg);
      } else {
        const bg =
          getComputedStyle(document.documentElement).getPropertyValue(
            "--background-brand"
          ) || "#5B3DF6";
        setBackgroundBrand(bg.trim() || "#5B3DF6");
      }

      if (storedTxt && /^#[0-9A-Fa-f]{6}$/.test(storedTxt)) {
        setTextOnBrand(storedTxt);
      } else {
        const txt =
          getComputedStyle(document.documentElement).getPropertyValue(
            "--text-on-brand"
          ) || "#FFFFFF";
        setTextOnBrand(txt.trim() || "#FFFFFF");
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && document?.documentElement) {
      document.documentElement.style.setProperty(
        "--background-brand",
        backgroundBrand
      );
      document.documentElement.style.setProperty("--text-on-brand", textOnBrand);
      // Save to localStorage
      localStorage.setItem(BG_KEY, backgroundBrand);
      localStorage.setItem(TXT_KEY, textOnBrand);
    }
  }, [backgroundBrand, textOnBrand]);

  return (
    <div
      style={{
        margin: "24px 0",
        display: "flex",
        gap: "2rem",
        alignItems: "center",
      }}
    >
      <label>
        <span style={{ marginRight: 8 }}>Brand:</span>
        <input
          type="color"
          value={backgroundBrand.trim()}
          onChange={(e) => setBackgroundBrand(e.target.value)}
        />
      </label>
      <label>
        <span style={{ marginRight: 8 }}>Text:</span>
        <input
          type="color"
          value={textOnBrand.trim()}
          onChange={(e) => setTextOnBrand(e.target.value)}
        />
      </label>
      <button
        type="button"
        style={{
          padding: "0.5rem 1rem",
          border: "1px solid #ccc",
          borderRadius: "4px",
          background: "#f5f5f5",
          cursor: "pointer",
        }}
        onClick={() => {
          setBackgroundBrand("#5B3DF6");
          setTextOnBrand("#FFFFFF");
          // Also clear from localStorage
          localStorage.removeItem(BG_KEY);
          localStorage.removeItem(TXT_KEY);
        }}
      >
        Reset
      </button>
    </div>
  );
}