"use client";

import { useEffect, useState } from "react";
import { Github } from "lucide-react";

export function Footer() {
  const [currentYear, setCurrentYear] = useState(2025); // fallback year

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-primary w-full h-16">
      <div className="container flex items-center sm:justify-between justify-center sm:gap-0 gap-4 h-full text-muted-foreground text-sm flex-wrap sm:py-0 py-3 max-sm:px-4">
        <div className="flex items-center gap-3">
          <p className="text-center">
            © Copyright {currentYear}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
