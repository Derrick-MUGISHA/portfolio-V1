import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"
import { getAdmin } from "@/lib/firebase-admin"

// Session duration: 2 weeks
const SESSION_DURATION = 60 * 60 * 24 * 14 * 1000

export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json()

    if (!idToken) {
      return NextResponse.json({ error: "Missing ID token" }, { status: 400 })
    }

    // Create session cookie
    const { auth } = getAdmin()
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: SESSION_DURATION,
    })

    // Set cookie
    cookies().set({
      name: "admin-session",
      value: sessionCookie,
      maxAge: SESSION_DURATION / 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error creating session:", error)
    return NextResponse.json({ error: "Failed to create session" }, { status: 500 })
  }
}

export async function DELETE() {
  // Clear session cookie
  cookies().delete("admin-session")
  return NextResponse.json({ success: true })
}

