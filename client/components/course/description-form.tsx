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
import Editor from "./editor";
import { Preview } from "./preview";
import { usePathname } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

interface DescriptionFormProps {
  description: string;
  onDescriptionChange: (newDesk: string) => void;
}

const descriptionFormSchema = z.object({
  description: z
    .string()
    .min(1, { message: "description is required" })
    .min(10, { message: "description is too short" })
    .max(100, { message: "description is too long" }),
});

const DescriptionForm = ({
  description,
  onDescriptionChange,
}: DescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(true);
  const toggleEdit = () => setIsEditing((current) => !current);
  const pathname = usePathname();
  const onSubmit = async (data: z.infer<typeof descriptionFormSchema>) => {
    onDescriptionChange(data.description);
    await updateDescription(data.description);
    toggleEdit();
  };
  const form = useForm<z.infer<typeof descriptionFormSchema>>({
    resolver: zodResolver(descriptionFormSchema),
    defaultValues: {
      description: "",
    },
  });

  useEffect(() => {
    form.setValue("description", description);
  }, [description, form]);

  const updateDescription = async (newDescription: string) => {
    const id = pathname.split("/").pop();
    const formData = new FormData();
    formData.append("description", newDescription);
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
      console.log("description updated:", result);
      await toast.success("Description updated successfully !");
    } catch (error) {
      console.error("Error updating description:", (error as Error).message);
      await toast.success("Error updating Description");
    }
  };

  return (
    <div className="p-8 flex flex-col gap-y-4  bg-[var(--sidebar)] ">
      <div className="flex justify-between items-center  ">
        <h1 className="text-md "> Course description</h1>
        <Button onClick={toggleEdit} variant="ghost" className="text-black ">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2 " />
              Edit
            </>
          )}
        </Button>
      </div>
      <div>
        {isEditing ? (
          <>
            <Form {...form}>
              <form
                className="flex flex-col gap-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Editor {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="bg-[var(--textpur)] w-16 h-8 text-md hover:bg-[var(--textpur)]"
                  onClick={() => {
                    updateDescription;
                  }}
                >
                  save
                </Button>
              </form>
            </Form>
          </>
        ) : (
          <>
            <Preview value={description} />
          </>
        )}
      </div>
    </div>
  );
};

export default DescriptionForm;
