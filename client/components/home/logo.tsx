import Link from "next/link";
import { Button } from "../ui/button";

interface logoProps {
  label: string;
  href: string;
}

export function Logo({ label, href }: logoProps) {
  return (
    <Button
      size="lg"
      variant="ghost"
      className="h-full w-40 text-4xl font-extrabold flex gap-x-4"
    >
      <Link className="text-[var(--text)]" href={href}>
        {" "}
        {label}
      </Link>
      <span className="font-extrabold text-[var(--bg)]  text-4xl">.</span>
    </Button>
  );
}
