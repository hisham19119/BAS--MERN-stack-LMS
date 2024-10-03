"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas";
import { CardWrapper } from "@/components/auth/Card-wrapper";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const LoginForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: any) => {
    fetch("https://lms-mern-stack-server.vercel.app/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to login user");
        }
        return response.json();
      })
      .then((result) => {
        console.log("User logged in successfully:", result);
        toast.success("logged in successfully !");
        router.push("/dashboard");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <CardWrapper
      headerLabel={"Welcome back"}
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      socialShow
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[var(--bg)]">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="hisham@gmail.com"
                      type="email"
                      className="placeholder:color-[var(--bgdark)] "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[var(--bg)]">Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="*******"
                      type="password"
                      className="placeholder:color-[var(--bgdark)] "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>
          <FormError />
          <FormSuccess />
          <Button
            size="lg"
            className="w-full bg-[var(--bg)] hover:bg-[var(--bg)]"
            type="submit"
            onClick={() => {
              onSubmit;
            }}
          >
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
