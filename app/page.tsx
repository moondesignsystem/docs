"use client";

import Link from "next/link";
import StarryBackground from "@/components/StarryBackground";
import { useRive } from "@rive-app/react-canvas";
import { useEffect } from "react";
import { useTheme } from "next-themes";

export default function HomePageClient() {
  const { setTheme, theme } = useTheme();

  // Force dark mode on the home page
  useEffect(() => {
    const originalColorScheme = document.documentElement.style.colorScheme;
    const originalTheme = theme;

    // Force dark mode
    document.documentElement.style.colorScheme = "dark";
    document.documentElement.classList.add("dark-theme");
    document.documentElement.classList.remove("light-theme");
    setTheme("dark");

    return () => {
      // Restore original state when leaving the page
      document.documentElement.style.colorScheme = originalColorScheme;
      if (originalTheme) {
        setTheme(originalTheme);
      }
    };
  }, [setTheme, theme]);
  const { RiveComponent } = useRive({
    src: "/moon.riv",
    stateMachines: "Rest",
    autoplay: true,
  });

  return (
    <>
      <div className="relative w-full dark">
        <StarryBackground
          starCount={1000}
          backgroundColor="#020617"
          flickerSpeed={0.004}
        />
        <div className="relative z-10 flex flex-col gap-4 items-center justify-around text-center h-[calc(100vh-64px)] pb-24 sm:pb-32">
          <RiveComponent className="size-48 sm:size-96" />
          <div className="flex flex-col items-center gap-6 z-10 max-w-screen-xl">
            <h1 className="text-4xl lg:text-8xl font-medium text-center">
              Build the best digital experiences
            </h1>
            <p className="text-md lg:text-lg text-center max-w-3xl mb-4">
              Moon Design System is an open-source, complete design system.
              It&apos;s built to help product teams across the world build
              better digital experiences.
            </p>
            <Link
              href="/docs/get-started/introduction"
              className="moon-button moon-button-xl"
            >
              Get started
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
