"use client";
import { BarChart, Compass, Layout, List, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import SidebarItem from "./sidebar-item";
import { useEffect, useState } from "react";
interface chaptersProps {
  chapters: { id: string; title: string }[];
}
export const SidebarRoutes = ({ chapters }: chaptersProps) => {
  const [chapterss, setChapters] = useState<{ id: string; title: string }[]>(
    []
  );

  useEffect(() => {
    setChapters(chapters);
  }, [chapters]);

  const pathname = usePathname();
  const segments = pathname.split("/");
  const id = segments[3];

  return (
    <div className="h-full p-2 pr-0 flex flex-col gap-y-2">
      {Array.isArray(chapterss) &&
        chapterss.map((chapter, index) => (
          <SidebarItem
            key={index}
            label={chapter.title}
            href={`/dashboard/search/${id}/chapters/${chapter.id}`}
          />
        ))}
    </div>
  );
};
