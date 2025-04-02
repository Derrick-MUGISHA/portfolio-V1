import { type NextRequest, NextResponse } from "next/server"
import { getAdmin } from "@/lib/firebase-admin"
import { randomBytes } from "crypto"

export async function POST(request: NextRequest) {
  try {
    // Check if this is a secure request with the correct secret
    const { secret } = await request.json()

    if (secret !== process.env.ADMIN_SETUP_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { auth, db } = getAdmin()
    const adminEmail = "derrickmugisha169@gmail.com"

    // Check if admin user already exists
    try {
      const userRecord = await auth.getUserByEmail(adminEmail)

      // User exists, check if they have admin role
      const customClaims = userRecord.customClaims || {}

      if (!customClaims.admin) {
        // Set admin role
        await auth.setCustomUserClaims(userRecord.uid, { admin: true })

        // Update user in Firestore
        await db.collection("users").doc(userRecord.uid).update({
          role: "admin",
        })
      }

      return NextResponse.json({
        success: true,
        message: "Admin user already exists and has admin role",
        uid: userRecord.uid,
      })
    } catch (error) {
      // User doesn't exist, create new admin user
      const password = randomBytes(12).toString("hex")

      // Create user in Firebase Auth
      const userRecord = await auth.createUser({
        email: adminEmail,
        password,
        emailVerified: true,
      })

      // Set admin role
      await auth.setCustomUserClaims(userRecord.uid, { admin: true })

      // Create user profile in Firestore
      await db.collection("users").doc(userRecord.uid).set({
        uid: userRecord.uid,
        email: adminEmail,
        role: "admin",
        createdAt: Date.now(),
      })

      return NextResponse.json({
        success: true,
        message: "Admin user created successfully",
        password,
        uid: userRecord.uid,
      })
    }
  } catch (error) {
    console.error("Error creating admin user:", error)
    return NextResponse.json({ error: "Failed to create admin user" }, { status: 500 })
  }
}

