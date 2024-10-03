import { useEffect, useState } from "react";
import { SidebarRoutes } from "./sidebar-routes";
import { usePathname, useRouter } from "next/navigation";

interface courseProps {
  title: string;
  chapters: { id: string; title: string }[];
}
export const Sidebar = ({ title, chapters }: courseProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split("/");
  const courseId = segments[3];
  const handleRedirect = () => {
    router.push(`/dashboard/search/${courseId}`);
  };
  return (
    <div className="h-full font-bold border-r flex flex-col pt-4 gap-y-8 bg-[var(--sidebar)]">
      <div
        onClick={handleRedirect}
        className="flex justify-center items-center text-[var(--textpur)] cursor-pointer"
      >
        <h1>{title}</h1>
      </div>
      <SidebarRoutes chapters={chapters} />
    </div>
  );
};
