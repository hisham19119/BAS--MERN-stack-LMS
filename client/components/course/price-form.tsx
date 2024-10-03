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
import { Pencil } from "lucide-react";
import { Input } from "../ui/input";
import { usePathname } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

interface PriceFormProps {
  price: string;
  onPriceChange: (price: string) => void;
}

const priceFormSchema = z.object({
  price: z.string({ message: "plesase price is numeric value" }),
});

const PriceForm = ({ price, onPriceChange }: PriceFormProps) => {
  const [isEditing, setIsEditing] = useState(true);
  const toggleEdit = () => setIsEditing((current) => !current);
  const pathname = usePathname();

  const onSubmit = async (data: z.infer<typeof priceFormSchema>) => {
    onPriceChange(data.price);
    await updatePrice(data.price);
    toggleEdit();
  };
  const form = useForm<z.infer<typeof priceFormSchema>>({
    resolver: zodResolver(priceFormSchema),
    defaultValues: {
      price: "0",
    },
  });

  useEffect(() => {
    form.setValue("price", price);
  }, [price, form]);

  const updatePrice = async (newPrice: string) => {
    const id = pathname.split("/").pop();

    const formData = new FormData();
    formData.append("price", newPrice);

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
      console.log("Price updated:", result);
      await toast.success("Price updated successfully !");
    } catch (error) {
      console.error("Error updating price:", (error as Error).message);
      await toast.success("Error updating Price");
    }
  };

  return (
    <div className="p-8 flex flex-col gap-y-4  bg-[var(--sidebar)] ">
      <div className="flex justify-between items-center  ">
        <h1 className="text-md "> Course Price</h1>
        <Button onClick={toggleEdit} variant="ghost" className="text-black ">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2 " />
              Edit Price
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
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="e.g '1599'"
                          {...field}
                          type="number"
                          step="0.1"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  onClick={() => {
                    updatePrice;
                  }}
                  className="bg-[var(--textpur)] w-16 h-8 text-md hover:bg-[var(--textpur)]"
                >
                  save
                </Button>
              </form>
            </Form>
          </>
        ) : (
          <>
            <p className="text-sm ">{price}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default PriceForm;
