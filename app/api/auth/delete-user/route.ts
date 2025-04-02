import { type NextRequest, NextResponse } from "next/server"
import { getAdmin } from "@/lib/firebase-admin"

export async function POST(request: NextRequest) {
  try {
    const { uid } = await request.json()

    if (!uid) {
      return NextResponse.json({ error: "Missing uid" }, { status: 400 })
    }

    // Delete user from Firebase Auth
    const { auth } = getAdmin()
    await auth.deleteUser(uid)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
  }
}

