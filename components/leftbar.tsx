import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo, NavMenu } from "./navbar";
import { DialogTitle } from "./ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import DocsMenu from "./docs-menu";

export function Leftbar() {
  return (
    <aside className="md:flex hidden w-[20rem] sticky top-16 flex-col h-[93.75vh] overflow-y-auto">
      <ScrollArea className="py-4 px-2">
        <DocsMenu />
      </ScrollArea>
    </aside>
  );
}

export function SheetLeftbar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="moon-icon-button moon-icon-button-ghost moon-icon-button-neutral md:hidden">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="menu">
              <g id="Icon">
                <path
                  d="M2.70837 4.16675C2.70837 3.82157 2.9882 3.54175 3.33337 3.54175H16.6667C17.0119 3.54175 17.2917 3.82157 17.2917 4.16675C17.2917 4.51193 17.0119 4.79175 16.6667 4.79175L3.33337 4.79175C2.9882 4.79175 2.70837 4.51193 2.70837 4.16675Z"
                  fill="currentColor"
                />
                <path
                  d="M2.70837 10.0001C2.70837 9.6549 2.9882 9.37508 3.33337 9.37508L16.6667 9.37508C17.0119 9.37508 17.2917 9.6549 17.2917 10.0001C17.2917 10.3453 17.0119 10.6251 16.6667 10.6251L3.33337 10.6251C2.9882 10.6251 2.70837 10.3453 2.70837 10.0001Z"
                  fill="currentColor"
                />
                <path
                  d="M3.33337 15.2084C2.9882 15.2084 2.70837 15.4882 2.70837 15.8334C2.70837 16.1786 2.9882 16.4584 3.33337 16.4584L16.6667 16.4584C17.0119 16.4584 17.2917 16.1786 17.2917 15.8334C17.2917 15.4882 17.0119 15.2084 16.6667 15.2084L3.33337 15.2084Z"
                  fill="currentColor"
                />
              </g>
            </g>
          </svg>
        </button>
      </SheetTrigger>
      <SheetContent
        className="flex flex-col gap-4 px-0 bg-primary border-primary"
        side="left"
      >
        <DialogTitle className="sr-only">Menu</DialogTitle>
        <SheetHeader>
          <SheetClose className="px-5" asChild>
            <Logo />
          </SheetClose>
        </SheetHeader>
        <div className="flex flex-col gap-4 overflow-y-auto">
          <div className="flex flex-col gap-2.5 mt-3 mx-2 px-5">
            <NavMenu isSheet />
          </div>
          <div className="ml-2 pl-5">
            <DocsMenu isSheet />
          </div>
          {/* <div className="p-6 pb-4 flex gap-2.5">
            <FooterButtons />
          </div> */}
        </div>
      </SheetContent>
    </Sheet>
  );
}
