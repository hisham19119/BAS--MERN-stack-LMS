"use client";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const CreateCoursePage = () => {
  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState<string | null>(null);

  const CourseCreateSchema = z.object({
    title: z.string().min(1, "Title is required"),
  });

  const form = useForm<z.infer<typeof CourseCreateSchema>>({
    resolver: zodResolver(CourseCreateSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof CourseCreateSchema>) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);

      const response = await fetch("http://localhost:4000/api/courses/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create course");
      }

      const result = await response.json();
      console.log("Course created:", result);
      await toast.success("Course created");

      const createdCourseId = result.data.newOne._id;
      setCourseId(createdCourseId);
      handleRedirect(createdCourseId, data.title);
    } catch (error) {
      console.error("Error:", (error as Error).message);
    }
  };

  const router = useRouter();

  const handleRedirect = (id: string, title: string) => {
    const courseIdValue = encodeURIComponent(id);
    router.push(`/teacher/courses/${courseIdValue}`);
  };

  return (
    <div className="max-w-5xl mx-auto max-sm:p-6 h-full flex flex-col justify-center items-center gap-y-6">
      <div className="flex flex-col justify-center items-start gap-y-4">
        <h1 className="text-2xl font-[500]">Name your course</h1>
        <p className="text-sm text-slate-500">
          What would you like to name your course? Don't worry, you can change
          it later.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 flex flex-col justify-start items-start w-full mt-8"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Course title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Media Buying Course"
                        className="w-[300px]"
                        onChange={(e) => {
                          field.onChange(e);
                          setTitle(e.target.value);
                        }}
                        value={field.value || title}
                      />
                    </FormControl>
                    <FormDescription className="text-slate-500 text-md">
                      What will you teach in this course?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-start items-center gap-x-2">
              <Button
                size="lg"
                type="button"
                variant="ghost"
                className="text-[var(--textpur)] text-lg"
              >
                Cancel
              </Button>
              <Button
                size="lg"
                type="submit"
                className="bg-[var(--textpur)] hover:text-[var(--textpur)] text-lg"
              >
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateCoursePage;
