"use client";
import * as z from "zod";
import { Pencil, ImageIcon } from "lucide-react";
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

interface ImageFormProps {
  imageCover: File | null | undefined;
  onImageCoverChange: (file: File | null | undefined) => void;
  imagePreviewUrl: string | null;
}

const ImageFormSchema = z.object({
  imageCover: z.instanceof(File).nullable().optional(),
});
export const ImageForm = ({
  imageCover,
  onImageCoverChange,
  imagePreviewUrl,
}: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const pathname = usePathname();
  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof ImageFormSchema>>({
    resolver: zodResolver(ImageFormSchema),
    defaultValues: {
      imageCover: imageCover || null,
    },
  });

  const onSubmit = async (data: z.infer<typeof ImageFormSchema>) => {
    onImageCoverChange(data.imageCover);
    if (data.imageCover) {
      await updateImage(data.imageCover);
    }
    toggleEdit();
  };

  const updateImage = async (newImageCover: File) => {
    const id = pathname.split("/").pop();

    const formData = new FormData();
    formData.append("imageCover", newImageCover);

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
      console.log("Image updated:", result);
    } catch (error) {
      console.error("Error updating image:", (error as Error).message);
    }
  };

  useEffect(() => {
    form.setValue("imageCover", imageCover || null);

    if (imageCover instanceof File) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(imageCover);
    } else {
      setImagePreview(imagePreviewUrl);
    }
  }, [imageCover, form]);

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4 dark:bg-gray-800">
      <div className="font-medium flex items-center justify-between">
        Course Image
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
              name="imageCover"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        const file = event.target.files?.[0] || null;
                        field.onChange(file);
                        setImagePreview(
                          file ? URL.createObjectURL(file) : null
                        );
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
          {imagePreview ? (
            <div>
              <img src={imagePreview} alt="Preview" className="w-full h-auto" />
            </div>
          ) : (
            <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
              <ImageIcon className="h-10 w-10 text-slate-500" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ImageForm;
