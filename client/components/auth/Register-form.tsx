"use client";
import * as z from "zod";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/schemas";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import toast from "react-hot-toast";

export const RegisterForm = () => {
  const [role, setRole] = useState("");
  const router = useRouter();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      role: "",
    },
  });

  const onSubmit = (data: any) => {
    data.role = role;
    fetch("https://lms-mern-stack-server.vercel.app/api/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to register user");
        }
        return response.json();
      })
      .then((result) => {
        console.log("User created:", result);
        toast.success("Registerd successfully !");
        router.push("/dashboard");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      socialShow
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-[var(--bg)]">Your role</FormLabel>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          {role ? (
                            role
                          ) : (
                            <>
                              <ChevronDown className="inline mr-2" /> Choose
                              Your Role
                            </>
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Choose Your Role</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                          value={role}
                          onValueChange={(value) => {
                            setRole(value);
                            field.onChange(value);
                          }}
                        >
                          <DropdownMenuRadioItem value="admin">
                            Admin
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="teacher">
                            Teacher
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="student">
                            Student
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[var(--bg)]">Your name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Hisham Mohamed"
                      type="text"
                      className="placeholder:color-[var(--bgdark)]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      className="placeholder:color-[var(--bgdark)]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      className="placeholder:color-[var(--bgdark)]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError />
          <FormSuccess />
          <Button
            size="lg"
            className="w-full bg-[var(--bg)] hover:bg-[var(--bg)]"
            type="submit"
          >
            Create an account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
