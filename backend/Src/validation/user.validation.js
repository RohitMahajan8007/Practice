import { z } from "zod";

const RegisterValidation = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username cannot exceed 20 characters" }),

  email: z
    .string()
    .email({ message: "Invalid Email" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).+$/,
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }
    ),
});

const LoginValidation = z.object({
  email: z
    .string()
    .email({ message: "Invalid Email" }),
    password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
});








export { RegisterValidation, LoginValidation };