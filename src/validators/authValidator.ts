import { z } from "zod";

//creating an object schema
export const userRegisterSchema = z.object({
  name: z
    .string({ required_error: "name is required" })
    .trim()
    .min(3, { message: "name must be atleast of 3 characters" })
    .max(20, { message: "name must be at most 0f 20 characters" }),
  email: z
    .string({ required_error: "email is required" })
    .trim()
    .email({ message: "Invalid Email Address" }),
  password: z
    .string({ required_error: "password is required" })
    .trim()
    .min(3, { message: "password must be atleast of 3 characters" })
    .max(20, { message: "name must be at most 0f 20 characters" }),
});

export const userLoginSchema = z.object({
  email: z
    .string({ required_error: "email is required" })
    .trim()
    .email({ message: "Invalid Email Address" }),
  password: z.string({ required_error: "password is required" }),
});

export type RegisterSchemaType = z.infer<typeof userRegisterSchema>;
