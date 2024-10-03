"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CircleDollarSign,
  FileIcon,
  LayoutDashboard,
  ListChecks,
  Trash,
} from "lucide-react";
import TitleForm from "@/components/course/title-form";
import DescriptionForm from "@/components/course/description-form";
import PriceForm from "@/components/course/price-form";
import { ImageForm } from "@/components/course/image-form";
import CategoryForm from "@/components/course/category-form";
import { AttachmentForm } from "@/components/course/attachment-form";
import ChapterForm from "@/components/course/chapter-form";
import { usePathname, useRouter } from "next/navigation";

const CourseIdPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(
    "This is the Most Important course in Web development"
  );
  const [imageCover, setImageCover] = useState<File | null | undefined>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const [category, setCategory] = useState("Web Development");
  const [price, setPrice] = useState("100");
  const [attachmentUrl, setAttachmentUrl] = useState<File | null | undefined>(
    null
  );
  const [chapters, setChapters] = useState<{ id: string; title: string }[]>([]);

  const handleTitleChange = (newTitle: string) => setTitle(newTitle);
  const handleImageUrlChange = (newFile: File | null | undefined) => {
    setImageCover(newFile);
  };
  const handleDescriptionChange = (newDescription: string) =>
    setDescription(newDescription);
  const handleCategoryChange = (newCategory: string) =>
    setCategory(newCategory);
  const handlePriceChange = (newPrice: string) => setPrice(newPrice);
  const handleAttachmentChange = (newAttachment: File | null | undefined) =>
    setAttachmentUrl(newAttachment);

  const handleChapterChange = (
    newChapters: { id: string; title: string }[]
  ) => {
    setChapters(newChapters);
  };

  const totalFields = 6;
  const completedFields = 6;
  const completionText = `(${completedFields}/${totalFields})`;

  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch(
          `https://lms-mern-stack-server.vercel.app/api/courses/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch course data");

        const result = await response.json();
        const courseData = result.data.document;
        setTitle(courseData.title);
        setDescription(courseData.description);
        setImageCover(courseData.imageCover);
        const imageUrl = `https://lms-mern-stack-server.vercel.app/uploads/${courseData.imageCover}`;
        setImagePreviewUrl(imageUrl);
        setCategory(courseData.category);
        setPrice(courseData.price);
        setAttachmentUrl(courseData.attachmentUrl);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, [id]);

  useEffect(() => {
    const fetchChapters = async () => {
      const chaptersResponse = await fetch(
        `https://lms-mern-stack-server.vercel.app/api/courses/${id}/chapters?limit=1000`
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

  const deleteCourse = async () => {
    try {
      const response = await fetch(
        `https://lms-mern-stack-server.vercel.app/api/courses/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete course");
      }
      console.log("Course deleted successfully");
      await router.push(`/teacher/courses`);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="flex flex-col p-4 gap-y-10">
      <div className="flex justify-between items-center text-slate-500 text-sm">
        <p className="basis-1/2">Complete all fields {completionText}</p>
        <div className="flex justify-end gap-x-2 items-center basis-1/2">
          <Button
            onClick={deleteCourse}
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
            <h1 className="text-lg">Customize Your Course</h1>
          </div>
          <TitleForm title={title} onTitleChange={handleTitleChange} />
          <DescriptionForm
            description={description}
            onDescriptionChange={handleDescriptionChange}
          />
          <ImageForm
            imageCover={imageCover}
            onImageCoverChange={handleImageUrlChange}
            imagePreviewUrl={imagePreviewUrl}
          />
          <CategoryForm
            category={category}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <div className="flex gap-x-2 items-center">
              <div className="bg-purple-200 flex justify-center items-center w-10 h-10 rounded-full">
                <ListChecks className="text-[var(--textpur)]" />
              </div>
              <h1 className="text-lg">Course Chapters</h1>
            </div>
            <ChapterForm
              chapters={chapters.map((c) => ({ id: c.id, title: c.title }))}
              onChapterChange={handleChapterChange}
              chapterIds={chapters.map((c) => c.id)}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <div className="flex gap-x-2 items-center">
              <div className="bg-purple-200 flex justify-center items-center w-10 h-10 rounded-full">
                <CircleDollarSign className="text-[var(--textpur)]" />
              </div>
              <h1 className="text-lg">Sell Your Course</h1>
            </div>
            <PriceForm price={price} onPriceChange={handlePriceChange} />
          </div>

          <div className="flex flex-col gap-y-2">
            <div className="flex gap-x-2 items-center">
              <div className="bg-purple-200 flex justify-center items-center w-10 h-10 rounded-full">
                <FileIcon className="text-[var(--textpur)]" />
              </div>
              <h1 className="text-lg">Resources & Attachments</h1>
            </div>
            <AttachmentForm
              attachmentFile={attachmentUrl}
              onAttachmentFileChange={handleAttachmentChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
