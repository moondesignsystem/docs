import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

type Props = {
  params: {
    slug: string;
  };
};

export default async function PlaygroundPage({ params }: Props) {
  const filePath = path.join(
    process.cwd(),
    "contents/playground",
    `${params.slug}.mdx`
  );

  let source = "";
  try {
    source = fs.readFileSync(filePath, "utf8");
  } catch {
    notFound(); // triggers 404 page
  }

  const { content } = await compileMDX({ source });

  return <div className="prose mx-auto">{content}</div>;
}
