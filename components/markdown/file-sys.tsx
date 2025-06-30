"use client";

import { useMemo, useState } from "react";
import {
  FileOrFolderType,
  FileType,
  FolderType,
  isFile,
  sortFileAndFolder,
} from "./files";
import { FileIcon, FolderIcon, FolderOpenIcon, Figma } from "lucide-react";
import { cn, getIconName, hasSupportedExtension } from "@/lib/utils";

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
    <div className="dark:bg-stone-950/25 bg-stone-50/25 rounded-md p-4 px-3 border flex flex-col gap-1.5 font-code max-w-full overflow-x-auto">
      {items.map((item) =>
        isFile(item) ? (
          <File {...item} key={item.name} />
        ) : (
          <Folder {...item} key={item.name} sorted={sorted} />
        ),
      )}
    </div>
  );
}

function File({ name, highlight, indicator, href, subtype }: FileType) {
  const renderIcon = () => {
    if (subtype === "figma") {
      return <Figma className="w-[1rem] h-[1rem] text-current mr-[0.14rem]" />;
    }

    if (subtype === "flutter") {
      return <i className="devicon-flutter-plain text-[17px] mr-[0.14rem]" />;
    }

    if (subtype === "react") {
      return <i className="devicon-react-original text-[17px] mr-[0.14rem]" />;
    }

    if (subtype === "css") {
      return <i className="devicon-css3-plain text-[17px] mr-[0.14rem]" />;
    }

    if (hasSupportedExtension(name)) {
      return (
        <i
          className={`devicon-${getIconName(name)}-plain text-[17px] mr-[0.14rem]`}
        />
      );
    }

    return (
      <FileIcon className="sm:min-w-[1.2rem] sm:min-h-[1.2rem] sm:w-[1.2rem] sm:h-[1.2rem] min-w-[1rem] min-h-[1rem] w-[1rem] h-[1rem] text-current" />
    );
  };

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 w-full hover:dark:bg-neutral-900 hover:bg-neutral-100 px-3 py-1 rounded-md relative",
        highlight && "dark:text-blue-400 text-blue-500",
      )}
    >
      {renderIcon()}

      <div className="sm:text-[15px] text-[13.5px]">
        {href ? (
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

        {indicator && (
          <span
            className={cn(
              "text-[13px] ml-3 px-1.5 rounded-md py-0.5 pb-1",
              indicator === "delete" &&
                "dark:text-red-400 text-red-500 bg-red-400/10",
              indicator === "add" &&
                "dark:text-green-400 text-green-500 bg-green-400/10",
            )}
          >
            {indicator}
          </span>
        )}
      </div>
    </div>
  );
}

function Folder({
  name,
  children,
  isOpen: defaultOpen,
  highlight,
  sorted = false,
  indicator,
}: FolderType & { sorted?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen ?? false);

  const items = useMemo(() => {
    return sorted && children ? sortFileAndFolder(children) : children;
  }, [sorted, children]);

  return (
    <div>
      <div
        className={cn(
          "cursor-pointer flex items-center gap-1.5 w-full hover:dark:bg-neutral-900 hover:bg-neutral-100 px-3 py-1 rounded-md",
          highlight && "dark:text-blue-400 text-blue-500",
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <FolderOpenIcon className="sm:min-w-[1.2rem] sm:min-h-[1.2rem] w-[1rem] h-[1rem]" />
        ) : (
          <FolderIcon className="sm:min-w-[1.2rem] sm:min-h-[1.2rem] w-[1rem] h-[1rem]" />
        )}
        <div className="sm:text-[15px] text-[13.5px]">
          {name}
          {indicator && (
            <span
              className={cn(
                "text-[13px] ml-3 px-1.5 rounded-md py-0.5 pb-1",
                indicator === "delete" &&
                  "dark:text-red-400 text-red-500 bg-red-400/10",
                indicator === "add" &&
                  "dark:text-green-400 text-green-500 bg-green-400/10",
              )}
            >
              {indicator}
            </span>
          )}
        </div>
      </div>

      {isOpen && items && items.length !== 0 && (
        <div className="pl-2 pt-1 flex flex-col gap-1.5 border-l ml-5">
          {items.map((f) =>
            isFile(f) ? (
              <File {...f} key={f.name} />
            ) : (
              <Folder {...f} key={f.name} sorted={sorted} />
            ),
          )}
        </div>
      )}
    </div>
  );
}
