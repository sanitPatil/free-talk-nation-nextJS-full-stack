import DbConnect from "@/DB/DatabaseConnect.Db";
import userModel from "@/Models/User.Model";

export async function POST(Request: Request): Promise<any> {
  await DbConnect();
  try {
    const { username, email, password } = await Request.json();

    const checkUserExists = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (checkUserExists) {
      return Response.json(
        {
          success: false,
          message: `user with given credentials already exists`.toUpperCase(),
        },
        {
          status: 400,
        }
      );
    }

    const newUser = await userModel.create({
      username,
      email,
      password,
    });

    if (!newUser)
      return Response.json(
        { success: false, message: "failed to register" },
        { status: 500 }
      );

    const user = await userModel.findById(newUser._id).select("-password");

    return Response.json(
      {
        success: true,
        message: "successfully register please login",
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Signup error: ${error}`);
    return Response.json(
      {
        success: false,
        message: "failed to sign up",
      },
      { status: 500 }
    );
  }
}
