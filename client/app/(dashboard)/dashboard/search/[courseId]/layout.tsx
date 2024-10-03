"use client";
import Navbar from "@/components/student/navbar";
import { Sidebar } from "@/components/student/sidebar";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function dashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <div className="h-full bg-primary/30 max-xl:bg-[var(--sidebar)] ">
      <div className="w-full h-[80px] bg-[var(--sidebar)] fixed inset-y-0">
        <Navbar />
      </div>
      <div className=" max-md:hidden fixed inset-y-0 w-56 bg-primary/30 h-full ">
        <Sidebar
          chapters={chapters.map((c) => ({ id: c.id, title: c.title }))}
          title={title}
        />
      </div>
      <main className="md:pl-56 pt-[80px] h-full dark:bg-gray-900">
        {children}
      </main>
    </div>
  );
}
