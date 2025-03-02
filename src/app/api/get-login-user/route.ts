import DbConnect from "@/DB/DatabaseConnect.Db";
import userModel from "@/Models/User.Model";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<any> {
  const token = await getToken({ req: request });
  if (!token)
    return NextResponse.json(
      { success: false, message: "Un Authorized Access!!!" },
      { status: 401 }
    );

  try {
    await DbConnect();

    const user = await userModel
      .findById(token._id)
      .select("-password -coverImagePublicId -avatarPublicId");

    return NextResponse.json(
      { success: true, message: "get login user successfully", user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "failed to get login user" },
      { status: 500 }
    );
  }
}
