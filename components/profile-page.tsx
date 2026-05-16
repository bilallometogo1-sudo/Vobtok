"use client"

import { useState } from "react"
import { Settings, Share2, Grid3X3, Bookmark, Heart, MoreHorizontal, Lock } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const USER_DATA = {
  username: "vobtok_user",
  displayName: "Vobtok Creator",
  avatar: "https://i.pravatar.cc/150?img=12",
  bio: "Creating amazing content every day. Follow for daily inspiration and fun videos!",
  following: 234,
  followers: 12500,
  likes: 89400,
  isVerified: true,
}

const USER_VIDEOS = [
  { id: "1", thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=300&fit=crop", views: "125K", isPinned: true },
  { id: "2", thumbnail: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=200&h=300&fit=crop", views: "89K" },
  { id: "3", thumbnail: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200&h=300&fit=crop", views: "234K" },
  { id: "4", thumbnail: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=300&fit=crop", views: "567K" },
  { id: "5", thumbnail: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=300&fit=crop", views: "178K" },
  { id: "6", thumbnail: "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=200&h=300&fit=crop", views: "45K" },
  { id: "7", thumbnail: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=300&fit=crop", views: "92K" },
  { id: "8", thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=300&fit=crop", views: "156K" },
  { id: "9", thumbnail: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=200&h=300&fit=crop", views: "78K" },
]

const LIKED_VIDEOS = USER_VIDEOS.slice(3, 7)
const SAVED_VIDEOS = USER_VIDEOS.slice(0, 4)

function formatCount(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + "M"
  if (count >= 1000) return (count / 1000).toFixed(1) + "K"
  return count.toString()
}

function VideoGrid({ videos, emptyMessage }: { videos: typeof USER_VIDEOS; emptyMessage: string }) {
  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <p>{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-0.5">
      {videos.map((video) => (
        <div key={video.id} className="relative aspect-[9/12] cursor-pointer group">
          <img
            src={video.thumbnail}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          {video.isPinned && (
            <div className="absolute top-1 left-1 bg-primary/90 text-primary-foreground text-[10px] px-1.5 py-0.5 rounded">
              Pinned
            </div>
          )}
          <div className="absolute bottom-1 left-1 flex items-center gap-1 text-white text-xs font-medium drop-shadow-lg">
            <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            {video.views}
          </div>
        </div>
      ))}
    </div>
  )
}

export function ProfilePage() {
  const [isFollowing, setIsFollowing] = useState(false)

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <Button variant="ghost" size="icon" className="text-foreground">
          <Lock className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-1">
          <span className="font-bold text-lg text-foreground">{USER_DATA.username}</span>
          {USER_DATA.isVerified && (
            <svg className="h-4 w-4 text-accent" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          )}
        </div>
        <Button variant="ghost" size="icon" className="text-foreground">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>

      {/* Profile Info */}
      <div className="px-4 py-4">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 ring-2 ring-primary ring-offset-2 ring-offset-background">
            <AvatarImage src={USER_DATA.avatar} alt={USER_DATA.displayName} />
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
              {USER_DATA.displayName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h2 className="mt-3 text-lg font-semibold text-foreground">@{USER_DATA.username}</h2>
        </div>

        {/* Stats */}
        <div className="mt-4 flex items-center justify-center gap-8">
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-foreground">{formatCount(USER_DATA.following)}</span>
            <span className="text-xs text-muted-foreground">Following</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-foreground">{formatCount(USER_DATA.followers)}</span>
            <span className="text-xs text-muted-foreground">Followers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-foreground">{formatCount(USER_DATA.likes)}</span>
            <span className="text-xs text-muted-foreground">Likes</span>
          </div>
        </div>

        {/* Bio */}
        <p className="mt-4 text-center text-sm text-muted-foreground">{USER_DATA.bio}</p>

        {/* Action Buttons */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <Button
            onClick={() => setIsFollowing(!isFollowing)}
            className={cn(
              "flex-1 max-w-[140px]",
              isFollowing
                ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
          <Button variant="secondary" className="flex-1 max-w-[140px]">
            Message
          </Button>
          <Button variant="secondary" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="videos" className="flex-1 flex flex-col">
        <TabsList className="w-full bg-transparent border-b border-border rounded-none h-12">
          <TabsTrigger
            value="videos"
            className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent"
          >
            <Grid3X3 className="h-5 w-5" />
          </TabsTrigger>
          <TabsTrigger
            value="liked"
            className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent"
          >
            <Heart className="h-5 w-5" />
          </TabsTrigger>
          <TabsTrigger
            value="saved"
            className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent"
          >
            <Bookmark className="h-5 w-5" />
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto">
          <TabsContent value="videos" className="mt-0">
            <VideoGrid videos={USER_VIDEOS} emptyMessage="No videos yet" />
          </TabsContent>
          <TabsContent value="liked" className="mt-0">
            <VideoGrid videos={LIKED_VIDEOS} emptyMessage="No liked videos" />
          </TabsContent>
          <TabsContent value="saved" className="mt-0">
            <VideoGrid videos={SAVED_VIDEOS} emptyMessage="No saved videos" />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
