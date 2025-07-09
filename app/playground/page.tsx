import fs from "fs";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import MoonComponents from "../moon-components/moon-components";

export const metadata = {
  title: "Playground for Moon Design System",
  description:
    "Explore and interact with Moon Design System components in our playground.",
};

export default async function PlaygroundPage() {
  const filePath = path.join(process.cwd(), "contents/playground/index.mdx");
  let source = "";
  try {
    source = fs.readFileSync(filePath, "utf8");
  } catch {
    return <div className="prose mx-auto">No playground content found.</div>;
  }
  const { content } = await compileMDX({ source });

  return (
    <div className="prose mx-auto">
      {content}
      <MoonComponents />
    </div>
  );
}
