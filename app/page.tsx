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
        <div className="relative z-10 flex flex-col gap-4 items-center justify-around text-center h-[calc(100vh-64px)] pb-24 sm:pb-32">
          <RiveComponent className="size-48 sm:size-96" />
          <div className="flex flex-col items-center gap-4 z-10 max-w-screen-xl">
            <h1 className="text-6xl lg:text-8xl font-medium tracking-[-0.0625rem] text-center">
              Build the best digital experiences
            </h1>
            <p className="text-md lg:text-lg font-normal text-center max-w-3xl">
              Moon Design System is an open-source, complete design system.
              It&apos;s built to help product teams across the world build
              better digital experiences.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
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
