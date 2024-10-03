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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

interface Category {
  _id: string;
  title: string;
}

interface CategoryFormProps {
  category: string;
  onCategoryChange: (newCategory: string) => void;
}
const categoryFormSchema = z.object({
  category: z
    .string()
    .min(1, { message: "category is required" })
    .min(3, { message: "category is too short" })
    .max(100, { message: "category is too long" }),
});

const CategoryForm = ({ category, onCategoryChange }: CategoryFormProps) => {
  const [isEditing, setIsEditing] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryTitle, setSelectedCategoryTitle] = useState(category);
  const pathname = usePathname();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `https://lms-mern-stack-server.vercel.app/api/categories?limit=10`
        );
        if (!response.ok) throw new Error("Failed to fetch category data");
        const results = await response.json();
        setCategories(results.data.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const toggleEdit = () => setIsEditing(!isEditing);

  const onSubmit = async (data: z.infer<typeof categoryFormSchema>) => {
    onCategoryChange(data.category);
    await updateCategory(data.category);
    toggleEdit();
  };

  const form = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      category: "",
    },
  });

  useEffect(() => {
    form.setValue("category", category);
    setSelectedCategoryTitle(category);
  }, [category, form]);

  const updateCategory = async (newCategory: string) => {
    const id = pathname.split("/").pop();
    const formData = new FormData();
    formData.append("category", newCategory);

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
      const updatedCategory = categories.find((c) => c._id === newCategory);
      if (updatedCategory) {
        setSelectedCategoryTitle(updatedCategory.title);
      }
    } catch (error) {
      console.error("Error updating category:", (error as Error).message);
      await toast.error("Error updating category");
    }
  };

  return (
    <div className="p-8 flex flex-col gap-y-4 bg-[var(--sidebar)]">
      <div className="flex justify-between items-center">
        <h1 className="text-md">Course category</h1>
        <Button onClick={toggleEdit} variant="ghost" className="text-black">
          {isEditing ? <>Cancel</> : <>Edit</>}
        </Button>
      </div>
      <div>
        {isEditing ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        const selectedCategory = categories.find(
                          (c) => c._id === value
                        );
                        if (selectedCategory) {
                          setSelectedCategoryTitle(selectedCategory.title);
                        }
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.isArray(categories) && categories.length > 0 ? (
                          categories.map((category) => (
                            <SelectItem key={category._id} value={category._id}>
                              {category.title}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no-categories" disabled>
                            No categories available
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
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
          <p className="text-sm">{selectedCategoryTitle}</p>
        )}
      </div>
    </div>
  );
};

export default CategoryForm;
