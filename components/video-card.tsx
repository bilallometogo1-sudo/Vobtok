"use client"

import { useState, useRef, useEffect } from "react"
import { Heart, MessageCircle, Share2, Bookmark, Music2, Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CommentsSheet } from "./comments-sheet"
import { ShareSheet } from "./share-sheet"

interface VideoCardProps {
  video: {
    id: string
    username: string
    userAvatar: string
    description: string
    song: string
    likes: number
    comments: number
    shares: number
    videoUrl: string
    thumbnailUrl: string
  }
  isActive: boolean
}

export function VideoCard({ video, isActive }: VideoCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [likeCount, setLikeCount] = useState(video.likes)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.play().catch(() => {})
      setIsPlaying(true)
    } else if (videoRef.current) {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }, [isActive])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
  }

  const formatCount = (count: number) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "M"
    }
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K"
    }
    return count.toString()
  }

  return (
    <div className="relative h-full w-full snap-start">
      {/* Video Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${video.thumbnailUrl})` }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Video Element */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={video.videoUrl}
        loop
        muted={isMuted}
        playsInline
        poster={video.thumbnailUrl}
        onClick={togglePlay}
      />

      {/* Play/Pause Overlay */}
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={togglePlay}
        >
          <div className="rounded-full bg-black/40 p-6 backdrop-blur-sm">
            <Play className="h-12 w-12 text-white fill-white" />
          </div>
        </div>
      )}

      {/* Gradient overlays */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

      {/* Volume Control */}
      <button
        onClick={toggleMute}
        className="absolute right-4 top-20 rounded-full bg-black/40 p-2 backdrop-blur-sm transition-transform hover:scale-110"
      >
        {isMuted ? (
          <VolumeX className="h-5 w-5 text-white" />
        ) : (
          <Volume2 className="h-5 w-5 text-white" />
        )}
      </button>

      {/* Right Side Actions */}
      <div className="absolute bottom-32 right-3 flex flex-col items-center gap-5">
        {/* User Avatar */}
        <div className="relative mb-2">
          <Avatar className="h-12 w-12 ring-2 ring-white">
            <AvatarImage src={video.userAvatar} alt={video.username} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {video.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Button 
            size="icon" 
            className="absolute -bottom-2 left-1/2 h-5 w-5 -translate-x-1/2 rounded-full bg-primary text-xs"
          >
            +
          </Button>
        </div>

        {/* Like */}
        <button 
          onClick={handleLike}
          className="flex flex-col items-center gap-1 transition-transform active:scale-90"
        >
          <div className={cn(
            "rounded-full bg-black/40 p-3 backdrop-blur-sm transition-colors",
            isLiked && "bg-primary/80"
          )}>
            <Heart className={cn(
              "h-7 w-7 transition-all",
              isLiked ? "fill-white text-white scale-110" : "text-white"
            )} />
          </div>
          <span className="text-xs font-semibold text-white drop-shadow-lg">
            {formatCount(likeCount)}
          </span>
        </button>

        {/* Comments */}
        <button 
          onClick={() => setShowComments(true)}
          className="flex flex-col items-center gap-1 transition-transform active:scale-90"
        >
          <div className="rounded-full bg-black/40 p-3 backdrop-blur-sm">
            <MessageCircle className="h-7 w-7 text-white" />
          </div>
          <span className="text-xs font-semibold text-white drop-shadow-lg">
            {formatCount(video.comments)}
          </span>
        </button>

        {/* Share */}
        <button 
          onClick={() => setShowShare(true)}
          className="flex flex-col items-center gap-1 transition-transform active:scale-90"
        >
          <div className="rounded-full bg-black/40 p-3 backdrop-blur-sm">
            <Share2 className="h-7 w-7 text-white" />
          </div>
          <span className="text-xs font-semibold text-white drop-shadow-lg">
            {formatCount(video.shares)}
          </span>
        </button>

        {/* Bookmark */}
        <button 
          onClick={() => setIsSaved(!isSaved)}
          className="flex flex-col items-center gap-1 transition-transform active:scale-90"
        >
          <div className={cn(
            "rounded-full bg-black/40 p-3 backdrop-blur-sm transition-colors",
            isSaved && "bg-accent/80"
          )}>
            <Bookmark className={cn(
              "h-7 w-7 transition-all",
              isSaved ? "fill-white text-white" : "text-white"
            )} />
          </div>
        </button>

        {/* Music Disc */}
        <div className="relative h-12 w-12 animate-spin rounded-full bg-gradient-to-tr from-muted to-secondary p-0.5" style={{ animationDuration: "3s" }}>
          <div className="flex h-full w-full items-center justify-center rounded-full bg-black">
            <Music2 className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-20 left-4 right-20">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold text-white text-base drop-shadow-lg">@{video.username}</span>
        </div>
        <p className="text-sm text-white/90 line-clamp-2 drop-shadow-lg mb-3">
          {video.description}
        </p>
        <div className="flex items-center gap-2">
          <Music2 className="h-4 w-4 text-white animate-pulse" />
          <div className="overflow-hidden">
            <p className="text-sm text-white/80 whitespace-nowrap animate-marquee">
              {video.song}
            </p>
          </div>
        </div>
      </div>

      {/* Comments Sheet */}
      <CommentsSheet isOpen={showComments} onClose={() => setShowComments(false)} />

      {/* Share Sheet */}
      <ShareSheet isOpen={showShare} onClose={() => setShowShare(false)} />
    </div>
  )
}
