// file: app/home-page-client.tsx

"use client";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import StarryBackground from "@/components/StarryBackground";
import { useRive } from "@rive-app/react-canvas";

export default function HomePageClient() {
  const { RiveComponent, rive } = useRive({
    src: "/moon-docs/moon.riv", // This line has been updated
    stateMachines: "Rotate",
    autoplay: true,
  });

  const handleMouseEnter = () => {
    if (rive) {
      rive.pause();
    }
  };

  const handleMouseLeave = () => {
    if (rive) {
      rive.play();
    }
  };

  return (
    <div className="relative w-full">
      <StarryBackground
        starCount={1000}
        backgroundColor="#020617"
        flickerSpeed={0.004}
      />
      <div className="flex flex-col sm:items-center text-center h-[calc(100vh-64px)] justify-center">
        <div>
          <RiveComponent
            className="w-[400px] h-[400px] cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </div>
        <div className="flex flex-col items-center gap-4 z-10 py-24">
          <h1 className="text-8xl lg:text-8xl font-extrabold tracking-[-0.0625rem] text-center mb-4">
            Build the best digital experiences
          </h1>
          <div className="flex flex-col gap-0 text-center items-center">
            <p className="text-lg font-normal text-center max-w-3xl mb-8">
              Moon Design System is an open-source, complete design system.
              It&apos;s built to help product teams across the world build
              better digital experiences.
            </p>
            <div className="sm:flex sm:flex-row grid grid-cols-2 items-center sm;gap-5 gap-3 mb-8">
              <Link
                href="/docs/get-started/introduction"
                className={buttonVariants({ size: "xl" })}
              >
                Get started
              </Link>
              <Link
                href="/knowledgebase"
                className={buttonVariants({ variant: "secondary", size: "xl" })}
              >
                Knowledgebase
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
