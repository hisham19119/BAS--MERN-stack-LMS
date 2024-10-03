import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Sidebar } from "./sidebar";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const MobileSidebar = () => {
  const [title, setTitle] = useState("");
  const [chapters, setChapters] = useState<{ id: string; title: string }[]>([]);
  const pathname = usePathname();
  const segments = pathname.split("/");
  const id = segments[3];

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/courses/${id}`);
        if (!response.ok) throw new Error("Failed to fetch course data");

        const result = await response.json();
        const courseData = result.data.document;
        setTitle(courseData.title);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };
    fetchCourseData();
  }, [id]);

  useEffect(() => {
    const fetchChapters = async () => {
      const chaptersResponse = await fetch(
        `http://localhost:4000/api/courses/${id}/chapters?limit=1000`
      );
      const chaptersResults = await chaptersResponse.json();
      const chapters = chaptersResults.data.data;
      const chapterData = chapters.map((c: any) => ({
        id: c._id,
        title: c.title[0],
      }));
      setChapters(chapterData);
    };
    fetchChapters();
  }, [id]);

  return (
    <div className="md:hidden ">
      <Sheet>
        <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <Sidebar
            chapters={chapters.map((c) => ({ id: c.id, title: c.title }))}
            title={title}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;
