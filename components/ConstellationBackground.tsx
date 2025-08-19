// components/ConstellationBackground.tsx

"use client"; // This component must run on the client-side

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes"; // 1. Import the useTheme hook

const ConstellationBackground = () => {
  const [shadowsSmall, setShadowsSmall] = useState("");
  const [shadowsMedium, setShadowsMedium] = useState("");
  const [shadowsBig, setShadowsBig] = useState("");
  const { theme } = useTheme(); // 2. Get the current theme from the hook

  useEffect(() => {
    // This function generates a long string for the box-shadow property.
    const generateShadows = (n: number, color: string) => {
      let value = "";
      const width = window.innerWidth;
      const height = window.innerHeight;
      for (let i = 0; i < n; i++) {
        value += `${Math.random() * width}px ${Math.random() * height}px ${color}`;
        if (i < n - 1) {
          value += ", ";
        }
      }
      return value;
    };

    // --- NEW SIMPLIFIED LOGIC ---
    // Directly check the theme state to determine the star color.
    // This is more reliable than reading CSS variables.
    const starColor = theme === "light" ? "#000000" : "#FFFFFF";

    // Generate the shadows for each star layer using the correct color
    setShadowsSmall(generateShadows(700, starColor));
    setShadowsMedium(generateShadows(200, starColor));
    setShadowsBig(generateShadows(100, starColor));
  }, [theme]); // 3. Re-run this effect whenever the theme changes

  return (
    <>
      <div id="stars" style={{ boxShadow: shadowsSmall }}></div>
      <div id="stars2" style={{ boxShadow: shadowsMedium }}></div>
      <div id="stars3" style={{ boxShadow: shadowsBig }}></div>

      <style jsx global>{`
        #stars,
        #stars2,
        #stars3 {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: transparent;
          z-index: -1;
          transition: box-shadow 0.5s ease-in-out; /* Add a smooth transition for color changes */
        }

        #stars {
          width: 1px;
          height: 1px;
          animation: animStar 50s linear infinite;
        }
        #stars:after {
          content: " ";
          position: absolute;
          top: 2000px;
          width: 1px;
          height: 1px;
          background: transparent;
          box-shadow: inherit;
        }

        #stars2 {
          width: 2px;
          height: 2px;
          animation: animStar 100s linear infinite;
        }
        #stars2:after {
          content: " ";
          position: absolute;
          top: 2000px;
          width: 2px;
          height: 2px;
          background: transparent;
          box-shadow: inherit;
        }

        #stars3 {
          width: 3px;
          height: 3px;
          animation: animStar 150s linear infinite;
        }
        #stars3:after {
          content: " ";
          position: absolute;
          top: 2000px;
          width: 3px;
          height: 3px;
          background: transparent;
          box-shadow: inherit;
        }

        @keyframes animStar {
          from {
            transform: translateY(0px);
          }
          to {
            transform: translateY(-2000px);
          }
        }
      `}</style>
    </>
  );
};

export default ConstellationBackground;
