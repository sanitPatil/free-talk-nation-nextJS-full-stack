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

  const { bio } = await request.json();

  if (!bio) {
    return NextResponse.json(
      { success: false, message: "bio field missing!!" },
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
          bio: bio || user.bio,
        },
      },
      { new: true }
    );

    if (!updateProfile) {
      return NextResponse.json(
        { success: false, message: "failed to update bio!!!" },
        { status: 500 }
      );
    }
    const updatedUser = await userModel
      .findById(updateProfile._id)
      .select("-password -coverImagePublicId -avatarPublicId");
    return NextResponse.json(
      {
        success: true,
        message: "successfully updated bio!!!",
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "failed to bio!!!" },
      { status: 500 }
    );
  }
}
