import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import StarryBackground from "@/components/StarryBackground"; // Adjust the import path as needed

export const metadata = {
  title: "Moon Design System - Build the best digital experiences",
  description:
    "Moon Design System is an open-source, complete design system built to help product teams across the world build better digital experiences.",
};

export default function Home() {
  return (
    // Use a div as a relative container to avoid nested <main> tags
    <div className="relative w-full">
      <StarryBackground
        starCount={1000}
        backgroundColor="#020617" // A dark blue that matches modern themes
        flickerSpeed={0.004}
      />
      <div className="flex flex-col sm:items-center text-center h-[calc(100vh-64px)] justify-center">
        <div>
          <Image
            src="/moon-docs/moon-3d-logo.png"
            alt="Moon Design System"
            width={400}
            height={400}
            priority
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
