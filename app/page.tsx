import { buttonVariants } from "@/components/ui/button";
import ColorControls from "@/components/markdown/colorcontrols";
import ComponentShowcase from "@/components/preview/ComponentShowcase";
import Link from "next/link";

export const metadata = {
  title: "Moon Design System - Build the best digital experiences",
  description:
    "Moon Design System is an open-source, complete design system built to help product teams across the world build better digital experiences.",
};

export default function Home() {
  return (
    <div className="flex flex-col sm:items-center text-center h-[calc(100vh-64px)] ">
      <div className="flex flex-col items-center pt-40">
        <h1 className="text-3xl lg:text-5xl font-extrabold tracking-[-0.0625rem] text-center mb-4">
          Build the best digital experiences
        </h1>
        <p className="text-lg font-normal text-center max-w-3xl mb-8">
          Moon Design System is an open-source, complete design system.
          It&apos;s built to help product teams across the world build better
          digital experiences.
        </p>
        <div className="sm:flex sm:flex-row grid grid-cols-2 items-center sm;gap-5 gap-3 mb-8">
          <Link
            href="/docs/get-started/introduction"
            className={buttonVariants({ className: "px-6", size: "lg" })}
          >
            Get Started
          </Link>
          <Link
            href="/playground"
            className={buttonVariants({
              variant: "secondary",
              className: "px-6",
              size: "lg",
            })}
          >
            Moon Playground
          </Link>
        </div>
        <ColorControls />
      </div>
      <div className="w-screen">
        <ComponentShowcase />
      </div>
    </div>
  );
}
