"use client";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import StarryBackground from "@/components/StarryBackground";
import { useRive } from "@rive-app/react-canvas";

export default function HomePageClient() {
  const { RiveComponent } = useRive({
    src: "/moon.riv",
    stateMachines: "Rest",
    autoplay: true,
  });

  return (
    <>
      <div className="relative w-full">
        <StarryBackground
          starCount={1000}
          backgroundColor="#020617"
          flickerSpeed={0.004}
        />
        <div className="relative z-10 flex flex-col items-center justify-between text-center h-[calc(100vh-64px)] px-4 pt-0 pb-24 sm:pb-32">
          <RiveComponent className="w-[280px] h-[280px] sm:w-[400px] sm:h-[400px]" />
          <div className="flex flex-col items-center gap-4 z-10">
            <h1 className="text-5xl lg:text-6xl font-medium tracking-[-0.0625rem] text-center">
              Build the best digital experiences
            </h1>
            <p className="text-lg font-normal text-center max-w-3xl mb-4">
              Moon Design System is an open-source, complete design system.
              It&apos;s built to help product teams across the world build
              better digital experiences.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/docs/get-started/introduction"
                className={buttonVariants({ variant: "glassy", size: "xl" })}
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
