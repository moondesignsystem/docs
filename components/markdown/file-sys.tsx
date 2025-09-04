"use client";

import { useMemo, useState } from "react";
import Image from "next/image"; // Import the Next.js Image component
import {
  FileOrFolderType,
  FileType,
  FolderType,
  isFile,
  sortFileAndFolder,
} from "./files";
import { FileIcon, FolderIcon, FolderOpenIcon } from "lucide-react";
import { cn, getIconName, hasSupportedExtension } from "@/lib/utils";

const iconMap: { [key: string]: React.ReactNode } = {
  figma: (
    <Image
      src="/icons/figma.svg"
      alt="Figma icon"
      width={24}
      height={24}
      className="mr-[0.14rem] not-prose"
    />
  ),
  flutter: (
    <Image
      src="/icons/flutter.svg"
      alt="Flutter icon"
      width={24}
      height={24}
      className="mr-[0.14rem] not-prose"
    />
  ),
  react: (
    <Image
      src="/icons/react.svg"
      alt="React icon"
      width={24}
      height={24}
      className="mr-[0.14rem] not-prose"
    />
  ),
  css: (
    <Image
      src="/icons/css.svg"
      alt="CSS icon"
      width={24}
      height={24}
      className="mr-[0.14rem] not-prose"
    />
  ),
  elixir: (
    <Image
      src="/icons/elixir.svg"
      alt="Elixir icon"
      width={24}
      height={24}
      className="mr-[0.14rem] not-prose"
    />
  ),
};
// --- MODIFICATION END ---

function Indicator({ type }: { type?: "add" | "delete" }) {
  if (!type) return null;

  return (
    <span
      className={cn(
        "text-[13px] ml-3 px-1.5 rounded-md py-0.5 pb-1",
        type === "delete" && "dark:text-red-400 text-red-500 bg-red-400/10",
        type === "add" && "dark:text-green-400 text-green-500 bg-green-400/10"
      )}
    >
      {type}
    </span>
  );
}

function File({
  name,
  href,
  highlight,
  indicator,
  subtype,
  tag,
  noLink,
}: FileType) {
  const renderIcon = () => {
    // --- MODIFICATION START ---
    // This logic is now simplified. It prioritizes 'subtype' and then checks
    // the file name. The `<i>` tag and devicon classes are removed.
    const iconKey =
      subtype || (hasSupportedExtension(name) ? getIconName(name) : null);

    if (iconKey && iconMap[iconKey]) {
      return iconMap[iconKey];
    }
    // --- MODIFICATION END ---

    return (
      <FileIcon className="sm:min-w-[1.2rem] sm:min-h-[1.2rem] w-[1rem] h-[1rem] text-current" />
    );
  };

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 w-full hover:dark:bg-neutral-900 hover:bg-neutral-100 px-3 py-1 rounded-md relative",
        highlight && "dark:text-blue-400 text-blue-500"
      )}
    >
      {renderIcon()}
      <div className="sm:text-[15px] text-[13.5px] flex items-center">
        {href && !noLink ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline"
            style={{ color: "var(--tw-prose-body)" }}
          >
            {name}
          </a>
        ) : (
          name
        )}
        {tag && (
          <span className="bg-secondary rounded-md px-1.5 py-0.5 mx-2 text-xs text-secondary !font-normal">
            {tag}
          </span>
        )}
        <Indicator type={indicator} />
      </div>
    </div>
  );
}

function Folder({
  name,
  children,
  isOpen: defaultOpen = false,
  highlight,
  indicator,
  sorted = false,
  tag,
}: FolderType & { sorted?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const items = useMemo(() => {
    return sorted && children ? sortFileAndFolder(children) : children;
  }, [sorted, children]);

  return (
    <div>
      <div
        className={cn(
          "cursor-pointer flex items-center gap-1.5 w-full hover:dark:bg-neutral-900 hover:bg-neutral-100 px-3 py-1 rounded-md",
          highlight && "dark:text-blue-400 text-blue-500"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <FolderOpenIcon className="sm:min-w-[1.2rem] sm:min-h-[1.2rem] w-[1rem] h-[1rem]" />
        ) : (
          <FolderIcon className="sm:min-w-[1.2rem] sm:min-h-[1.2rem] w-[1rem] h-[1rem]" />
        )}
        <div className="sm:text-[15px] text-[13.5px] flex items-center">
          {name}
          {tag && (
            <span className="dark:bg-blue-700 bg-blue-500 rounded-md px-1.5 py-0.5 ml-2 text-xs text-white !font-normal">
              {tag}
            </span>
          )}
          <Indicator type={indicator} />
        </div>
      </div>

      {isOpen && items && items.length > 0 && (
        <div className="pl-2 pt-1 flex flex-col gap-1.5 border-l ml-5">
          {items.map((item) =>
            isFile(item) ? (
              <File {...item} key={item.name} />
            ) : (
              <Folder {...item} key={item.name} sorted={sorted} />
            )
          )}
        </div>
      )}
    </div>
  );
}

export default function FileSys({
  items: children,
  sorted = false,
}: {
  items: FileOrFolderType[];
  sorted?: boolean;
}) {
  const items = useMemo(() => {
    return sorted ? sortFileAndFolder(children) : children;
  }, [sorted, children]);

  return (
    <div className="dark:bg-stone-950/25 bg-stone-50/25 rounded-md p-4 px-3 border border-primary flex flex-col font-code max-w-full overflow-x-auto gap-4">
      {items.map((item) =>
        isFile(item) ? (
          <File {...item} key={item.name} />
        ) : (
          <Folder {...item} key={item.name} sorted={sorted} />
        )
      )}
    </div>
  );
}
