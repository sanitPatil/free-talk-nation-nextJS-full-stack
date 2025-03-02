import DbConnect from "@/DB/DatabaseConnect.Db";
import userModel from "@/Models/User.Model";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest): Promise<any> {
  const token = await getToken({ req: request });

  if (!token) {
    return NextResponse.json(
      { success: false, message: "un-authorized Access!!!" },
      { status: 401 }
    );
  }

  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { success: false, message: "email and password field are missing!!!" },
      { status: 400 }
    );
  }

  try {
    await DbConnect();

    const user = await userModel.findById(token._id);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "server failed to get user !!!" },
        { status: 500 }
      );
    }
    const isPasswordValid = await user.validatePassword(password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "In-valid password!!!" },
        { status: 400 }
      );
    }

    user.email = email;
    await user.save();

    return NextResponse.json(
      { success: true, message: "Email Updated Successfully!!!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "seerver failed to update email!!!" },
      { status: 500 }
    );
  }
}
