"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/footer";

export function FooterWrapper() {
  const pathname = usePathname();

  // Hide footer on homepage
  if (pathname === "/") {
    return null;
  }

  return <Footer />;
}
