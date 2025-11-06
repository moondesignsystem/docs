"use client";
import Link from "next/link";

export type QuickstartItem = {
  href: string;
  title: string;
  description: string;
};

export default function Quickstart({ items }: { items: QuickstartItem[] }) {
  return (
    <div className="grid lg:grid-cols-2 gap-5 pt-4">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="px-24 py-12 lg:py-24 w-full flex flex-col no-underline bg-tertiary hover:bg-hover rounded-8 text-center text-xl md:text-4xl font-medium"
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
}
