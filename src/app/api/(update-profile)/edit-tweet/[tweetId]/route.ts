import DbConnect from "@/DB/DatabaseConnect.Db";
import postModel from "@/Models/Post.Model";
import {
  removeFile,
  uploadFile,
} from "@/utils/cloudinary/File.cloduinary.utils";
import { decrypt, encrypt } from "@/utils/EncDenc.utils";
import mongoose from "mongoose";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  context: { params: { tweetId: string } }
): Promise<any> {
  const token = await getToken({ req: request });
  // 1. token valid check - {sanit patil}
  if (!token)
    return NextResponse.json(
      { success: false, message: `un-authorized Access!!!` },
      { status: 401 }
    );
  //  2 get tweet id
  const params = await context.params;
  const { tweetId } = params;

  if (!tweetId)
    return NextResponse.json(
      { success: false, message: `tweet identifier is Missing!!!` },
      { status: 400 }
    );

  try {
    await DbConnect();
    // 3. owner checking

    const tweet_Owner = await postModel.findOne({
      $and: [{ _id: tweetId }, { owner: token._id }],
    });

    if (!tweet_Owner)
      return NextResponse.json(
        { success: false, message: `un-authorized Access!!!` },
        { status: 401 }
      );
    // 4. formData get
    const formData = await request.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const file = formData.get("file");

    // 5. file checking present or not
    let fileResponse = undefined;
    let decryptPublicId = undefined;

    //6.  removing old file
    if (tweet_Owner.file) {
      const publicId = decrypt(tweet_Owner.file_public_id);
      const removeResponse = await removeFile(publicId);
    }
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

      decryptPublicId = encrypt(fileResponse.public_id);
    }
    // updating file
    const updatedTweet = await postModel.findByIdAndUpdate(
      tweet_Owner._id,
      {
        $set: {
          title: title ? title : tweet_Owner.title,
          description: description ? description : tweet_Owner.description,
          file: fileResponse ? fileResponse.secure_url : "",
          file_public_id: fileResponse ? decryptPublicId : "",
        },
      },
      { new: true }
    );

    return NextResponse.json(
      {
        success: true,
        message: "successfully updated tweet",
        tweet: updatedTweet,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `failed to delete Tweet!!!` },
      { status: 500 }
    );
  }
}
