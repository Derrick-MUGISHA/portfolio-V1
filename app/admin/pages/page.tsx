"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
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
import { Plus, MoreVertical, Pencil, Trash, Eye, Search } from "lucide-react"

export default function PagesManagement() {
  const [pages, setPages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [deletePageId, setDeletePageId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchPages()
  }, [])

  async function fetchPages() {
    try {
      const pagesQuery = query(collection(db, "pages"), orderBy("updatedAt", "desc"))
      const snapshot = await getDocs(pagesQuery)
      const pagesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      setPages(pagesData)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching pages:", error)
      setLoading(false)
    }
  }

  async function handleDeletePage() {
    if (!deletePageId) return

    try {
      await deleteDoc(doc(db, "pages", deletePageId))
      setPages(pages.filter((page) => page.id !== deletePageId))
      setDeletePageId(null)
    } catch (error) {
      console.error("Error deleting page:", error)
    }
  }

  // Filter pages based on search query
  const filteredPages = pages.filter(
    (page) =>
      page.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.slug?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Static Pages</h1>
        <Button asChild className="bg-white text-black hover:bg-white/90">
          <Link href="/admin/pages/new">
            <Plus className="mr-2 h-4 w-4" />
            New Page
          </Link>
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/50" />
          <Input
            type="search"
            placeholder="Search pages..."
            className="pl-8 bg-white/5 border-white/10 text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border border-white/10 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : filteredPages.length > 0 ? (
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow>
                <TableHead className="text-white">Title</TableHead>
                <TableHead className="text-white">Slug</TableHead>
                <TableHead className="text-white">Last Updated</TableHead>
                <TableHead className="text-white w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPages.map((page) => (
                <TableRow key={page.id} className="border-white/10">
                  <TableCell className="font-medium text-white">{page.title}</TableCell>
                  <TableCell className="text-white/70">{page.slug}</TableCell>
                  <TableCell className="text-white/70">
                    {page.updatedAt && page.updatedAt.toDate
                      ? new Date(page.updatedAt.toDate()).toLocaleDateString()
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
                          onClick={() => router.push(`/admin/pages/${page.id}`)}
                          className="cursor-pointer hover:bg-white/10"
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => router.push(`/${page.slug}`)}
                          className="cursor-pointer hover:bg-white/10"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setDeletePageId(page.id)}
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
            {searchQuery ? "No pages match your search" : "No pages yet"}
          </div>
        )}
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog open={!!deletePageId} onOpenChange={() => setDeletePageId(null)}>
        <AlertDialogContent className="bg-gray-900 border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              This action cannot be undone. This will permanently delete the page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-white/10 text-white hover:bg-white/10">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePage} className="bg-red-600 text-white hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

