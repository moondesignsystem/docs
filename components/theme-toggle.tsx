"use client";

import * as React from "react";
import { Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

import { Icon } from "@heathmont/moon-react-assets";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  // Don't render theme toggle on home page
  if (pathname === "/") {
    return null;
  }

  return (
    <button
      className="moon-icon-button moon-icon-button-ghost moon-icon-button-neutral"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Icon name={theme === "dark" ? "moon" : "sun"} className="" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
