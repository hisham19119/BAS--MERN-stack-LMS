import Link from "next/link";
import { EnrollButton } from "./enrollButton";
import { Logo } from "./logo";

interface navWrapperProps {
  logoLabel: string;
  logoHref: string;
  enrollButtonLabel: string;
  enrollButtonHref: string;
}

export function NavWrapper({
  logoLabel,
  logoHref,
  enrollButtonHref,
  enrollButtonLabel,
}: navWrapperProps) {
  return (
    <div className="h-16 w-full  flex justify-between items-center ">
      <Logo label={logoLabel} href={logoHref} />
      <div className="flex gap-x-4 items-center pr-8">
        <Link
          className="text-md font-bold text-[var(--textSoft)]"
          href="/auth/login"
        >
          Login{" "}
        </Link>
        <EnrollButton label={enrollButtonLabel} href={enrollButtonHref} />
      </div>
    </div>
  );
}
