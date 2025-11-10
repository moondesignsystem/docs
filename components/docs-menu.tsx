"use client";

import { ROUTES } from "@/lib/routes-config";
import { usePathname } from "next/navigation";
import SubLink from "./sublink";
import Link from "next/link";
import Image from "next/image";

export default function DocsMenu({ isSheet = false }) {
  const pathname = usePathname();
  if (!pathname.startsWith("/docs")) return null;

  return (
    <div className="flex flex-col gap-8 mt-5 pr-2 pb-6 sm:text-base text-[14.5px]">
      <div className="flex gap-2">
        <Link
          href="https://www.linkedin.com/company/moondesignsystem/"
          target="_blank"
        >
          <Image src="/linkedin.png" alt="LinkedIn" width={32} height={32} />
        </Link>
        <Link href="https://discord.gg/MbkfpCU5" target="_blank">
          <Image src="/discord.png" alt="Discord" width={32} height={32} />
        </Link>
        <Link href="https://buymeacoffee.com/moondesignsystem" target="_blank">
          <Image
            src="/buymeacoffee.png"
            alt="Buy Me a Coffee"
            width={32}
            height={32}
          />
        </Link>
      </div>
      {ROUTES.map((item, index) => {
        const modifiedItems = {
          ...item,
          href: `/docs${item.href}`,
          level: 0,
          isSheet,
        };
        return <SubLink key={item.title + index} {...modifiedItems} />;
      })}
    </div>
  );
}
