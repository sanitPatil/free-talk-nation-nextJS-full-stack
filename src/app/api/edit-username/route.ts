import DbConnect from "@/DB/DatabaseConnect.Db";
import userModel from "@/Models/User.Model";

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

  const { username } = await request.json();

  if (!username) {
    return NextResponse.json(
      { success: false, message: "username missing!!" },
      { status: 400 }
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

    const updateProfile = await userModel.findByIdAndUpdate(
      user._id,
      {
        $set: {
          username: username || user.username,
        },
      },
      { new: true }
    );

    if (!updateProfile) {
      return NextResponse.json(
        { success: false, message: "failed to update username!!!" },
        { status: 500 }
      );
    }
    const updatedUser = await userModel
      .findById(updateProfile._id)
      .select("-password -coverImagePublicId -avatarPublicId");
    return NextResponse.json(
      {
        success: true,
        message: "successfully updated username!!!",
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "failed to update Cover image!!!" },
      { status: 500 }
    );
  }
}
