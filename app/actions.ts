"use server"

import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

export async function submitContactForm(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    if (!name || !email || !message) {
      return { success: false, error: "Please fill all required fields" }
    }

    // Add a new document with a generated id
    await addDoc(collection(db, "contacts"), {
      name,
      email,
      subject,
      message,
      createdAt: serverTimestamp(),
    })

    return { success: true }
  } catch (error) {
    console.error("Error submitting form:", error)
    return { success: false, error: "Failed to submit form. Please try again." }
  }
}

