import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { checkSession } from "@/lib/api/serverApi";

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isAuthPage =
    request.nextUrl.pathname.startsWith("/sign-in") ||
    request.nextUrl.pathname.startsWith("/sign-up");

  const isPrivatePage =
    request.nextUrl.pathname.startsWith("/profile") ||
    request.nextUrl.pathname.startsWith("/notes");

  let isAuthenticated = false;
  // let response = NextResponse.next();
  let cookiesToSet: string[] = [];

  if (accessToken) {
    isAuthenticated = true;
  }

  if (!accessToken && refreshToken) {
    try {
      const res = await checkSession();

      // const res = NextResponse.next();

      const setCookie = res.headers["set-cookie"];
      if (setCookie) {
        // if (Array.isArray(setCookie)) {
        //   setCookie.forEach((cookie) => {
        //     response.headers.append("set-cookie", cookie);
        //   });
        // } else {
        //   response.headers.set("set-cookie", setCookie);
        // }
        if (Array.isArray(setCookie)) {
          cookiesToSet = setCookie;
        } else {
          cookiesToSet = [setCookie];
        }
      }
      isAuthenticated = true;
    } catch {
      isAuthenticated = false;
    }
  }
  const applyCookies = (res: NextResponse) => {
    cookiesToSet.forEach((cookie) => {
      res.headers.append("set-cookie", cookie);
    });
    return res;
  };

  //
  if (!isAuthenticated && isPrivatePage) {
    return applyCookies(
      NextResponse.redirect(new URL("/sign-in", request.url)),
    );
  }

  // if (!isAuthenticated && isPrivatePage) {
  //   return NextResponse.redirect(new URL("/sign-in", request.url));
  // }
  if (isAuthenticated && isAuthPage) {
    return applyCookies(NextResponse.redirect(new URL("/", request.url)));
  }
  return applyCookies(NextResponse.next());
}

// if (isAuthenticated && isAuthPage) {
//   return NextResponse.redirect(new URL("/", request.url));
// }

//   return response;

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
