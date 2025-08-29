"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

export function HomePageThemeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    if (pathname === "/") {
      // Force dark theme on home page
      if (theme !== "dark") {
        setTheme("dark");
      }
      
      // Add a class to the body to override theme specifically for home page
      document.body.classList.add("homepage-dark-mode");
    } else {
      // Remove the override class when not on home page
      document.body.classList.remove("homepage-dark-mode");
    }

    // Cleanup function
    return () => {
      if (pathname === "/") {
        document.body.classList.remove("homepage-dark-mode");
      }
    };
  }, [pathname, setTheme, theme]);

  return <>{children}</>;
}
