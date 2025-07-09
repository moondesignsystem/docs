import fs from "fs";
import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import path from "path";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PlaygroundPage({ params }: Props) {
  const { slug } = await params; // Await the params Promise

  const filePath = path.join(
    process.cwd(),
    "contents/playground",
    `${slug}.mdx`
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

export async function generateStaticParams() {
  return [{ slug: "test" }]; // Add your static params here
}
