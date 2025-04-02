import { type NextRequest, NextResponse } from "next/server"
import { getAdmin } from "@/lib/firebase-admin"

export async function POST(request: NextRequest) {
  try {
    const { uid, claims } = await request.json()

    if (!uid || !claims) {
      return NextResponse.json({ error: "Missing uid or claims" }, { status: 400 })
    }

    // Set custom claims
    const { auth } = getAdmin()
    await auth.setCustomUserClaims(uid, claims)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error setting custom claims:", error)
    return NextResponse.json({ error: "Failed to set custom claims" }, { status: 500 })
  }
}

