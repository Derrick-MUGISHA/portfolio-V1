"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { db, storage } from "@/lib/firebase"
import { doc, getDoc, setDoc, updateDoc, serverTimestamp, collection } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save, Image, Eye } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import dynamic from "next/dynamic"

// Import the editor dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })
import "react-quill/dist/quill.snow.css"

export default function BlogPostEditor({ params }: { params: { id: string } }) {
  const { id } = params
  const isNewPost = id === "new"
  const [post, setPost] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    published: false,
    tags: [] as string[],
    author: {
      name: "Jean Eric Hirwa",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  })
  const [loading, setLoading] = useState(!isNewPost)
  const [saving, setSaving] = useState(false)
  const [tagInput, setTagInput] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!isNewPost) {
      fetchPost()
    } else {
      setLoading(false)
    }
  }, [id, isNewPost])

  async function fetchPost() {
    try {
      const postDoc = await getDoc(doc(db, "posts", id))

      if (postDoc.exists()) {
        setPost({
          ...(postDoc.data() as any),
          // Ensure all fields exist
          title: postDoc.data().title || "",
          slug: postDoc.data().slug || "",
          excerpt: postDoc.data().excerpt || "",
          content: postDoc.data().content || "",
          featuredImage: postDoc.data().featuredImage || "",
          published: postDoc.data().published || false,
          tags: postDoc.data().tags || [],
          author: postDoc.data().author || {
            name: "Jean Eric Hirwa",
            avatar: "/placeholder.svg?height=100&width=100",
          },
        })
      }

      setLoading(false)
    } catch (error) {
      console.error("Error fetching post:", error)
      toast({
        title: "Error",
        description: "Failed to load post",
        variant: "destructive",
      })
      setLoading(false)
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target

    // Auto-generate slug from title if slug is empty
    if (name === "title" && !post.slug) {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")

      setPost((prev) => ({ ...prev, title: value, slug }))
    } else {
      setPost((prev) => ({ ...prev, [name]: value }))
    }
  }

  function handleContentChange(content: string) {
    setPost((prev) => ({ ...prev, content }))
  }

  function handlePublishedChange(checked: boolean) {
    setPost((prev) => ({ ...prev, published: checked }))
  }

  function handleAddTag(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault()

      if (!post.tags.includes(tagInput.trim())) {
        setPost((prev) => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()],
        }))
      }

      setTagInput("")
    }
  }

  function handleRemoveTag(tagToRemove: string) {
    setPost((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
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
    if (!post.title) {
      toast({
        title: "Error",
        description: "Title is required",
        variant: "destructive",
      })
      return
    }

    setSaving(true)

    try {
      let imageUrl = post.featuredImage

      // Upload image if selected
      if (imageFile) {
        const storageRef = ref(storage, `blog/${Date.now()}_${imageFile.name}`)
        await uploadBytes(storageRef, imageFile)
        imageUrl = await getDownloadURL(storageRef)
      }

      const postData = {
        ...post,
        featuredImage: imageUrl,
        updatedAt: serverTimestamp(),
      }

      if (isNewPost) {
        // Create new post
        const newPostRef = doc(collection(db, "posts"))
        await setDoc(newPostRef, {
          ...postData,
          createdAt: serverTimestamp(),
        })

        toast({
          title: "Success",
          description: "Post created successfully",
        })

        router.push(`/admin/blog/${newPostRef.id}`)
      } else {
        // Update existing post
        await updateDoc(doc(db, "posts", id), postData)

        toast({
          title: "Success",
          description: "Post updated successfully",
        })
      }

      setSaving(false)
    } catch (error) {
      console.error("Error saving post:", error)
      toast({
        title: "Error",
        description: "Failed to save post",
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
            onClick={() => router.push("/admin/blog")}
            className="mr-2 text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">{isNewPost ? "New Post" : "Edit Post"}</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch id="published" checked={post.published} onCheckedChange={handlePublishedChange} />
            <Label htmlFor="published" className="text-white">
              {post.published ? "Published" : "Draft"}
            </Label>
          </div>

          <Button onClick={handleSave} disabled={saving} className="bg-white text-black hover:bg-white/90">
            <Save className="mr-2 h-4 w-4" />
            {saving ? "Saving..." : "Save"}
          </Button>

          {!isNewPost && (
            <Button
              variant="outline"
              onClick={() => router.push(`/blog/${post.slug || id}`)}
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
                    value={post.title}
                    onChange={handleChange}
                    className="bg-white/5 border-white/10 text-white"
                    placeholder="Post title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug" className="text-white">
                    Slug
                  </Label>
                  <Input
                    id="slug"
                    name="slug"
                    value={post.slug}
                    onChange={handleChange}
                    className="bg-white/5 border-white/10 text-white"
                    placeholder="post-url-slug"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt" className="text-white">
                    Excerpt
                  </Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    value={post.excerpt}
                    onChange={handleChange}
                    className="bg-white/5 border-white/10 text-white h-20"
                    placeholder="Brief description of the post"
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
                      value={post.content}
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
                    dangerouslySetInnerHTML={{ __html: post.content }}
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
                {(imagePreview || post.featuredImage) && (
                  <div className="relative aspect-video rounded-md overflow-hidden border border-white/10">
                    <img
                      src={imagePreview || post.featuredImage}
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
                      {imagePreview || post.featuredImage ? "Change Image" : "Upload Image"}
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
              <h3 className="text-lg font-medium text-white mb-4">Tags</h3>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <div key={tag} className="flex items-center bg-white/10 text-white px-3 py-1 rounded-full text-sm">
                      {tag}
                      <button onClick={() => handleRemoveTag(tag)} className="ml-2 text-white/70 hover:text-white">
                        &times;
                      </button>
                    </div>
                  ))}
                </div>

                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="Add tag and press Enter"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

