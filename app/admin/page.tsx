"use client"

import { useState, useEffect } from "react"
import { db } from "@/lib/firebase"
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { MessageSquare, FileText, Users, Eye } from "lucide-react"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalMessages: 0,
    totalPosts: 0,
    totalUsers: 0,
    totalPageViews: 0,
  })

  const [recentMessages, setRecentMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Fetch counts
        const messagesQuery = query(collection(db, "contacts"))
        const messagesSnapshot = await getDocs(messagesQuery)
        const totalMessages = messagesSnapshot.size

        const postsQuery = query(collection(db, "posts"))
        const postsSnapshot = await getDocs(postsQuery)
        const totalPosts = postsSnapshot.size

        const usersQuery = query(collection(db, "users"))
        const usersSnapshot = await getDocs(usersQuery)
        const totalUsers = usersSnapshot.size

        // For page views, we'd typically use analytics
        // This is a placeholder - in a real app, you might fetch from Firebase Analytics
        const totalPageViews = 1250

        setStats({
          totalMessages,
          totalPosts,
          totalUsers,
          totalPageViews,
        })

        // Fetch recent messages
        const recentMessagesQuery = query(collection(db, "contacts"), orderBy("createdAt", "desc"), limit(5))
        const recentMessagesSnapshot = await getDocs(recentMessagesQuery)
        const recentMessagesData = recentMessagesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        setRecentMessages(recentMessagesData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  // Sample data for charts
  const pageViewsData = [
    { name: "Mon", views: 120 },
    { name: "Tue", views: 150 },
    { name: "Wed", views: 180 },
    { name: "Thu", views: 170 },
    { name: "Fri", views: 190 },
    { name: "Sat", views: 110 },
    { name: "Sun", views: 130 },
  ]

  const trafficSourcesData = [
    { name: "Direct", value: 40 },
    { name: "Search", value: 30 },
    { name: "Social", value: 20 },
    { name: "Referral", value: 10 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/70">Total Messages</p>
                <h3 className="text-2xl font-bold text-white mt-1">{stats.totalMessages}</h3>
              </div>
              <div className="bg-blue-500/20 p-3 rounded-full">
                <MessageSquare className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/70">Total Posts</p>
                <h3 className="text-2xl font-bold text-white mt-1">{stats.totalPosts}</h3>
              </div>
              <div className="bg-green-500/20 p-3 rounded-full">
                <FileText className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/70">Total Users</p>
                <h3 className="text-2xl font-bold text-white mt-1">{stats.totalUsers}</h3>
              </div>
              <div className="bg-purple-500/20 p-3 rounded-full">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/70">Page Views</p>
                <h3 className="text-2xl font-bold text-white mt-1">{stats.totalPageViews}</h3>
              </div>
              <div className="bg-yellow-500/20 p-3 rounded-full">
                <Eye className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Page Views (Last 7 Days)</CardTitle>
            <CardDescription className="text-white/70">Daily page view statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pageViewsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#333",
                      border: "1px solid #555",
                      color: "#fff",
                    }}
                  />
                  <Bar dataKey="views" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Traffic Sources</CardTitle>
            <CardDescription className="text-white/70">Where your visitors are coming from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trafficSourcesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {trafficSourcesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#333",
                      border: "1px solid #555",
                      color: "#fff",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent messages */}
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Recent Messages</CardTitle>
          <CardDescription className="text-white/70">Latest contact form submissions</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : recentMessages.length > 0 ? (
            <div className="space-y-4">
              {recentMessages.map((message) => (
                <div key={message.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-white">{message.name}</h4>
                      <p className="text-sm text-white/70">{message.email}</p>
                    </div>
                    <div className="text-sm text-white/50">
                      {message.createdAt && message.createdAt.toDate
                        ? new Date(message.createdAt.toDate()).toLocaleDateString()
                        : "Unknown date"}
                    </div>
                  </div>
                  <p className="mt-2 text-white/80">{message.subject}</p>
                  <p className="mt-1 text-white/70 line-clamp-2">{message.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-white/50">No messages yet</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

