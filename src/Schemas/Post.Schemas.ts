import { z } from "zod";

export const PostSchemaValidation = z.object({
  onwer: z.string(),
  title: z.string(),
  description: z.string(),
});
