"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LayoutDashboard, Trash, VideoIcon } from "lucide-react";
import TitleForm from "@/components/chapter/title-form";
import DescriptionForm from "@/components/chapter/description-form";

import { usePathname, useRouter } from "next/navigation";
import VideoForm from "@/components/chapter/video-form";

const ChapterIdPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(
    "This is the Most Important course in Web development"
  );
  const [video, setVideo] = useState<File | null | undefined>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const handleTitleChange = (newTitle: string) => setTitle(newTitle);
  const handleVideoChange = (newFile: File | null | undefined) => {
    setVideo(newFile);
  };
  const handleDescriptionChange = (newDescription: string) =>
    setDescription(newDescription);

  const totalFields = 3;
  const completedFields = 3;
  const completionText = `(${completedFields}/${totalFields})`;

  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split("/");
  const id = segments[3];
  const chapterId = segments[5];
  useEffect(() => {
    const fetchChaptereData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/chapters/${chapterId}`
        );
        if (!response.ok) throw new Error("Failed to fetch course data");
        const result = await response.json();
        const courseData = result.data.document;
        setTitle(courseData.title);
        setDescription(courseData.description);
        setVideo(courseData.video);
        const videoUrl = `http://localhost:4000/uploads/${courseData.video}`;
        setVideoPreviewUrl(videoUrl);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };
    fetchChaptereData();
  }, [id]);

  const deleteChapter = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/chapters/${chapterId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete chapter");
      }
      console.log("Chapter deleted successfully");
      await router.push(`/teacher/courses/${id}`);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="flex flex-col p-4 gap-y-10">
      <div className="flex justify-between items-center text-slate-500 text-sm">
        <div className="flex flex-col justify-start items-start gap-y-2 basis-1/2">
          <h1 className="text-xl text-black font-semibold">Chapter Creation</h1>
          <p>Complete all fields {completionText}</p>
        </div>
        <div className="flex justify-end gap-x-2 items-center basis-1/2">
          <Button
            onClick={deleteChapter}
            size="sm"
            className="bg-black h-10 hover:bg-black"
          >
            <Trash />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-y-4">
          <div className="flex gap-x-2 items-center">
            <div className="bg-purple-200 flex justify-center items-center w-10 h-10 rounded-full">
              <LayoutDashboard className="text-[var(--textpur)]" />
            </div>
            <h1 className="text-lg">Customize Your Chapter</h1>
          </div>
          <TitleForm title={title} onTitleChange={handleTitleChange} />
          <DescriptionForm
            description={description}
            onDescriptionChange={handleDescriptionChange}
          />
        </div>
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <div className="flex gap-x-2 items-center">
              <div className="bg-purple-200 flex justify-center items-center w-10 h-10 rounded-full">
                <VideoIcon className="text-[var(--textpur)]" />
              </div>
              <h1 className="text-lg">Add a video</h1>
            </div>
            <VideoForm
              videoPreviewUrl={videoPreviewUrl}
              video={video}
              onVideoChanges={handleVideoChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
