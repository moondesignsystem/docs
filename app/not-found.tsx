import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[87vh] px-2 sm:py-28 py-36 flex flex-col gap-8 items-center">
      <div className="text-center flex flex-col items-center justify-center w-fit gap-2">
        <h2 className="text-primary text-7xl font-bold pr-1">404</h2>
        <p className="text-primary text-md font-medium"></p>
        <p>Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
      </div>
      <Link href="/" className={buttonVariants({ size: "xl" })}>
        Back to Moon
      </Link>
    </div>
  );
}
