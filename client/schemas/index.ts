import * as z from "zod";


export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required / Invalid email" }),

  password: z.string().min(1, { message: "Password is required" }),

  code: z.optional(z.string()),
});


export const RegisterSchema = z.object({
    name:z.string().min(3, { message: "min number of name is 3 characters" }),
    role:z.string(),
    email: z.string().min(1 , { message: "Email is required" }).email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password is required" }).min(6, { message: "password is at least 6 chars" })
  });

export const CourseCraeteSchema = z.object({
  title: z.string().min(1 , {message:"Title is required"})
  
})

