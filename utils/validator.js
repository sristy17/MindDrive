import { z } from "zod";
export const userSigninSchema = z.object({
    username: z.string().min(3, "Invalid username"),
    password: z.string().min(6, "Invalid password"),
});
export const userSignupSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    dob: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }),
    gender: z.enum(["male", "female", "other"], { message: "Gender is required" }),
    fullName: z
        .string()
        .min(3, "Full Name must be at least 3 characters long")
        .regex(/^[A-Za-z\s]+$/, "Full Name can only contain alphabets and spaces"),
    phoneNumber: z.string().optional().refine((val) => !val || /^\d{10}$/.test(val), {
        message: "Phone number must be 10 digits",
    }),
});