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
    title: "Playground",
    href: "/playground",
  },
  {
    title: "Knowledgebase",
    href: "/knowledgebase",
  },
];

const algolia_props = {
  appId: process.env.ALGOLIA_APP_ID!,
  indexName: process.env.ALGOLIA_INDEX!,
  apiKey: process.env.ALGOLIA_SEARCH_API_KEY!,
};

export function Navbar() {
  return (
    <nav className="w-full border-b h-16 sticky top-0 z-50 bg-background">
      <div className="sm:container mx-auto w-[95vw] h-full flex items-center sm:justify-between md:gap-2">
        <div className="flex items-center sm:gap-5 gap-2.5">
          <SheetLeftbar />
          <div className="flex items-center gap-6">
            <div className="lg:flex hidden">
              <Logo />
            </div>
            <div className="md:flex hidden items-center gap-4 text-sm font-medium text-muted-foreground">
              <NavMenu />
            </div>
          </div>
        </div>

        <div className="flex items-center sm:justify-normal justify-between sm:gap-3 ml-1 sm:w-fit w-[90%]">
          <AlgoliaSearch {...algolia_props} />
          <div className="flex items-center justify-between sm:gap-2">
            <div className="flex ml-4 sm:ml-0">
              <Link
                href="https://github.com/kungfury100/moondocs"
                target="_blank"
                className={buttonVariants({
                  variant: "ghost",
                  size: "icon",
                })}
              >
                <GithubIcon className="h-[1.1rem] w-[1.1rem]" />
              </Link>
              <ModeToggle />
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
        width="100"
        height="auto"
        viewBox="0 0 409 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          style={{ fill: "var(--semantic-icon-primary)" }}
          d="M24.459 93.3417H-1.52588e-05V1.96659H24.459V13.9257H24.6457C31.9274 5.14321 41.8229 0.658546 51.9054 0.658546C63.855 0.658546 73.3771 5.14321 78.7917 15.0468H79.165C86.6337 5.51692 98.0229 0.658546 111.092 0.658546C130.697 0.658546 143.207 12.4308 143.207 40.46V93.3417H118.747V46.2525C118.747 31.6775 114.267 22.5213 102.877 22.5213C92.6083 22.5213 84.2062 31.3038 84.2062 47.7475V93.3417H59.7471V46.2525C59.7471 31.6775 54.8929 22.5213 43.69 22.5213C32.6743 22.5213 24.459 31.3038 24.459 47.7475V93.3417Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M259.319 48.9308C259.319 74.5246 238.525 95.2725 212.873 95.2725C187.222 95.2725 166.428 74.5246 166.428 48.9308C166.428 23.3372 187.222 2.58942 212.873 2.58942C238.525 2.58942 259.319 23.3372 259.319 48.9308ZM228.355 48.9308C228.355 57.4621 221.424 64.3779 212.873 64.3779C204.323 64.3779 197.392 57.4621 197.392 48.9308C197.392 40.3996 204.323 33.4838 212.873 33.4838C221.424 33.4838 228.355 40.3996 228.355 48.9308Z"
          style={{ fill: "var(--semantic-icon-primary)" }}
        />
        <path
          d="M298.024 18.0366C298.024 26.5679 291.092 33.4838 282.542 33.4838C273.992 33.4838 267.06 26.5679 267.06 18.0366C267.06 9.50534 273.992 2.58942 282.542 2.58942C291.092 2.58942 298.024 9.50534 298.024 18.0366Z"
          style={{ fill: "var(--semantic-icon-primary)" }}
        />
        <path
          d="M345.729 93.3417H321.248V1.9666H345.729V13.7388H346.103C353.391 5.14322 363.856 0.658554 375.256 0.658554C394.691 0.658554 408.333 11.1228 408.333 39.1517V93.3417H383.852V45.3183C383.852 27.9404 377.685 22.5213 366.286 22.5213C353.952 22.5213 345.729 31.1167 345.729 47.5604V93.3417Z"
          style={{ fill: "var(--semantic-icon-primary)" }}
        />
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
            activeClassName="!text-primary dark:font-medium font-semibold"
            absolute
            className="flex items-center gap-1 sm:text-sm text-[14.5px] dark:text-stone-300/85 text-stone-800"
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
