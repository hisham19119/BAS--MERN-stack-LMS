import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link
      href="/dashboard"
      className="flex gap-x-4  justify-center items-center "
    >
      <Image src="/logo.svg" alt="BAS" width={30} height={30}></Image>
      <span className="text-[var(--textpur)] font-sans font-bold text-4xl">
        BAS
      </span>
    </Link>
  );
};
