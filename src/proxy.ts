import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { AUTH_DEFAULT_REDIRECT_URL, AUTH_LOGIN_PAGE_URL, AUTH_URLS } from "@/config";

export async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const callbackUrl = searchParams.get("callback_url") || AUTH_DEFAULT_REDIRECT_URL;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log("Middleware - Session:", session);
  console.log("Middleware - Request Pathname:", pathname);

  // Redirect authenticated users away from login page
  if (session && AUTH_URLS.includes(pathname)) {
    const url = new URL(callbackUrl, request.url);
    console.log("Redirecting authenticated user to:", url.toString());
    return NextResponse.redirect(url);
  }

  // Redirect unauthenticated users to login, except if already on login page
  if (!session && pathname !== AUTH_LOGIN_PAGE_URL) {
    const loginUrl = new URL(AUTH_LOGIN_PAGE_URL, request.url);
    loginUrl.searchParams.set("callback_url", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Allow request to proceed
  return NextResponse.next();
}

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/auth/:path*",
    //   // matcher: [
    //   //   // Skip Next.js internals and all static files, unless found in search params
    // '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    //   //   // Always run for API routes
    //   //   // '/(api|trpc|auth/)(.*)',
    // '/((?!api|_next/static|_next/image|.*\\.png$).*)'
  ],
};
