import Link from "next/link";
import { Button } from "../ui/button";

interface enrollButtonProps {
  label: string;
  href: string;
}

export function EnrollButton({ label, href }: enrollButtonProps) {
  return (
    <Button
      size="lg"
      className="bg-[var(--bg)] hover:bg-inherit hover:border-2 max-xs:bg-red-500 max-sm:w-20 max-sm:hidden"
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
}
