"use client";
import * as z from "zod";
import { Pencil, FileTextIcon, FileIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import React from "react";

interface AttachmentFormProps {
  attachmentFile: File | null | undefined;
  onAttachmentFileChange: (file: File | null | undefined) => void;
}

const AttachmentFormSchema = z.object({
  attachmentFile: z.instanceof(File).nullable().optional(),
});

export const AttachmentForm = ({
  attachmentFile,
  onAttachmentFileChange,
}: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof AttachmentFormSchema>>({
    resolver: zodResolver(AttachmentFormSchema),
    defaultValues: {
      attachmentFile: attachmentFile || null,
    },
  });

  const toggleEdit = () => setIsEditing((current) => !current);

  useEffect(() => {
    form.setValue("attachmentFile", attachmentFile || null);

    if (attachmentFile instanceof File) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(attachmentFile);
    } else {
      setPreview(null);
    }
  }, [attachmentFile, form]);

  const onSubmit = async (data: z.infer<typeof AttachmentFormSchema>) => {
    onAttachmentFileChange(data.attachmentFile);
    if (data.attachmentFile) {
      await updateAttachment(data.attachmentFile);
    }
    toggleEdit();
  };

  const pathname = usePathname();

  const updateAttachment = async (newAttachment: File) => {
    const id = pathname.split("/").pop();
    const formData = new FormData();
    formData.append("attachment", newAttachment);
    try {
      const response = await fetch(
        `https://lms-mern-stack-server.vercel.app/api/courses/${id}`,
        {
          method: "PATCH",
          body: formData,
        }
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const result = await response.json();
      console.log("Attachment updated:", result);
    } catch (error) {
      console.error("Error updating attachment:", (error as Error).message);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4 dark:bg-gray-800">
      <div className="font-medium flex items-center justify-between">
        Course Attachment
        <Button onClick={toggleEdit} variant="ghost">
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
      {isEditing ? (
        <Form {...form}>
          <form
            className="flex flex-col gap-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="attachmentFile"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".txt,.pdf"
                      onChange={(event) => {
                        const file = event.target.files?.[0] || null;
                        field.onChange(file);
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            setPreview(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        } else {
                          setPreview(null);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="bg-[var(--textpur)] w-16 h-8 text-md hover:bg-[var(--textpur)]"
            >
              Save
            </Button>
          </form>
        </Form>
      ) : (
        <>
          {preview ? (
            preview.endsWith(".pdf") ? (
              <iframe
                src={preview}
                title="PDF Preview"
                className="w-full h-60"
              />
            ) : (
              <div className="p-4 bg-slate-200 rounded-md">
                <pre className="text-wrap cursor-pointer ">
                  Attachment preview{" "}
                </pre>
              </div>
            )
          ) : (
            <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
              {attachmentFile && attachmentFile.type === "application/pdf" ? (
                <FileIcon className="h-10 w-10 text-slate-500" />
              ) : (
                <FileTextIcon className="h-10 w-10 text-slate-500" />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AttachmentForm;
