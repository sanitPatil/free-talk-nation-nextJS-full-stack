import postModel from "@/Models/Post.Model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: { tweetId: string } }
): Promise<any> {
  const params = await context.params;
  const { tweetId } = params;

  if (!tweetId)
    return NextResponse.json(
      {
        success: false,
        message: `tweet id not given!!!`,
      },
      { status: 400 }
    );

  try {
    const tweet = await postModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(tweetId),
        },
      },
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
          "ownerDetails.coverImage": 1,
          "ownerDetails.avatar": 1,
        },
      },
    ]);

    if (!tweet)
      return NextResponse.json(
        {
          success: false,
          message: `tweet with given id Not FOUND!!!`,
        },
        { status: 404 }
      );

    return NextResponse.json(
      {
        success: true,
        message: `Tweet Found Successfully!`,
        tweet: tweet[0],
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: `failed to get tweet!!!`,
      },
      { status: 500 }
    );
  }
}
