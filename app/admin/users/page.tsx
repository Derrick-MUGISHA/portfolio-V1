"use client"

import { useState, useEffect } from "react"
import { db } from "@/lib/firebase"
import { collection, query, orderBy, getDocs, doc, deleteDoc } from "firebase/firestore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { MoreVertical, Trash, UserPlus, Search, Edit, Key } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { createUser, resetPassword, updateUserProfile } from "@/lib/auth"
import { useToast } from "@/components/ui/use-toast"

export default function UsersManagement() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null)
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isEditUserOpen, setIsEditUserOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<any | null>(null)
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    displayName: "",
    role: "viewer",
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    try {
      const usersQuery = query(collection(db, "users"), orderBy("createdAt", "desc"))
      const snapshot = await getDocs(usersQuery)
      const usersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      setUsers(usersData)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching users:", error)
      setLoading(false)
    }
  }

  async function handleDeleteUser() {
    if (!deleteUserId) return

    try {
      // Delete user from Firestore
      await deleteDoc(doc(db, "users", deleteUserId))

      // Delete user from Firebase Auth (via API)
      await fetch("/api/auth/delete-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid: deleteUserId }),
      })

      setUsers(users.filter((user) => user.id !== deleteUserId))
      setDeleteUserId(null)

      toast({
        title: "Success",
        description: "User deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting user:", error)
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      })
    }
  }

  async function handleAddUser() {
    try {
      if (!newUser.email || !newUser.password) {
        toast({
          title: "Error",
          description: "Email and password are required",
          variant: "destructive",
        })
        return
      }

      const userProfile = await createUser(newUser.email, newUser.password, newUser.role as any, newUser.displayName)

      setUsers([userProfile, ...users])
      setIsAddUserOpen(false)
      setNewUser({
        email: "",
        password: "",
        displayName: "",
        role: "viewer",
      })

      toast({
        title: "Success",
        description: "User created successfully",
      })
    } catch (error: any) {
      console.error("Error adding user:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to create user",
        variant: "destructive",
      })
    }
  }

  async function handleUpdateUser() {
    if (!editingUser) return

    try {
      await updateUserProfile(editingUser.uid, {
        displayName: editingUser.displayName,
        role: editingUser.role as any,
      })

      setUsers(users.map((user) => (user.uid === editingUser.uid ? { ...user, ...editingUser } : user)))

      setIsEditUserOpen(false)
      setEditingUser(null)

      toast({
        title: "Success",
        description: "User updated successfully",
      })
    } catch (error) {
      console.error("Error updating user:", error)
      toast({
        title: "Error",
        description: "Failed to update user",
        variant: "destructive",
      })
    }
  }

  async function handleResetPassword(email: string) {
    try {
      await resetPassword(email)

      toast({
        title: "Success",
        description: "Password reset email sent",
      })
    } catch (error) {
      console.error("Error resetting password:", error)
      toast({
        title: "Error",
        description: "Failed to send password reset email",
        variant: "destructive",
      })
    }
  }

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.displayName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Users</h1>
        <Button onClick={() => setIsAddUserOpen(true)} className="bg-white text-black hover:bg-white/90">
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/50" />
        <Input
          type="search"
          placeholder="Search users..."
          className="pl-8 bg-white/5 border-white/10 text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="rounded-md border border-white/10 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : filteredUsers.length > 0 ? (
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow>
                <TableHead className="text-white">User</TableHead>
                <TableHead className="text-white">Role</TableHead>
                <TableHead className="text-white">Created</TableHead>
                <TableHead className="text-white">Last Login</TableHead>
                <TableHead className="text-white w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.uid} className="border-white/10">
                  <TableCell className="font-medium text-white">
                    {user.displayName || "No name"}
                    <p className="text-sm text-white/70">{user.email}</p>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`
                        ${
                          user.role === "admin"
                            ? "border-red-500 text-red-400"
                            : user.role === "editor"
                              ? "border-blue-500 text-blue-400"
                              : "border-green-500 text-green-400"
                        }
                      `}
                    >
                      {user.role || "viewer"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-white/70">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Unknown"}
                  </TableCell>
                  <TableCell className="text-white/70">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : "Never"}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 text-white">
                          <span className="sr-only">Open menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-gray-900 border-white/10 text-white">
                        <DropdownMenuItem
                          onClick={() => {
                            setEditingUser(user)
                            setIsEditUserOpen(true)
                          }}
                          className="cursor-pointer hover:bg-white/10"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleResetPassword(user.email)}
                          className="cursor-pointer hover:bg-white/10"
                        >
                          <Key className="mr-2 h-4 w-4" />
                          Reset Password
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setDeleteUserId(user.uid)}
                          className="cursor-pointer text-red-500 hover:bg-red-900/20 hover:text-red-400"
                          disabled={user.role === "admin"} // Prevent deleting admin users
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 text-white/50">
            {searchQuery ? "No users match your search" : "No users found"}
          </div>
        )}
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog open={!!deleteUserId} onOpenChange={() => setDeleteUserId(null)}>
        <AlertDialogContent className="bg-gray-900 border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              This action cannot be undone. This will permanently delete the user account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-white/10 text-white hover:bg-white/10">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="bg-red-600 text-white hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add user dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="bg-gray-900 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription className="text-white/70">
              Create a new user account with specific permissions.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="bg-white/5 border-white/10 text-white"
                placeholder="user@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="bg-white/5 border-white/10 text-white"
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="displayName" className="text-white">
                Display Name (Optional)
              </Label>
              <Input
                id="displayName"
                value={newUser.displayName}
                onChange={(e) => setNewUser({ ...newUser, displayName: e.target.value })}
                className="bg-white/5 border-white/10 text-white"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-white">
                Role
              </Label>
              <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                <SelectTrigger id="role" className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/10 text-white">
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-white/50">
                Admin: Full access to all features
                <br />
                Editor: Can edit content but not manage users
                <br />
                Viewer: Read-only access to dashboard
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddUserOpen(false)}
              className="bg-transparent border-white/10 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button onClick={handleAddUser} className="bg-white text-black hover:bg-white/90">
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit user dialog */}
      <Dialog
        open={isEditUserOpen}
        onOpenChange={(open) => {
          setIsEditUserOpen(open)
          if (!open) setEditingUser(null)
        }}
      >
        <DialogContent className="bg-gray-900 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription className="text-white/70">Update user details and permissions.</DialogDescription>
          </DialogHeader>

          {editingUser && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-email" className="text-white">
                  Email
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editingUser.email}
                  disabled
                  className="bg-white/5 border-white/10 text-white opacity-70"
                />
                <p className="text-xs text-white/50">Email cannot be changed</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-displayName" className="text-white">
                  Display Name
                </Label>
                <Input
                  id="edit-displayName"
                  value={editingUser.displayName || ""}
                  onChange={(e) => setEditingUser({ ...editingUser, displayName: e.target.value })}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-role" className="text-white">
                  Role
                </Label>
                <Select
                  value={editingUser.role}
                  onValueChange={(value) => setEditingUser({ ...editingUser, role: value })}
                  disabled={editingUser.email === "derrickmugisha169@gmail.com"} // Prevent changing the main admin role
                >
                  <SelectTrigger id="edit-role" className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-white/10 text-white">
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditUserOpen(false)
                setEditingUser(null)
              }}
              className="bg-transparent border-white/10 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateUser} className="bg-white text-black hover:bg-white/90">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

