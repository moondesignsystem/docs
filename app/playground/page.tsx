import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import MoonComponents from "../moon-components/moon-components";

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
