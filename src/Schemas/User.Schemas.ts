import { z } from "zod";

export const UsernameSchemaValidation = z
  .string()
  .min(4, "username must contain at least 4 characters")
  .regex(/^\S+$/, "username must not contain space");
export const UserSchemaValidation = z.object({
  username: UsernameSchemaValidation,
  email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: "please provide valid email address",
  }),
  password: z.string().min(8, "password length must be 8 characters"),
});
