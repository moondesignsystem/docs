"use client";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export type QuickstartItem = {
  href: string;
  title: string;
  description: string;
};

export default function Quickstart({ items }: { items: QuickstartItem[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-5 pt-4">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={buttonVariants({
            variant: "secondary",
            className: "sm:py-32 px-24 w-full flex flex-col no-underline",
          })}
        >
          <span className="md:text-4xl font-bold">{item.title}</span>
        </Link>
      ))}
    </div>
  );
}
