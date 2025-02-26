import { z } from "zod";

export const PostSchemaValidation = z.object({
  title: z.string(),
  description: z.string(),
  file: z
    .instanceof(File)
    .refine(
      (file) =>
        [
          "image/png",
          "image/jpeg",
          "image/jpg",
          "image/webp", // Images
          "video/mp4",
          "video/mpeg",
          "video/webm",
          "video/ogg", // Videos
          "application/pdf",
        ].includes(file.type), // PDFs
      {
        message: "Invalid file type. Only images, videos, or PDFs are allowed.",
      }
    )
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      // Limit file size to 5MB
      message: "File size must be under 5MB.",
    }),
});
