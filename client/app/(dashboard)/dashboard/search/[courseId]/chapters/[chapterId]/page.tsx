"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const chapterIdPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoPreviewUrl, setVideoPreviewUrl] = useState("");
  const pathname = usePathname();
  const segments = pathname.split("/");
  const id = segments[3];
  const chapterId = segments[5];

  useEffect(() => {
    const fetchChapterData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/chapters/${chapterId}`
        );
        if (!response.ok) throw new Error("Failed to fetch course data");
        const result = await response.json();
        const courseData = result.data.document;
        console.log("Fetched course data:", courseData);
        setTitle(courseData.title);
        setDescription(courseData.description);
        const videoUrl = `http://localhost:4000/uploads/${courseData.video}`;
        setVideoPreviewUrl(videoUrl);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };
    fetchChapterData();
  }, [id]);

  return (
    <div className="h-[90%] bg-primary/30 px-16 flex flex-col justify-center items-center gap-y-2 xl:w-[800px] mt-4 md:mx-auto">
      <div className="w-full flex justify-center items-center">
        {" "}
        {videoPreviewUrl && <video src={videoPreviewUrl} controls />}
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-y-2">
        <div className="w-full flex justify-start items-start  text-[var(--textpur)] text-lg font-bold  ">
          <h1 className="bg-[var(--sidebar)] p-2 rounded-lg">{title}</h1>
        </div>
        <div className="w-full flex justify-start   text-[var(--textpur)]   ">
          <p className="bg-[var(--sidebar)] p-2 rounded-lg text-sm text-gray-500 font-semibold ">
            {" "}
            <span className="text-md text-[var(--textpur)] font-bold pr-2">
              Description:
            </span>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default chapterIdPage;
