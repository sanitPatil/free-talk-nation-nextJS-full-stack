import DbConnect from "@/DB/DatabaseConnect.Db";
import userModel from "@/Models/User.Model";
import {
  removeFile,
  uploadFile,
} from "@/utils/cloudinary/File.cloduinary.utils";
import { decrypt, encrypt } from "@/utils/EncDenc.utils";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest): Promise<any> {
  const token = await getToken({ req: request });

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Un-autorized Access!!!" },
      { status: 401 }
    );
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json(
      { success: false, message: "Cover Image Missing!!!" },
      { status: 400 }
    );
  }

  if (!(file instanceof Blob)) {
    return NextResponse.json(
      { success: false, message: "In-valid file type!!!" },
      { status: 500 }
    );
  }
  try {
    await DbConnect();
    const user = await userModel.findById(token._id);

    if (!user)
      return NextResponse.json(
        { success: false, message: "server failed find user!!!" },
        { status: 500 }
      );

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileResponse = await uploadFile(buffer, file);

    if (!fileResponse) {
      return NextResponse.json(
        { success: false, message: "failed to update Avatar image!!!" },
        { status: 500 }
      );
    }

    const encryptPublicId = encrypt(fileResponse.public_id);

    if (user.avatarPublicId) {
      const dcryptedPublicId = decrypt(user.avatarPublicId);
      const removeRes = await removeFile(dcryptedPublicId);
    }

    const updateProfile = await userModel.findByIdAndUpdate(
      user._id,
      {
        $set: {
          avatar: fileResponse.secure_url || "",
          avatarPublicId: encryptPublicId || "",
        },
      },
      { new: true }
    );

    if (!updateProfile) {
      return NextResponse.json(
        { success: false, message: "failed to update user-avatar!!!" },
        { status: 500 }
      );
    }
    const updatedUser = await userModel
      .findById(updateProfile._id)
      .select("-password -coverImagePublicId -avatarPublicId");
    return NextResponse.json(
      {
        success: true,
        message: "successfully updated avatar iamge!!!",
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "failed to update avatar image!!!" },
      { status: 500 }
    );
  }
}
