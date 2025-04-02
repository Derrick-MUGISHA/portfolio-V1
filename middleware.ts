import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getAuth } from "firebase-admin/auth"
import { initAdmin } from "./lib/firebase-admin"

// Initialize Firebase Admin if it hasn't been initialized
initAdmin()

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("admin-session")?.value

  // Check if the path is in the admin section
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Skip authentication check for login page
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next()
    }

    // No session, redirect to login
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    try {
      // Verify the session cookie
      const decodedClaims = await getAuth().verifySessionCookie(session, true)

      // Check if user has admin role
      if (!decodedClaims.admin) {
        return NextResponse.redirect(new URL("/admin/login?error=unauthorized", request.url))
      }

      // User is authenticated and has admin role
      return NextResponse.next()
    } catch (error) {
      // Invalid session cookie
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
  runtime: "nodejs",
};
