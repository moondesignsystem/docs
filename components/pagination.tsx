import { getPreviousNext } from "@/lib/markdown";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

export default function Pagination({ pathname }: { pathname: string }) {
  const res = getPreviousNext(pathname);

  return (
    <div className="grid grid-cols-2 sm:py-10 py-4 pt-5 gap-5">
      {res.prev ? (
        <Link
          className="no-underline w-full flex flex-col gap-1 px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm border border-primary rounded-8"
          href={`/docs${res.prev.href}`}
        >
          <span className="text-secondary">Previous</span>
          <span>{res.prev.title}</span>
        </Link>
      ) : (
        <div />
      )}
      {res.next ? (
        <Link
          className="no-underline w-full flex flex-col gap-1 px-4 py-3 sm:px-6 sm:py-4 items-end text-xs sm:text-sm border border-primary rounded-8"
          href={`/docs${res.next.href}`}
        >
          <span className="text-secondary">Next</span>
          <span>{res.next.title}</span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
