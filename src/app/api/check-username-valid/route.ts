import DbConnect from "@/DB/DatabaseConnect.Db";
import userModel from "@/Models/User.Model";
import {  UsernameSchemaValidation } from "@/Schemas/signUpSchema";

export async function GET(request: Request): Promise<any> {
  await DbConnect();
  try {
    const { searchParams } = new URL(request.url);
    // console.log(searchParams);
    const querySearch = {
      username: searchParams.get("username"),
    };
    // console.log(querySearch);

    const strictCheckUsername = UsernameSchemaValidation.safeParse(
      querySearch.username
    );
    // console.log(strictCheckUsername.error?.format()._errors.toString());

    if (!strictCheckUsername.success) {
      return Response.json(
        {
          success: false,
          message: strictCheckUsername.error
            ? strictCheckUsername.error.errors
                .map((err) => err.message)
                .join(", ")
            : "Invalid username",
        },
        {
          status: 400,
        }
      );
    }

    const usernameExists = await userModel.exists({
      username: strictCheckUsername?.data,
    });

    if (usernameExists) {
      return Response.json(
        {
          success: false,
          message: `username already taken!!!`,
        },
        {
          status: 409,
        }
      );
    }

    return Response.json(
      {
        success: true,
        message: "username valid",
      },
      { status: 200 }
    );
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
