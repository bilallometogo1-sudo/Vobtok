"use client"

import { useState } from "react"
import { X, Heart, Send, AtSign, Smile } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Comment {
  id: string
  user: {
    name: string
    avatar: string
    isVerified?: boolean
  }
  content: string
  likes: number
  time: string
  replies?: Comment[]
  isLiked?: boolean
}

const SAMPLE_COMMENTS: Comment[] = [
  {
    id: "1",
    user: { name: "creative_chef", avatar: "https://i.pravatar.cc/150?img=1", isVerified: true },
    content: "This is absolutely amazing! Keep up the great work 🔥",
    likes: 1234,
    time: "2h",
    replies: [
      {
        id: "1-1",
        user: { name: "foodie_lover", avatar: "https://i.pravatar.cc/150?img=22" },
        content: "I totally agree!",
        likes: 45,
        time: "1h",
      },
    ],
  },
  {
    id: "2",
    user: { name: "travel_adventures", avatar: "https://i.pravatar.cc/150?img=2" },
    content: "Where was this filmed? I need to visit this place! 🌍",
    likes: 567,
    time: "4h",
  },
  {
    id: "3",
    user: { name: "fitness_guru", avatar: "https://i.pravatar.cc/150?img=3", isVerified: true },
    content: "Thanks for sharing this! Saved for later 💪",
    likes: 890,
    time: "6h",
  },
  {
    id: "4",
    user: { name: "pet_paradise", avatar: "https://i.pravatar.cc/150?img=4" },
    content: "So cute!! 😍😍😍",
    likes: 2341,
    time: "8h",
    isLiked: true,
  },
  {
    id: "5",
    user: { name: "tech_reviewer", avatar: "https://i.pravatar.cc/150?img=5" },
    content: "The quality of this video is insane! What camera do you use?",
    likes: 123,
    time: "12h",
  },
]

function formatCount(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + "M"
  if (count >= 1000) return (count / 1000).toFixed(1) + "K"
  return count.toString()
}

function CommentItem({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) {
  const [isLiked, setIsLiked] = useState(comment.isLiked || false)
  const [likeCount, setLikeCount] = useState(comment.likes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
  }

  return (
    <div className={cn("flex gap-3", isReply && "ml-12 mt-3")}>
      <Avatar className={cn(isReply ? "h-8 w-8" : "h-10 w-10")}>
        <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
        <AvatarFallback>{comment.user.name.slice(0, 2)}</AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-sm text-foreground">{comment.user.name}</span>
          {comment.user.isVerified && (
            <svg className="h-3.5 w-3.5 text-accent" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          )}
          <span className="text-xs text-muted-foreground">{comment.time}</span>
        </div>
        <p className="text-sm text-foreground mt-0.5">{comment.content}</p>
        <div className="flex items-center gap-4 mt-1.5">
          <button className="text-xs text-muted-foreground hover:text-foreground">Reply</button>
        </div>
      </div>

      <button onClick={handleLike} className="flex flex-col items-center gap-0.5 pt-1">
        <Heart
          className={cn(
            "h-4 w-4 transition-colors",
            isLiked ? "fill-primary text-primary" : "text-muted-foreground"
          )}
        />
        <span className="text-[10px] text-muted-foreground">{formatCount(likeCount)}</span>
      </button>
    </div>
  )
}

export function CommentsSheet({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [comment, setComment] = useState("")

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Sheet */}
      <div className="relative w-full max-h-[70vh] bg-background rounded-t-3xl flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Handle */}
        <div className="flex justify-center py-2">
          <div className="w-10 h-1 rounded-full bg-muted" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-3 border-b border-border">
          <span className="text-base font-semibold text-foreground">
            {formatCount(SAMPLE_COMMENTS.length)} comments
          </span>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {SAMPLE_COMMENTS.map((c) => (
            <div key={c.id}>
              <CommentItem comment={c} />
              {c.replies?.map((reply) => (
                <CommentItem key={reply.id} comment={reply} isReply />
              ))}
            </div>
          ))}
        </div>

        {/* Comment Input */}
        <div className="flex items-center gap-2 px-4 py-3 border-t border-border bg-background">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="You" />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
          <div className="flex-1 relative">
            <Input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="pr-20 bg-secondary border-0"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button className="text-muted-foreground hover:text-foreground p-1">
                <AtSign className="h-4 w-4" />
              </button>
              <button className="text-muted-foreground hover:text-foreground p-1">
                <Smile className="h-4 w-4" />
              </button>
            </div>
          </div>
          <Button
            size="icon"
            disabled={!comment.trim()}
            className="bg-primary hover:bg-primary/90 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
