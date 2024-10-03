"use client";
import { useState, useEffect } from "react";
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
import { Pencil } from "lucide-react";
import { Input } from "../ui/input";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

interface TitleFormProps {
  title: string;
  onTitleChange: (newTitle: string) => void;
}

const titleFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .min(3, { message: "Title is too short" })
    .max(100, { message: "Title is too long" }),
});

const TitleForm = ({ title, onTitleChange }: TitleFormProps) => {
  const [isEditing, setIsEditing] = useState(true);
  const toggleEdit = () => setIsEditing((current) => !current);
  const pathname = usePathname();

  const onSubmit = async (data: z.infer<typeof titleFormSchema>) => {
    onTitleChange(data.title);
    await updateTitle(data.title);
    toggleEdit();
  };

  const form = useForm<z.infer<typeof titleFormSchema>>({
    resolver: zodResolver(titleFormSchema),
    defaultValues: {
      title: title,
    },
  });

  useEffect(() => {
    form.setValue("title", title);
  }, [title, form]);

  const updateTitle = async (newTitle: string) => {
    const id = pathname.split("/").pop();

    const formData = new FormData();
    formData.append("title", newTitle);

    try {
      const response = await fetch(`http://localhost:4000/api/courses/${id}`, {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const result = await response.json();
      console.log("Title updated:", result);
      await toast.success("Title updated successfully !");
    } catch (error) {
      console.error("Error updating title:", (error as Error).message);
      await toast.success("Error updating Title");
    }
  };

  return (
    <div className="p-8 flex flex-col gap-y-4 bg-[var(--sidebar)]">
      <div className="flex justify-between items-center">
        <h1 className="text-md">Course Title</h1>
        <Button onClick={toggleEdit} variant="ghost" className="text-black">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              {" "}
              <Pencil className="h-4 w-4 mr-2" /> Edit
            </>
          )}
        </Button>
      </div>
      <div>
        {isEditing ? (
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
                        placeholder="e.g 'Advanced Full Stack course'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="bg-[var(--textpur)] w-16 h-8 text-md hover:bg-[var(--textpur)]"
                onClick={() => {
                  updateTitle;
                }}
              >
                Save
              </Button>
            </form>
          </Form>
        ) : (
          <p className="text-sm">{title}</p>
        )}
      </div>
    </div>
  );
};

export default TitleForm;
