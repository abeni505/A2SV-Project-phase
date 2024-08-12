// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define the pages that need to be protected
const protectedPages = ["/", "/otp"];

// Middleware to handle protected routes
export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token");

  // Redirect to sign-up page if trying to access protected pages without a token
  if (protectedPages.includes(request.nextUrl.pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL("/signUp", request.url));
    }
  }

  // Redirect to homepage if trying to access sign-up or OTP page with a token
  if (
    request.nextUrl.pathname === "/signUp") {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

// Specify the paths that the middleware should be applied to
export const config = {
  matcher: ["/otp", "/"],
};
