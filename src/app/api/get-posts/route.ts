import { NextResponse } from "next/server";
import DbConnect from "@/DB/DatabaseConnect.Db";
import postModel from "@/Models/Post.Model";
export async function GET(request: Request): Promise<any> {
  try {
    await DbConnect();
    const list = await postModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "ownerDetails",
        },
      },
      { $unwind: "$ownerDetails" },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          createdAt: 1,
          updatedAt: 1,
          file: 1,
          onwer: 1,
          "ownerDetails._id": 1,
          "ownerDetails.username": 1,
          "ownerDetails.profileImage": 1,
        },
      },
    ]);

    return NextResponse.json(
      {
        success: true,
        message: "fetch-successfully-post-list",
        list,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "failed to get tweets!!!",
      },
      { status: 500 }
    );
  }
}
