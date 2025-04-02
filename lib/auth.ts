import { auth, db } from "./firebase"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updatePassword,
  type User,
} from "firebase/auth"
import { doc, setDoc, getDoc, updateDoc, collection, query, getDocs } from "firebase/firestore"

// User roles
export type UserRole = "admin" | "editor" | "viewer"

// User profile with role
export interface UserProfile {
  uid: string
  email: string
  displayName?: string
  role: UserRole
  createdAt: number
  lastLogin?: number
}

// Sign in user
export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Get custom token for session cookie
    const idToken = await user.getIdToken()

    // Call API to create session cookie
    const response = await fetch("/api/auth/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    })

    if (!response.ok) {
      throw new Error("Failed to create session")
    }

    // Update last login
    await updateDoc(doc(db, "users", user.uid), {
      lastLogin: Date.now(),
    })

    return user
  } catch (error) {
    console.error("Error signing in:", error)
    throw error
  }
}

// Sign out user
export async function signOut() {
  try {
    await firebaseSignOut(auth)

    // Call API to clear session cookie
    await fetch("/api/auth/session", {
      method: "DELETE",
    })

    return true
  } catch (error) {
    console.error("Error signing out:", error)
    throw error
  }
}

// Create a new user
export async function createUser(email: string, password: string, role: UserRole = "viewer", displayName?: string) {
  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Create user profile in Firestore
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email!,
      displayName: displayName || "",
      role,
      createdAt: Date.now(),
    }

    await setDoc(doc(db, "users", user.uid), userProfile)

    // Set custom claims for role-based access
    await fetch("/api/auth/set-custom-claims", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: user.uid,
        claims: { [role]: true },
      }),
    })

    return userProfile
  } catch (error) {
    console.error("Error creating user:", error)
    throw error
  }
}

// Get user profile
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const userDoc = await getDoc(doc(db, "users", uid))

    if (userDoc.exists()) {
      return userDoc.data() as UserProfile
    }

    return null
  } catch (error) {
    console.error("Error getting user profile:", error)
    throw error
  }
}

// Update user profile
export async function updateUserProfile(uid: string, data: Partial<UserProfile>) {
  try {
    await updateDoc(doc(db, "users", uid), data)

    // If role is updated, update custom claims
    if (data.role) {
      await fetch("/api/auth/set-custom-claims", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid,
          claims: { [data.role]: true },
        }),
      })
    }

    return true
  } catch (error) {
    console.error("Error updating user profile:", error)
    throw error
  }
}

// Get all users
export async function getAllUsers(): Promise<UserProfile[]> {
  try {
    const usersQuery = query(collection(db, "users"))
    const querySnapshot = await getDocs(usersQuery)

    const users: UserProfile[] = []
    querySnapshot.forEach((doc) => {
      users.push(doc.data() as UserProfile)
    })

    return users
  } catch (error) {
    console.error("Error getting all users:", error)
    throw error
  }
}

// Reset password
export async function resetPassword(email: string) {
  try {
    await sendPasswordResetEmail(auth, email)
    return true
  } catch (error) {
    console.error("Error resetting password:", error)
    throw error
  }
}

// Change password
export async function changePassword(user: User, newPassword: string) {
  try {
    await updatePassword(user, newPassword)
    return true
  } catch (error) {
    console.error("Error changing password:", error)
    throw error
  }
}

