"use client";
import { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Pencil, PlusCircle } from "lucide-react";
import { Input } from "../ui/input";
import { usePathname, useRouter } from "next/navigation";
import { SubmitHandler, UseFormProps } from "react-hook-form";
import toast from "react-hot-toast";

interface ChapterFormProps {
  chapters: { id: string; title: string }[];
  onChapterChange: (newChapters: { id: string; title: string }[]) => void;
  chapterIds: string[];
}

const ChapterFormSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Chapter title is too short" })
    .max(100, { message: "Chapter title is too long" }),
  course: z.string(),
});

const ChapterForm = ({
  chapters,
  onChapterChange,
  chapterIds,
}: ChapterFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [localChapterId, setLocalChapterId] = useState<string | null>(null);
  const router = useRouter();

  const pathname = usePathname();
  const segments = pathname.split("/");
  const courseId = segments[3];

  const form = useForm<z.infer<typeof ChapterFormSchema>>({
    resolver: zodResolver(ChapterFormSchema),
    defaultValues: {
      title: "",
      course: courseId || "",
    },
  });

  const id = segments[3];
  const toggleEdit = (index: number | null) => {
    setEditingIndex(index);
    setIsEditing((current) => !current);
    if (index !== null) {
      form.setValue("title", chapters[index].title);
      form.setValue("course", id);
    } else {
      form.reset();
    }
  };

  const onSubmit: SubmitHandler<{ title: string; course: string }> = async (
    data
  ) => {
    console.log("Submitted Data:", data);
    if (!data.course) {
      console.error("Course ID is missing");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("course", data.course);
      const response = await fetch(
        `https://lms-mern-stack-server.vercel.app/api/courses/${data.course}/chapters`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const createdChapter = await response.json();
      console.log("Chapter created:", createdChapter);
      const createdChapterId = createdChapter.data.newOne._id;
      setLocalChapterId(createdChapterId);
      handleRedirect(createdChapterId, data.title);
    } catch (error) {
      console.error("Error creating chapter:", (error as Error).message);
      throw error;
    }
  };
  useEffect(() => {
    console.log("Course ID from URL:", id);
  }, [id]);

  const createChapter = async (title: string, course: string) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("course", course);

      const response = await fetch(
        `https://lms-mern-stack-server.vercel.app/api/courses/${course}/chapters`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create chapter");
      }

      const result = await response.json();
      return result.id;
    } catch (error) {
      console.error("Error creating chapter:", (error as Error).message);
      await toast.error("Error creating Chapter ");

      throw error;
    }
  };

  const handleRedirect = (id: string, title: string) => {
    const chapterIdValue = encodeURIComponent(id);
    router.push(`/teacher/courses/${courseId}/chapters/${chapterIdValue}`);
  };

  return (
    <div className="p-8 flex flex-col gap-y-4 bg-[var(--sidebar)]">
      <div className="flex justify-between items-center">
        <h1 className="text-md">Chapters</h1>
        <Button
          onClick={() => toggleEdit(null)} // Open form to add a new chapter
          className="bg-[var(--textpur)] flex justify-center items-center gap-2 w-22 h-8 text-md hover:bg-[var(--textpur)]"
        >
          <PlusCircle />
          Add Chapter
        </Button>
      </div>

      <div>
        {Array.isArray(chapters) &&
          chapters.map((chapter, index) => (
            <div key={chapter.id} className="flex justify-between items-center">
              <p className="text-sm">{chapter.title}</p>
              <Button
                variant="ghost"
                className="text-black"
                onClick={() => handleRedirect(chapter.id, chapter.title)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          ))}
      </div>

      {isEditing && (
        <Form {...form}>
          <form
            className="flex flex-col gap-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="e.g 'Chapter 1: Introduction'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              onClick={() => {
                createChapter;
              }}
              className="bg-[var(--textpur)] w-16 h-8 text-md hover:bg-[var(--textpur)]"
            >
              Save
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default ChapterForm;
