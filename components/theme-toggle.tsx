"use client";

import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@heathmont/moon-react-assets";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (pathname === "/") {
    return null;
  }

  if (!mounted) {
    return null;
  }

  return (
    <button
      className="moon-icon-button moon-icon-button-ghost moon-icon-button-neutral"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Icon name={theme === "dark" ? "moon" : "sun"} />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
