"use client"

import { useState } from "react"
import { Search, MoreHorizontal, Send, Camera, Mic, Image as ImageIcon, Heart, MessageCircle, UserPlus, AtSign } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const NOTIFICATIONS = [
  {
    id: "1",
    type: "like",
    user: { name: "Sarah_dance", avatar: "https://i.pravatar.cc/150?img=5" },
    content: "liked your video",
    time: "2m ago",
    thumbnail: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=100&h=100&fit=crop",
  },
  {
    id: "2",
    type: "comment",
    user: { name: "FoodieMax", avatar: "https://i.pravatar.cc/150?img=8" },
    content: "commented: This looks amazing! 🔥",
    time: "15m ago",
    thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100&h=100&fit=crop",
  },
  {
    id: "3",
    type: "follow",
    user: { name: "TravelJohn", avatar: "https://i.pravatar.cc/150?img=11" },
    content: "started following you",
    time: "1h ago",
    isFollowBack: true,
  },
  {
    id: "4",
    type: "mention",
    user: { name: "GamerPro", avatar: "https://i.pravatar.cc/150?img=15" },
    content: "mentioned you in a comment",
    time: "3h ago",
    thumbnail: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop",
  },
  {
    id: "5",
    type: "like",
    user: { name: "FitLife_Anna", avatar: "https://i.pravatar.cc/150?img=20" },
    content: "and 23 others liked your video",
    time: "5h ago",
    thumbnail: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=100&h=100&fit=crop",
  },
]

const MESSAGES = [
  {
    id: "1",
    user: { name: "Sarah_dance", avatar: "https://i.pravatar.cc/150?img=5", isOnline: true },
    lastMessage: "Hey! Love your latest video 😍",
    time: "2m ago",
    unread: 2,
  },
  {
    id: "2",
    user: { name: "FoodieMax", avatar: "https://i.pravatar.cc/150?img=8", isOnline: false },
    lastMessage: "Can you share the recipe?",
    time: "1h ago",
    unread: 0,
  },
  {
    id: "3",
    user: { name: "TravelJohn", avatar: "https://i.pravatar.cc/150?img=11", isOnline: true },
    lastMessage: "Where was that filmed?",
    time: "3h ago",
    unread: 1,
  },
  {
    id: "4",
    user: { name: "GamerPro", avatar: "https://i.pravatar.cc/150?img=15", isOnline: false },
    lastMessage: "Check out my new stream!",
    time: "Yesterday",
    unread: 0,
  },
]

function NotificationIcon({ type }: { type: string }) {
  switch (type) {
    case "like":
      return <Heart className="h-4 w-4 text-primary fill-primary" />
    case "comment":
      return <MessageCircle className="h-4 w-4 text-accent" />
    case "follow":
      return <UserPlus className="h-4 w-4 text-green-500" />
    case "mention":
      return <AtSign className="h-4 w-4 text-blue-500" />
    default:
      return null
  }
}

export function InboxPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h1 className="text-xl font-bold text-foreground">Inbox</h1>
        <button className="text-foreground">
          <MoreHorizontal className="h-6 w-6" />
        </button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="activity" className="flex-1 flex flex-col">
        <TabsList className="w-full bg-transparent border-b border-border rounded-none h-12 px-4">
          <TabsTrigger
            value="activity"
            className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent font-semibold"
          >
            Activity
          </TabsTrigger>
          <TabsTrigger
            value="messages"
            className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent font-semibold relative"
          >
            Messages
            <span className="absolute -top-1 -right-2 bg-primary text-primary-foreground text-[10px] font-bold px-1.5 rounded-full">
              3
            </span>
          </TabsTrigger>
        </TabsList>

        {/* Activity Tab */}
        <TabsContent value="activity" className="flex-1 overflow-y-auto mt-0">
          <div className="divide-y divide-border">
            {NOTIFICATIONS.map((notification) => (
              <div
                key={notification.id}
                className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors cursor-pointer"
              >
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                    <AvatarFallback>{notification.user.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5">
                    <NotificationIcon type={notification.type} />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">{notification.user.name}</span>{" "}
                    <span className="text-muted-foreground">{notification.content}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{notification.time}</p>
                </div>

                {notification.thumbnail && (
                  <img
                    src={notification.thumbnail}
                    alt=""
                    className="h-12 w-12 rounded-md object-cover"
                  />
                )}

                {notification.isFollowBack && (
                  <button className="px-4 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90">
                    Follow
                  </button>
                )}
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages" className="flex-1 overflow-y-auto mt-0">
          {/* Search */}
          <div className="px-4 py-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search messages"
                className="pl-10 bg-secondary border-0"
              />
            </div>
          </div>

          {/* Message List */}
          <div className="divide-y divide-border">
            {MESSAGES.map((message) => (
              <div
                key={message.id}
                className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors cursor-pointer"
              >
                <div className="relative">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={message.user.avatar} alt={message.user.name} />
                    <AvatarFallback>{message.user.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  {message.user.isOnline && (
                    <div className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-background" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={cn(
                      "font-semibold text-foreground",
                      message.unread > 0 && "text-foreground"
                    )}>
                      {message.user.name}
                    </p>
                    <span className="text-xs text-muted-foreground">{message.time}</span>
                  </div>
                  <p className={cn(
                    "text-sm truncate mt-0.5",
                    message.unread > 0 ? "text-foreground font-medium" : "text-muted-foreground"
                  )}>
                    {message.lastMessage}
                  </p>
                </div>

                {message.unread > 0 && (
                  <div className="h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {message.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
