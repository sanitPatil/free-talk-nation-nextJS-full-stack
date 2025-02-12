import { z } from "zod";

export const signInSchema = z.object({
  identifier: z.string().regex(/^\S*$/, "username must not contain spaces"),
  password: z.string().min(8, "password length must be 8 characters"),
});
