"use client";

import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/theme-toggle";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Anchor from "./anchor";
import { SheetLeftbar } from "./leftbar";
import { page_routes } from "@/lib/routes-config";
import { SheetClose } from "@/components/ui/sheet";
import AlgoliaSearch from "./algolia-search";

export const NAVLINKS = [
  {
    title: "Docs",
    href: `/docs${page_routes[0].href}`,
  },
  {
    title: "Knowledgebase",
    href: "/knowledgebase",
  },
  {
    title: "About",
    href: "/about",
  },
];

const algolia_props = {
  appId: process.env.ALGOLIA_APP_ID!,
  indexName: process.env.ALGOLIA_INDEX!,
  apiKey: process.env.ALGOLIA_SEARCH_API_KEY!,
};

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full border-nav-b h-16 sticky top-0 z-50 bg-background bg-blur">
      <div className="sm:container relative mx-auto w-[95vw] h-full flex items-center justify-between md:gap-2">
        <div className="flex items-center sm:gap-5 gap-2.5">
          <SheetLeftbar />
          <div className="flex items-center gap-6">
            <div className="md:flex hidden items-center gap-4 text-sm font-medium text-muted-foreground">
              <Logo />
            </div>
          </div>
        </div>

        <div className="lg:flex hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-6">
          <NavMenu />
        </div>

        <div className="flex items-center sm:justify-normal justify-between sm:gap-3 ml-1 sm:w-fit w-[90%]">
          <AlgoliaSearch {...algolia_props} />
          <div className="flex items-center justify-between sm:gap-2">
            <div className="flex ml-4 sm:ml-0">
              {pathname !== "/" && <ModeToggle />}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <svg
        width="70"
        height="40"
        viewBox="0 0 70 40"
        fill="var(--text-primary)"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_4061_3084)">
          <path
            d="M4.19298 27.8885H0V12.2242H4.19298V14.2744H4.22499C5.47328 12.7688 7.16967 12 8.89808 12C10.9466 12 12.5789 12.7688 13.5072 14.4666H13.5712C14.8515 12.8329 16.8039 12 19.0444 12C22.4052 12 24.5497 14.0181 24.5497 18.8231V27.8885H20.3568V19.8161C20.3568 17.3175 19.5886 15.7479 17.6361 15.7479C15.8757 15.7479 14.4354 17.2535 14.4354 20.0724V27.8885H10.2424V19.8161C10.2424 17.3175 9.4102 15.7479 7.48975 15.7479C5.60131 15.7479 4.19298 17.2535 4.19298 20.0724V27.8885Z"
            fill="var(--text-primary)"
          ></path>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M44.4547 20.2753C44.4547 24.6627 40.8899 28.2195 36.4926 28.2195C32.0953 28.2195 28.5305 24.6627 28.5305 20.2753C28.5305 15.8878 32.0953 12.331 36.4926 12.331C40.8899 12.331 44.4547 15.8878 44.4547 20.2753ZM39.1466 20.2753C39.1466 21.7378 37.9584 22.9233 36.4926 22.9233C35.0268 22.9233 33.8386 21.7378 33.8386 20.2753C33.8386 18.8128 35.0268 17.6272 36.4926 17.6272C37.9584 17.6272 39.1466 18.8128 39.1466 20.2753Z"
            fill="var(--text-primary)"
          ></path>
          <path
            d="M51.0898 14.9791C51.0898 16.4416 49.9016 17.6272 48.4358 17.6272C46.97 17.6272 45.7817 16.4416 45.7817 14.9791C45.7817 13.5166 46.97 12.331 48.4358 12.331C49.9016 12.331 51.0898 13.5166 51.0898 14.9791Z"
            fill="var(--text-primary)"
          ></path>
          <path
            d="M59.2679 27.8885H55.0711V12.2242H59.2679V14.2423H59.3319C60.5813 12.7688 62.3754 12 64.3296 12C67.6614 12 70 13.7939 70 18.5989V27.8885H65.8033V19.656C65.8033 16.6769 64.7461 15.7479 62.7918 15.7479C60.6775 15.7479 59.2679 17.2214 59.2679 20.0404V27.8885Z"
            fill="var(--text-primary)"
          ></path>
        </g>
        <defs>
          <clipPath id="clip0_4061_3084">
            <rect
              width="70"
              height="16.2195"
              fill="var(--text-primary)"
              transform="translate(0 12)"
            ></rect>
          </clipPath>
        </defs>
      </svg>
    </Link>
  );
}

export function NavMenu({ isSheet = false }) {
  return (
    <>
      {NAVLINKS.map((item) => {
        const Comp = (
          <Anchor
            key={item.title + item.href}
            activeClassName="!text-primary font-medium"
            absolute
            className="nav-link flex items-center gap-1 sm:text-sm text-[14.5px] dark:text-primary text-primary font-medium"
            href={item.href}
          >
            {item.title}
          </Anchor>
        );
        return isSheet ? (
          <SheetClose key={item.title + item.href} asChild>
            {Comp}
          </SheetClose>
        ) : (
          Comp
        );
      })}
    </>
  );
}
