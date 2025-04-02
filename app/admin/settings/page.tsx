"use client"

import { useState, useEffect } from "react"
import { auth, db } from "@/lib/firebase"
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Save, Key, User } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const [profile, setProfile] = useState({
    displayName: "",
    email: "",
  })

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const { toast } = useToast()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user)

        // Get user profile from Firestore
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid))

          if (userDoc.exists()) {
            const userData = userDoc.data()
            setProfile({
              displayName: userData.displayName || "",
              email: user.email || "",
            })
          }
        } catch (error) {
          console.error("Error fetching user profile:", error)
        }
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  async function handleUpdateProfile() {
    if (!user) return

    setSaving(true)
    setError(null)
    setSuccess(null)

    try {
      // Update profile in Firestore
      await updateDoc(doc(db, "users", user.uid), {
        displayName: profile.displayName,
      })

      setSuccess("Profile updated successfully")
      toast({
        title: "Success",
        description: "Profile updated successfully",
      })
    } catch (error: any) {
      console.error("Error updating profile:", error)
      setError(error.message || "Failed to update profile")
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  async function handleChangePassword() {
    if (!user) return

    setSaving(true)
    setError(null)
    setSuccess(null)

    // Validate passwords
    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("New passwords do not match")
      setSaving(false)
      return
    }

    if (passwords.newPassword.length < 6) {
      setError("New password must be at least 6 characters")
      setSaving(false)
      return
    }

    try {
      // Re-authenticate user
      const credential = EmailAuthProvider.credential(user.email!, passwords.currentPassword)

      await reauthenticateWithCredential(user, credential)

      // Change password
      await updatePassword(user, passwords.newPassword)

      // Clear password fields
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })

      setSuccess("Password changed successfully")
      toast({
        title: "Success",
        description: "Password changed successfully",
      })
    } catch (error: any) {
      console.error("Error changing password:", error)

      if (error.code === "auth/wrong-password") {
        setError("Current password is incorrect")
      } else {
        setError(error.message || "Failed to change password")
      }

      toast({
        title: "Error",
        description: error.message || "Failed to change password",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-white/5 text-white">
          <TabsTrigger value="profile" className="data-[state=active]:bg-white/10">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-white/10">
            <Key className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Profile Settings</CardTitle>
              <CardDescription className="text-white/70">Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive" className="bg-red-900/20 text-red-300 border-red-800">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="bg-green-900/20 text-green-300 border-green-800">
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="displayName" className="text-white">
                  Display Name
                </Label>
                <Input
                  id="displayName"
                  value={profile.displayName}
                  onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  value={profile.email}
                  disabled
                  className="bg-white/5 border-white/10 text-white opacity-70"
                />
                <p className="text-xs text-white/50">Email cannot be changed</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleUpdateProfile} disabled={saving} className="bg-white text-black hover:bg-white/90">
                <Save className="mr-2 h-4 w-4" />
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Change Password</CardTitle>
              <CardDescription className="text-white/70">
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive" className="bg-red-900/20 text-red-300 border-red-800">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="bg-green-900/20 text-green-300 border-green-800">
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-white">
                  Current Password
                </Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={passwords.currentPassword}
                  onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-white">
                  New Password
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwords.newPassword}
                  onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">
                  Confirm New Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwords.confirmPassword}
                  onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleChangePassword}
                disabled={saving}
                className="bg-white text-black hover:bg-white/90"
              >
                <Key className="mr-2 h-4 w-4" />
                {saving ? "Changing..." : "Change Password"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

