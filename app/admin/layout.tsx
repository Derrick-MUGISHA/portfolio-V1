"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"
import { signOut } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FileText, MessageSquare, Users, Settings, LogOut, Menu, X } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // If we're on the login page, don't show the layout
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/admin/login")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Blog Posts", href: "/admin/blog", icon: FileText },
    { name: "Pages", href: "/admin/pages", icon: FileText },
    { name: "Messages", href: "/admin/messages", icon: MessageSquare },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Mobile sidebar toggle */}
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between p-4 bg-gray-900 md:hidden">
        <div className="font-bold">Admin Dashboard</div>
        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white">
          {sidebarOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 bottom-0 z-30 w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-800">
            <div className="text-xl font-bold">Admin Dashboard</div>
            {user && <div className="text-sm text-gray-400 mt-1">{user.email}</div>}
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                    isActive ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t border-gray-800">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-400 hover:text-white hover:bg-white/5"
              onClick={handleSignOut}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 pt-16 md:pt-0">
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}

