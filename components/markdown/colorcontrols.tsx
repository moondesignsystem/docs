"use client";
import React, { useState, useEffect } from "react";

const BG_KEY = "colorcontrols-backgroundBrand";
const TXT_KEY = "colorcontrols-textOnBrand";

const colorCombinations = [
  {
    name: "Combination 1 (default)",
    backgroundBrand: "#5b5bd6",
    textOnBrand: "#f2f2f2",
  },
  {
    name: "Combination 2",
    backgroundBrand: "#49B356",
    textOnBrand: "#FFFFFF",
  },
  {
    name: "Combination 3",
    backgroundBrand: "#F2590D",
    textOnBrand: "#FDFDFC",
  },
];

export default function ColorControls() {
  const [backgroundBrand, setBackgroundBrand] = useState(
    colorCombinations[0].backgroundBrand,
  );
  const [textOnBrand, setTextOnBrand] = useState(
    colorCombinations[0].textOnBrand,
  );

  useEffect(() => {
    if (typeof window !== "undefined" && document?.documentElement) {
      const storedBg = localStorage.getItem(BG_KEY);
      const storedTxt = localStorage.getItem(TXT_KEY);

      if (storedBg && /^#[0-9A-Fa-f]{6}$/.test(storedBg)) {
        setBackgroundBrand(storedBg);
      }
      if (storedTxt && /^#[0-9A-Fa-f]{6}$/.test(storedTxt)) {
        setTextOnBrand(storedTxt);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && document?.documentElement) {
      document.documentElement.style.setProperty(
        "--background-brand",
        backgroundBrand,
      );
      document.documentElement.style.setProperty(
        "--text-on-brand",
        textOnBrand,
      );
      localStorage.setItem(BG_KEY, backgroundBrand);
      localStorage.setItem(TXT_KEY, textOnBrand);
    }
  }, [backgroundBrand, textOnBrand]);

  const handleSelect = (bg) => {
    const combo = colorCombinations.find(
      (c) => c.backgroundBrand.toLowerCase() === bg.toLowerCase(),
    );
    if (combo) {
      setBackgroundBrand(combo.backgroundBrand);
      setTextOnBrand(combo.textOnBrand);
    }
  };

  return (
    <div
      style={{
        margin: "24px 0",
        display: "flex",
        gap: "1rem",
        alignItems: "center",
      }}
    >
      {colorCombinations.map(({ backgroundBrand: bgColor, name }) => (
        <button
          key={bgColor}
          onClick={() => handleSelect(bgColor)}
          title={name}
          aria-pressed={backgroundBrand === bgColor}
          style={{
            width: 40,
            height: 40,
            borderRadius: 6,
            border:
              backgroundBrand.toLowerCase() === bgColor.toLowerCase()
                ? "4px solid #000" // thick black border for active
                : "2px solid #ccc",
            backgroundColor: bgColor,
            cursor: "pointer",
            padding: 0,
            outline: "none",
          }}
        />
      ))}
    </div>
  );
}
