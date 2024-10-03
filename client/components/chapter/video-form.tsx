import * as z from "zod";
import { Pencil, VideoIcon } from "lucide-react";
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
import toast from "react-hot-toast";

interface videoFormProps {
  video: File | null | undefined;
  onVideoChanges: (file: File | null | undefined) => void;
  videoPreviewUrl: string | null;
}

const VideoFormSchema = z.object({
  video: z.instanceof(File).nullable().optional(),
});

const VideoForm = ({
  video,
  onVideoChanges,
  videoPreviewUrl,
}: videoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const toggleEdit = () => setIsEditing((current) => !current);
  const pathname = usePathname();
  const form = useForm<z.infer<typeof VideoFormSchema>>({
    resolver: zodResolver(VideoFormSchema),
    defaultValues: {
      video: video || null,
    },
  });

  const updateVideo = async (newVideo: File) => {
    const id = pathname.split("/").pop();
    const formData = new FormData();
    formData.append("video", newVideo);
    try {
      const response = await fetch(
        `https://lms-mern-stack-server.vercel.app/chapters/${id}`,
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
      console.log("video updated:", result);
    } catch (error) {
      console.error("Error updating vidoe:", (error as Error).message);
    }
  };

  useEffect(() => {
    form.setValue("video", video || null);
    if (video instanceof File) {
      const reader = new FileReader();
      reader.onload = () => {
        setVideoPreview(reader.result as string);
      };
      reader.readAsDataURL(video);
    } else {
      setVideoPreview(videoPreviewUrl);
    }
  }, [video, form]);

  const onSubmit = async (data: z.infer<typeof VideoFormSchema>) => {
    onVideoChanges(data.video);
    if (data.video) {
      await updateVideo(data.video);
    }
    toggleEdit();
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4 dark:bg-gray-800">
      <div className="font-medium flex items-center justify-between">
        Chapter Video
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            "Cancel"
          ) : (
            <>
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
              name="video"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="file"
                      accept="video/*"
                      onChange={(event) => {
                        const file = event.target.files?.[0] || null;
                        field.onChange(file);
                        setVideoPreview(
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
              onClick={() => {
                updateVideo;
              }}
              className="bg-[var(--textpur)] w-16 h-8 text-md hover:bg-[var(--textpur)]"
            >
              Save
            </Button>
          </form>
        </Form>
      ) : videoPreview ? (
        <video controls src={videoPreview} className="w-full h-auto"></video>
      ) : (
        <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
          <VideoIcon className="h-10 w-10 text-slate-500" />
        </div>
      )}
    </div>
  );
};

export default VideoForm;
