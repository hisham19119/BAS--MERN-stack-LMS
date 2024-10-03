"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
interface BackButtonprops {
  href: string;
  label: string;
}
export function BackButton({ href, label }: BackButtonprops) {
  return (
    <Button variant="link" size="sm" className=" w-full text-normal">
      <Link href={href} className="text-sm ">
        {label}
      </Link>
    </Button>
  );
}
