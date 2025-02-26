import DbConnect from "@/DB/DatabaseConnect.Db";
import postModel from "@/Models/Post.Model";
import { removeFile } from "@/utils/cloudinary/File.cloduinary.utils";
import { decrypt } from "@/utils/EncDenc.utils";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, context): Promise<any> {
  const token = await getToken({ req: request });
  if (!token)
    return NextResponse.json(
      { success: false, message: "Unautorized Access!!!" },
      { status: 401 }
    );

  const params = await context.params;

  const owner = token._id;
  const { postId } = params;

  if (!postId)
    return NextResponse.json(
      { success: false, message: "post id required!!!" },
      { status: 400 }
    );

  await DbConnect();

  try {
    const post_owner = await postModel.findOne({
      $and: [{ _id: postId }, { owner }],
    });

    if (!post_owner)
      return NextResponse.json(
        {
          success: false,
          message: "Un-Autorized Access, You are owner of this Tweet!!!",
        },
        { status: 401 }
      );

    if (post_owner.file_public_id) {
      const publicId = decrypt(post_owner.file_public_id);
      await removeFile(publicId);
    }

    const result = await postModel.findByIdAndDelete(post_owner._id);

    if (!result)
      return NextResponse.json(
        {
          success: false,
          message: "failed to delete Tweet!!!",
        },
        { status: 500 }
      );

    return NextResponse.json(
      {
        success: true,
        message: "Tweet Remove Successfully!!!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "failed to delete Tweet!!!!!!",
      },
      { status: 500 }
    );
  }
}
