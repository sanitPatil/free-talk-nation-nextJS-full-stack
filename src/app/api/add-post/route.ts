import DbConnect from "@/DB/DatabaseConnect.Db";
import { getToken } from "next-auth/jwt";

export async function POST(request: Request): Promise<any> {
  const token = await getToken({ req: request });
  if (!token)
    return Response.json(
      {
        succsss: false,
        message: `Un-Autorized Access !!!`,
      },
      {
        status: 401,
      }
    );

  try {
    await DbConnect();
    const formData = await request.formData();
    // console.log(formData);

    const title = formData.get("title");
    const description = formData.get("description");
    const file = formData.get("file");
    const owner = formData.get("owner");
    console.log(file);

    // console.log(
    //   `title:${title}, description:${description}, file:${file}, owner:${owner}`
    // );

    return Response.json(
      {
        succsss: true,
        message: `Tweet Successfully Saved!!!`,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        success: false,
        message: "failed to upload Tweet",
      },
      {
        status: 500,
      }
    );
  }
}
