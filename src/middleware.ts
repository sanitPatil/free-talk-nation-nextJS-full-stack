import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  const url = request.nextUrl;

  console.log("Middleware Running → Path:", url.pathname, "Token:", token);

  if (token && (url.pathname === "/sign-in" || url.pathname === "/sign-up")) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (!token && url.pathname === "/home") {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Allow other requests to proceed
  return NextResponse.next();
}

// Matching paths that require middleware execution
export const config = {
  matcher: ["/sign-in", "/sign-up", "/home"],
};
