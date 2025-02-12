import { z } from "zod";

export const UsernameSchemaValidation = z
  .string()
  .min(4, "username must contain at least 4 characters")
  .regex(/^\S+$/, "username must not contain space");

export const SignUpSchema = z.object({
  username: UsernameSchemaValidation,
  email: z.string().email(),
  password: z.string().min(8, "password length must be 8 characters"),
});
