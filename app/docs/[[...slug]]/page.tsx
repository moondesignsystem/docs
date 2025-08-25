import DocsBreadcrumb from "@/components/docs-breadcrumb";
import Pagination from "@/components/pagination";
import Toc from "@/components/toc";
import { Typography } from "@/components/typography";
import {
  getCompiledDocsForSlug,
  getDocFrontmatter,
} from "@/lib/markdown";
import { page_routes } from "@/lib/routes-config";
import { notFound, redirect } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

// Import MDX components
import Quickstart from "@/components/markdown/quickstart";
import Note from "@/components/markdown/note";
import Pre from "@/components/markdown/pre";
import Copy from "@/components/markdown/copy";
import { Stepper } from "@/components/markdown/stepper";
import Files from "@/components/markdown/files";
import FileSys from "@/components/markdown/file-sys";
import Outlet from "@/components/markdown/outlet";
import ColorControls from "@/components/markdown/colorcontrols";
import Image from "@/components/markdown/image";
import Link from "@/components/markdown/link";

const components = {
  Quickstart,
  Note,
  Pre,
  Copy,
  Stepper,
  Files,
  FileSys,
  Outlet,
  ColorControls,
  Image,
  Link,
};

type PageProps = {
  params: { slug?: string[] };
};

export default async function DocsPage({ params }: PageProps) {
  const { slug = [] } = params;

  if (slug.length === 0) {
    const firstDocHref = page_routes[0]?.href;
    if (firstDocHref) {
      redirect(`/docs${firstDocHref}`);
    } else {
      notFound();
    }
  }

  const pathName = slug.join("/");
  const res = await getCompiledDocsForSlug(pathName);

  if (!res) {
    notFound();
  }

  return (
    <div className="flex items-start gap-10">
      <div className="flex-[4.5] py-10 mx-auto">
        <div className="w-full mx-auto">
          <DocsBreadcrumb paths={slug} />
          <Typography>
            <h1 className="sm:text-3xl text-2xl !-mt-0.5">
              {res.frontmatter.title}
            </h1>
            <p className="-mt-4 text-muted-foreground sm:text-[16.5px] text-[14.5px]">
              {res.frontmatter.description}
            </p>
            <MDXRemote source={res.content} components={components} />
            <Pagination pathname={pathName} />
          </Typography>
        </div>
      </div>
      <Toc path={pathName} />
    </div>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { slug = [] } = params;
  const pathName = slug.join("/");

  if (pathName === "") {
    return {
      title: "Docs - Moon Design System",
      description: "Documentation for the Moon Design System.",
    };
  }

  const res = await getDocFrontmatter(pathName);
  if (!res) return {};
  const { title, description } = res;
  return {
    title: `${title} - Moon Design System`,
    description,
  };
}

export function generateStaticParams() {
  // By removing the empty slug `[]` from the generated params,
  // we prevent Next.js from trying to build the base /docs page,
  // which was causing the server error. The redirect handles this case for live traffic.
  return page_routes.map((item) => ({
    slug: item.href.split("/").slice(1),
  }));
}
