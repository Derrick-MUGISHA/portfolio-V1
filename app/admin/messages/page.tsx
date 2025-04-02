"use client"

import { useState, useEffect } from "react"
import { db } from "@/lib/firebase"
import { collection, query, orderBy, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"
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
import { MoreVertical, Trash, Mail, Search, CheckCircle, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function MessagesManagement() {
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [deleteMessageId, setDeleteMessageId] = useState<string | null>(null)
  const [viewMessage, setViewMessage] = useState<any | null>(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  async function fetchMessages() {
    try {
      const messagesQuery = query(collection(db, "contacts"), orderBy("createdAt", "desc"))
      const snapshot = await getDocs(messagesQuery)
      const messagesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      setMessages(messagesData)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching messages:", error)
      setLoading(false)
    }
  }

  async function handleDeleteMessage() {
    if (!deleteMessageId) return

    try {
      await deleteDoc(doc(db, "contacts", deleteMessageId))
      setMessages(messages.filter((message) => message.id !== deleteMessageId))
      setDeleteMessageId(null)
    } catch (error) {
      console.error("Error deleting message:", error)
    }
  }

  async function handleUpdateStatus(messageId: string, status: string) {
    try {
      await updateDoc(doc(db, "contacts", messageId), { status })
      setMessages(messages.map((message) => (message.id === messageId ? { ...message, status } : message)))

      if (viewMessage && viewMessage.id === messageId) {
        setViewMessage({ ...viewMessage, status })
      }
    } catch (error) {
      console.error("Error updating message status:", error)
    }
  }

  // Filter messages based on search query and status filter
  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.message?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      statusFilter === "all" || message.status === statusFilter || (statusFilter === "unread" && !message.status)

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Messages</h1>

      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/50" />
          <Input
            type="search"
            placeholder="Search messages..."
            className="pl-8 bg-white/5 border-white/10 text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-white/10 text-white">
            <SelectItem value="all">All Messages</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
            <SelectItem value="read">Read</SelectItem>
            <SelectItem value="replied">Replied</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border border-white/10 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : filteredMessages.length > 0 ? (
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow>
                <TableHead className="text-white">Sender</TableHead>
                <TableHead className="text-white">Subject</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-white">Date</TableHead>
                <TableHead className="text-white w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMessages.map((message) => (
                <TableRow
                  key={message.id}
                  className={`border-white/10 ${!message.status || message.status === "unread" ? "bg-white/5" : ""}`}
                >
                  <TableCell className="font-medium text-white">
                    {message.name}
                    <p className="text-sm text-white/70">{message.email}</p>
                  </TableCell>
                  <TableCell className="text-white">{message.subject || "No subject"}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`
                        ${
                          !message.status || message.status === "unread"
                            ? "border-blue-500 text-blue-400"
                            : message.status === "read"
                              ? "border-green-500 text-green-400"
                              : message.status === "replied"
                                ? "border-purple-500 text-purple-400"
                                : "border-gray-500 text-gray-400"
                        }
                      `}
                    >
                      {message.status || "Unread"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-white/70">
                    {message.createdAt && message.createdAt.toDate
                      ? new Date(message.createdAt.toDate()).toLocaleDateString()
                      : "Unknown date"}
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
                          onClick={() => setViewMessage(message)}
                          className="cursor-pointer hover:bg-white/10"
                        >
                          <Mail className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleUpdateStatus(message.id, "read")}
                          className="cursor-pointer hover:bg-white/10"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Mark as Read
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleUpdateStatus(message.id, "unread")}
                          className="cursor-pointer hover:bg-white/10"
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Mark as Unread
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setDeleteMessageId(message.id)}
                          className="cursor-pointer text-red-500 hover:bg-red-900/20 hover:text-red-400"
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
            {searchQuery || statusFilter !== "all" ? "No messages match your filters" : "No messages yet"}
          </div>
        )}
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog open={!!deleteMessageId} onOpenChange={() => setDeleteMessageId(null)}>
        <AlertDialogContent className="bg-gray-900 border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              This action cannot be undone. This will permanently delete the message.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-white/10 text-white hover:bg-white/10">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteMessage} className="bg-red-600 text-white hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* View message dialog */}
      <Dialog open={!!viewMessage} onOpenChange={() => setViewMessage(null)}>
        <DialogContent className="bg-gray-900 border-white/10 text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle>Message from {viewMessage?.name}</DialogTitle>
            <DialogDescription className="text-white/70">
              {viewMessage?.email} •{" "}
              {viewMessage?.createdAt && viewMessage.createdAt.toDate
                ? new Date(viewMessage.createdAt.toDate()).toLocaleString()
                : "Unknown date"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <h4 className="text-sm font-medium text-white/70">Subject</h4>
              <p className="text-white">{viewMessage?.subject || "No subject"}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-white/70">Message</h4>
              <div className="mt-1 p-4 rounded-md bg-white/5 text-white whitespace-pre-wrap">
                {viewMessage?.message}
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Select
              value={viewMessage?.status || "unread"}
              onValueChange={(value) => viewMessage && handleUpdateStatus(viewMessage.id, value)}
            >
              <SelectTrigger className="w-full sm:w-[180px] bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Set status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-white/10 text-white">
                <SelectItem value="unread">Unread</SelectItem>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="replied">Replied</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={() => window.open(`mailto:${viewMessage?.email}`)}
              className="bg-white text-black hover:bg-white/90"
            >
              <Mail className="mr-2 h-4 w-4" />
              Reply via Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

