import userModel from "@/Models/User.Model";

export async function POST(request: Request): Promise<any> {
  try {
    const { username } = await request.json();

    const usernameValidate = await userModel.find({ username });

    if (usernameValidate) {
      return Response.json(
        {
          success: false,
          message: "username already taken!",
        },
        { status: 400 }
      );
    } else {
      return Response.json(
        {
          success: true,
          message: "username valid",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error(`failed to validate username! ${error}`);
    return Response.json(
      {
        success: false,
        message: `failed to validate username! ${error}`,
      },
      {
        status: 500,
      }
    );
  }
}
