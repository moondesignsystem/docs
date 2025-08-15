import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SheetClose } from "@/components/ui/sheet";
import { EachRoute } from "@/lib/routes-config";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Anchor from "./anchor";

export default function SubLink({
  title,
  href,
  items,
  noLink,
  level,
  isSheet,
  tag,
  type,
}: EachRoute & { level: number; isSheet: boolean }) {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(level == 0);

  useEffect(() => {
    if (path == href || path.includes(href)) setIsOpen(true);
  }, [href, path]);

  const targetHref = !noLink
    ? href // If it's a normal link, use its own href.
    : items && items.length > 0 // Check if items exists AND is not empty
      ? `${href}${items[0].href}` // If yes, create the child link
      : undefined; // Otherwise, there is no link.

  // This component represents the clickable link element.
  // It now uses `targetHref` instead of the original `href`.
  const Comp = (
    <Anchor
      className="text-primary"
      activeClassName="text-primary dark:font-bold font-bold"
      href={targetHref!} // Use the new targetHref
    >
      {title}
      {tag && (
        <span className="dark:bg-blue-700 bg-blue-500 rounded-md px-1.5 py-0.5 mx-2 text-xs text-white !font-normal">
          {tag}
        </span>
      )}
    </Anchor>
  );

  // ## CHANGE 2: Decide whether to render a link or static text ##
  // The logic now checks if a `targetHref` exists.
  const titleOrLink = targetHref ? (
    isSheet ? (
      <SheetClose asChild>{Comp}</SheetClose>
    ) : (
      Comp
    )
  ) : (
    <h4 className="">
      {title}
      {tag && (
        <span className="dark:bg-blue-700 bg-blue-500 rounded-md px-1.5 py-0.5 mx-2 text-xs text-white !font-normal">
          {tag}
        </span>
      )}
    </h4>
  );

  if (!items) {
    return <div className="flex flex-col">{titleOrLink}</div>;
  }

  // ... the rest of your component remains the same
  if (type === "static") {
    return (
      <div className="flex flex-col gap-2 mt-6">
        <span className="text-xs uppercase text-secondary tracking-wider font-medium px-1">
          {title}
        </span>
        <div className="flex flex-col items-start gap-2 pl-1">
          {items.map((item) => {
            const modifiedItem = {
              ...item,
              href: `${href}${item.href}`,
              level: level + 1,
              isSheet,
            };
            return <SubLink key={modifiedItem.href} {...modifiedItem} />;
          })}
        </div>
      </div>
    );
  }

  if (type === "expanded") {
    return (
      <div className="flex flex-col gap-1 w-full">
        <div className="w-full pr-5">
          <div className="flex items-center justify-between w-full cursor-default">
            <span className="w-[95%] overflow-hidden text-ellipsis text-start">
              {titleOrLink}
            </span>
          </div>
        </div>
        <div
          className={cn(
            "flex flex-col items-start text-base dark:text-stone-300/85 text-stone-800 ml-0.5 mt-2.5 gap-3",
            level > 0 && "pl-4 border-l ml-1.5",
          )}
        >
          {items.map((item) => {
            const modifiedItem = {
              ...item,
              href: `${href}${item.href}`,
              level: level + 1,
              isSheet,
            };
            return <SubLink key={modifiedItem.href} {...modifiedItem} />;
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 w-full">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full pr-5">
          <div className="flex items-center justify-between cursor-pointer w-full">
            <span className="w-[95%] overflow-hidden text-ellipsis text-start">
              {titleOrLink}
            </span>
            <span className="sm:ml-0 -mr-1.5">
              {!isOpen ? (
                <ChevronRight className="h-[0.9rem] w-[0.9rem]" />
              ) : (
                <ChevronDown className="h-[0.9rem] w-[0.9rem]" />
              )}
            </span>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div
            className={cn(
              "flex flex-col items-start text-base dark:text-stone-300/85 text-stone-800 ml-0.5 mt-2.5 gap-3",
              level > 0 && "pl-4 border-l ml-1.5",
            )}
          >
            {items?.map((innerLink) => {
              const modifiedItems = {
                ...innerLink,
                href: `${href + innerLink.href}`,
                level: level + 1,
                isSheet,
              };
              return <SubLink key={modifiedItems.href} {...modifiedItems} />;
            })}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
