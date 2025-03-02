import DbConnect from "@/DB/DatabaseConnect.Db";
import userModel from "@/Models/User.Model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<any> {
  try {
    const { searchParams } = new URL(request.url);

    const searchUser = searchParams.get("username");
    console.log(searchUser);

    if (!searchUser)
      return NextResponse.json(
        {
          success: false,
          message: "username string is not given!!!",
        },
        { status: 400 }
      );

    await DbConnect();

    const users = await userModel
      .find({
        username: {
          $regex: searchUser,
          $options: "i",
        },
      })
      .select("_id username avatar email");

    return NextResponse.json(
      {
        success: true,
        message: "successfully fetch users",
        users,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "server failed resolve request!!!",
      },
      { status: 500 }
    );
  }
}
