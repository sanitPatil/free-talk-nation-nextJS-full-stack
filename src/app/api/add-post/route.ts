import DbConnect from "@/DB/DatabaseConnect.Db";
import { uploadFile } from "@/utils/cloudinary/File.cloduinary.utils";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import postModel from "@/Models/Post.Model";
import mongoose from "mongoose";
export async function POST(request: Request): Promise<any> {
  const token = await getToken({ req: request });
  if (!token)
    return NextResponse.json(
      {
        succsss: false,
        message: `Un-Autorized Access !!!`,
      },
      {
        status: 401,
      }
    );

  try {
    await DbConnect();
    const formData = await request.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const file = formData.get("file");
    const owner = new mongoose.Types.ObjectId(token._id);
    
    
    let fileResponse = undefined;
    let decryptPublicId = undefined;
    if (file) {
      if (!(file instanceof Blob))
        return NextResponse.json(
          {
            success: false,
            message: "Invalid file upload",
          },
          {
            status: 400,
          }
        );
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      fileResponse = await uploadFile(buffer, file);

      decryptPublicId = await bcrypt.hash(fileResponse.public_id, 10);
    }

    const savePost = await postModel.create({
      owner,
      title,
      description,
      file: fileResponse ? fileResponse.secure_url : "",
      file_public_id: fileResponse ? decryptPublicId : "",
    });

    if (!savePost)
      return NextResponse.json(
        {
          success: false,
          message: "failed to save post!!!",
        },
        {
          status: 500,
        }
      );

    return NextResponse.json(
      {
        succsss: true,
        message: `Tweet Successfully Saved!!!`,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "failed to upload Tweet",
      },
      {
        status: 500,
      }
    );
  }
}
