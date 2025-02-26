import cloudinary from "./config.cloudinary";

// file upload -----
export const uploadFile = async (
  fileBuffer: Buffer,
  file: File
): Promise<any> => {
  if (!file) {
    console.log(`file is missing!!!`);
    return null;
  }

  const validResourceTypes = ["image", "video", "raw"] as const;

  const extractedType = file.type.split("/")[0];

  const resourceType: "image" | "video" | "raw" | "auto" =
    validResourceTypes.includes(extractedType as any)
      ? (extractedType as "image" | "video" | "raw")
      : "auto";

  const folder = `post/${resourceType}` as string;

  try {
    return await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        {
          resource_type: resourceType,
          folder,
        },
        (err, result) => {
          if (err) {
            console.error(err);
            return reject(err);
          }
          resolve(result);
        }
      );
      uploadStream.end(fileBuffer);
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

// file removal -----
// todo

export const removeFile = async (publicId) => {
  const resource_type = publicId.split("/")[1];
  try {
    const result = await cloudinary.v2.uploader.destroy(publicId, {
      resource_type,
    });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
