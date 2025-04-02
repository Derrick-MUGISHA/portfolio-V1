"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { db, storage } from "@/lib/firebase"
import { doc, getDoc, setDoc, updateDoc, serverTimestamp, collection } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save, Image, Eye } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import dynamic from "next/dynamic"

// Import the editor dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })
import "react-quill/dist/quill.snow.css"

export default function PageEditor({ params }: { params: { id: string } }) {
  const { id } = params
  const isNewPage = id === "new"
  const [page, setPage] = useState({
    title: "",
    slug: "",
    content: "",
    featuredImage: "",
    metaTitle: "",
    metaDescription: "",
  })
  const [loading, setLoading] = useState(!isNewPage)
  const [saving, setSaving] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!isNewPage) {
      fetchPage()
    } else {
      setLoading(false)
    }
  }, [id, isNewPage])

  async function fetchPage() {
    try {
      const pageDoc = await getDoc(doc(db, "pages", id))

      if (pageDoc.exists()) {
        setPage({
          ...(pageDoc.data() as any),
          // Ensure all fields exist
          title: pageDoc.data().title || "",
          slug: pageDoc.data().slug || "",
          content: pageDoc.data().content || "",
          featuredImage: pageDoc.data().featuredImage || "",
          metaTitle: pageDoc.data().metaTitle || "",
          metaDescription: pageDoc.data().metaDescription || "",
        })
      }

      setLoading(false)
    } catch (error) {
      console.error("Error fetching page:", error)
      toast({
        title: "Error",
        description: "Failed to load page",
        variant: "destructive",
      })
      setLoading(false)
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target

    // Auto-generate slug from title if slug is empty
    if (name === "title" && !page.slug) {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")

      setPage((prev) => ({ ...prev, title: value, slug }))
    } else {
      setPage((prev) => ({ ...prev, [name]: value }))
    }
  }

  function handleContentChange(content: string) {
    setPage((prev) => ({ ...prev, content }))
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]

    if (file) {
      setImageFile(file)

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  async function handleSave() {
    if (!page.title || !page.slug) {
      toast({
        title: "Error",
        description: "Title and slug are required",
        variant: "destructive",
      })
      return
    }

    setSaving(true)

    try {
      let imageUrl = page.featuredImage

      // Upload image if selected
      if (imageFile) {
        const storageRef = ref(storage, `pages/${Date.now()}_${imageFile.name}`)
        await uploadBytes(storageRef, imageFile)
        imageUrl = await getDownloadURL(storageRef)
      }

      const pageData = {
        ...page,
        featuredImage: imageUrl,
        updatedAt: serverTimestamp(),
      }

      if (isNewPage) {
        // Create new page
        const newPageRef = doc(collection(db, "pages"))
        await setDoc(newPageRef, {
          ...pageData,
          createdAt: serverTimestamp(),
        })

        toast({
          title: "Success",
          description: "Page created successfully",
        })

        router.push(`/admin/pages/${newPageRef.id}`)
      } else {
        // Update existing page
        await updateDoc(doc(db, "pages", id), pageData)

        toast({
          title: "Success",
          description: "Page updated successfully",
        })
      }

      setSaving(false)
    } catch (error) {
      console.error("Error saving page:", error)
      toast({
        title: "Error",
        description: "Failed to save page",
        variant: "destructive",
      })
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
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={() => router.push("/admin/pages")}
            className="mr-2 text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">{isNewPage ? "New Page" : "Edit Page"}</h1>
        </div>

        <div className="flex items-center space-x-4">
          <Button onClick={handleSave} disabled={saving} className="bg-white text-black hover:bg-white/90">
            <Save className="mr-2 h-4 w-4" />
            {saving ? "Saving..." : "Save"}
          </Button>

          {!isNewPage && (
            <Button
              variant="outline"
              onClick={() => router.push(`/${page.slug}`)}
              className="text-white border-white/20 hover:bg-white/10"
            >
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-white">
                    Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={page.title}
                    onChange={handleChange}
                    className="bg-white/5 border-white/10 text-white"
                    placeholder="Page title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug" className="text-white">
                    Slug
                  </Label>
                  <Input
                    id="slug"
                    name="slug"
                    value={page.slug}
                    onChange={handleChange}
                    className="bg-white/5 border-white/10 text-white"
                    placeholder="page-url-slug"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
            <CardContent className="p-6">
              <Tabs defaultValue="write">
                <TabsList className="bg-white/10 text-white">
                  <TabsTrigger value="write" className="data-[state=active]:bg-white/20">
                    Write
                  </TabsTrigger>
                  <TabsTrigger value="preview" className="data-[state=active]:bg-white/20">
                    Preview
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="write" className="mt-4">
                  <div className="min-h-[400px] [&_.ql-editor]:min-h-[400px] [&_.ql-toolbar]:bg-white/5 [&_.ql-container]:bg-white/5 [&_.ql-toolbar]:border-white/10 [&_.ql-container]:border-white/10 [&_.ql-toolbar]:rounded-t-md [&_.ql-container]:rounded-b-md [&_.ql-toolbar]:text-white [&_.ql-container]:text-white">
                    <ReactQuill
                      value={page.content}
                      onChange={handleContentChange}
                      theme="snow"
                      modules={{
                        toolbar: [
                          [{ header: [1, 2, 3, 4, 5, 6, false] }],
                          ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
                          [{ list: "ordered" }, { list: "bullet" }],
                          [{ indent: "-1" }, { indent: "+1" }],
                          [{ align: [] }],
                          ["link", "image"],
                          ["clean"],
                        ],
                      }}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="preview" className="mt-4">
                  <div
                    className="min-h-[400px] p-4 bg-white/5 border border-white/10 rounded-md text-white prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: page.content }}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium text-white mb-4">Featured Image</h3>

              <div className="space-y-4">
                {(imagePreview || page.featuredImage) && (
                  <div className="relative aspect-video rounded-md overflow-hidden border border-white/10">
                    <img
                      src={imagePreview || page.featuredImage}
                      alt="Featured"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="flex items-center justify-center">
                  <label
                    htmlFor="featured-image"
                    className="flex items-center justify-center w-full h-12 px-4 transition-colors duration-150 bg-white/5 border border-white/10 rounded-md cursor-pointer hover:bg-white/10"
                  >
                    <Image className="mr-2 h-4 w-4 text-white" />
                    <span className="text-sm text-white">
                      {imagePreview || page.featuredImage ? "Change Image" : "Upload Image"}
                    </span>
                    <input
                      id="featured-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium text-white mb-4">SEO Settings</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="metaTitle" className="text-white">
                    Meta Title
                  </Label>
                  <Input
                    id="metaTitle"
                    name="metaTitle"
                    value={page.metaTitle}
                    onChange={handleChange}
                    className="bg-white/5 border-white/10 text-white"
                    placeholder="SEO title (defaults to page title if empty)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metaDescription" className="text-white">
                    Meta Description
                  </Label>
                  <Input
                    id="metaDescription"
                    name="metaDescription"
                    value={page.metaDescription}
                    onChange={handleChange}
                    className="bg-white/5 border-white/10 text-white"
                    placeholder="Brief description for search engines"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

