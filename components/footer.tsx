import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-primary w-full h-16">
      <div className="container flex items-center sm:justify-between justify-center sm:gap-0 gap-4 h-full text-muted-foreground text-sm flex-wrap sm:py-0 py-3 max-sm:px-4">
        <div className="flex items-center gap-3">
          <p className="text-center">
            © Copyright {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>

        <div className="gap-4 items-center hidden md:flex">
          <FooterButtons />
        </div>
      </div>
    </footer>
  );
}

export function FooterButtons() {
  return (
    <>
      <Link
        href="https://www.linkedin.com/company/moon-io/"
        target="_blank"
        className={buttonVariants({ variant: "outline", size: "sm" })}
      >
        LinkedIn
      </Link>
      <Link
        href="https://www.figma.com/@moon_design"
        target="_blank"
        className={buttonVariants({ variant: "outline", size: "sm" })}
      >
        Figma
      </Link>
    </>
  );
}
